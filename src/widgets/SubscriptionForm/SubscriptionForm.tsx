import { useCallback, useEffect, useMemo, useState } from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Select, DatePicker, Button, Spin, App, Row, Col, Input, Checkbox } from 'antd';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useCategories } from '@app/context/CategoriesContext.tsx';
import { useServices } from '@app/context/ServicesContext.tsx';
import { CATEGORIES_LOCALIZATION } from '@shared/types/Categories.ts';
import { CURRENCY } from '@shared/types/Currency.ts';
import { toISOString } from '@shared/utils/formatDate.ts';
import {
  useCreateCustomSubscriptionMutation,
  useCreateSubscriptionMutation,
  useDeleteSubscriptionMutation,
  useLazyGetSubscriptionByIdQuery,
  useUpdateSubscriptionMutation,
  useUploadCustomLogoMutation,
} from '@src/store/api/services/subscriptionService.ts';
import { useAppSelector } from '@src/store/hooks.ts';
import { editAnalytics } from '@src/store/slices/analyticsSlice.ts';
import { UploadImage } from '@widgets/SubscriptionForm/ui/UploadImage';
import { getSubscriptionSchema } from '@widgets/SubscriptionForm/validationSchema.ts';

import type { SubscriptionFormValues } from '@widgets/SubscriptionForm/validationSchema.ts';
import type { UploadFile } from 'antd';
import type { FC } from 'react';

import styles from './SubscriptionForm.module.scss';

export type SubscriptionFormProps = {
  id?: string;
};

