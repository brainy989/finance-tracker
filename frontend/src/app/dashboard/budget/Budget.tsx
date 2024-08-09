"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import BudgetForm from "./BudgetForm";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Budget {
  id: number;
  attributes: {
    category: string;
    amount: number;
  };
}

const Budget: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [budgetLimit, setBudgetLimit] = useState<number | null>(null);
  const [isBudgetFormOpen, setIsBudgetFormOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);

  useEffect(() => {
    const fetchBudgets = () => {
      fetch("http://localhost:1337/api/budgets?populate=budget")
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Fetched budgets:", data);
          if (Array.isArray(data.data)) {
            setBudgets(data.data);
          } else {
            console.error("Fetched data is not an array");
          }
        })
        .catch((error) => {
          console.error("Error fetching budgets:", error);
        });
    };

    const fetchBudgetLimit = async () => {
      try {
        const res = await axios.get("http://localhost:1337/api/budget-limits");
        // const res = await axios.get("http://localhost:1337/api/budget-limits?populate=budget-limits");

        if (res.data.data && res.data.data[0]) {
          setBudgetLimit(res.data.data[0].attributes.limit);
        }
      } catch (error) {
        console.error("Error fetching budget limit:", error);
      }
    };

    fetchBudgets();
    fetchBudgetLimit();
  }, []);

  const handleOpenBudgetForm = () => {
    setSelectedBudget(null);
    setIsBudgetFormOpen(true);
  };

  const handleCloseBudgetForm = () => {
    setSelectedBudget(null);
    setIsBudgetFormOpen(false);
  };

  const handleEditBudget = (budget: Budget) => {
    console.log("Editing:", budget);
    setSelectedBudget(budget);
    setIsBudgetFormOpen(true);
  };

  const handleDeleteBudget = async (id: number) => {
    try {
      alert("Are you sure you want to delete this budget?");
      await axios.delete(`http://localhost:1337/api/budgets/${id}`);
      setBudgets(budgets.filter((budget) => budget.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const totalBudgetedAmount = budgets.reduce(
    (total, budget) => total + budget.attributes.amount,
    0
  );

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 pl-6">
      <div className="container mx-auto py-6">
        <section className="w-full flex flex-row justify-between py-4 px-[15px]">
          <h2 className="text-2xl text-gray-700 font-medium">BUDGET</h2>
          <button
            onClick={handleOpenBudgetForm}
            className="bg-teal-500 mx-2 py-2 px-3 w-30 text-white rounded-lg"
          >
            Add a budget
          </button>
        </section>

        <section className="w-full flex flex-row justify-between py-4 px-[15px]">
          <h3 className="text-xl text-gray-700 font-medium">
            Budget Limist: ${budgetLimit}
          </h3>
          <h3 className="text-xl text-gray-700 font-medium">
            Total Budgeted: ${totalBudgetedAmount}
          </h3>
        </section>

        <section>
          {budgets.length === 0 ? (
            <>
              <div className="container mx-auto py-6 flex justify-center">
                <p className="text-2xl text-gray-700">
                  You haven&apos;t added a budget..
                </p>
              </div>
            </>
          ) : (
            <>
              <article className="lg:mt-5 pl-6 py-4 lg:w-full w-full lg:grid lg:gap-4 lg:grid-cols-3 lg:grid-rows-3 grid -m-4 md:grid md:gap-3 md:grid-cols-2 md:grid-rows-2">
                {budgets.map((budget) => (
                  <article
                    key={budget.id}
                    className="h-full border-2 bg-gray-100 rounded-xl overflow-hidden"
                  >
                    <article className="py-3 px-5 border-l-8 border-teal-500">
                      <section className="mt-4 flex flex-row justify-between">
                        <section>
                          <section className="flex">
                            <p className="leading-relaxed font-medium text-lg capitalize">
                              {budget.attributes.category}
                            </p>
                          </section>
                          <span className="text-base text-gray-500">
                            Budget planned
                          </span>
                        </section>
                        <section>
                          <h1 className="lg:mt-5 text-xl font-medium">
                            ${budget.attributes.amount}
                          </h1>
                        </section>
                      </section>

                      <hr className="mt-5 border-2" />

                      <section className="flex items-center flex-wrap mt-5">
                        <span
                          className="mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 bg-gray-300 rounded-full p-4 cursor-pointer"
                          title="Edit"
                        >
                          <FaEdit
                            className="w-4 h-4"
                            onClick={() => handleEditBudget(budget)}
                          />
                        </span>
                        <span
                          className="inline-flex items-center leading-none text-sm bg-gray-300 rounded-full p-2 cursor-pointer"
                          title="Delete"
                        >
                          <FaTrash
                            className="w-4 h-4"
                            onClick={() => handleDeleteBudget(budget.id)}
                          />
                        </span>
                      </section>
                    </article>
                  </article>
                ))}
              </article>
            </>
          )}
        </section>

        {isBudgetFormOpen && (
          <BudgetForm
            onClose={handleCloseBudgetForm}
            setBudgets={setBudgets}
            selectedBudget={selectedBudget}
            budgetLimit={budgetLimit}
            totalBudgetedAmount={totalBudgetedAmount}
          />
        )}
      </div>
    </main>
  );
};

export default Budget;
