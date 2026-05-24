import { useMemo, useState } from 'react';

import { Calendar, Tooltip, Modal, List } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import type { SubscriptionResponse } from '@src/api/models';
import type { FC } from 'react';

import styles from './SubscriptionCalendar.module.scss';

interface SubscriptionCalendarProps {
  subscriptions?: SubscriptionResponse[];
}

export const SubscriptionCalendar: FC<SubscriptionCalendarProps> = ({ subscriptions = [] }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<SubscriptionResponse[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

  const dateMap = useMemo(() => {
    const map: Record<string, SubscriptionResponse[]> = {};

    subscriptions.forEach((sub) => {
      if (!sub.timeToPay) return;

      const key = dayjs(sub.timeToPay).format('YYYY-MM-DD');
      if (!map[key]) map[key] = [];
      map[key].push(sub);
    });

    return map;
  }, [subscriptions]);

  const handleOpenModal = (items: SubscriptionResponse[], date: string) => {
    setSelectedSubscriptions(items);
    setSelectedDate(date);
    setModalVisible(true);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent,
    items: SubscriptionResponse[],
    date: string,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleOpenModal(items, date);
    }
  };

  const getIconElement = (sub: SubscriptionResponse) => {
    const firstLetter = sub.serviceName?.charAt(0).toUpperCase() || '?';

    return sub.logoUrl ? (
      <img src={sub.logoUrl} alt={sub.serviceName || ''} className={styles.iconImage} />
    ) : (
      <div className={styles.iconFallback}>{firstLetter}</div>
    );
  };

  const getTooltipContent = (sub: SubscriptionResponse) => {
    return (
      <div className={styles.tooltipContent}>
        <div className={styles.tooltipName}>{sub.serviceName}</div>
        <div className={styles.tooltipAmount}>{sub.amount} ₽</div>
        <div className={styles.tooltipDate}>{dayjs(sub.timeToPay).format('DD MMMM YYYY')}</div>
        {sub.paymentMethod && <div className={styles.tooltipMethod}>{sub.paymentMethod}</div>}
      </div>
    );
  };

  const renderSubscriptionsIcons = (date: Dayjs, isCurrentMonth: boolean) => {
    const key = date.format('YYYY-MM-DD');
    const items = dateMap[key];
    if (!items?.length) return null;

    const MAX_VISIBLE = 3;
    const visibleItems = items.slice(0, MAX_VISIBLE);
    const remainingCount = items.length - MAX_VISIBLE;

    return (
      <div
        className={`${styles.subscriptionsIcons} ${!isCurrentMonth ? styles.notInViewIcons : ''}`}
      >
        {visibleItems.map((sub) => (
          <Tooltip
            key={sub.subscriptionId}
            title={getTooltipContent(sub)}
            placement="top"
            mouseEnterDelay={0.3}
            overlayClassName={styles.customTooltip}
          >
            <div className={styles.iconWrapper}>{getIconElement(sub)}</div>
          </Tooltip>
        ))}

        {remainingCount > 0 && (
          <div
            className={styles.moreBadge}
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              handleOpenModal(items, key);
            }}
            onKeyDown={(e) => handleKeyDown(e, items, key)}
          >
            +{remainingCount}
          </div>
        )}
      </div>
    );
  };

  const fullCellRender = (date: Dayjs) => {
    const isCurrentMonth = date.month() === currentDate.month();
    const cellClass = !isCurrentMonth ? styles.notInView : '';

    return (
      <div className={`${styles.customCell} ${cellClass}`}>
        <div className={styles.customCellValue}>{date.date()}</div>
        <div className={styles.customCellContent}>
          {renderSubscriptionsIcons(date, isCurrentMonth)}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.calendar}>
      <Calendar
        fullCellRender={fullCellRender}
        value={currentDate}
        onSelect={() => setCurrentDate(dayjs())}
        onPanelChange={(date) => setCurrentDate(date)}
      />

      <Modal
        title={`Подписки на ${dayjs(selectedDate).format('DD MMMM YYYY')}`}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        className={styles.subscriptionsModal}
        width={400}
      >
        <List
          className={`${styles.modalList} custom-scroll`}
          dataSource={selectedSubscriptions}
          renderItem={(subscription) => (
            <List.Item className={styles.modalListItem}>
              <div className={styles.modalItemContent}>
                <div className={styles.modalItemIcon}>{getIconElement(subscription)}</div>
                <div className={styles.modalItemInfo}>
                  <div className={`${styles.modalItemName} text-ellipsis`}>
                    {subscription.serviceName}
                  </div>
                  <div className={styles.modalItemDetails}>
                    {subscription.amount} ₽ - {subscription.paymentMethod || 'Способ не указан'}
                  </div>
                </div>
              </div>
            </List.Item>
          )}
          locale={{ emptyText: 'Нет подписок' }}
        />
      </Modal>
    </div>
  );
};
