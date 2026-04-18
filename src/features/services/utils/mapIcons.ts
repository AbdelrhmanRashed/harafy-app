import L from 'leaflet';
import { getImageUrl } from '@/lib/utils';

// 1. تثبيت أيقونات الخريطة الافتراضية
const fixIcons = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });
};
fixIcons();

// 🧠 SVG Icons (بدل الـ Emoji عشان يبقى شغل Ultra-Modern)
const ICONS = {
  plumber: `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a2 2 0 0 1-2.83-2.83l-3.94 3.6Z"/><path d="m14.1 7.2-2.3 2.3a4 4 0 1 0 5.6 5.6l2.3-2.3"/><path d="m16.3 9.4 1.4 1.4"/><path d="M15 4.5 9.5 10"/><path d="M13 10.5 8 15.5"/></svg>`,
  electric: `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 L3 14 H12 L11 22 L21 10 H12 L13 2 Z"/></svg>`,
  default: `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a2 2 0 0 1-2.83-2.83l-3.94 3.6Z"/></svg>`,
};

const getProfessionSVG = (profession?: string) => {
  const p = profession?.toLowerCase() || '';
  if (p.includes('سباك') || p.includes('plumb')) return ICONS.plumber;
  if (p.includes('كهرب') || p.includes('elect')) return ICONS.electric;
  return ICONS.default;
};

// 📍 1. Customer Icon (Tailwind Pulse)
export const customerIcon = L.divIcon({
  className: 'bg-transparent',
  html: `
    <div class="relative flex items-center justify-center">
      <div class="absolute w-6 h-6 bg-purple-500/40 rounded-full animate-ping"></div>
      <div class="relative w-4 h-4 bg-purple-600 border-2 border-white rounded-full shadow-lg"></div>
    </div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// 🚀 2. Professional Worker Marker
export const workerIcon = (
  name: string,
  profession: string,
  rating: number = 4.9,
  imageUrl?: string | null,
  provider?: any,
) => {
  console.log(provider);
  const avatarHtml = `
    <div class="relative shrink-0">
      <div class="w-10 h-10 rounded-full border-2 border-purple-600 overflow-hidden bg-gray-100">
        <img 
          src="${getImageUrl(imageUrl)}" 
          class="w-full h-full object-cover"
          onerror="this.src='https://ui-avatars.com/api/?name=User'"
        />
      </div>
      <div class="absolute -top-0.5 -left-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
      <div class="absolute -bottom-1 -right-1 bg-purple-600 text-white p-[3px] rounded-full border-2 border-white shadow-sm flex items-center justify-center">
        ${getProfessionSVG(profession)}
      </div>
    </div>
  `;

  const infoHtml = `
    <div class="flex flex-col min-w-0">
      <span class="text-[13px] font-bold text-gray-900 truncate leading-tight">${name}</span>
      <div class="flex items-center gap-1 mt-0.5">
        <div class="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded-md">
          <span class="text-amber-400 text-[10px]">★</span>
          <span class="text-[10px] font-bold text-amber-700">${rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  `;

  return L.divIcon({
    className: 'bg-transparent',
    html: `
      <div class="flex flex-col items-center group transition-all duration-300 transform -translate-y-[8px]">
        <div class="flex items-center gap-3 bg-white p-2 pr-4 rounded-2xl shadow-xl border border-gray-100 min-w-[140px] hover:-translate-y-1 transition-transform">
          ${avatarHtml}
          ${infoHtml}
        </div>
        <div class="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white drop-shadow-sm -mt-[1px]"></div>
      </div>
    `,
    iconSize: [160, 64],
    iconAnchor: [80, 58],
  });
};
