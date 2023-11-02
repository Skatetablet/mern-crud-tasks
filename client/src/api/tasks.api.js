import axios from "axios"

export const getTasksRequest = async() => {
    return await axios.get("https://mern-tasks-crud.onrender.com/tasks")
}

export const createTaskRequest = async(task) => {
    return await axios.post("https://mern-tasks-crud.onrender.com/tasks", task)
}

export const deleteTaskRequest = async(id) => {
    return await axios.delete(`https://mern-tasks-crud.onrender.com/tasks/${id}`)
}

export const getTaskRequest = async(id) => {
    return await axios.get(`https://mern-tasks-crud.onrender.com/${id}`)
}

export const updateTaskRequest = async(id, newFields) => {
    return await axios.put(`https://mern-tasks-crud.onrender.com/${id}`, newFields)
}

export const toggleTaskDoneRequest = async(id, done) => {
    return await axios.put(`https://mern-tasks-crud.onrender.com/${id}`, {done,})
}