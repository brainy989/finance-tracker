"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Income from "./income/Income";
import Expense from "./expense/Expense";
import { format, parseISO } from "date-fns";

interface CashflowItem {
  id: number;
  type: "income" | "expense";
  description: string;
  createdAt: string;
  amount: number;
}

const Cashflow: React.FC = () => {
  const [cashflow, setCashflow] = useState<CashflowItem[]>([]);

  const fetchCashflow = async () => {
    try {
      const incomesResponse = await axios.get(
        "http://localhost:1337/api/incomes?populate=income"
      );
      const expensesResponse = await axios.get(
        "http://localhost:1337/api/expenses?populate=expense"
      );

      const incomes = incomesResponse.data.data.map((income: any) => ({
        id: income.id,
        type: "income",
        description: income.attributes.description,
        createdAt: income.attributes.createdAt,
        amount: income.attributes.amount,
      }));

      const expenses = expensesResponse.data.data.map((expense: any) => ({
        id: expense.id,
        type: "expense",
        description: expense.attributes.description,
        createdAt: expense.attributes.createdAt,
        amount: expense.attributes.amount,
      }));

      // Combine incomes and expenses and sort by createdAt in descending order
      const combined = [...incomes, ...expenses].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setCashflow(combined);
    } catch (error) {
      console.error("Error fetching cashflow:", error);
    }
  };

  useEffect(() => {
    fetchCashflow();
  }, []);

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto">
      <section className="flex">
        <Income refreshCashflow={fetchCashflow} />

        <section className="w-1/3 h-screen bg-gray-100 border-x-2 border-gray-300">
          <section className="border-b-2 border-gray-300 lg:px-6 py-3 flex justify-between">
            <h1 className="mt-6 text-xl">Cashflow</h1>
          </section>
          <article className="w-full px-5">
            {cashflow.map((item) => (
              <article
                key={item.id}
                className={`h-full border-2 bg-gray-100 rounded-lg overflow-hidden mt-4 ${
                  item.type === "income" ? "border-green-400" : "border-red-400"
                }`}
              >
                <article className="py-3 px-4">
                  <section className="flex flex-row justify-between">
                    <section>
                      <section className="flex mb-3">
                        <p className="leading-relaxed font-medium text-lg">
                          {item.description}
                        </p>
                      </section>
                      {/* <span className="text-base text-gray-500">{new Date(item.createdAt).toLocaleString()}</span> */}
                      <span className="text-base text-gray-500">
                        {format(
                          parseISO(item.createdAt),
                          "yyyy-MM-dd HH:mm:ss"
                        )}
                      </span>
                    </section>
                    <section className="flex">
                      <h1 className="lg:mt-5 text-xl font-medium">
                        ${item.amount.toFixed(2)}
                      </h1>
                    </section>
                  </section>
                </article>
              </article>
            ))}
          </article>
        </section>

        <Expense refreshCashflow={fetchCashflow} />
      </section>
    </main>
  );
};

export default Cashflow;
