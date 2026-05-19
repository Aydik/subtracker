import * as yup from 'yup';

export interface SubscriptionFormValues {
  amount: number;
  timeToPay: string;
  isMonth: boolean;
  paymentMethod?: string;

  isCustom: boolean;

  serviceId?: string;
  serviceName?: string;
  categoryId?: number;
}

export const getSubscriptionSchema = (
  isCreate: boolean,
): yup.ObjectSchema<SubscriptionFormValues> =>
  yup.object({
    amount: yup
      .number()
      .typeError('Введите корректное число')
      .required('Введите сумму')
      .positive('Введите положительное число')
      .max(99999, 'Сумма не может превышать 99999'),
    timeToPay: yup.string().required('Выберите дату'),
    isCustom: yup.boolean().required().default(false),
    paymentMethod: yup.string().optional(),

    isMonth: yup.boolean().required().default(true),

    // Стандартные сервисы
    serviceId: isCreate
      ? yup.string().when('isCustom', {
          is: false,
          then: (schema) => schema.required('Выберите сервис'),
          otherwise: (schema) => schema.optional(),
        })
      : yup.string().optional(),
    // Кастомная подписка
    serviceName: isCreate
      ? yup.string().when('isCustom', {
          is: true,
          then: (schema) => schema.required('Введите название сервис'),
          otherwise: (schema) => schema.optional(),
        })
      : yup.string().optional(),
    categoryId: isCreate
      ? yup.number().when('isCustom', {
          is: true,
          then: (schema) => schema.required('Выберите категорию'),
          otherwise: (schema) => schema.optional(),
        })
      : yup.number().optional(),
  });
