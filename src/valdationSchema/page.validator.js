import * as yup from 'yup';

const pageSchema = yup.object().shape({
  brandName: yup.string().required(),
  businessType: yup.string().required(),
  isVegetarian: yup.boolean().required(),
  hasAlcoholic: yup.boolean().required(),
  orderWays: yup.string().required(),
  address: yup.string().required(),
  province: yup.string().required(),
  district: yup.string().required(),
  ward: yup.string().required(),
  phoneNumber: yup.number().required(),
  email: yup.string().email().required()
});

export default pageSchema;
