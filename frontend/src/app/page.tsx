import SideNav from "@/components/SideNav";
import Overview from "./dashboard/Overview";

const page = () => {
  return (
    <>
      <div className="flex h-screen">
        <SideNav />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Overview />
        </div>
      </div>
    </>
  );
};

export default page;
