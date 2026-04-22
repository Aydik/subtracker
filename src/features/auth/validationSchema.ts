import * as yup from 'yup';

const passwordErrorMessages = {
  required: 'Введите пароль',
  length: 'Минимум 8 символов',
  uppercase: 'Нужна хотя бы одна заглавная буква',
  digit: 'Нужна хотя бы одна цифра',
  matches: 'Пароль содержит недопустимые символы',
};

export const loginUserSchema = yup.object({
  email: yup
    .string()
    .required('Введите email')
    .email('Неверный формат email')
    .matches(/^[^\s@]+@[^\s@]+\.[A-Za-z]+$/, 'Неверный формат email'),
  password: yup.string().required(passwordErrorMessages.required),
});

export const registerUserSchema = loginUserSchema.shape({
  username: yup
    .string()
    .required('Введите имя пользователя')
    .matches(/^[A-Za-z0-9]+$/, 'Только латинские буквы и цифры')
    .min(3, 'Минимум 3 символа')
    .max(20, 'Максимум 20 символов'),
  password: yup
    .string()
    .required(passwordErrorMessages.required)
    .min(8, passwordErrorMessages.length)
    .matches(/[A-Z]/, passwordErrorMessages.uppercase)
    .matches(/\d/, passwordErrorMessages.digit)
    .matches(/^\S+$/, passwordErrorMessages.matches),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
    .required('Подтверждение пароля обязательно'),
});
