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
                    top: "10"
                }
            }
            const newData = { ...action.payload, ...addedData}
            state.data = [newData]
        },
        getContents: (state, action) => {
            state.data[0].customStyles.width = "92"
            state.data[0].customStyles.left = "4"
            state.data[0].customStyles.top = "0"
           
            const addedData = { cardRef: "contents",
                customStyles: {
                    zindex: "2",
                    width: "100",
                    left: "0",
                    top: "10"
                }
            }

            const newData = { ...action.payload, ...addedData }

            state.data.push(newData)
        },
        removeContents: (state) => {
            state.data[0].customStyles.width = "100"
            state.data[0].customStyles.left = "0"
            state.data[0].customStyles.top = "10"
            state.data.pop()
        }
    }
})

export const { getCategories, getContents, removeContents } = dataReducerSlice.actions

export default dataReducerSlice.reducer