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
  console.log('token ', token);
  if (token) {
    try {
      const response = await fetch('http://localhost:3000/api/validate-jwt', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      tokenJWT = data.auth;
      if (tokenJWT) {
        console.log('tokenJWT :', tokenJWT)
        return {
          redirect: {
            destination: '/dashboard',
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
