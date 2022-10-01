import Head from "next/head";
import axios from "axios";
import { Transaction } from "@prisma/client";
import { useCallback, useState } from "react";

export default function Home() {
  const { transactions, onGetTransactions } = useTransaction();
  return (
    <div className="relative h-screen">
      <Head>
        <title>Next Wallet</title>
      </Head>

      <main>
        <h1 className="text-3xl font-bold underline">Welcome to Next Wallet</h1>
        <button onClick={onGetTransactions}>Refresh</button>
        <ul>
          {transactions?.map((t) => (
            <p key={t.id}>{JSON.stringify(t)}</p>
          ))}
        </ul>
      </main>

      <footer className="absolute bottom-0 w-full text-center">
        Next Wallet © All Rights Reserved 2022
      </footer>
    </div>
  );
}

function useTransaction() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const onGetTransactions = useCallback(
    async () => void setTransactions(await getTransactions()),
    []
  );
  return { transactions, onGetTransactions };
}

async function getTransactions(): Promise<Transaction[]> {
  return (await axios.get("/api/transaction")).data;
}
