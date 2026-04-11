import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  timeout: 30000,
});

// flag to prevent loop
let isRefreshing = false;

// queue for requests that are waiting for the new token
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

//  Request Interceptor
// ========================
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

//  Response Interceptor
// ========================
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // loop prevention
    const isAuthRoute =
      originalRequest.url?.includes('/api/Account/login') ||
      originalRequest.url?.includes('/api/Account/register');

    if (originalRequest.url?.includes('/refresh-token')) {
      return Promise.reject(error);
    }

    // if token expired or invalid
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute &&
      originalRequest.headers?.Authorization
    ) {
      // if refresh is working
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

        // save new token
        localStorage.setItem('token', newToken);

        // update header
        axiosInstance.defaults.headers.common['Authorization'] =
          `Bearer ${newToken}`;

        processQueue(null, newToken);

        // retry the original request
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);

        // logout
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
