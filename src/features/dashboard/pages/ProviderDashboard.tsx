
import { LocateFixedIcon } from "lucide-react"
import StatsCards from "../components/provider/StatsCards"
import { Badge } from "@/components/ui/badge"
import DirectRequestsList from "../components/provider/DirectRequestsList"
import OfferRequestsList from "../components/provider/OfferRequestsList"
import { useNavigate } from "react-router-dom";

const ProviderDashboard = () => {
    const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-7xl mx-5 my-2 ">

      <StatsCards />

      <div className="grid lg:grid-cols-2 ">
        <div className=" rounded-lg py-4 px-6  ">
          <div 
          className="flex items-center justify-between mb-4"
          onClick={() => navigate("/provider/requests/direct")}
          >
            <h3 className="text-md font-bold ">طلبات مباشرة</h3>
            <Badge className="bg-primary/5 text-primary px-2">طلبات جديدة</Badge>
          </div>
          <DirectRequestsList/>
        </div>
        <div className=" rounded-lg py-4 px-6  ">
          <div 
            className="flex items-center justify-between mb-4"
            onClick={() => navigate("/provider/requests")}
          >
            <h3 className="text-md font-bold ">الطلبات قريبة منى</h3>
            <Badge className="bg-primary/5 text-primary px-2"><LocateFixedIcon /> البحث فى نطاق 15 كم</Badge>
          </div>
          <OfferRequestsList/>
        </div>
      </div>
    </div>
  )
}

export default ProviderDashboard