import axios from 'axios'

const API_URL = 'http://localhost:3001/api' 

export const getExpenses = async () => {
  const response = await axios.get(`${API_URL}/expenses`)
  return response.data
}

export const createExpense = async (expenseData) => {
  const response = await axios.post(`${API_URL}/expenses`, expenseData)
  return response.data
}

export const updateExpense = async (id, expenseData) => {
  const response = await axios.put(`${API_URL}/expenses/${id}`, expenseData)
  return response.data
}

export const deleteExpense = async (id) => {
  await axios.delete(`${API_URL}/expenses/${id}`)
}