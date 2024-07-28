const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message("password must be at least 8 characters");
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message(
      "password must contain at least 1 letter and 1 number"
    );
  }
  return value;
};

const role = (value, helpers) => {
  if (value !== "admin" && value !== "user" && value !== "buyer") {
    return helpers.message("role must be either 'admin' or 'user' or 'buyer'");
  }
  return value;
};

module.exports = {
  password,
  role,
};
