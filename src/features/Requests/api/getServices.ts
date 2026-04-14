import axiosInstance from "@/lib/axios";

export const getServices = async (): Promise<{ id: number; name: string }[]> => {
  const res = await axiosInstance.get("/api/Services/get-services");
  return res.data;
};