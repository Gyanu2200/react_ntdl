import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Title } from "./components/Title";
import { Form } from "./components/Form";
import { ListArea } from "./components/ListArea";
import { useEffect, useState } from "react";
import {
  deleteTask,
  fetchAllTask,
  postTask,
  updateTask,
} from "./helpers/axiosHelpers";

const herPerWek = 7 * 24;

function App() {
  const [taskList, setTaskList] = useState([]);
  const [itmToDelete, setItmToDelete] = useState([]);
  const [response, setResponse] = useState({});
  const [isAllSelected, setIsAllSelected] = useState(false);

  const totalHrs = taskList.reduce((subTtl, item) => subTtl + +item.hr, 0);

  useEffect(() => {
    getTasks();
  }, []);

  // call axios to feth all data
  const getTasks = async () => {
    const { status, tasks } = await fetchAllTask();
    status === "success" && setTaskList(tasks);
  };

  const handleOnAllClick = (e) => {
    const { checked } = e.target;

    if (checked) {
      setIsAllSelected(true);
      setItmToDelete(
        taskList.map((item, i) => {
          return item._id;
        })
      );
    } else {
      setItmToDelete([]);
      setIsAllSelected(false);
    }
  };

  const addTask = async (data) => {
    if (herPerWek < totalHrs + +data.hr) {
      return alert("Boss, you don't ecought time, sorry la");
    }
    // send data to the api
    const result = await postTask(data);
    console.log(result);

    result?.status === "success" && getTasks();
    setResponse(result);
  };

  const switchTask = async (_id, type) => {
    const result = await updateTask({ _id, type });
    setResponse(result);

    result?.status === "success" && getTasks();
  };

  const handleOnSelect = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setItmToDelete([...itmToDelete, value]);
      setIsAllSelected(taskList.length === itmToDelete.length + 1);
    } else {
      setItmToDelete(itmToDelete.filter((item) => item !== value));
      setIsAllSelected(false);
    }
  };

  const handleOnDelete = async () => {
    if (!window.confirm("Are you sure you want to delete?")) {
      return;
    }

    // setTaskList(taskList.filter((item) => !itmToDelete.includes(item._id)));
    const result = await deleteTask(itmToDelete);
    console.log(result);
    setResponse(result);
    setItmToDelete([]);
    result.status === "success" && getTasks();

    setItmToDelete([]);
  };

  return (
    <div className="wrapper">
      <div className="container">
        <Title />

        {response.message && (
          <div
            className={
              response.status === "success"
                ? "alert alert-success"
                : "alert alert-danger"
            }
          >
            {response.message}
          </div>
        )}
        <Form addTask={addTask} name="Sam" />

        <ListArea
          taskList={taskList}
          switchTask={switchTask}
          handleOnSelect={handleOnSelect}
          itmToDelete={itmToDelete}
        />

        {taskList.length > 0 ? (
          <div className="fw-bolder py-4">
            <input
              type="checkbox"
              className="form-check-input"
              onChange={handleOnAllClick}
              checked={isAllSelected}
            />
            <label htmlFor="">Select All the Tasks</label>
          </div>
        ) : null}

        <div className="row fw-bold">
          <div className="col">
            The total hours allocated = {totalHrs}
            Hrs
          </div>
        </div>
        {itmToDelete.length > 0 && (
          <div className="d-grid g-2">
            <button onClick={handleOnDelete} className="btn btn-danger">
              Delete selected {itmToDelete.length} Task(s)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
