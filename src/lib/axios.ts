import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    const isAuthRoute =
      originalRequest.url?.includes('/Account/login') ||
      originalRequest.url?.includes('/Account/register');

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute &&
      originalRequest.headers?.Authorization
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post('/Account/refresh-token');

        const newToken = res.data.accessToken;

        localStorage.setItem('token', newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        localStorage.clear();
        window.location.replace('/auth/login');
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
