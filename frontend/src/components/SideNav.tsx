"use client";
import Link from "next/link";
import { FaCog, FaFileInvoice, FaWallet, FaSignOutAlt } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { MdDashboard } from "react-icons/md";
import { RiCustomerServiceLine } from "react-icons/ri";
import { IoMdHelp } from "react-icons/io";
import { usePathname } from "next/navigation";
import { useState } from "react";

const SideNav = () => {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-56 border-r-2 border-gray-300">
      <section className="flex flex-col mt-8 ml-8 text-gray-500">
        <figure className="flex pb-5">
          <p className="font-medium text-xl ml-2">Tracker</p>
        </figure>

        <section className="mt-10 sxl:mt-4 items-center">
          <Link href="/">
            <section
              className={`flex flex-row cursor-pointer ${
                pathname === "/" ? "text-teal-600" : "text-gray-600"
              }`}
            >
              <MdDashboard className="w-6 h-6" />
              <span className="text-lg ml-2">Overview</span>
            </section>
          </Link>
        </section>

        <section className="mt-10 sxl:mt-6 items-center">
          <Link href="/dashboard/budget">
            <section
              className={`flex flex-row cursor-pointer ${
                pathname === "/dashboard/budget"
                  ? "text-teal-600"
                  : "text-gray-600"
              }`}
            >
              <FaFileInvoice className="w-6 h-6" />
              <span className="text-lg ml-3">Budget</span>
            </section>
          </Link>
        </section>

        <section className="mt-10 sxl:mt-6 items-center">
          <Link href="/dashboard/cashflow">
            <section
              className={`flex flex-row cursor-pointer ${
                pathname === "/dashboard/cashflow"
                  ? "text-teal-600"
                  : "text-gray-600"
              }`}
            >
              <FaWallet className="w-6 h-6" />
              <span className="text-lg ml-3">Cashflow</span>
            </section>
          </Link>
        </section>
      </section>
    </aside>
  );
};

export default SideNav;