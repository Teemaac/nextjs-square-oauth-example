import { exchangeCodeForAccessToken } from '../lib/square';

export async function getServerSideProps(context) {
  const { code } = context.query;

  try {
    const accessToken = await exchangeCodeForAccessToken(code);
    return {
      props: {
        merchantName: accessToken.merchant_name,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
}

export default function CallbackPage({ merchantName }) {
  return (
    <div>
      <h1>Welcome, {merchantName}!</h1>
      <p>Your access token has been successfully generated.</p>
    </div>
  );
}
