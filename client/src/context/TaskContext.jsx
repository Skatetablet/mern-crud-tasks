import { createContext, useContext } from "react";  
import { useState } from "react";
import { getTasksRequest, deleteTaskRequest, createTaskRequest, getTaskRequest, updateTaskRequest, toggleTaskDoneRequest } from "../api/tasks.api";


export const TaskContext = createContext()

export const useTasks = () => {
    const context = useContext(TaskContext)
    if(!context) {
        throw new Error("useTasks must be use within TaskContextProvider")
    }
    return context
}

export const TaskContextProvider = ({children}) => {
    const [tasks, setTasks] = useState([])
    const loadTask = async() => {
        const response = await getTasksRequest()
        setTasks(response.data);
    }

    const deleteTask = async(id) => {
        try {
          await deleteTaskRequest(id)
          setTasks(tasks.filter(task => task.id !== id))
        } catch (error) {
          console.log(error);
        }
    }

    const createTask = async(task) => {
        try {
            const response = await createTaskRequest(task)
            console.log(response);
          } catch (error) {
            console.log(error);
          }
    }

    const getTask = async(id) => {
        try {
            const response = await getTaskRequest(id)
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    const updateTask = async(id, newFields) => {
        try {
            const response = await updateTaskRequest(id, newFields)
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const toggleTaskDone = async(id) => {
        try {
            
            const taskFound = tasks.find((task) => task.id === id)
            console.log(taskFound);
            await toggleTaskDoneRequest(id, taskFound.done == 0 ? true : false)
            setTasks(tasks.map((task) => (task.id === id ? task.done = task.done === 0 ? 1 : 0 : task.done)))
            setTasks([...tasks])
        } catch (error) {
            console.log(error);
        }
    }
    return <TaskContext.Provider value={{tasks, loadTask, deleteTask, createTask, getTask, updateTask, toggleTaskDone}}>{children}</TaskContext.Provider>
}