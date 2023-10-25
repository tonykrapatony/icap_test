import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const queryApi = createApi({
    reducerPath: 'queryApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://technical-task-api.icapgroupgmbh.com/' }),
    endpoints: (build) => ({
        loginUser: build.mutation({
            query: (body) => ({
                url: `api/login/`,
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body,  
            })
        }),
        getTable: build.query({
            query: (get) => (`api/table/${get}`)
        }),
        addToTable: build.mutation({
            query: (body) => ({
                url: `api/table/`,
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body,  
            })
        }),
        deleteData: build.mutation({
            query: (id) => ({
                url: `api/table/${id}/`,
                method: 'DELETE',
            })
        }),
        updateDataPUT: build.mutation({
            query({ id, newData }) {
                console.log('id', id)
                console.log('body', newData)
                return {
                    url: `api/table/${id}/`,
                    method: 'PUT',
                    body: newData,
                }
            }
        }),
        updateDataPATCH: build.mutation({
            query({ id, newData }) {
                console.log('id', id)
                console.log('body', newData)
                return {
                    url: `api/table/${id}/`,
                    method: 'PATCH',
                    body: newData,
                }
            }
        })
    })
})

export const { useLoginUserMutation, useGetTableQuery, useAddToTableMutation, useDeleteDataMutation, useUpdateDataPUTMutation, useUpdateDataPATCHMutation } = queryApi;