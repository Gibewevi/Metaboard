import '@/styles/globals.css'
import Dashboard from '@/containers/Dashboard'
import SignIn from '@/containers/signIn'
export default function App({ Component, pageProps }) {
  return (
    // <SignIn>
      
    // </SignIn>
      <Dashboard>
        <Component {...pageProps} />
      </Dashboard>
  )
}
