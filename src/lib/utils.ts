import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import userAvatar from '@/assets/images/profileImage.png';
import { API_BASE } from '@/lib/apiBase';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImageUrl = (imagePath: string | null | undefined) =>
  imagePath
    ? `${API_BASE}/${String(imagePath).replace(/^\//, '')}`
    : userAvatar;

export const getFullName = (
  firstName: string | null | undefined,
  lastName: string | null | undefined,
) => `${firstName} ${lastName}`;

export const getTimeAgo = (date: Date) => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / 3600000);
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / 86400000);

  if (diffInMinutes < 60) {
    if (diffInMinutes <= 0) return 'منذ لحظات';
    return `${diffInMinutes} دقائق`;
  } else if (diffInHours < 24) {
    return `${diffInHours} ساعات`;
  } else if (diffInDays < 30) {
    return `${diffInDays} أيام`;
  } else if (diffInDays < 365) {
    return `${Math.floor(diffInDays / 30)} أشهر`;
  } else {
    return `${Math.floor(diffInDays / 365)} سنوات`;
  }
};

export const getRoleName = (role: string[] | null | undefined) => {
  switch (role?.[0]) {
    case 'Client':
      return 'عميل';
    case 'Provider':
      return 'حرفي';
    case 'Admin':
      return 'مدير';
    default:
      return 'غير معروف';
  }
};
