import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

export default function Index({ tokenJWT }) {

  const router = useRouter();

  useEffect(() => {
    // router.push('/signin');
  }, []);

  return (
    <>
      <span>AUTHENTIFICATION JWT</span>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  const token = cookies.jwt;
  let tokenJWT = null;  // <-- default to null
  const API_URL = process.env.API_URL;
  if (token) {
    try {
      const response = await fetch(`${API_URL}/api/validate-jwt`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      tokenJWT = data.auth;
      if (tokenJWT) {
        return {
          redirect: {
            destination: '/accounts',
            permanent: false,
          },
        };
      };
    } catch (error) {
      console.error(error);
    }
  } else {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }
}
