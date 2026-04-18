import axiosInstance from "@/lib/axios";

export const startRequest = async (id: number, isAccepted: boolean) => {
  const res = await axiosInstance.put(`/api/ServiceRequest/start/${id}`, null, {
    params: { isAccepted },
  });
  return res.data;
};