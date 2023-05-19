import querystring from 'querystring';

let merchantData;

//make the url for the call to square
export function obtainSquareOAuthUrl() {
  const SQUARE_APP_ID = process.env.SQUARE_APP_ID;
  const SQUARE_CALLBACK_URL = process.env.SQUARE_CALLBACK_URL;
  const scopes = ['MERCHANT_PROFILE_READ', 'PAYMENTS_READ', ];
  const state = SQUARE_CALLBACK_URL;

  const authorizationUrl =
    `https://connect.squareupsandbox.com/oauth2/authorize` +
    `?client_id=${SQUARE_APP_ID}` +
    `&response_type=code` +
    `&scope=${scopes.join('+')}` +
    `&state=${state}`;

  return authorizationUrl;  
}

export async function exchangeCodeForAccessToken(code) {
  const SQUARE_APP_ID = process.env.SQUARE_APP_ID;
  const SQUARE_APP_SECRET = process.env.SQUARE_APP_SECRET;
  const SQUARE_CALLBACK_URL = process.env.SQUARE_CALLBACK_URL;

  const response = await fetch('https://connect.squareupsandbox.com/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: SQUARE_APP_ID,
      client_secret: SQUARE_APP_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: SQUARE_CALLBACK_URL,
    }),

    
  });

  const data = await response.json();

  // Pull merchant details
  const merchantResponse = await fetch(`https://connect.squareupsandbox.com/v2/merchants/${data.merchant_id}`, {
    headers: {
      Authorization: `Bearer ${data.access_token}`,
      'Content-Type': 'application/json',
    },
  });

  merchantData = await merchantResponse.json();

  data.merchant_name = merchantData.business_name;

  return { data, merchantData };
}

export function getMerchantData() {
  return merchantData;
}
