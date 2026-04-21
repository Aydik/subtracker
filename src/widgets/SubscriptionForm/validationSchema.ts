import * as yup from 'yup';

export const subscriptionSchema = yup.object({
  serviceId: yup.string().required('Выберите сервис'),
  amount: yup
    .number()
    .required('Введите сумму')
    .positive('Введите положительное число')
    .max(99999, 'Сумма не может превышать 99999'),
  timeToPay: yup.string().required('Выберите дату'),
});
