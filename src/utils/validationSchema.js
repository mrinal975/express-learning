export const validationSchema = {
  email: {
    notEmpty: true,
    errorMessage: "Email is required",
    isEmail: true,
    errorMessage: "Email is not valid",
  },
  username: {
    notEmpty: {
      errorMessage: "Username is required",
    },
    isString: {
      errorMessage: "Username must be a string",
    },
    isLength: {
      options: {
        min: 3,
        max: 20,
      },
      errorMessage: "Username must be between 3 and 20 characters",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "password is required",
    },
  },
};
