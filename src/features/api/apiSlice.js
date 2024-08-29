import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getToDos: builder.query({
      query: () => 'todos',
      providesTags: ['Todos']
    }),
    addToDo: builder.mutation({
      query: (toDo) => ({
        url:'/todos',
        method: 'POST',
        body: toDo
      }),
      invalidatesTags: ['Todos']
    }),
    updateToDo: builder.mutation({
      query: (toDo) => ({
        url: `/todos/${toDo.id}`,
        method: 'PATCH',
        body: toDo
      }),
      invalidatesTags: ['Todos']
    }),
    deleteToDo: builder.mutation({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
        body: id
      }),
      invalidatesTags: ['Todos']
    })
  })
});

export const {
  useGetToDosQuery,
  useAddToDoMutation,
  useUpdateToDoMutation,
  useDeleteToDoMutation
} = apiSlice;