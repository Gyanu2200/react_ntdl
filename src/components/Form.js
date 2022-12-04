import React, { useState } from "react";

export const Form = ({ addTask, name }) => {
  const [form, setForm] = useState({ type: "entry" });

  const handleOnChange = (e) => {
    const { value, name } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    addTask(form);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="row mt-3 g-2">
        <div className="col-md-6">
          <input
            name="task"
            type="text"
            className="form-control"
            placeholder=""
            required
            onChange={handleOnChange}
          />
        </div>
        <div className="col-md-3">
          <input
            name="hr"
            type="number"
            className="form-control"
            min="1"
            placeholder=""
            required
            onChange={handleOnChange}
          />
        </div>
        <div className="col-md-3 d-grid gap-2">
          <button className="btn btn-primary" type="submit">
            <i className="fa-solid fa-plus"></i>
            Add New Task
          </button>
        </div>
      </div>
    </form>
  );
};
