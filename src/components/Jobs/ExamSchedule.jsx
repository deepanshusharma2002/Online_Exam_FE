"use client";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import "./CreateJob.css";
import { fetcher } from "../fetcher";

const ExamSchedule = ({ handleCloseForm, editData }) => {
  const [formData, setFormData] = useState({
    exam_name: "",
    start_date: "",
    start_time: "",
    end_date: "",
    end_time: "",
    exam_time_min: 0,
    total_q: 0,
    class: "",
    subject: "",
    status: 1,
  });

  const subjectsByClass = {
    1: ["English", "Hindi", "Math", "EVS"],
    2: ["English", "Hindi", "Math", "EVS"],
    3: ["English", "Hindi", "Math", "EVS", "GK"],
    4: ["English", "Hindi", "Math", "EVS", "GK"],
    5: ["English", "Hindi", "Math", "EVS", "GK"],
    6: ["English", "Hindi", "Math", "Science", "Social Science"],
    7: ["English", "Hindi", "Math", "Science", "Social Science"],
    8: ["English", "Hindi", "Math", "Science", "Social Science"],
    9: ["English", "Hindi", "Math", "Science", "Social Science"],
    10: ["English", "Hindi", "Math", "Science", "Social Science"],
    11: ["Physics", "Chemistry", "Math", "Biology"],
    12: ["Physics", "Chemistry", "Math", "Biology"],
  };

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });
  const isEditMode = !!editData;

  /* ✅ PREFILL DATA */
  useEffect(() => {
    if (isEditMode && editData) {
      setFormData({
        exam_name: editData.exam_name || "",
        start_date: editData.start_date?.slice(0, 10) || "",
        start_time: editData.start_time || "",
        end_date: editData.end_date?.slice(0, 10) || "",
        end_time: editData.end_time || "",
        exam_time_min: editData.exam_time_min || 0,
        total_q: editData.total_q || 0,
        class: editData.class || "",
        subject: editData.subject || "",
        status: editData.status ?? 1,
      });
    }
  }, [editData]);

  /* ✅ HANDLE INPUT */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* ✅ VALIDATION */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.exam_name.trim())
      newErrors.exam_name = "Exam name is required";
    if (!formData.start_date)
      newErrors.start_date = "Start date is required";
    if (!formData.start_time)
      newErrors.start_time = "Start time is required";
    if (!formData.end_date)
      newErrors.end_date = "End date is required";
    if (!formData.end_time)
      newErrors.end_time = "End time is required";
    if (!formData.total_q)
      newErrors.total_q = "Exam Questions is required";
    if (!formData.exam_time_min)
      newErrors.exam_time_min = "Exam time is required";
    if (!formData.class > 0) newErrors.class = "Class is required";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";

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
        ? `/student/exam-schedule/${editData.exam_schedule_id}`
        : "/student/exam-schedule";

      const result = await fetcher(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (result.success) {
        setMessage({
          type: "success",
          text: `Exam schedule ${isEditMode ? "updated" : "created"} successfully`,
        });

        setErrors({});
        setTimeout(() => handleCloseForm(), 800);
      } else {
        setMessage({
          type: "error",
          text: result.message || "Operation failed",
        });
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
        <h2>
          {isEditMode ? "Edit Exam Schedule" : "Create Exam Schedule"}
        </h2>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Exam Name */}
          <div className="form-group">
            <label>Exam Name</label>
            <input
              type="text"
              name="exam_name"
              value={formData.exam_name}
              onChange={handleChange}
              placeholder="Enter Exam Name..."
            />
            {errors.exam_name && (
              <span className="error">{errors.exam_name}</span>
            )}
          </div>

          {/* Start Date */}
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
            />
            {errors.start_date && (
              <span className="error">{errors.start_date}</span>
            )}
          </div>

          {/* Start Time */}
          <div className="form-group">
            <label>Start Time</label>
            <input
              type="time"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
            />
            {errors.start_time && (
              <span className="error">{errors.start_time}</span>
            )}
          </div>

          {/* End Date */}
          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
            />
            {errors.end_date && (
              <span className="error">{errors.end_date}</span>
            )}
          </div>

          {/* End Time */}
          <div className="form-group">
            <label>End Time</label>
            <input
              type="time"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
            />
            {errors.end_time && (
              <span className="error">{errors.end_time}</span>
            )}
          </div>

          <div className="form-group">
            <label>Exam Questions</label>
            <input
              type="number"
              name="total_q"
              value={formData.total_q}
              onChange={handleChange}
              placeholder="Enter Exam Questions..."
            />
            {errors.total_q && (
              <span className="error">{errors.total_q}</span>
            )}
          </div>

          <div className="form-group">
            <label>Exam Time (Minutes)</label>
            <input
              type="number"
              name="exam_time_min"
              value={formData.exam_time_min}
              onChange={handleChange}
              placeholder="Enter Exam Time..."
            />
            {errors.exam_time_min && (
              <span className="error">{errors.exam_time_min}</span>
            )}
          </div>

          <div className="form-group">
            <label>Class</label>
            <select
              name="class"
              value={formData.class}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select Class</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  Class {i + 1}
                </option>
              ))}
            </select>
            {errors.class && <span className="error">{errors.class}</span>}
          </div>

          <div className="form-group">
            <label>Subject</label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="form-select"
              disabled={!formData.class}
            >
              <option value="">Select Subject</option>

              {subjectsByClass[formData.class]?.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            {errors.subject && <span className="error">{errors.subject}</span>}
          </div>

          {/* Status */}
          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value={1}>Active</option>
              <option value={2}>Inactive</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">
            {isEditMode ? "Update Schedule" : "Create Schedule"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExamSchedule;
