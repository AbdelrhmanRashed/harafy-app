import L from "leaflet";


// Fix default leaflet icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({// Using CDN for icons to avoid bundling issues
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});


// 1. تحسين أيقونة العميل (تأثير النبض)
export const customerIcon = L.divIcon({
  className: "custom-customer-marker",
  html: `
    <div style="position: relative; display: flex; align-items: center; justify-content: center;">
      <div style="
        position: absolute;
        width: 24px; height: 24px;
        background: rgba(124, 58, 237, 0.4);
        border-radius: 50%;
        animation: pulse 2s infinite;
      "></div>
      <div style="
        width: 14px; height: 14px;
        background: #7C3AED;
        border: 2.5px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        z-index: 2;
      "></div>
    </div>
    <style>
      @keyframes pulse {
        0% { transform: scale(0.8); opacity: 0.8; }
        100% { transform: scale(2.4); opacity: 0; }
      }
    </style>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// 2. تحسين أيقونة الحرفي (تصميم بطاقة احترافية)
export const workerIcon = (name: string, profession: string, rating: number = 4.9) =>
  L.divIcon({
    className: "custom-worker-marker",
    html: `
    <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      filter: drop-shadow(0 4px 6px rgba(0,0,0,0.15));
    ">
      <div style="
        background: white;
        border-radius: 12px;
        padding: 6px 10px;
        border: 1.5px solid #7C3AED;
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 100px;
      ">
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
          <span style="
            font-family: Cairo, sans-serif;
            font-size: 13px;
            font-weight: 800;
            color: #1F2937;
            white-space: nowrap;
          ">${name}</span>
          
          <div style="
            display: flex;
            align-items: center;
            gap: 2px;
            background: #FFFBEB;
            padding: 1px 5px;
            border-radius: 6px;
          ">
            <span style="color: #F59E0B; font-size: 10px;">⭐</span>
            <span style="font-size: 10px; font-weight: 700; color: #92400E;">${rating.toFixed(1)}</span>
          </div>
        </div>
        
        <span style="
          font-family: Cairo, sans-serif;
          font-size: 10px;
          font-weight: 600;
          color: #6B7280;
          text-align: right;
        ">${profession}</span>
      </div>

      <div style="
        width: 0;
        height: 0;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-top: 8px solid #7C3AED;
        margin-top: -1px;
      "></div>
    </div>
    `,
    // الـ Anchor هنا مهم جداً: 
    // نص الـ Width (مثلاً لو الكارت عرضه 120 بكسل) والـ Height بالكامل عشان المثلث يلمس النقطة
    iconSize: [120, 50], 
    iconAnchor: [60, 50], 
    popupAnchor: [0, -55]
  });