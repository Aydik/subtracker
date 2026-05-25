import { yupResolver } from '@hookform/resolvers/yup';
import { App, Button, Form, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { registerUserSchema } from '@features/auth/validationSchema.ts';
import { useRegisterMutation } from '@src/store/api/services/userService.ts';

import type { ApiErrorResponse } from '@shared/types/apiTypes.ts';
import type { UserRegistrationRequest } from '@src/api/models';
import type { AxiosError } from 'axios';
import type { FC } from 'react';

import styles from './styles.module.scss';

export type RegisterFormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const RegisterForm: FC = () => {
  const { t } = useTranslation();
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
      message.success(t('auth.registerSuccess'));
      navigate('/home');
    } catch (err: unknown) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      const error = axiosError?.response?.data?.error;

      if (error === 'UsernameNotUniqueException') {
        setError('username', {
          message: t('auth.usernameTaken'),
        });
      } else if (error === 'EmailNotUniqueException') {
        setError('email', {
          message: t('auth.emailTaken'),
        });
      } else {
        message.destroy();
        message.error(t('auth.registerError'));
      }
    }
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)} className={styles.form} size="large">
      <h1 className={styles.title}>{t('auth.registerTitle')}</h1>
      <div className={styles.fields}>
        <Controller
          name="username"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Form.Item
              label={t('auth.username')}
              validateStatus={error ? 'error' : ''}
              help={error?.message}
            >
              <Input
                value={field.value}
                onChange={field.onChange}
                placeholder={t('auth.enterUsername')}
              />
            </Form.Item>
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Form.Item
              label={t('auth.email')}
              validateStatus={error ? 'error' : ''}
              help={error?.message}
            >
              <Input
                value={field.value}
                onChange={field.onChange}
                placeholder={t('auth.enterEmail')}
              />
            </Form.Item>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Form.Item
              label={t('auth.password')}
              validateStatus={error ? 'error' : ''}
              help={error?.message}
            >
              <Input.Password
                value={field.value}
                onChange={field.onChange}
                placeholder={t('auth.enterPassword')}
              />
            </Form.Item>
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Form.Item
              label={t('auth.confirmPassword')}
              validateStatus={error ? 'error' : ''}
              help={error?.message}
            >
              <Input.Password
                value={field.value}
                onChange={field.onChange}
                placeholder={t('auth.confirmPasswordPlaceholder')}
              />
            </Form.Item>
          )}
        />
      </div>

      <div className={styles.actions}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          {t('auth.register')}
        </Button>
        <Link to="/auth/login" className={styles.link}>
          <Button type="default" ghost block>
            {t('auth.alreadyHaveAccount')}
          </Button>
        </Link>
      </div>
    </Form>
  );
};
