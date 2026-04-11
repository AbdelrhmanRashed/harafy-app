export interface LatLng {
  lat: number;
  lng: number;
}

export interface Provider {
  id: number;
  name: string;
  pictureUrl: string | null;
  bio: string;
  nickname: string;
  rating: number | null;
  reviewsCount: number;
  jobsCount: number;
  governorateId: number;
  regionId: number;
  baseLocation: {
    id: number;
    latitude: number;
    longitude: number;
    addressText: string;
    providerId: number;
  };
  services: {
    id: number;
    name: string;
  }[];
}

// //{
//     "id": 72,
//     "name": "ahmed abdo",
//     "pictureUrl": null,
//     "bio": "اعمل ف السباكة قبل صناعة البانيو ومولود وانا ف ايدي مفتاح",
//     "nickname": "أبوأحمد",
//     "rating": null,
//     "reviewsCount": 0,
//     "jobsCount": 0,
//     "governorateId": 20,
//     "regionId": 306,
//     "baseLocation": {
//         "id": 24,
//         "latitude": 30.59136638911814,
//         "longitude": 31.52355298912032,
//         "addressText": "شارع الحسينى, كفر عبد العزيز, شوابك بصطا, الزقازيق, الشرقية, 44761, مصر",
//         "providerId": 72
//     },
//     "services": [
//         {
//             "id": 1,
//             "name": "سباكة"
//         }
//     ]
// }