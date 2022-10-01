import Head from "next/head";
import axios from "axios";
import { Transaction } from "@prisma/client";
import { useCallback, useReducer, useState } from "react";

export default function Home() {
  const { transactions, onGetTransactions } = useTransaction();
  return (
    <div className="relative h-screen">
      <Head>
        <title>Next Wallet</title>
      </Head>

      <main>
        <h1 className="text-3xl font-bold underline">Welcome to Next Wallet</h1>
        <TransactionForm />
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

function transactionFormReducer(state, event) {
  return {
    ...state,
    [event.target.name]: Number(event.target.value),
  };
}

function TransactionForm() {
  const [formData, setFormData] = useReducer(transactionFormReducer, {});
  const onSubmit = useCallback(() => createTransaction(formData), [formData]);

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="fromWalletId" onChange={setFormData} />
      <input type="text" name="toWalletId" onChange={setFormData} />
      <input type="text" name="amount" onChange={setFormData} />
      <button type="submit">Submit</button>
    </form>
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

async function createTransaction(data: Transaction): Promise<Transaction[]> {
  return (await axios.post("/api/transaction", data)).data;
}
