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
        removeContents: (state, action) => {
            state.data[action.payload - 1].customStyles.width = "100"
            state.data[action.payload - 1].customStyles.left = "0"
            state.data[action.payload - 1].customStyles.top = "10"
            state.data.pop()
        },
        getDetails: (state, action) => {
            state.data[1].customStyles.width = "92"
            state.data[1].customStyles.left = "4"
            state.data[1].customStyles.top = "0"

            const addedData = { cardRef: "details",
                customStyles: {
                    zindex: "3",
                    width: "100",
                    left: "0",
                    top: "10"
                }
            }

            const newData = { ...action.payload, ...addedData }

            state.data.push(newData)
        }
    }
})

export const { getCategories, getContents, removeContents, getDetails } = dataReducerSlice.actions

export default dataReducerSlice.reducer