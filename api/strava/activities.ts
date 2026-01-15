import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing authorization token' });
  }

  try {
    const encodedToken = authHeader.replace('Bearer ', '');
    const tokenData = JSON.parse(Buffer.from(encodedToken, 'base64').toString());

    // Check if token is expired
    const now = Math.floor(Date.now() / 1000);
    if (tokenData.expires_at && tokenData.expires_at < now) {
      return res.status(401).json({ error: 'Token expired', needsRefresh: true });
    }

    const page = req.query.page || '1';
    const perPage = req.query.per_page || '50';

    const activitiesUrl = new URL('https://www.strava.com/api/v3/athlete/activities');
    activitiesUrl.searchParams.set('page', String(page));
    activitiesUrl.searchParams.set('per_page', String(perPage));

    const response = await fetch(activitiesUrl.toString(), {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        return res.status(401).json({ error: 'Strava token invalid', needsRefresh: true });
      }
      const errorData = await response.text();
      console.error('Strava API error:', errorData);
      return res.status(response.status).json({ error: 'Failed to fetch activities' });
    }

    const activities = await response.json();
    res.json(activities);
  } catch (err) {
    console.error('Activities fetch error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}
