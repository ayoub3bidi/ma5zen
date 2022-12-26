import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { NextComponentType } from 'next';
import AuthGuard from '../components/AuthGuard';

export type CustomAppProps = AppProps & {
  Component: NextComponentType & { requireAuth?: boolean };
};

function MyApp({ Component, pageProps : {session, ...pageProps} }: CustomAppProps) {
  return (
    <SessionProvider 
      session={session}
      refetchInterval={5*60}
      refetchOnWindowFocus
    >
      { Component.requireAuth ?
        (<AuthGuard>
          <Component {...pageProps} />
        </AuthGuard>)
        :
        (<Component {...pageProps} />)
      }
    </SessionProvider>
  );
}

export default MyApp;