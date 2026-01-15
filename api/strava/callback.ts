import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { code, error } = req.query;

  if (error) {
    return res.redirect(`/?auth_error=${encodeURIComponent(String(error))}`);
  }

  if (!code) {
    return res.redirect('/?auth_error=no_code');
  }

  try {
    const tokenResponse = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        code: String(code),
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('Token exchange failed:', errorData);
      return res.redirect('/?auth_error=token_exchange_failed');
    }

    const tokens = await tokenResponse.json();

    // Create a simple base64-encoded token (in production, use proper JWT)
    const tokenData = {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: tokens.expires_at,
      athlete: {
        id: tokens.athlete.id,
        firstname: tokens.athlete.firstname,
        lastname: tokens.athlete.lastname,
        profile: tokens.athlete.profile,
        city: tokens.athlete.city,
        country: tokens.athlete.country,
      },
    };

    const encodedToken = Buffer.from(JSON.stringify(tokenData)).toString('base64');

    // Redirect to frontend with token
    res.redirect(`/?strava_token=${encodedToken}`);
  } catch (err) {
    console.error('OAuth callback error:', err);
    res.redirect('/?auth_error=server_error');
  }
}
