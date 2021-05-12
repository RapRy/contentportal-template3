import axios from 'axios'

const url = "https://port-template-2.herokuapp.com";

export const fetchCategories = (cat) => axios.get(`${url}/categories/${cat}`)
export const fetchContents = (subcat, cat) => axios.get(`${url}/contents/${cat}/${subcat}`)
export const fetchDatails = (id) => axios.get(`${url}/contents/${id}`)