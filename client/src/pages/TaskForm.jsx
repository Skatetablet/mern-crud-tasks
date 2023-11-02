import {Form, Formik} from "formik" 
import { useTasks } from "../context/TaskContext"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

function TaskForm() {
  const {createTask, getTask, updateTask} = useTasks()
  const params = useParams()
  const navigate = useNavigate();
  const initialState = {title: "", description: ""}
  const [task, setTask] = useState(initialState)

  
  

  useEffect(() => {
    const loadTask = async() => {
      if(params.id) {
        const task = await getTask(params.id)
        setTask({
          title: task.title,
          description: task.description
        })
        console.log(task);
      } 
    }
    loadTask();
  }, [])
  
  console.log(task);

  return (
    <div >
      <Formik initialValues={task}  enableReinitialize={true} onSubmit={async(values, actions) => {
        console.log(values)
        if (params.id) {
          await updateTask(params.id, values)
          navigate("/")
        } else {
          await createTask(values)
          navigate("/")
        }
        actions.resetForm()
        }}>
        {({handleChange, handleSubmit, values, isSubmitting}) => (
          <Form onSubmit={handleSubmit} className="bg-slate-200 max-width-sm rounded-md p-4 mx-auto mt-10">
            <h1 className="text-xl font-bold uppercase text-center">{params.id ? "Edit Task" : "New Task"}</h1>
            <label className="blocl">Title</label>
            <input className="px-2 py-1 rounded-sm w-full" type="text" name="title" onChange={handleChange} value={values.title || ""} placeholder="Write a title"/>
            <label className="blocl">Description</label>
            <textarea className="px-2 py-1 rounded-sm w-full" name="description" rows="3" placeholder="Write a description" onChange={handleChange} value={values.description || ""}></textarea>
            <button className="block bg-indigo-500 px-2 py-1 text-white w-full rounded-md" type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." :  "Save"}</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default TaskForm
