import { useCallback, useEffect, useMemo } from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Select, DatePicker, Button, Spin, App, Row, Col, Input } from 'antd';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useServices } from '@app/context/ServicesContext.tsx';
import { CURRENCY } from '@shared/types/Currency.ts';
import { toISOString } from '@shared/utils/formatDate.ts';
import {
  useCreateSubscriptionMutation,
  useDeleteSubscriptionMutation,
  useLazyGetSubscriptionByIdQuery,
  useUpdateSubscriptionMutation,
} from '@src/store/api/services/subscriptionService.ts';
import { useAppSelector } from '@src/store/hooks.ts';
import { subscriptionSchema } from '@widgets/SubscriptionForm/validationSchema.ts';

import type { CreateSubscriptionRequest } from '@src/api/models';
import type { FC } from 'react';

import styles from './SubscriptionForm.module.scss';

export type SubscriptionFormProps = {
  id?: string;
};

export const SubscriptionForm: FC<SubscriptionFormProps> = ({ id }) => {
  const { message } = App.useApp();

  const navigate = useNavigate();

  const { services, isLoading: isLoadingServices } = useServices();
  const currency = useAppSelector((state) => state.user.user?.currency);

  const { control, handleSubmit, setValue } = useForm<CreateSubscriptionRequest>({
    resolver: yupResolver(subscriptionSchema),
    mode: 'onChange',
  });

  const [getSubscriptionById] = useLazyGetSubscriptionByIdQuery();
  const [createSubscription, { isLoading: isLoadingCreate }] = useCreateSubscriptionMutation();
  const [updateSubscription, { isLoading: isLoadingUpdate }] = useUpdateSubscriptionMutation();
  const [deleteSubscription] = useDeleteSubscriptionMutation();

  const isLoadingRequest = useMemo(
    () => isLoadingCreate || isLoadingUpdate,
    [isLoadingCreate, isLoadingUpdate],
  );

  useEffect(() => {
    const fetchSubscription = async () => {
      if (id) {
        const data = await getSubscriptionById(id).unwrap();

        if (data?.serviceName && services) {
          const serviceId = services.find(
            (service) => service.serviceName === data?.serviceName,
          )?.serviceId;
          if (serviceId) {
            setValue('serviceId', serviceId);
          }
        }
        if (data?.amount) {
          setValue('amount', data?.amount);
        }
        if (data?.timeToPay) {
          setValue('timeToPay', data?.timeToPay);
        }
      }
    };
    fetchSubscription();
  }, [id]);

  const onSubmit = useCallback(
    async (values: CreateSubscriptionRequest) => {
      try {
        if (id) {
          await updateSubscription({
            id,
            updateSubscriptionRequest: {
              amount: values.amount,
              timeToPay: values.timeToPay,
            },
          }).unwrap();
        } else {
          await createSubscription({
            serviceId: values.serviceId,
            amount: values.amount,
            timeToPay: values.timeToPay,
          }).unwrap();
        }

        message.destroy();
        message.success('Подписка успешно добавлена!');
        navigate('/home');
      } catch (err: unknown) {
        console.error(err);
        message.error('Ошибка при сохранении!');
      }
    },
    [id],
  );

  const handleDelete = useCallback(async () => {
    if (id) {
      try {
        await deleteSubscription(id).unwrap();

        message.destroy();
        message.success('Подписка успешно удалена!');
        navigate('/home');
      } catch (err: unknown) {
        console.error(err);
        message.error('Ошибка при удалении!');
      }
    }
  }, [id]);

  if (isLoadingServices) {
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
              disabled={!!id}
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
          <Button size="large" danger htmlType="button" onClick={handleDelete}>
            Удалить
          </Button>
        )}
        <Button size="large" type="primary" htmlType="submit" loading={isLoadingRequest}>
          Сохранить
        </Button>
      </div>
    </Form>
  );
};
