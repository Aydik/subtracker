import type { FC } from 'react';
import { App, Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/index.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginUserSchema } from '@features/auth/validationSchema.ts';
import type { UserLoginRequest } from '@src/api/models';
import type { AxiosError } from 'axios';
import type { ApiErrorResponse } from '@shared/types/apiTypes.ts';
import { useLoginMutation } from '@src/store/api/services/userService.ts';

export interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginForm: FC = () => {
  const { message } = App.useApp();

  const navigate = useNavigate();

  const { control, handleSubmit, setError } = useForm<LoginFormValues>({
    resolver: yupResolver(loginUserSchema),
    mode: 'onChange',
  });

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (values: LoginFormValues) => {
    const requestData: UserLoginRequest = {
      email: values.email,
      password: values.password,
    };

    try {
      await login(requestData).unwrap();

      message.destroy();
      message.success('Вы успешно вошли в аккаунт!');
      navigate('/home');
    } catch (err: unknown) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      const error = axiosError?.response?.data?.error;

      if (error === 'Forbidden') {
        setError('password', {
          message: 'Неверный email или пароль',
        });
      } else {
        message.destroy();
        message.error('Ошибка авторизации');
      }
    }
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)} className={styles.form} size="large">
      <h1 className={styles.title}>Вход</h1>
      <div className={styles.fields}>
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
      </div>

      <div className={styles.actions}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Войти
        </Button>
        <Link to="/auth/register" className={styles.link}>
          Создать аккаунт
        </Link>
      </div>
    </Form>
  );
};
