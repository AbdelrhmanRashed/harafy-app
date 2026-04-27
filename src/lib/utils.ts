import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImageUrl = (imagePath: string | null | undefined) =>
  imagePath ? `${import.meta.env.VITE_BASE_URL}/${imagePath}` : undefined;

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
  } else if (diffInDays === 1) {
    return `يوم`;
  } else if (diffInDays === 2) {
    return `يومان`;
  } else if (diffInDays >= 3 && diffInDays < 11) {
    return `${diffInDays} أيام`;
  } else if (diffInDays >= 11 && diffInDays < 30) {
    return `${diffInDays} يوم`;
  } else if (diffInDays < 365) {
    return `${Math.floor(diffInDays / 30)} أشهر`;
  } else {
    return `${Math.floor(diffInDays / 365)} سنوات`;
  }
};

export const getRoleName = (roles: string[] | null | undefined) => {
  if (roles?.includes('Admin')) {
    return 'مدير';
  } else if (roles?.includes('Provider')) {
    return 'حرفي';
  } else if (roles?.includes('Client')) {
    return 'عميل';
  } else {
    return 'غير معروف';
  }
};
