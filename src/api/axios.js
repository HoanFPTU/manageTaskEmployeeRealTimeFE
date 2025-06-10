import api from "./configApi";

// user (owner)
export const APIGetAccessCode = (phoneNumber) =>
  api.post("getAccessCode", { phoneNumber: phoneNumber });
export const APIValidateCode = (phoneNumber, accessCode) =>
  api.post("validateAccessCode", { phoneNumber, accessCode });

// employee
export const APIGetAccessCodeEmployee = (email) =>
  api.post("loginEmail", { email });
export const APIValidateCodeEmployee = (email, accessCode) =>
  api.post("validateAccessCodeEmail", { email, accessCode });
