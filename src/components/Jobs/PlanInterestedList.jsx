"use client";
import React, { useEffect, useState } from "react";
import "./PlanInterested.css";
import { FaTrash } from "react-icons/fa";
import { fetcher } from "../fetcher";

const PlanInterestedList = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const limit = 10;

  const fetchList = async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page,
      limit,
      ...(search && { search }),
    });

    const res = await fetcher(`/plans/interested?${params.toString()}`);
    if (res?.success) {
      setData(res.data);
      setPagination(res.pagination);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchList();
  }, [page, search]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this record?")) return;

    const res = await fetcher(`/plans/interested/${id}`, {
      method: "DELETE",
    });

    if (res?.success) fetchList();
  };

  return (
    <div className="interested-wrapper">
      <h2>Plan Interested Users</h2>

      {/* 🔍 Search */}
      <input
        className="search-input"
        placeholder="Search by name / phone / email"
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
      />

      {loading ? (
        <p className="center">Loading...</p>
      ) : data.length === 0 ? (
        <p className="center">No records found.</p>
      ) : (
        <>
          <table className="interested-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={row.plan_interested_id}>
                  <td>{(page - 1) * limit + index + 1}</td>
                  <td>{row.name}</td>
                  <td>{row.phone}</td>
                  <td>{row.email || "-"}</td>
                  <td className="truncate">{row.message || "-"}</td>
                  <td>
                    {new Date(row.created_at).toLocaleDateString("en-IN")}
                  </td>
                  <td>
                    <FaTrash
                      className="delete-icon"
                      onClick={() =>
                        handleDelete(row.plan_interested_id)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {pagination && (
            <div className="pagination">
              <button
                disabled={!pagination.hasPrevPage}
                onClick={() => setPage((p) => p - 1)}
              >
                Prev
              </button>

              <span>
                Page {pagination.page} of {pagination.totalPages}
              </span>

              <button
                disabled={!pagination.hasNextPage}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PlanInterestedList;
