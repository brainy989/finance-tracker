"use client";
import React, { ChangeEvent, useEffect, useReducer, useState } from "react";
import axios from "axios";
import Budget from "./Budget";

interface BudgetFormProps {
  onClose: () => void;
  setBudgets: React.Dispatch<React.SetStateAction<Budget[]>>;
  selectedBudget: Budget | null;
}

const BudgetForm: React.FC<BudgetFormProps> = ({
  onClose,
  setBudgets,
  selectedBudget,
}) => {
  const initialState = {
    category: "food",
    amount: 0,
  };

  function reducer(
    state = initialState,
    { field, value }: { field: string; value: any }
  ) {
    return { ...state, [field]: value };
  }

  const [formFields, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (selectedBudget) {
      for (const [key, value] of Object.entries(selectedBudget?.attributes)) {
        dispatch({ field: key, value });
      }
    } else {
      for (const [key, value] of Object.entries(initialState)) {
        dispatch({ field: key, value });
      }
    }
  }, [selectedBudget]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    dispatch({ field: name, value });
  };

  const handleSendBudget = async () => {
    try {
      const { category, amount } = formFields;

      if (selectedBudget) {
        const data = await axios.put(
          `http://localhost:1337/api/budgets/${selectedBudget.id}`,
          {
            data: { category, amount },
          }
        );
        console.log(data);
        setBudgets((prev) =>
          prev.map((inv) =>
            inv.id === selectedBudget.id ? { ...inv, ...formFields } : inv
          )
        );
        window.location.reload();
      } else {
        // Create a new budget
        const { data } = await axios.post("http://localhost:1337/api/budgets", {
          data: { category, amount },
        });
        console.log(data);
        setBudgets((prev) => [...prev, data.data]);
      }
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <main className="fixed top-0 z-50 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50">
        <section className="relative lg:px-10 px-6 py-8 lg:mt-8 lg:w-[40%] bg-white shadow-md rounded px-8 pt-2 pb-8 mb-4">
          <form className="pt-4">
            <h2 className="text-lg font-medium mb-4">
              {selectedBudget ? "Edit Budget" : "Create Budget"}
            </h2>
            <button
              className="absolute top-2 right-8 font-bold text-black cursor-pointer text-2xl"
              onClick={onClose}
            >
              &times;
            </button>

            <div className="mb-4 flex flex-row justify-between">
              <div className="flex flex-col w-[30%]">
                <label
                  htmlFor="category"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Budget category
                </label>
                <select
                  name="category"
                  id="category"
                  value={formFields.category}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="food">Food</option>
                  <option value="transportation">Transportation</option>
                  <option value="housing">Housing</option>
                  <option value="savings">Savings</option>
                  <option value="miscellaneous">Miscellaneous</option>
                </select>
              </div>

              <div className="flex flex-col w-[30%]">
                <label
                  htmlFor="amount"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Category Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="Input category amount"
                  onChange={handleInputChange}
                  value={formFields.amount}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={handleSendBudget}
                className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white  bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {selectedBudget ? "Update Budget" : "Add Budget"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default BudgetForm;
