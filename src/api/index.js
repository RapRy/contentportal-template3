import axios from 'axios'

const url = "http://localhost:5000";

export const fetchCategories = (cat) => axios.get(`${url}/categories/${cat}`)
export const fetchContents = (subcat) => axios.get(`${url}/contents/${subcat}`)