import type { Provider } from "./types.ts";

export const CATEGORIES = ["الكل", "سباكة", "كهرباء", "تكييف", "نجارة", "دهانات"];

export const SERVICES = [
  "اختر الخدمة المطلوبة",
  "سباكة", "كهرباء", "تكييف",
  "نجارة", "دهانات", "تنظيف", "غاز",
];

export const DEFAULT_CENTER = { lat: 30.0444, lng: 31.2357 };

export const MOCK_PROVIDERS: Provider[] = [
  {
    id: 1,
    name: "أحمد سالم",
    profession: "خبير سباكة",
    experience: "15 عاماً خبرة",
    rating: 4.9,
    distance: 1.2, // This will be calculated dynamically in the app
    status: "متاح الآن",
    position: { lat: 30.048, lng: 31.239 }, 
    avatar: "أ",
  },
  {
    id: 2,
    name: "ياسر إبراهيم",
    profession: "فني كهرباء منازل",
    experience: "8 سنوات",
    rating: 4.7,
    distance: 2.5,
    status: "متاح الآن",
    position: { lat: 30.062, lng: 31.216 }, 
    avatar: "ي",
  },
  {
    id: 3,
    name: "محمد علي",
    profession: "فني تكييف وتبريد",
    experience: "12 عاماً",
    rating: 5.0,
    distance: 5.1,
    status: "مشغول حالياً",
    position: { lat: 30.058, lng: 31.336 },
    avatar: "م",
  },
  {
    id: 4,
    name: "خالد منصور",
    profession: "نجار تركيب وتأثيث",
    experience: "10 سنوات",
    rating: 4.8,
    distance: 4.0,
    status: "متاح الآن",
    position: { lat: 29.960, lng: 31.256 }, 
    avatar: "خ",
  },
];