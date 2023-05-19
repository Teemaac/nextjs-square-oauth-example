import { useRouter } from 'next/router';
import Head from 'next/head';
import { exchangeCodeForAccessToken } from '../lib/square';


export default function CallbackPage({ merchantData }) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Callback Page</title>
        <meta name="description" content="Callback page for Square OAuth flow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Callback Page</h1>

        {!merchantData.merchant.business_name ? (
          <p>Loading merchant data...</p>
        ) : (
          <p>Merchant Name: {merchantData.merchant.business_name}</p>
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { code } = context.query;
  try {
    const data = await exchangeCodeForAccessToken(code);
    return {
      props: {
        merchantData: data.merchantData,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
}
