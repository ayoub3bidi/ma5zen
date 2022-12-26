import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { CustomNextPage } from '../types/CustomNextPage';

const Home : CustomNextPage  = () => {
  const { data } = useSession()
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {data?.user?.name || <Link href="/auth/signin">Sign in</Link>} {""}
        {data?.user && <button onClick={() => signOut()}>Sign out</button>}
        {data?.user && <Link href='/categories'>
          <span style={{marginLeft: '1rem'}}>Categories</span>
        </Link>}
      </main>
    </>
  )
}

Home.requireAuth = true;

export default Home;
