"use client";
import { useState } from "react";
import "./contact.css";
import { fetcher } from "@/src/components/fetcher";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear errors on change
  };

  // ✅ Simple validation
  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return; // stop if validation fails
    setShowConfirm(true); // show confirm modal
  };

  const confirmSubmit = async () => {
    try {
      const res = await fetcher("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      alert("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setShowConfirm(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again later.");
      setShowConfirm(false);
    }
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>We’d love to hear from you! Please fill out the form below.</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter subject"
          />
          {errors.subject && <span className="error">{errors.subject}</span>}
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message"
            rows="5"
          />
          {errors.message && <span className="error">{errors.message}</span>}
        </div>

        <button type="submit" className="submit-btn">Send Message</button>
      </form>

      {/* ✅ Confirmation Box */}
      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <h3>Confirm Submission</h3>
            <p>Are you sure you want to send this message?</p>
            <div className="confirm-actions">
              <button onClick={confirmSubmit} className="confirm-btn yes">
                Yes, Send
              </button>
              <button onClick={() => setShowConfirm(false)} className="confirm-btn no">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
