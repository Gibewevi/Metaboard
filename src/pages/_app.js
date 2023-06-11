import '@/styles/globals.css'
import Dashboard from '@/containers/Dashboard'
import SignIn from '@/containers/signIn'
import SignUp from '@/containers/SignUp'
import { useState } from 'react'

export default function App({ Component, pageProps }) {
  const [loginPage, setLoginPage] = useState('signin');

  const handleSetSignupPage = () => {
    setLoginPage('signup');
  };
  const handleSetSigninPage = () => {
    setLoginPage('signin');
  };
  const handleSetDashboardPage = () => {
    setLoginPage('dashboard');
  };

  const renderPage = () => {
    switch (loginPage) {
      case 'signin':
        return <SignIn handleSetSignupPage={handleSetSignupPage} />;
      case 'signup':
        return <SignUp handleSetSigninPage={handleSetSigninPage}/>;
      case 'dashboard':
        return (
          <Dashboard>
            <Component {...pageProps} />
          </Dashboard>
        );
      default:
        return (
          <Dashboard>
            <Component {...pageProps} />
          </Dashboard>
        );
    }
  }

  return (
    <>
      {renderPage()}
    </>
  );
}