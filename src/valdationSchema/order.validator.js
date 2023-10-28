import * as yup from 'yup';

const createSchema = yup.object().shape({
  pageId: yup.string().required(),
  list: yup.array().min(1).required(),
  status: yup.string().required(),
  tableIndex: yup.number(),
  clientName: yup.string(),
  note: yup.string(),
  orderIndex: yup.number()
});

const orderValidator = {
  createSchema
};

export default orderValidator;
