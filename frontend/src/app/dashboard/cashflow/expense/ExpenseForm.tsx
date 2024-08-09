import React, { useEffect, useState } from "react";
import axios from "axios";

interface ExpenseFormProps {
  isOpen: boolean;
  onClose: () => void;
  expense: {
    id: number;
    attributes: { description: string; amount: number };
  } | null;
  refreshCashflow: () => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  isOpen,
  onClose,
  expense,
  refreshCashflow,
}) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    if (expense) {
      console.log("Editing expense:", expense);
      setDescription(expense.attributes.description);
      setAmount(expense.attributes.amount);
    } else {
      setDescription("");
      setAmount(0);
    }
  }, [expense]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const expenseData = { description, amount };

    try {
      if (expense) {
        await axios.put(`http://localhost:1337/api/expenses/${expense.id}`, {
          data: expenseData,
        });
      } else {
        await axios.post("http://localhost:1337/api/expenses", {
          data: expenseData,
        });
      }
      refreshCashflow();
      onClose();
    } catch (error) {
      console.error("Error submitting expense:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <main className="fixed top-0 z-50 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50">
      <section className="relative lg:px-10 px-6 py-8 lg:mt-8 lg:w-[40%] bg-white shadow-md rounded px-8 pt-2 pb-8 mb-4">
        <form className="pt-4" onSubmit={handleSubmit}>
          <h2 className="text-lg font-medium mb-4">
            {expense ? "Edit Expense" : "Add Expense"}
          </h2>
          <button
            onClick={onClose}
            className="absolute top-2 right-8 font-bold text-black cursor-pointer text-2xl"
          >
            &times;
          </button>

          <div className="mb-4 flex flex-row justify-between">
            <div className="flex flex-col w-[30%]">
              <label
                htmlFor="description"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                placeholder="Input description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
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
                placeholder="Input amount"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {expense ? "Edit Expense" : "Add Expense"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ExpenseForm;
