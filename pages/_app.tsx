import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NextComponentType } from 'next';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import AuthGuard from '../components/AuthGuard';
import PageLayout from '../components/PageLayout';
import '../styles/globals.scss';

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
              <PageLayout>
                <Component {...pageProps} />
              </PageLayout>
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