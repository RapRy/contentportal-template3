import { createSlice } from '@reduxjs/toolkit'

export const dataReducerSlice = createSlice({
    name: "dataReducer",
    initialState:{
        data: [],
    },
    reducers: {
        getCategories: (state, action) => {
            const addedData = { cardRef: "category", 
                customStyles: {
                    zindex: "1",
                    width: "100",
                    left: "0",
                    top: "0"
                }
            }
            const newData = { ...action.payload, ...addedData}
            state.data = [newData]
        },
        getContents: (state, action) => {
            state.data[0].customStyles.width = "92"
            state.data[0].customStyles.left = "4"
            console.log(action.payload)    
        }
    }
})

export const { getCategories, getContents } = dataReducerSlice.actions

export default dataReducerSlice.reducer