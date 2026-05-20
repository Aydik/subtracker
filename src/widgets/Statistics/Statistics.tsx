import { Col, Row } from 'antd';

import type { AnalyticsSummaryResponse } from '@src/api/models';
import type { FC } from 'react';

type StatisticsProps = {
  analytics?: AnalyticsSummaryResponse;
};

export const Statistics: FC<StatisticsProps> = ({ analytics }) => {
  return (
    <div style={{ maxWidth: 500, width: '100%' }}>
      <Row gutter={16}>
        <Col span={12}>
          Активных подписок {analytics?.upcomingCharges?.activeSubscriptionsCount}
        </Col>
        <Col span={12}>Сумма в месяц {analytics?.upcomingCharges?.totalAmountToPayThisMonth} ₽</Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          На этой неделе {analytics?.upcomingCharges?.subscriptionsToPayThisWeekCount}
        </Col>
        <Col span={12}>
          В этом месяце {analytics?.upcomingCharges?.subscriptionsToPayThisMonthCount}
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>К оплате на этой неделе {analytics?.upcomingCharges?.nextWeek} ₽</Col>
        <Col span={12}>К оплате этом месяце {analytics?.upcomingCharges?.nextMonth} ₽</Col>
      </Row>
    </div>
  );
};
