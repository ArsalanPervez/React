"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Home = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm();

  const [transaction, setTransaction] = useState([]);

  const [cashInCategory] = useState([
    "Salary",
    "Business",
    "Loan",
    "Investment",
  ]);
  const [cashOutCategory] = useState([
    "Groceries",
    "Fuel",
    "Food/Drink",
    "Car/Bike",
    "Taxi",
    "Clothes",
    "Shopping",
    "Entertainment",
    "Electricity",
  ]);

  const watchExpenseType = watch("expense", "cash-in");

  const onSubmit = (data) => {
    setTransaction((prev) => [...prev, data]);
    reset();
  };

  const totalCashIn = transaction
    .filter((item) => item.expense === "cash-in")
    .reduce((sum, item) => sum + parseFloat(item.amount), 0);

  const totalCashOut = transaction
    .filter((item) => item.expense === "cash-out")
    .reduce((sum, item) => sum + parseFloat(item.amount), 0);

  const balance = totalCashIn - totalCashOut;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-neutral text-neutral-content p-4 mb-6 text-center">
        <h1 className="text-2xl font-semibold">Expense Management System</h1>
      </div>

      <div className="container flex gap-5 justify-between mx-auto px-4 bg-neutral text-neutral-content p-4 mb-6 text-center">
        <div>
          <h1 className="text-2xl font-semibold">CASH IN</h1>
          <h3 className="text-xl font-semibold text-green-500">PKR {totalCashIn}</h3>
        </div>

        <div>
          <h1 className="text-2xl font-semibold">CASH OUT</h1>
          <h3 className="text-xl font-semibold text-red-500">PKR {totalCashOut}</h3>
        </div>

        <div>
          <h1 className="text-2xl font-semibold">BALANCE</h1>
          <h3 className="text-xl font-semibold">PKR {balance}</h3>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <form
          className="bg-white shadow-md rounded px-8 py-6 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Amount</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="Enter Amount"
              {...register("amount", { required: "Amount is required" })}
            />
            {errors.amount && (
              <p className="text-red-600 text-sm mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Expense Type</span>
            </label>
            <select
              className="select select-bordered w-full"
              {...register("expense", { required: "Please select expense type" })}
            >
              <option value="cash-in">Cash In</option>
              <option value="cash-out">Cash Out</option>
            </select>
            {errors.expense && (
              <p className="text-red-600 text-sm mt-1">
                {errors.expense.message}
              </p>
            )}
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Expense Category {watchExpenseType}</span>
            </label>
            <select
              className="select select-bordered w-full"
              {...register("category", {
                required: "Please select expense category",
              })}
            >
              {watchExpenseType == "cash-in"
                ? cashInCategory.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))
                : cashOutCategory.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
            </select>
            {errors.category && (
              <p className="text-red-600 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Expense Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Enter Description"
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters long",
                },
              })}
            ></textarea>
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Submit
          </button>
        </form>
        
        <div className="overflow-x-auto">
          <table className="table w-full bg-white shadow-md rounded">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transaction.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center text-gray-600 py-4">
                    No Record
                  </td>
                </tr>
              ) : (
                transaction.map((item, index) => (
                  <tr
                    className={index % 2 === 0 ? "hover" : ""}
                    key={index}
                  >
                    <td>{index + 1}</td>
                    <td>{item.description}</td>
                    <td>
                      {item.expense === "cash-in" ? (
                        <span className="text-green-500">+{item.amount}</span>
                      ) : (
                        <span className="text-red-500">-{item.amount}</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
