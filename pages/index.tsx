import { useCallback, useEffect, useReducer, useState } from "react";
import { Transaction } from "@prisma/client";
import Head from "next/head";

import api from "api";
import { Layout, Footer, Gap, CrudTable } from "components";

export default function Home() {
  const { transactions, onGetTransactions } = useTransaction();
  return (
    <Layout>
      <Head>
        <title>Next Wallet</title>
      </Head>

      <main>
        <h1 className="text-3xl font-bold text-center">
          Welcome to Next Wallet
        </h1>
        <Gap />
        <TransactionForm />
        <Gap />
        <button className="btn mb-2" onClick={onGetTransactions}>
          Refresh
        </button>
        <CrudTable
          columns={[
            { title: "From Wallet", key: "fromWalletId" },
            { title: "To Wallet", key: "toWalletId" },
            { title: "Amount", key: "amount" },
          ]}
          data={transactions}
          onDelete={api.transaction.delete}
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
      await api.transaction.create(formData);
      setFormData(null);
    },
    [formData]
  );

  return (
    <form onSubmit={onSubmit} className="flex">
      <input
        type="text"
        className="mx-1"
        name="fromWalletId"
        placeholder="Source Wallet Id"
        value={formData.fromWalletId}
        onChange={setFormData}
      />
      <input
        type="text"
        className="mx-1"
        name="toWalletId"
        placeholder="Destination Wallet Id"
        value={formData.toWalletId}
        onChange={setFormData}
      />
      <input
        type="text"
        className="mx-1"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={setFormData}
      />
      <button className="btn" type="submit">
        Submit
      </button>
    </form>
  );
}

function useTransaction() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const onGetTransactions = useCallback(
    async () =>
      void setTransactions(
        await api.transaction.findAll().then((res) => res.data)
      ),
    []
  );
  useEffect(() => void onGetTransactions(), [onGetTransactions]);

  return { transactions, onGetTransactions };
}
