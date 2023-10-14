import * as yup from 'yup';
import { dishSchema } from './dish.validator.js';

const itemSchema = yup.object().shape({
  id: yup.string().required(),
  ...dishSchema
});

const typeSchema = yup.object().shape({
  id: yup.string().required(),
  value: yup.string().required(),
  dishList: yup.array().of(itemSchema).required()
});

const groupSchema = yup.object().shape({
  id: yup.string().required(),
  value: yup.string().required(),
  subGroup: yup.array().of(typeSchema).required()
});

const menuSchema = yup.array().of(groupSchema).required();

const menuValidator = {
  menuSchema
};

export default menuValidator;
