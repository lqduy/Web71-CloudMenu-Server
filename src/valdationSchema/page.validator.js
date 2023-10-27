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
  avatar: yup.array().max(1).required(),
  phoneNumber: yup.number().required(),
  email: yup.string().email().optional(),
  userId: yup.string().required(),
  activeMenuId: yup.string().nullable().optional(),
  themeColor: yup.string().nullable().optional()
});

const applyMenuSchema = yup.string().required();

const pageValidator = {
  pageSchema,
  applyMenuSchema
};

export default pageValidator;
