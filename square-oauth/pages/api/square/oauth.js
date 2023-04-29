
import { obtainSquareOAuthUrl } from '../../../lib/square';

export default async function handler(req, res) {
  const authorizationUrl = obtainSquareOAuthUrl();
  res.redirect(authorizationUrl);
}
