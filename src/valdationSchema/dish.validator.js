import * as yup from 'yup';

export const dishSchema = yup.object().shape({
  name: yup.string().required(),
  userId: yup.string().required(),
  pageId: yup.string().required(),
  description: yup.string().optional(),
  images: yup.array().optional(),
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

const dishValidator = {
  dishSchema
};

export default dishValidator;
