import * as yup from 'yup';

const pageSchema = yup.object().shape({
  name: yup.string().required(),
  businessType: yup.string().required(),
  isVegetarian: yup.boolean().required(),
  hasAlcoholic: yup.boolean().required(),
  orderWays: yup.array().min(1).required(),
  address: yup.string().required(),
  province: yup.string().required(),
  district: yup.string().required(),
  ward: yup.string().required(),
  phoneNumber: yup.number().required(),
  email: yup.string().email().required(),
  userId: yup.string().required()
});

export default pageSchema;
