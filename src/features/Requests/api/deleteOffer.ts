import axiosInstance from "@/lib/axios";
 
export const deleteOffer = async (id: number) => {
  const res = await axiosInstance.delete(`/api/RequestOffer/delete-offer/${id}`);
  return res.data;
};