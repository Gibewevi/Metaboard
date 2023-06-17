import '@/styles/globals.css';
import Dashboard from '@/containers/Dashboard';
export default function App({ Component, pageProps }) {

  return (
    <Dashboard>
      <Component {...pageProps} />
    </Dashboard>
  );
}

