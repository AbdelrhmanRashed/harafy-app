import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImageUrl = (imagePath: string | null | undefined) =>
  imagePath
    ? `${import.meta.env.VITE_BASE_URL}/${imagePath}`
    : 'https://github.com/shadcn.png';

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
