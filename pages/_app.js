
import {SessionProvider } from "next-auth/react"
import '../styles/globals.css';
import { StoreProvider } from "../components/contex/myContext"

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
   
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
   
  ) 
}

export default MyApp
