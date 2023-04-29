import { exchangeCodeForAccessToken } from '../../lib/square';

export default async function handler(req, res) {
  const { code } = req.query;

  try {
    const accessToken = await exchangeCodeForAccessToken(code);
    res.redirect(`/callback?accessToken=${accessToken}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}
