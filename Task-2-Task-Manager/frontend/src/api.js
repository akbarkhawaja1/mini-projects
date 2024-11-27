import axios from "axios";

const BASE_URL = 'http://localhost:5001'

export const getTasks = () => axios.get(`${BASE_URL}/tasks`);
export const postTasks = (task) => axios.post(`${BASE_URL}/tasks`, task);
export const editTasks = (_id, task) => axios.put(`${BASE_URL}/tasks/${_id}`, task);
export const deleteTasks = (_id) => axios.delete(`${BASE_URL}/tasks/${_id}`);