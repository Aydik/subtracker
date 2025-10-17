import type { FC } from 'react';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import styles from '../styles/index.module.scss';

export const RegisterForm: FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log('Register form values:', values);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.title}>
        <h1>Регистрация</h1>
      </div>

      <Form form={form} onFinish={handleSubmit} className={styles.form} size="large">
        <Form.Item
          label="Почта"
          name="email"
          rules={[
            { required: false, message: 'Пожалуйста, введите email' },
            { type: 'email', message: 'Введите корректный email' },
          ]}
        >
          <Input placeholder="Введите вашу почту" />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: false, message: 'Пожалуйста, введите пароль' }]}
        >
          <Input.Password placeholder="Введите ваш пароль" />
        </Form.Item>

        <Form.Item
          label="Повторите пароль"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: false, message: 'Пожалуйста, подтвердите пароль' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Пароли не совпадают'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Повторите ваш пароль" />
        </Form.Item>

        <div className={styles.actions}>
          <Link to="/auth/login" className={styles.link}>
            Уже есть аккаунт? Войти
          </Link>

          <Button type="primary" htmlType="submit" block>
            Создать аккаунт
          </Button>
        </div>
      </Form>
    </div>
  );
};
