import type { FC } from 'react';
import type { AxiosError } from 'axios';
import { App, Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/index.module.scss';
import type { UserRegistrationRequest } from '@src/api/models';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerUserSchema } from '@features/auth/validationSchema.ts';
import type { ApiErrorResponse } from '@shared/types/apiTypes.ts';
import { useRegisterMutation } from '@src/store/api/services/userService.ts';

export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm: FC = () => {
  const { message } = App.useApp();

  const navigate = useNavigate();

  const { control, handleSubmit, setError } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerUserSchema),
    mode: 'onChange',
  });

  const [register, { isLoading }] = useRegisterMutation();

  const onSubmit = async (values: RegisterFormValues) => {
    const requestData: UserRegistrationRequest = {
      username: values.username,
      email: values.email,
      password: values.password,
    };

    try {
      await register(requestData).unwrap();

      message.destroy();
      message.success('Аккаунт успешно создан!');
      navigate('/home');
    } catch (err: unknown) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      const error = axiosError?.response?.data?.error;

      if (error === 'UsernameNotUniqueException') {
        setError('username', {
          message: 'Имя пользователя занято',
        });
      } else if (error === 'EmailNotUniqueException') {
        setError('email', {
          message: 'Email используется другим пользователем',
        });
      } else {
        message.destroy();
        message.error('Ошибка при регистрации');
      }
    }
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)} className={styles.form} size="large">
      <h1 className={styles.title}>Регистрация</h1>
      <div className={styles.fields}>
        <Controller
          name="username"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Form.Item
              label="Имя пользователя"
              validateStatus={error ? 'error' : ''}
              help={error?.message}
            >
              <Input
                value={field.value}
                onChange={field.onChange}
                placeholder="Введите имя пользователя"
              />
            </Form.Item>
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Form.Item label="Почта" validateStatus={error ? 'error' : ''} help={error?.message}>
              <Input
                value={field.value}
                onChange={field.onChange}
                placeholder="Введите вашу почту"
              />
            </Form.Item>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Form.Item label="Пароль" validateStatus={error ? 'error' : ''} help={error?.message}>
              <Input.Password
                value={field.value}
                onChange={field.onChange}
                placeholder="Введите ваш пароль"
              />
            </Form.Item>
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Form.Item
              label="Повторите пароль"
              validateStatus={error ? 'error' : ''}
              help={error?.message}
            >
              <Input.Password
                value={field.value}
                onChange={field.onChange}
                placeholder="Повторите ваш пароль"
              />
            </Form.Item>
          )}
        />
      </div>

      <div className={styles.actions}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Создать аккаунт
        </Button>
        <Link to="/auth/login" className={styles.link}>
          Уже есть аккаунт? Войти
        </Link>
      </div>
    </Form>
  );
};
