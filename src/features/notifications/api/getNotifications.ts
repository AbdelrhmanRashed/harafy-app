import axiosInstance from '@/lib/axios';
interface Notification {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: {
    id: number;
    message: string;
    title: string;
    type: number;
    createdAt: string;
    isRead: boolean;
  }[];
}

export const getNotifications = (pageIndex = 1) => {
  return axiosInstance.get<Notification>('/api/Notification/my-notifications', {
    params: {
      pageIndex,
      pageSize: 10,
    },
  });
};

export const markAsReadApi = (ids: number[]) => {
  return axiosInstance.put('/api/Notification/set-read', {
    notificationIds: ids,
  });
};
