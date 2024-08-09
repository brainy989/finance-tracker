"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import IncomeForm from "./IncomeForm";
import { format, parseISO } from "date-fns";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

interface Income {
  id: number;
  attributes: {
    description: string;
    createdAt: string;
    amount: number;
  };
}

interface IncomeProps {
  refreshCashflow: () => void;
}

const Income: React.FC<IncomeProps> = ({ refreshCashflow }) => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [isIncomeFormOpen, setIsIncomeFormOpen] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = () => {
    fetch("http://localhost:1337/api/incomes?populate=income")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data.data)) {
          setIncomes(data.data);
        } else {
          console.error("Fetched data is not an array");
        }
      })
      .catch((error) => {
        console.error("Error fetching incomes:", error);
      });
  };

  const handleOpenIncomeForm = () => {
    setSelectedIncome(null);
    setIsIncomeFormOpen(true);
  };

  const handleCloseIncomeForm = () => {
    setSelectedIncome(null);
    setIsIncomeFormOpen(false);
  };

  const handleEditIncome = (income: Income) => {
    setSelectedIncome(income);
    setIsIncomeFormOpen(true);
  };

  const handleDeleteIncome = async (id: number) => {
    try {
      await axios.delete(`http://localhost:1337/api/incomes/${id}`);
      setIncomes(incomes.filter((income) => income.id !== id));
      refreshCashflow();
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, "yyyy-MM-dd HH:mm:ss");
  };

  const toggleDropdown = (id: number) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  return (
    <section className="w-1/3 h-screen bg-gray-200">
      <section className="border-b-2 border-gray-300 lg:px-6 py-3 flex justify-between">
        <h1 className="mt-6 text-xl">Income</h1>
        <section className="flex mt-6">
          <figure onClick={handleOpenIncomeForm}>
            <FaPlus className="text-gray-600 cursor-pointer" />
          </figure>
        </section>
      </section>
      <article className="w-full px-5">
        {incomes.map((income) => (
          <article
            key={income.id}
            className="h-full border-2 bg-gray-100 rounded-lg mt-4"
          >
            <article className="py-3 px-4 border-l-4 border-green-400">
              <section className="flex flex-col">
                <section className="flex justify-between mb-3">
                  <p className="leading-relaxed font-medium text-lg">
                    {income.attributes.description}
                  </p>
                  <div className="relative inline-block text-left">
                    <button
                      className="p-1"
                      onClick={() => toggleDropdown(income.id)}
                    >
                      <BsThreeDotsVertical className="text-gray-600 cursor-pointer ml-1 w-4 h-4" />
                    </button>
                    {dropdownOpen === income.id && (
                      <div className="origin-top-right absolute right-0 mt-0 mr-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div
                          className="py-1"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          <div
                            className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleEditIncome(income)}
                          >
                            <FaEdit className="mr-2 mt-1" />
                            <span>Edit</span>
                          </div>
                          <div
                            className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleDeleteIncome(income.id)}
                          >
                            <FaTrash className="mr-2 mt-1" />
                            <span>Delete</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                <section className="flex justify-between mt-2">
                  <span className="text-sm text-gray-500">
                    {formatDate(income.attributes.createdAt)}
                  </span>
                  <h1 className="text-lg font-medium text-green-500">
                    ${income.attributes.amount}
                  </h1>
                </section>
              </section>
            </article>
          </article>
        ))}
      </article>
      {isIncomeFormOpen && (
        <IncomeForm
          isOpen={isIncomeFormOpen}
          onClose={() => {
            handleCloseIncomeForm();
            fetchIncomes(); // Refresh incomes
          }}
          income={selectedIncome}
          refreshCashflow={() => {
            refreshCashflow();
            fetchIncomes(); // Refresh incomes after cashflow update
          }}
        />
      )}
    </section>
  );
};

export default Income;
