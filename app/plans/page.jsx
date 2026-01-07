"use client";
import React, { useEffect, useState } from "react";
import { fetcher } from "@/src/components/fetcher";
import './ViewPlans.css';

const ViewAllPlans = () => {
  const [plans, setPlans] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const fetchPlans = async () => {
    const res = await fetcher(
      `/plans?status=1&page=${page}&limit=${limit}`
    );
    if (res?.data) {
      setPlans(res.data);
      setPagination(res.pagination);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, [page]);

  const openModal = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPlan(null);
    setForm({ name: "", phone: "", email: "", message: "" });
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Interested:", {
      ...form,
      plan_id: selectedPlan.plan_id,
    });

    const payload = {
      ...form,
      plan_id: selectedPlan.plan_id,
    };

    const res = await fetcher("/plans/interested", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    alert("Thank you! We will contact you soon.");
    closeModal();
  };

  return (
    <div className="plans-page-wrapper">
      <h2 className="section-title">All Plans</h2>

      <div className="plans-grid">
        {plans.map((plan) => (
          <div key={plan.plan_id} className="plan-card">
            <h3>{plan.plan_name}</h3>
            <p className="plan-type">{plan.plan_type.toUpperCase()}</p>

            <div className="price">
              ₹{plan.discount_price || plan.price}
              {plan.discount_price && <span>₹{plan.price}</span>}
            </div>

            {plan.is_trial_available && (
              <div className="trial">
                🎉 {plan.trial_days} Days Free Trial
              </div>
            )}

            <button
              className="interest-btn"
              onClick={() => openModal(plan)}
            >
              Interested?
            </button>
          </div>
        ))}
      </div>

      {/* 🔢 Pagination */}
      {pagination && (
        <div className="pagination">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>

          <span>
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <button
            disabled={page >= pagination.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}

      {/* 🔔 Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Interested in {selectedPlan.plan_name}</h3>

            <form onSubmit={handleSubmit}>
              <input
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
              />
              <textarea
                name="message"
                placeholder="Message (optional)"
                value={form.message}
                onChange={handleChange}
              />

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllPlans;
