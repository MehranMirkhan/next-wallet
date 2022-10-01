import Head from "next/head";

export default function Home() {
  return (
    <div className="relative h-screen">
      <Head>
        <title>Next Wallet</title>
      </Head>

      <main>
        <h1 className="text-3xl font-bold underline">Welcome to Next Wallet</h1>
      </main>

      <footer className="absolute bottom-0 w-full text-center">Next Wallet © All Rights Reserved 2022</footer>
    </div>
  );
}
