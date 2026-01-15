import type { VercelRequest, VercelResponse } from '@vercel/node';

// This endpoint uses stored credentials to fetch activities automatically
// No user authentication required - it's a personal portfolio

async function getAccessToken(): Promise<string> {
  const refreshToken = process.env.STRAVA_REFRESH_TOKEN;

  if (!refreshToken) {
    throw new Error('STRAVA_REFRESH_TOKEN not configured');
  }

  // Always refresh to get a valid access token
  const response = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Token refresh failed:', error);
    throw new Error('Failed to refresh Strava token');
  }

  const data = await response.json();
  return data.access_token;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const accessToken = await getAccessToken();

    const page = req.query.page || '1';
    const perPage = req.query.per_page || '100';

    const activitiesUrl = new URL('https://www.strava.com/api/v3/athlete/activities');
    activitiesUrl.searchParams.set('page', String(page));
    activitiesUrl.searchParams.set('per_page', String(perPage));

    const response = await fetch(activitiesUrl.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Strava API error:', errorData);
      return res.status(response.status).json({ error: 'Failed to fetch activities' });
    }

    const activities = await response.json();

    // Cache for 5 minutes
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
    res.json(activities);
  } catch (err) {
    console.error('Activities fetch error:', err);
    res.status(500).json({ error: err instanceof Error ? err.message : 'Server error' });
  }
}
