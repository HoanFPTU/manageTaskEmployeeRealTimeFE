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
export const APIGetAccessCodeEmployee = (email) =>
  api.post("loginEmail", { email });
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
export const APIGetTaskByID = (taskId) => api.post("getTaskById", { taskId });
export const APIDeleteTaskByID = (taskId) =>
  api.post("deleteTaskById", { taskId });
