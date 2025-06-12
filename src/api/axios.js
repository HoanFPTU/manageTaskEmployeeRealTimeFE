import api from "./configApi";

// user (owner)
export const APIGetAccessCode = (phoneNumber) =>
  api.post("getAccessCode", { phoneNumber: phoneNumber });
export const APIValidateCode = (phoneNumber, accessCode) =>
  api.post("validateAccessCode", { phoneNumber, accessCode });
export const APIGetAllEmployee = () => api.post("getAllEmployee");
export const APIAddEmployee = (name, department, email) =>
  api.post("createEmployee", { name, department, email });
export const APIGetEmployeeByID = (employeeId) =>
  api.post("GetEmployeeById", { employeeId });
export const APIDeleteEmployeeByID = (employeeId) =>
  api.post("deleteEmployeeById", { employeeId });
// employee
export const APILoginEmployee = (username, password) =>
  api.post("loginEmployee", { username, password });
export const APIGetAccessCodeEmployee = (email) =>
  api.post("loginEmail", { email });
export const APIActiveAccount = (username, password, employeeId) =>
  api.post("activeAccount", { username, password, employeeId });
export const APIValidateCodeEmployee = (email, accessCode) =>
  api.post("validateAccessCodeEmail", { email, accessCode });
export const APIEditEmployeeByID = (employeeId, name, department) =>
  api.post("editEmployeeById", { employeeId, name, department });

//tasks
export const APIGetAllTask = () => api.post("getAllTasks");
export const APIAddTask = (name, description, employees) =>
  api.post("createTask", { name, description, employees });
export const APIEditTaskByID = (taskId, name, description, employees) =>
  api.post("editTaskById", { taskId, name, description, employees });
export const APIDoneTaskByID = (taskId) => api.post("doneTaskById", { taskId });
export const APIGetTaskByID = (taskId) => api.post("getTaskById", { taskId });
export const APIGetTaskUserId = (employeeId) =>
  api.post("getTaskByUserId", { employeeId });
export const APIDeleteTaskByID = (taskId) =>
  api.post("deleteTaskById", { taskId });
