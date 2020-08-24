import React, { useState, useEffect } from "react";
import { generate } from "shortid";
import { toast } from "react-toastify";

import { configToastify } from "../helper/ToastifyCfg";

export const FormScreen = () => {

  const init = ()=>{
    return JSON.parse(localStorage.getItem('tasks')) || [];
  }

  const [nameTask, setNameTask] = useState("");
  const [infoTask, setInfoTask] = useState("");
  const [id, setId] = useState("");
  const [addTask, setAddTask] = useState(init);
  const [updateMode, setUpdateMode] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit =async(e) => {
    e.preventDefault();
    if (!nameTask.trim() || !infoTask.trim()) {
      setError(true);
      return;
    }
    toast.success("Task added successfully",configToastify);

    setAddTask([
      ...addTask,
      { id: generate(), name: nameTask, info: infoTask },
    ]);

    setError(false);
    setInfoTask("");
    setNameTask("");
  };
  
  useEffect(() => {
    localStorage.setItem('tasks',JSON.stringify(addTask))

  }, [addTask])


  const handleUpdate = (task) => {
    setNameTask(task.name);
    setInfoTask(task.info);
    setId(task.id);
    setUpdateMode(true);
  };

  const editTask = (e) => {
    e.preventDefault();
    if (!nameTask.trim() || !infoTask.trim()) {
      setError(true);
      return;
    }
    toast.info("Task updated successfully",configToastify);
    const arrayMap = addTask.map((task) =>
      task.id === id ? { id: id, name: nameTask, info: infoTask } : task
    );

    setAddTask(arrayMap);
    setUpdateMode(false);
    setInfoTask("");
    setNameTask("");
    setError(false);
  };

  const handleDelete = (id) => {
    toast.error("Task deleted successfully",configToastify);
    const arrayFilter = addTask.filter((task) => task.id !== id);
    setAddTask(arrayFilter);
  };

  return (
    <>
      <h1 className="text-center mt-5">Simple CRUD</h1>
      <form onSubmit={updateMode ? editTask : handleSubmit}>
        <div className="form-group">
          <label htmlFor="taskName">Task Name</label>
          <input
            type="text"
            id="taskName"
            className="form-control"
            placeholder="Please write the name of the task..."
            onChange={(e) => setNameTask(e.target.value)}
            value={nameTask}
          />
        </div>
        <div className="form-group">
          <label htmlFor="infoTask">Info Task</label>
          <input
            type="text"
            id="infoTask"
            className="form-control"
            placeholder="Please write the info..."
            onChange={(e) => setInfoTask(e.target.value)}
            value={infoTask}
          />
        </div>
        {updateMode ? (
          <button className="btn btn-info btn-block mt-2">Update</button>
        ) : (
          <button className="btn btn-success btn-block mt-2">Add</button>
        )}
        {error && (
          <div className="alert alert-danger mt-3">You have errors!</div>
        )}
      </form>

      {addTask.length >= 1 ? (
        <section className="mt-5">
          <h1 className="text-center">Task List</h1>
          <table className="table mt-2">
            <thead className="thead-dark">
              <tr>
                <th>Number</th>
                <th>Name</th>
                <th>Information</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {addTask.map((task, i) => (
                <tr key={task.id}>
                  <th>{i + 1}</th>
                  <th>{task.name}</th>
                  <th>{task.info}</th>
                  <th>
                    <div className="float-right">
                      <i
                        className="far fa-edit fa-2x text-info mr-2 btn-mod"
                        onClick={() => handleUpdate(task)}
                      ></i>
                      <i
                        className="far fa-trash-alt fa-2x text-danger btn-delete"
                        onClick={() => handleDelete(task.id)}
                      ></i>
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        <span className="col-md-4">Total task: {addTask.length}</span>
        </section>
      ) : (
        <h3 className="text-center mt-3">You not have tasks</h3>
      )}
    </>
  );
};
