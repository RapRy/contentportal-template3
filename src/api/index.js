import axios from 'axios'

const url = "http://localhost:5000";

export const fetchCategories = () => axios.get(`${url}/categories/Games`)