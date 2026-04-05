import L from "leaflet";


// Fix default leaflet icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({// Using CDN for icons to avoid bundling issues
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

export const customerIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      width:16px; height:16px;
      background:#7C3AED;
      border-radius:50%;
      border:3px solid white;
      box-shadow:0 0 0 3px rgba(124,58,237,0.3);
    "></div>
  `,
  iconAnchor: [8, 8],// Center the icon on the position
  iconSize: [16, 16],
});

export const workerIcon = (name: string, rating: number, profession: string) =>
  L.divIcon({
    className: "custom-worker-marker",
    html: `
    <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%);">
      <div style="
        background: white;
        border: 2px solid #7C3AED;
        border-radius: 20px;
        padding: 4px 12px;
        font-family: Cairo, sans-serif;
        font-size: 12px;
        font-weight: 700;
        color: #7C3AED;
        white-space: nowrap;
        box-shadow: 0 2px 8px rgba(124,58,237,0.25);
        display: flex;
        align-items: center;
        gap: 6px;
      ">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-person-standing-icon lucide-person-standing"><circle cx="12" cy="5" r="1"/><path d="m9 20 3-6 3 6"/><path d="m6 8 6 2 6-2"/><path d="M12 10v4"/></svg>


        <span style="color: #374151;">${name}</span>
      </div>
      <div style="
        font-family: Cairo, sans-serif;
        font-size: 11px;
        font-weight: 600;
        color: #4B5563;
        text-align: right;
        white-space: nowrap; 
        margin-top: 4px;
        text-shadow: 1px 1px 0px white, -1px -1px 0px white, 1px -1px 0px white, -1px 1px 0px white; 
      ">
       (<span style="color: #FFB800;">⭐</span>
        <span>${rating.toFixed(1)}</span>) 
        ${profession}
      </div>
    </div>
    `,
    iconAnchor: [0, 0], 
    iconSize: [0, 0],
  });
