"use client";

import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaTrash, FaPlus } from "react-icons/fa";
import "./CreateJob.css";
import { fetcher } from "../fetcher";
import dynamic from "next/dynamic";
const CkEditor = dynamic(() => import("../CustomEditor/CkEditor"), { ssr: false });

const CreateJob = ({ handleCloseForm, editData }) => {
  const [editorData, setEditorData] = useState("");
  const [data, setData] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    class: "",
    subject: "",
    status: 1,
  });

  const [importantQuesAns, setImportantQuesAns] = useState([{ question: "", answer: "" }]);

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title || "",
        class: editData.class || "",
        subject: editData.subject || "",
        status: editData.status || 1,
      });
      setImportantQuesAns(editData.importantQuesAns.length ? editData.importantQuesAns : [{ question: "", answer: "" }]);
    }
  }, [editData]);

  // ✅ Handlers for inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleQuesAnsChange = (index, field, value) => {
    const updated = [...importantQuesAns];
    updated[index][field] = value;
    setImportantQuesAns(updated);
  };

  const addQuestionAnswer = () => setImportantQuesAns([...importantQuesAns, { question: "", answer: "" }]);
  const deleteQuestionAnswer = (index) => setImportantQuesAns(importantQuesAns.filter((_, i) => i !== index));

  const handleOnUpdate = (editor, field) => {
    if (field === "description") setData(editor);
  };

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

  // ✅ Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "News title is required";
    if (!formData.class > 0) newErrors.class = "Class is required";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    if (!validateForm()) return;

    try {
      const payload = {
        ...formData,
        description: data,
        importantQuesAns,
      };

      let result;
      if (editData) {
        // Update job
        result = await fetcher(`/naukari/${editData.naukari_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        });
      } else {
        // Create job
        result = await fetcher("/naukari", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        });
      }

      if (result.success) {
        setMessage({ type: "success", text: `Notes ${editData ? "updated" : "created"} successfully!` });
        handleCloseForm();
      } else {
        setMessage({ type: "error", text: result.message || `Failed to ${editData ? "update" : "create"} Notes` });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message || `Failed to ${editData ? "update" : "create"} Notes` });
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
        <h2>{editData ? "Edit News Post" : "Create News Post"}</h2>

        {message.text && <div className={`message ${message.type}`}>{message.text}</div>}

        <form onSubmit={handleSubmit}>
          {/* Basic Job Info */}
          <div className="form-group">
            <label>Notes Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter Notes title..." />
            {errors.title && <span className="error">{errors.title}</span>}
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

          <div className="form-group">
            <label>Notes Description</label>
            <CkEditor editData={editData} editorData={editorData} setEditorData={setEditorData} handleOnUpdate={(data) => handleOnUpdate(data, "description")} />
            {errors.description && <span className="error">{errors.description}</span>}
          </div>

          <div className="seo-section">
            <h3>Important Questions & Answers</h3>

            {importantQuesAns.map((item, index) => (
              <div key={index} className="qa-item">
                <div className="form-group">
                  <label>Question {index + 1}</label>
                  <input
                    type="text"
                    value={item.question}
                    onChange={(e) =>
                      handleQuesAnsChange(index, "question", e.target.value)
                    }
                    placeholder="Enter question..."
                  />
                </div>

                <div className="form-group">
                  <label>Answer</label>
                  <input
                    type="text"
                    value={item.answer}
                    onChange={(e) =>
                      handleQuesAnsChange(index, "answer", e.target.value)
                    }
                    placeholder="Enter answer..."
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => deleteQuestionAnswer(index)}
                  // disabled={importantQuesAns.length === 1}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="add-btn"
                onClick={addQuestionAnswer}
              >
                <FaPlus /> Add Important Question and Answer
              </button>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            {editData ? "Update Notes" : "Create Notes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
