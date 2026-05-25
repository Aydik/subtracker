import { t } from 'i18next';
import * as yup from 'yup';

const passwordErrorMessages = {
  required: t('validation.passwordRequired'),
  length: t('validation.passwordMinLength'),
  uppercase: t('validation.passwordUppercase'),
  digit: t('validation.passwordDigit'),
  matches: t('validation.passwordInvalidChars'),
};

export const loginUserSchema = yup.object({
  email: yup
    .string()
    .required(t('validation.emailRequired'))
    .email(t('validation.emailInvalid'))
    .matches(/^[^\s@]+@[^\s@]+\.[A-Za-z]+$/, t('validation.emailInvalid')),
  password: yup.string().required(passwordErrorMessages.required),
});

export const registerUserSchema = loginUserSchema.shape({
  username: yup
    .string()
    .required(t('validation.usernameRequired'))
    .matches(/^[A-Za-z0-9]+$/, t('validation.usernameLatinOnly'))
    .min(3, t('validation.usernameMinLength'))
    .max(20, t('validation.usernameMaxLength')),
  password: yup
    .string()
    .required(passwordErrorMessages.required)
    .min(8, passwordErrorMessages.length)
    .matches(/[A-Z]/, passwordErrorMessages.uppercase)
    .matches(/\d/, passwordErrorMessages.digit)
    .matches(/^\S+$/, passwordErrorMessages.matches),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], t('validation.passwordMismatch'))
    .required(t('validation.confirmPasswordRequired')),
});
