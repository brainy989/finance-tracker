"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import BarChart from "./budget/BarChart";
import PieChart from "./budget/PieChart";

const Overview: React.FC = () => {
  const [budgets, setBudgets] = useState<
    { category: string; amount: number }[]
  >([]);
  const [chartType, setChartType] = useState<"bar" | "pie">("bar");

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const res = await axios.get(
          "http://localhost:1337/api/budgets?populate=budget"
        );
        const data = res.data.data.map((budget: any) => ({
          category: budget.attributes.category,
          amount: budget.attributes.amount,
        }));
        setBudgets(data);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };

    fetchBudgets();
  }, []);

  const categories = budgets.map((budget) => budget.category);
  const amounts = budgets.map((budget) => budget.amount);

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto pl-8">
      <div className="container mx-auto py-6">
        <section className="w-full flex flex-row justify-between py-4 px-[15px]">
          <h2 className="text-2xl text-gray-700 font-medium">OVERVIEW</h2>
          <div>
            <button
              onClick={() => setChartType("bar")}
              className={`mx-2 py-2 px-3 ${
                chartType === "bar"
                  ? "bg-teal-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } rounded-lg`}
            >
              Bar Chart
            </button>
            <button
              onClick={() => setChartType("pie")}
              className={`mx-2 py-2 px-3 ${
                chartType === "pie"
                  ? "bg-teal-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } rounded-lg`}
            >
              Pie Chart
            </button>
          </div>
        </section>
        <section className="mt-5">
          {chartType === "bar" ? (
            <BarChart categories={categories} amounts={amounts} />
          ) : (
            <PieChart categories={categories} amounts={amounts} />
          )}
        </section>
      </div>
    </main>
  );
};

export default Overview;
