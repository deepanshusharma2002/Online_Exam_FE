"use client";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { fetcher } from "../fetcher";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./PostLists.css";
import ConfirmBox from "./ConfirmBox";

const PlanList = ({ handleOpenForm, handleEditData }) => {
  const [plans, setPlans] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const limit = 10;

  /* 🔍 Search */
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  /* 🔹 Filters */
  const [filters, setFilters] = useState({
    status: "",
    plan_type: "",
  });

  /* 🔁 Debounce Search */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  /* 🔹 Fetch Plans */
  const fetchPlans = async () => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        page,
        limit,
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(filters.status && { status: filters.status }),
        ...(filters.plan_type && { plan_type: filters.plan_type }),
      });

      const data = await fetcher(`/plans?${params.toString()}`);

      if (!data?.data) {
        throw new Error("Failed to fetch plans");
      }

      setPlans(data.data);
      setPagination(data.pagination);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong while fetching plans.");
    } finally {
      setLoading(false);
    }
  };

  /* 🔹 Effects */
  useEffect(() => {
    fetchPlans();
  }, [page, filters, debouncedSearch]);

  /* 🔹 Handle Filter Change */
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1);
  };

  return (
    <div className="post-container">
      {/* Header */}
      <div className="add-job-btn">
        <h2 className="post-heading">Plans</h2>
        <button onClick={handleOpenForm}>+ Add Plan</button>
      </div>

      {/* 🔍 Search */}
      <div className="filter-row">
        <div className="form-group">
          <label>Search</label>
          <input
            type="text"
            placeholder="Search by name or code"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="form-select"
          >
            <option value="">All</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>

        <div className="form-group">
          <label>Plan Type</label>
          <select
            name="plan_type"
            value={filters.plan_type}
            onChange={handleFilterChange}
            className="form-select"
          >
            <option value="">All</option>
            <option value="days">Days</option>
                <option value="months">Months</option>
                <option value="years">Years</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="loader-wrap">
          <Loader size={50} color="lightgray" />
        </div>
      ) : error ? (
        <div className="error-box">{error}</div>
      ) : plans.length === 0 ? (
        <p className="no-data">No plans found.</p>
      ) : (
        <>
          <div className="table-wrapper">
            <table className="post-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Plan Name</th>
                  <th>Plan Code</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan, index) => (
                  <tr key={plan.plan_id}>
                    <td>{(page - 1) * limit + index + 1}</td>
                    <td className="truncate-title">{plan.plan_name}</td>
                    <td>{plan.plan_code}</td>
                    <td>{plan.plan_type}</td>
                    <td>₹{plan.price}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          plan.status === 1 ? "active" : "inactive"
                        }`}
                      >
                        {plan.status === 1 ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <FaEdit
                        className="icon edit"
                        onClick={() => handleEditData(plan)}
                      />
                      <FaTrash
                        className="icon delete"
                        onClick={() => setConfirmDelete(plan)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && (
            <div className="pagination">
              <button
                disabled={pagination.page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Prev
              </button>
              <span>
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <button
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation */}
      {confirmDelete && (
        <ConfirmBox
          message={`Are you sure you want to delete "${confirmDelete.plan_name}"?`}
          onConfirm={async () => {
            const result = await fetcher(
              `/plans/${confirmDelete.plan_id}`,
              { method: "DELETE" }
            );
            if (result) {
              setConfirmDelete(null);
              fetchPlans();
            }
          }}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
};

export default PlanList;
