import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

// 🔒 Flag علشان نمنع تكرار refresh
let isRefreshing = false;

// 🧾 Queue للـ requests اللي مستنية التوكن الجديد
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// ========================
// 🟢 Request Interceptor
// ========================
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ========================
// 🔴 Response Interceptor
// ========================
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    const isAuthRoute =
      originalRequest.url?.includes('/api/Account/login') ||
      originalRequest.url?.includes('/api/Account/register');

    // ❗ منع loop
    if (originalRequest.url?.includes('/refresh-token')) {
      return Promise.reject(error);
    }

    // ✅ لو token expired أو invalid
    if (
      (error.response?.status === 401 || error.response?.status === 400) &&
      !originalRequest._retry &&
      !isAuthRoute &&
      originalRequest.headers?.Authorization
    ) {
      // لو فيه refresh شغال
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axiosInstance(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/Account/refresh-token`,
          null,
          { withCredentials: true },
        );

        const newToken = res.data.accessToken;

        // 💾 خزّن التوكن الجديد
        localStorage.setItem('token', newToken);

        // حدث الـ header
        axiosInstance.defaults.headers.common['Authorization'] =
          `Bearer ${newToken}`;

        processQueue(null, newToken);

        // رجّع الريكوست القديم
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);

        // ❌ logout
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.replace('/auth/login');

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
