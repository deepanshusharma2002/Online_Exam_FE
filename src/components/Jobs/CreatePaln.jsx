"use client";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import "./CreateJob.css";
import { fetcher } from "../fetcher";

const CreatePlan = ({ handleCloseForm, editData }) => {
  const isEditMode = !!editData;

  const [formData, setFormData] = useState({
    plan_name: "",
    plan_code: "",
    plan_type: "monthly",

    is_duration_value_available: false,
    duration_value: "",
    duration_unit: "months",

    price: "",
    discount_price: "",
    tax_percentage: "",

    is_trial_available: false,
    trial_days: "",

    status: 1,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });

  /* ✅ PREFILL EDIT DATA */
  useEffect(() => {
    if (isEditMode && editData) {
      setFormData({
        plan_name: editData.plan_name || "",
        plan_code: editData.plan_code || "",
        plan_type: editData.plan_type || "monthly",

        is_duration_value_available:
          editData.is_duration_value_available || false,
        duration_value: editData.duration_value || "",
        duration_unit: editData.duration_unit || "months",

        price: editData.price || "",
        discount_price: editData.discount_price || "",
        tax_percentage: editData.tax_percentage || "",

        is_trial_available: editData.is_trial_available || false,
        trial_days: editData.trial_days || "",

        status: editData.status ?? 1,
      });
    }
  }, [editData, isEditMode]);

  /* ✅ HANDLE INPUT */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  /* ✅ VALIDATION */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.plan_name.trim())
      newErrors.plan_name = "Plan name is required";

    if (!formData.plan_code.trim())
      newErrors.plan_code = "Plan code is required";

    if (!formData.price)
      newErrors.price = "Price is required";

    if (
      formData.is_duration_value_available &&
      !formData.duration_value
    ) {
      newErrors.duration_value = "Duration value is required";
    }

    if (
      formData.is_trial_available &&
      !formData.trial_days
    ) {
      newErrors.trial_days = "Trial days required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ✅ SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!validateForm()) return;

    try {
      const method = isEditMode ? "PUT" : "POST";
      const endpoint = isEditMode
        ? `/plans/${editData.plan_id}`
        : `/plans`;

      const payload = {
        ...formData,
        price: Number(formData.price),
        discount_price: formData.discount_price
          ? Number(formData.discount_price)
          : null,
        tax_percentage: formData.tax_percentage
          ? Number(formData.tax_percentage)
          : null,
        duration_value: formData.duration_value
          ? Number(formData.duration_value)
          : null,
        trial_days: formData.trial_days
          ? Number(formData.trial_days)
          : null,
      };

      const result = await fetcher(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (result?.data || result?.message) {
        setMessage({
          type: "success",
          text: `Plan ${isEditMode ? "updated" : "created"} successfully`,
        });

        setTimeout(() => handleCloseForm(), 800);
      } else {
        throw new Error(result.message || "Operation failed");
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="create-job-container">
      <div className="header-links">
        <a className="back-link" onClick={handleCloseForm}>
          <FaArrowLeft /> Back
        </a>
      </div>

      <div className="form-card">
        <h2>{isEditMode ? "Edit Plan" : "Create Plan"}</h2>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Plan Name */}
          <div className="form-group">
            <label>Plan Name</label>
            <input
              type="text"
              name="plan_name"
              value={formData.plan_name}
              onChange={handleChange}
              placeholder="Enter plan name"
            />
            {errors.plan_name && <span className="error">{errors.plan_name}</span>}
          </div>

          {/* Plan Code */}
          <div className="form-group">
            <label>Plan Code</label>
            <input
              type="text"
              name="plan_code"
              value={formData.plan_code}
              onChange={handleChange}
              placeholder="e.g. BASIC_3M"
            />
            {errors.plan_code && <span className="error">{errors.plan_code}</span>}
          </div>

          {/* Plan Type */}
          <div className="form-group">
            <label>Plan Type</label>
            <select name="plan_type" value={formData.plan_type} onChange={handleChange}>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="half_yearly">Half Yearly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          {/* Price */}
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
            {errors.price && <span className="error">{errors.price}</span>}
          </div>

          {/* Discount */}
          <div className="form-group">
            <label>Discount Price</label>
            <input
              type="number"
              name="discount_price"
              value={formData.discount_price}
              onChange={handleChange}
            />
          </div>

          {/* Duration */}
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="is_duration_value_available"
                checked={formData.is_duration_value_available}
                onChange={handleChange}
              />
              Has Duration
            </label>
          </div>

          {formData.is_duration_value_available && (
            <div className="form-row">
              <input
                type="number"
                name="duration_value"
                value={formData.duration_value}
                onChange={handleChange}
                placeholder="Duration value"
              />
              <select
                name="duration_unit"
                value={formData.duration_unit}
                onChange={handleChange}
              >
                <option value="days">Days</option>
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>
          )}

          {/* Trial */}
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="is_trial_available"
                checked={formData.is_trial_available}
                onChange={handleChange}
              />
              Trial Available
            </label>
          </div>

          {formData.is_trial_available && (
            <div className="form-group">
              <input
                type="number"
                name="trial_days"
                value={formData.trial_days}
                onChange={handleChange}
                placeholder="Trial Days"
              />
              {errors.trial_days && (
                <span className="error">{errors.trial_days}</span>
              )}
            </div>
          )}

          {/* Status */}
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">
            {isEditMode ? "Update Plan" : "Create Plan"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePlan;
