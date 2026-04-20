import { useState, useEffect, type FC } from 'react';
import { Form, Input, Select, DatePicker, Button, message, Spin } from 'antd';
import { Dayjs } from 'dayjs';
import type { Service } from '@entities/Service';
import { getServices } from '@entities/Service';
import styles from './index.module.scss';
import { LoadingOutlined } from '@ant-design/icons';

interface ServiceFormValues {
  serviceId: string;
  amount: number;
  nextChargeDate: Dayjs;
}

interface Props {
  id?: string;
}

export const SubscriptionForm: FC<Props> = ({ id }) => {
  const [form] = Form.useForm<ServiceFormValues>();
  const [loading, setLoading] = useState<boolean>(false);
  const [services, setServices] = useState<Service[]>([]);
  const [init, setInit] = useState<boolean>(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setInit(true);
      const servicesData = await getServices();
      setServices(servicesData);
    } catch (error) {
      console.error('Ошибка при загрузке сервисов:', error);
      message.error('Не удалось загрузить список сервисов');
      setServices([]);
    } finally {
      setInit(false);
    }
  };

  const onFinish = async (values: ServiceFormValues) => {
    setLoading(true);
    try {
      console.log('Отправляем данные:', {
        service: values.serviceId,
        amount: values.amount,
        nextChargeDate: values.nextChargeDate.format('YYYY-MM-DD'),
      });

      message.success('Данные успешно сохранены!');
      form.resetFields();
    } catch (error) {
      message.error('Ошибка при сохранении данных');
    } finally {
      setLoading(false);
    }
  };

  if (init) {
    return (
      <div className={styles.initContainer}>
        <Spin size="large" indicator={<LoadingOutlined spin />} />
        <p>Загрузка формы</p>
      </div>
    );
  }

  return (
    <Form<ServiceFormValues> form={form} onFinish={onFinish} className={styles.form}>
      <Form.Item
        name="service"
        label="Сервис"
        rules={[{ required: true, message: 'Выберите сервис' }]}
      >
        <Select placeholder="Выберите сервис" showSearch>
          {services.map((service) => (
            <Select.Option key={service.name} value={service.name}>
              {service.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="amount"
        label="Сумма списания"
        rules={[
          { required: true, message: 'Введите сумму' },
          {
            pattern: /^\d+$/,
            message: 'Введите целое положительное число',
          },
          () => ({
            validator(_, value) {
              if (!value || Number(value) > 0) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Сумма должна быть больше 0'));
            },
          }),
        ]}
      >
        <Input
          placeholder="0"
          onKeyPress={(e) => {
            if (!/\d/.test(e.key)) {
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            e.target.value = e.target.value.replace(/[^\d]/g, '');
          }}
        />
      </Form.Item>

      <Form.Item
        name="nextChargeDate"
        label="Дата следующего списания"
        rules={[{ required: true, message: 'Выберите дату' }]}
      >
        <DatePicker style={{ width: '100%' }} format="DD.MM.YYYY" />
      </Form.Item>

      <div className={styles.actions}>
        {id && (
          <Button danger htmlType="button">
            Удалить
          </Button>
        )}
        <Button type="primary" htmlType="submit" loading={loading}>
          Сохранить
        </Button>
      </div>
    </Form>
  );
};
