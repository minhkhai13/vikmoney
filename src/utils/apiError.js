// This file is used to create custom error messages for the API
// The error messages are created in the following format:
// errorCode + 3-digit error code + (message, data)
// The message is a string that describes the error
// The data is an object that contains additional information about the error
// The error codes are used to identify the type of error that occurred
// The error codes are as follows:

// errorCode invalid format
// 1xx: General error
const errorCode10 = (message, data = null) => {
  return { errorcode: 10, message: message, data: data };
};

//User
// 100: General error accout is not active
const errorCode100 = () => {
  return { errorcode: 100, message: "Account is not active", data: null };
};
// 101: General error account is not found
const errorCode101 = () => {
  return {
    errorcode: 101,
    message: "Incorrect login name or password",
    data: null,
  };
};
// 102: General error account is blocked

const errorCode102 = () => {
  return { errorcode: 102, message: "Account is blocked", data: null };
};

// 201 token is not found
const errorCode201 = () => {
  return { errorcode: 201, message: "Token is not found", data: null };
};

// 202 token is expired
const errorCode202 = () => {
  return { errorcode: 202, message: "Token is expired", data: null };
};
// 203 token is invalid
const errorCode203 = () => {
  return { errorcode: 203, message: "Token is invalid", data: null };
};

const errorCode204 = () => {
  return { errorcode: 204, message: "User not found", data: null };
};
const errorCode205 = () => {
  return { errorcode: 205, message: "Email already exists", data: null };
};
// error database
// 310
// Lỗi data base
const errorCode310 = (message) => {
  return { errorcode: 310, message: message, data: null };
};
// Lỗi unique
const errorCode311 = (message) => {
  return { errorcode: 311, message: message, data: null };
};

const errorCode401 = () => {
  return { errorcode: 401, message: "Unauthorized", data: null };
};

const errorCode403 = (message = null, data = null) => {
  return { errorcode: 403, message: message, data: data };
};
const errorCode200 = (message, data = null) => {
  return { errorcode: 200, message: message, data: data };
};
const errorCode500 = (message, data) => {
  return { errorcode: 500, message: message, data: data };
};
const errorCode404 = (message, data) => {
  return { errorcode: 404, message: message, data: data };
};
const errorCode422 = (message, data) => {
  return { errorcode: 422, message: message, data: data };
};
const errorCode405 = (message, data) => {
  return { errorcode: 405, message: message, data: data };
};
const errorCode409 = (message, data) => {
  return { errorcode: 409, message: message, data: data };
};
const errorCode413 = (message, data) => {
  return { errorcode: 413, message: message, data: data };
};
const errorCode415 = (message, data) => {
  return { errorcode: 415, message: message, data: data };
};
const errorCode429 = (message, data) => {
  return { errorcode: 429, message: message, data: data };
};

//domain
const errorCode600 = (message, data = null) => {
  return { errorcode: 600, message: message, data: data };
};
const errorCode601 = () => {
  return { errorcode: 601, message: "Domain is exist", data: null };
};
const errorCode602 = () => {
  return { errorcode: 601, message: "Domain isn't exist", data: null };
};

module.exports = {
  errorCode10,
  errorCode100,
  errorCode101,
  errorCode102,
  errorCode201,
  errorCode202,
  errorCode203,
  errorCode204,
  errorCode205,
  errorCode310,
  errorCode311,
  errorCode401,
  errorCode403,
  errorCode200,
  errorCode500,
  errorCode404,
  errorCode422,
  errorCode405,
  errorCode409,
  errorCode413,
  errorCode415,
  errorCode429,
  errorCode600,
  errorCode601,
  errorCode602,
};
