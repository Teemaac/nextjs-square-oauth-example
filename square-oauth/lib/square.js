import axios from 'axios';

export function obtainSquareOAuthUrl() {
    const SQUARE_APP_ID = process.env.SQUARE_APP_ID;
  
    console.log(SQUARE_APP_ID);

    return `https://connect.squareupsandbox.com/oauth2/authorize?client_id=${SQUARE_APP_ID}`;
  }
  

export async function obtainSquareOAuthToken(code) {
  const { SQUARE_APP_ID, SQUARE_APP_SECRET, SQUARE_CALLBACK_URL } = process.env;

  const requestBody = {
    grant_type: 'authorization_code',
    client_id: SQUARE_APP_ID,
    client_secret: SQUARE_APP_SECRET,
    code,
    redirect_uri: SQUARE_CALLBACK_URL,
  };

  const response = await axios.post('https://connect.squareupsandbox.com/oauth2/token', requestBody);

  return response;
}
