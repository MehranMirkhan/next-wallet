import { Transaction } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const transactionsApi = createApi({
  reducerPath: "transactions",
  baseQuery: fetchBaseQuery({ baseUrl: "api/transaction" }),
  tagTypes: ["Wallet", "Transaction"],
  endpoints: (builder) => ({
    findAll: builder.query<Transaction[], void>({
      query: () => "",
      providesTags: [{ type: "Transaction", id: "LIST" }],
    }),
    create: builder.mutation<Transaction, Partial<Transaction>>({
      query: (data: Partial<Transaction>) => ({
        url: "",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Transaction", id: "LIST" }],
    }),
    remove: builder.mutation<void, number>({
      query: (id: number) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Transaction", id: "LIST" }],
    }),
  }),
});

export const { useFindAllQuery, useCreateMutation, useRemoveMutation } =
  transactionsApi;
