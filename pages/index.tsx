import Head from "next/head";
import { Field, Form, Formik } from "formik";

import { Layout, Footer, Gap, CrudTable } from "components";
import {
  useFindAllQuery,
  useCreateMutation,
  useRemoveMutation,
} from "state/transactions";

export default function Home() {
  const {
    data: transactions,
    error: findAllTransactionsError,
    isLoading: findAllTransactionsLoading,
  } = useFindAllQuery();
  const [
    remove,
    { error: deleteTransactionError, isLoading: deleteTransactionLoading },
  ] = useRemoveMutation();
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
        <CrudTable
          columns={[
            { title: "From Wallet", key: "fromWalletId" },
            { title: "To Wallet", key: "toWalletId" },
            { title: "Amount", key: "amount" },
          ]}
          data={transactions ?? []}
          onDelete={(id) => remove(Number(id))}
        />
      </main>

      <Footer>Next Wallet © All Rights Reserved 2022</Footer>
    </Layout>
  );
}

function TransactionForm() {
  const [create, { error, isLoading }] = useCreateMutation();

  return (
    <Formik
      initialValues={{
        fromWalletId: "",
        toWalletId: "",
        amount: "",
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const trans = {};
        for (let key in values) trans[key] = Number(values[key]);
        await create(trans);
        resetForm();
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex">
          <Field
            type="text"
            className="mx-1"
            name="fromWalletId"
            placeholder="Source Wallet Id"
          />
          <Field
            type="text"
            className="mx-1"
            name="toWalletId"
            placeholder="Destination Wallet Id"
          />
          <Field
            type="text"
            className="mx-1"
            name="amount"
            placeholder="Amount"
          />
          <button className="btn" type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
