import * as yup from 'yup';

const createSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().optional(),
  group: yup.string().required(),
  origin: yup.string().required(),
  type: yup.string().required(),
  preOrder: yup.boolean().required(),
  unit: yup.string().required(),
  price: yup.number().required()
});

const dishValidator = {
  createSchema
};

export default dishValidator;
