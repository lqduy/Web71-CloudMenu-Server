import * as yup from 'yup';

const signupSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
      'Password must contain at least one number and one special character'
    )
    .min(8, 'Password must be at least 8 characters long'),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phoneNumber: yup.string().optional(),
  gender: yup.string().oneOf(['male', 'female', 'other']).required()
});

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required()
});

const AuthValidator = {
  signupSchema,
  loginSchema
};

export default AuthValidator;
