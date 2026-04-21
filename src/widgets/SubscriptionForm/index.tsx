import { type FC } from 'react';
import { Form, Select, DatePicker, Button, Spin, App, Row, Col, Input } from 'antd';
import styles from './index.module.scss';
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { CreateSubscriptionRequest } from '@src/api/models';
import { useCreateSubscriptionMutation } from '@src/store/api/services/subscriptionService.ts';
import { subscriptionSchema } from '@widgets/SubscriptionForm/validationSchema.ts';
import { useServices } from '@app/context/ServicesContext.tsx';
import { useAppSelector } from '@src/store/hooks.ts';
import { CURRENCY } from '@shared/types/Currency.ts';
import { toISOString } from '@shared/utils/formatDate.ts';
import dayjs from 'dayjs';

interface Props {
  id?: string;
}

export const SubscriptionForm: FC<Props> = ({ id }) => {
  const { message } = App.useApp();

  const navigate = useNavigate();

  const { services, isLoading } = useServices();
  const currency = useAppSelector((state) => state.user.user?.currency);

  const { control, handleSubmit } = useForm<CreateSubscriptionRequest>({
    resolver: yupResolver(subscriptionSchema),
    mode: 'onChange',
  });

  const [createSubscription] = useCreateSubscriptionMutation();

  const onSubmit = async (values: CreateSubscriptionRequest) => {
    const requestData: CreateSubscriptionRequest = {
      serviceId: values.serviceId,
      amount: values.amount,
      timeToPay: values.timeToPay,
    };

    try {
      await createSubscription(requestData).unwrap();

      message.destroy();
      message.success('Подписка успешно добавлена!');
      navigate('/home');
    } catch (err: unknown) {
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.initContainer}>
        <Spin size="large" indicator={<LoadingOutlined spin />} />
        <p>Загрузка формы</p>
      </div>
    );
  }

  return (
    <Form onFinish={handleSubmit(onSubmit)} className={styles.form}>
      <Controller
        name="serviceId"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label="Сервис" validateStatus={error ? 'error' : ''} help={error?.message}>
            <Select
              size="large"
              placeholder="Netflix, Spotify..."
              showSearch
              value={field.value}
              onChange={field.onChange}
            >
              {services.map((service) => (
                <Select.Option key={service.serviceId} value={service.serviceId}>
                  {service.serviceName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}
      />

      <Row gutter={16}>
        <Col span={12}>
          <Controller
            name="timeToPay"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                label="Дата следующего списания"
                validateStatus={error ? 'error' : ''}
                help={error?.message}
              >
                <DatePicker
                  size="large"
                  style={{ width: '100%' }}
                  format="DD.MM.YYYY"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(value) => field.onChange(toISOString(value))}
                />
              </Form.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <Controller
            name="amount"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                label="Сумма списания"
                validateStatus={error ? 'error' : ''}
                help={error?.message}
              >
                <Input
                  size="large"
                  style={{ width: '100%' }}
                  suffix={CURRENCY[currency || 'RUB']}
                  maxLength={5}
                  placeholder="0"
                  value={field.value}
                  onChange={(e) => {
                    const cleanedValue = e.target.value?.replace(/[^\d]/g, '') || null;
                    field.onChange(cleanedValue);
                  }}
                />
              </Form.Item>
            )}
          />
        </Col>
      </Row>

      <div className={styles.actions}>
        {id && (
          <Button size="large" danger htmlType="button">
            Удалить
          </Button>
        )}
        <Button size="large" type="primary" htmlType="submit">
          Сохранить
        </Button>
      </div>
    </Form>
  );
};
