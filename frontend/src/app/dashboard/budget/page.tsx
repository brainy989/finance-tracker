import SideNav from "@/components/SideNav";
import Budget from "./Budget";

const page = () => {
  return (
    <>
      <div className="flex h-screen">
        <SideNav />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Budget />
        </div>
      </div>
    </>
  );
};

export default page