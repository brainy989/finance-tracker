import SideNav from "@/components/SideNav";
import Cashflow from "./Cashflow";

const page = () => {
  return (
    <>
      <div className="flex h-screen">
        <SideNav />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Cashflow />
        </div>
      </div>
    </>
  );
};

export default page;
