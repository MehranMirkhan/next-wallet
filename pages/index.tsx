import { useCallback, useEffect, useReducer, useState } from "react";
import { Transaction } from "@prisma/client";
import Head from "next/head";
import axios from "axios";

import CrudTable from "components/CrudTable";
import Layout, { Footer } from "components/Layout";

export default function Home() {
  const { transactions, onGetTransactions } = useTransaction();
  return (
    <Layout>
      <Head>
        <title>Next Wallet</title>
      </Head>

      <main>
        <h1 className="text-3xl font-bold underline">Welcome to Next Wallet</h1>
        <TransactionForm />
        <button onClick={onGetTransactions}>Refresh</button>
        <CrudTable
          columns={[
            { title: "From Wallet", key: "fromWalletId" },
            { title: "To Wallet", key: "toWalletId" },
            { title: "Amount", key: "amount" },
          ]}
          data={transactions}
          onDelete={deleteTransaction}
        />
      </main>

      <Footer>Next Wallet © All Rights Reserved 2022</Footer>
    </Layout>
  );
}

function transactionFormReducer(state, event) {
  if (!event) return {};
  return {
    ...state,
    [event.target.name]: Number(event.target.value),
  };
}

function TransactionForm() {
  const [formData, setFormData] = useReducer(transactionFormReducer, {});
  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      await createTransaction(formData);
      setFormData(null);
    },
    [formData]
  );

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="fromWalletId"
        placeholder="Source Wallet Id"
        value={formData.fromWalletId}
        onChange={setFormData}
      />
      <input
        type="text"
        name="toWalletId"
        placeholder="Destination Wallet Id"
        value={formData.toWalletId}
        onChange={setFormData}
      />
      <input
        type="text"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={setFormData}
      />
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
  useEffect(() => void onGetTransactions(), [onGetTransactions]);

  return { transactions, onGetTransactions };
}

async function getTransactions(): Promise<Transaction[]> {
  return (await axios.get("/api/transaction")).data;
}

async function createTransaction(data: Transaction): Promise<Transaction[]> {
  return (await axios.post("/api/transaction", data)).data;
}

async function deleteTransaction(id: string | number) {
  axios.delete(`/api/transaction/${id}`);
}
