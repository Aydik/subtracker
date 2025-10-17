import type { FC } from 'react';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import styles from '../styles/index.module.scss';

export const LoginForm: FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log('Login form values:', values);
  };

  return (
    <Form form={form} onFinish={handleSubmit} className={styles.form} size="large">
      <h1 className={styles.title}>Вход</h1>
      <div className={styles.fields}>
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
      </div>
      <div className={styles.actions}>
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
        <Link to="/auth/register" className={styles.link}>
          Создать аккаунт
        </Link>
      </div>
    </Form>
  );
};
