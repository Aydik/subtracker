interface Service {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
}

export const PAYMENT_STATUSES = ['upcoming', 'pending', 'completed'] as const;
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];
export const PAYMENT_STATUS_LOCALIZATION: Record<PaymentStatus, string> = {
  upcoming: 'Предстоящий',
  pending: 'Ожидается',
  completed: 'Выполнено',
};

export interface PaymentNotification {
  id: string;
  title: string;
  date: string;
  amount: number;
  service: Service;
  description: string;
  status: PaymentStatus;
}
