import '@/styles/globals.css';
import AuthProvider from '@/context/AuthProvider';
import Dashboard from '@/containers/Dashboard';
export default function App({ Component, pageProps }) {

  return (
    <AuthProvider>
      <Dashboard>
        <Component {...pageProps} />
      </Dashboard>
    </AuthProvider>
  );
}

