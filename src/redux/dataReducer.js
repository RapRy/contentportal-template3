import { createSlice } from '@reduxjs/toolkit'

export const dataReducerSlice = createSlice({
    name: "dataReducer",
    initialState:{
        data: [],
    },
    reducers: {
        getCategories: (state, action) => {
            const addedData = { object1: "1", cardRef: "category", 
                customStyles: {
                    zindex: "1",
                    width: "100",
                    left: "4",
                    top: "0"
                }
            }
            const newData = { ...action.payload, ...addedData}
            state.data = [newData]
        },
        getContents: (state, action) => {
            
        }
    }
})

export const { getCategories, getContents } = dataReducerSlice.actions

export default dataReducerSlice.reducer