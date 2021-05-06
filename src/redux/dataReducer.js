import { createSlice } from '@reduxjs/toolkit'

export const dataReducerSlice = createSlice({
    name: "dataReducer",
    initialState:{
        data: []
    },
    reducers: {
        getData: (state, action) => {
            state.data.push(action.payload)
        }
    }
})

export const { getData } = dataReducerSlice.actions

export default dataReducerSlice.reducer