export const SubscriptionForm: FC<SubscriptionFormProps> = ({ id }) => {
  const { message } = App.useApp();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [prevAmount, setPrevAmount] = useState<number>(0);

  const { services, isLoading: isLoadingServices } = useServices();
  const { categories, isLoading: isLoadingCategories } = useCategories();
  const currency = useAppSelector((state) => state.user.user?.currency);

  const { control, handleSubmit, setValue, watch } = useForm<SubscriptionFormValues>({
    resolver: yupResolver(getSubscriptionSchema(!id)),
    defaultValues: {
      isMonth: true,
      isCustom: false,
    },
    mode: 'onChange',
  });

  const { isCustom } = watch();

  const [getSubscriptionById] = useLazyGetSubscriptionByIdQuery();
  const [createSubscription, { isLoading: isLoadingCreate }] = useCreateSubscriptionMutation();
  const [createCustomSubscription, { isLoading: isLoadingCreateCustom }] =
    useCreateCustomSubscriptionMutation();
  const [uploadCustomLogo, { isLoading: isLoadingUpload }] = useUploadCustomLogoMutation();
  const [updateSubscription, { isLoading: isLoadingUpdate }] = useUpdateSubscriptionMutation();
  const [deleteSubscription] = useDeleteSubscriptionMutation();

  const isLoadingRequest = useMemo(
    () => isLoadingCreate || isLoadingUpdate || isLoadingCreateCustom || isLoadingUpload,
    [isLoadingCreate, isLoadingCreateCustom, isLoadingUpdate, isLoadingUpload],
  );

  useEffect(() => {
    const fetchSubscription = async () => {
      if (id) {
        const data = await getSubscriptionById(id).unwrap();

        if (data?.serviceName) {
          setValue('serviceName', data?.serviceName);
        }
        if (data?.amount) {
          setValue('amount', data?.amount);
          setPrevAmount(data?.amount);
        }
        if (data?.timeToPay) {
          setValue('timeToPay', data?.timeToPay);
        }
        setValue('isMonth', !!data?.isMonth);
        if (data?.paymentMethod) {
          setValue('paymentMethod', data?.paymentMethod);
        }
      }
    };
    fetchSubscription();
  }, [id]);

  const onSubmit = useCallback(
    async (values: SubscriptionFormValues) => {
      try {
        if (id) {
          await updateSubscription({
            id,
            updateSubscriptionRequest: {
              amount: values.amount,
              timeToPay: values.timeToPay,
              isMonth: values.isMonth,
              paymentMethod: values.paymentMethod,
            },
          }).unwrap();
          dispatch(editAnalytics({ count: 0, amount: values.amount - prevAmount }));
        } else {
          if (!values.isCustom && values.serviceId) {
            await createSubscription({
              amount: values.amount,
              timeToPay: values.timeToPay,
              isMonth: values.isMonth,
              paymentMethod: values.paymentMethod,
              serviceId: values.serviceId,
            }).unwrap();
            dispatch(editAnalytics({ count: 1, amount: values.amount }));
          }
          if (values.isCustom && values.serviceName && values.categoryId) {
            const res = await createCustomSubscription({
              amount: values.amount,
              timeToPay: values.timeToPay,
              isMonth: values.isMonth,
              paymentMethod: values.paymentMethod,
              serviceName: values.serviceName,
              categoryId: values.categoryId,
            }).unwrap();

            const file = fileList[0]?.originFileObj;
            if (file && res?.subscriptionId) {
              await uploadCustomLogo({
                subscriptionId: res.subscriptionId,
                uploadCustomLogoBody: {
                  logo: file,
                },
              });
            }
            dispatch(editAnalytics({ count: 1, amount: values.amount }));
          }
        }

        message.destroy();
        message.success('Подписка успешно добавлена!');
        navigate('/home');
      } catch (err: unknown) {
        console.error(err);
        message.error('Ошибка при сохранении!');
      }
    },
    [id, fileList, prevAmount],
  );

  const handleDelete = useCallback(async () => {
    if (id) {
      try {
        await deleteSubscription(id).unwrap();
        dispatch(editAnalytics({ count: -1, amount: -prevAmount }));

        message.destroy();
        message.success('Подписка успешно удалена!');
        navigate('/home');
      } catch (err: unknown) {
        console.error(err);
        message.error('Ошибка при удалении!');
      }
    }
  }, [id, prevAmount]);

  if (isLoadingServices || isLoadingCategories) {
    return (
      <div className={styles.initContainer}>
        <Spin size="large" indicator={<LoadingOutlined spin />} />
        <p>Загрузка формы</p>
      </div>
    );
  }

  return (
    <Form onFinish={handleSubmit(onSubmit)} className={styles.form}>
      {isCustom || !!id ? (
        <Controller
          name="serviceName"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Form.Item
              label="Название сервиса"
              validateStatus={error ? 'error' : ''}
              help={error?.message}
              className={styles.formItemFixedHeight}
            >
              <Input
                size="large"
                value={field.value}
                onChange={field.onChange}
                placeholder="Введите название сервиса"
                disabled={!!id}
              />
            </Form.Item>
          )}
        />
      ) : (
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
                filterOption={(input, option) =>
                  (option?.children ?? '').toString().toLowerCase().includes(input.toLowerCase())
                }
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
      )}

      {!id && (
        <Controller
          name="isCustom"
          control={control}
          render={({ field }) => (
            <Checkbox className={styles.checkbox} checked={field.value} onChange={field.onChange}>
              Кастомная подписка
            </Checkbox>
          )}
        />
      )}

      {isCustom && (
        <Controller
          name="categoryId"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Form.Item
              label="Категория"
              validateStatus={error ? 'error' : ''}
              help={error?.message}
            >
              <Select
                size="large"
                placeholder="Видео, Музыка..."
                showSearch
                value={field.value}
                onChange={field.onChange}
                filterOption={(input, option) =>
                  (option?.children ?? '').toString().toLowerCase().includes(input.toLowerCase())
                }
              >
                {categories.map((category) => (
                  <Select.Option key={category.categoryId} value={category.categoryId}>
                    {CATEGORIES_LOCALIZATION[category.name || 'OTHER']}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}
        />
      )}

      <Row gutter={16}>
        <Col span={12}>
          <Controller
            name="timeToPay"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                label="Дата списания"
                validateStatus={error ? 'error' : ''}
                help={error?.message}
              >
                <DatePicker
                  size="large"
                  className={styles.fullWidth}
                  format="DD.MM.YYYY"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(value) => field.onChange(toISOString(value))}
                  disabledDate={(current) => {
                    return current && current < dayjs().startOf('day');
                  }}
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
                  className={styles.fullWidth}
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

      <Controller
        name="isMonth"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label="Тип списания"
            validateStatus={error ? 'error' : ''}
            help={error?.message}
          >
            <div className={styles.isMonthContainer}>
              {[
                { label: 'Единоразово', value: false },
                { label: 'Ежемесячно', value: true },
              ].map((button) => (
                <button
                  key={button.label}
                  type="button"
                  className={clsx(
                    styles.isMonthButton,
                    field.value === button.value ? styles.isMonthButton_active : undefined,
                  )}
                  onClick={() => field.onChange(button.value)}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </Form.Item>
        )}
      />

      <Controller
        name="paymentMethod"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label="Способ оплаты"
            validateStatus={error ? 'error' : ''}
            help={error?.message}
          >
            <Input
              size="large"
              value={field.value}
              onChange={field.onChange}
              placeholder="Введите способ оплаты"
            />
          </Form.Item>
        )}
      />

      {isCustom && !id && (
        <Form.Item label="Изображение">
          <UploadImage fileList={fileList} setFileList={setFileList} />
        </Form.Item>
      )}

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
