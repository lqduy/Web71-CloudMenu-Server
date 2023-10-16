import * as yup from 'yup';

const itemSchema = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  description: yup.string().optional(),
  images: yup.array().min(1).optional(),
  group: yup.string().required(),
  origin: yup.string().required(),
  type: yup.string().required(),
  preOrder: yup.boolean().required(),
  sku: yup
    .string()
    .matches(/^[a-zA-Z0-9]{4,12}$/, 'Invalid format')
    .required(),
  unit: yup.string().required(),
  price: yup.number().required(),
  note: yup.string().optional()
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
