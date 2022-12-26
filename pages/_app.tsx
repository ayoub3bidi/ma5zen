import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { NextComponentType } from 'next';
import AuthGuard from '../components/AuthGuard';
import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { useState } from 'react';

export type CustomAppProps = AppProps & {
  Component: NextComponentType & { requireAuth?: boolean };
};

function MyApp({ Component, pageProps : {session, ...pageProps} }: CustomAppProps) {

  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?:ColorScheme) =>
    setColorScheme(value || colorScheme === 'dark' ? 'light' : 'dark');

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: colorScheme, fontFamily: "Roboto Slab"}}>
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
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default MyApp;