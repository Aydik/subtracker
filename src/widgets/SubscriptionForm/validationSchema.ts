import { t } from 'i18next';
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
      .typeError(t('validation.numberTypeError'))
      .required(t('validation.required'))
      .positive(t('validation.positive'))
      .max(99999, t('validation.max', { max: 99999 })),
    timeToPay: yup.string().required(t('validation.required')),
    isCustom: yup.boolean().required().default(false),
    paymentMethod: yup.string().optional(),

    isMonth: yup.boolean().required().default(true),

    // Стандартные сервисы
    serviceId: isCreate
      ? yup.string().when('isCustom', {
          is: false,
          then: (schema) => schema.required(t('validation.required')),
          otherwise: (schema) => schema.optional(),
        })
      : yup.string().optional(),
    // Кастомная подписка
    serviceName: isCreate
      ? yup.string().when('isCustom', {
          is: true,
          then: (schema) => schema.required(t('validation.required')),
          otherwise: (schema) => schema.optional(),
        })
      : yup.string().optional(),
    categoryId: isCreate
      ? yup.number().when('isCustom', {
          is: true,
          then: (schema) => schema.required(t('validation.required')),
          otherwise: (schema) => schema.optional(),
        })
      : yup.number().optional(),
  });
