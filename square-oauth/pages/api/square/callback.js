import qs from 'qs';
import { obtainSquareOAuthToken } from '../../lib/square';

export default async function handler(req, res) {
  const { SQUARE_APP_ID, SQUARE_APP_SECRET, SQUARE_CALLBACK_URL } = process.env;

  console.log(SQUARE_APP_ID);

  const code = req.query.code;

  try {
    const response = await obtainSquareOAuthToken(code);

    const accessToken = response.data.access_token;
    const merchantId = response.data.merchant_id;

    // TODO: Save the access token and merchant ID to a database or session.

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}
