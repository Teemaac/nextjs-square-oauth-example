import qs from 'qs';
import { obtainSquareOAuthUrl } from '../../../lib/square';


export default async function handler(req, res) {
  const { SQUARE_APP_ID, SQUARE_CALLBACK_URL } = process.env;


  const queryParams = qs.stringify({
    client_id: SQUARE_APP_ID,
    response_type: 'code',
    scope: 'MERCHANT_PROFILE_READ PAYMENTS_READ',
    state: encodeURIComponent('SQUARE_CALLBACK_URL'),
  });

  const oauthUrl = obtainSquareOAuthUrl() + queryParams;

  res.redirect(oauthUrl);
}

