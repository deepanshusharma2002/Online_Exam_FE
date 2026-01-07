"use client";
import React, { useEffect, useState } from "react";
import "./ViewPlans.css";
import { fetcher } from "../fetcher";
import Link from "next/link";

const ViewPlans = () => {
    const [plans, setPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        message: "",
    });

    useEffect(() => {
        fetcher("/plans?status=1&limit=6&page=1").then((res) => {
            if (res?.data) setPlans(res.data);
        });
    }, []);

    const openModal = (plan) => {
        setSelectedPlan(plan);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedPlan(null);
        setForm({ name: "", phone: "", email: "", message: "" });
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        console.log("Interested Data:", {
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
        <div className="plans-wrapper">
            <h2 className="section-title">Our Plans</h2>

            <div className="plans-grid">
                {plans.map((plan) => (
                    <div key={plan.plan_id} className="plan-card">
                        <h3>{plan.plan_name}</h3>
                        <p className="plan-type">{plan.plan_type.toUpperCase()}</p>

                        <div className="price">
                            ₹{plan.discount_price || plan.price}
                            {plan.discount_price && (
                                <span>₹{plan.price}</span>
                            )}
                        </div>

                        {plan.is_trial_available && (
                            <div className="trial">🎉 {plan.trial_days} Days Free Trial</div>
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

            <div className="view-all-wrapper">
                <Link href="/plans" className="view-all-link">
                    View All Plans →
                </Link>
            </div>

            {/* 🔔 MODAL */}
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
                                <button type="button" className="btn-cancel" onClick={closeModal}>
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

export default ViewPlans;
