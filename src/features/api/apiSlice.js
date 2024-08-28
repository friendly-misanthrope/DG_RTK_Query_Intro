import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
  endpoints: (builder) => ({
    getToDos: builder.query({
      query: () => 'todos'
    }),
    addToDo: builder.mutation({
      query: (toDo) => ({
        url:'/todos',
        method: 'POST',
        body: toDo
      })
    })
  })
});

export const { useGetToDosQuery } = apiSlice;