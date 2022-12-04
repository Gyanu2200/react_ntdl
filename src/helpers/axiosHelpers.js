import axios from "axios";

const rootAPIUrl = "http://localhost:8000/api/v1";
const taskEp = rootAPIUrl + "/task";

export const fetchAllTask = async () => {
  try {
    const { data } = await axios.get(taskEp);
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const postTask = async (taskDt) => {
  try {
    const { data } = await axios.post(taskEp, taskDt);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const updateTask = async (datObj) => {
  try {
    const { data } = await axios.patch(taskEp, datObj);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const deleteTask = async (idArg) => {
  try {
    const { data } = await axios.delete(taskEp, {data:idArg});
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
