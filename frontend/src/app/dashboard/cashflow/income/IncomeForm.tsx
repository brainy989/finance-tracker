import React, { useState, useEffect } from "react";
import axios from "axios";

interface IncomeFormProps {
  isOpen: boolean;
  onClose: () => void;
  income: {
    id: number;
    attributes: { description: string; amount: number };
  } | null;
  refreshCashflow: () => void;
}

const IncomeForm: React.FC<IncomeFormProps> = ({
  isOpen,
  onClose,
  income,
  refreshCashflow,
}) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    if (income) {
      setDescription(income.attributes.description);
      setAmount(income.attributes.amount);
    } else {
      setDescription("");
      setAmount(0);
    }
  }, [income]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const incomeData = { description, amount };

    try {
      if (income) {
        await axios.put(`http://localhost:1337/api/incomes/${income.id}`, {
          data: incomeData,
        });
      } else {
        await axios.post("http://localhost:1337/api/incomes", {
          data: incomeData,
        });
      }
      refreshCashflow();
      onClose();
    } catch (error) {
      console.error("Error submitting income:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <main className="fixed top-0 z-50 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50">
      <section className="relative lg:px-10 px-6 py-8 lg:mt-8 lg:w-[40%] bg-white shadow-md rounded px-8 pt-2 pb-8 mb-4">
        <form className="pt-4" onSubmit={handleSubmit}>
          <h2 className="text-lg font-medium mb-4">
            {income ? "Edit income" : "Add income"}
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
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                name="description"
                type="text"
                placeholder="Input description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col w-[30%]">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="amount"
              >
                Category Amount
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="amount"
                name="amount"
                type="number"
                placeholder="Input category amount"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                required
              />
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {income ? "Edit income" : "Add income"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default IncomeForm;
