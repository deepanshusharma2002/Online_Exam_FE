"use client";
import React from "react";
import "./ConfirmBox.css";

const ConfirmBox = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirm-overlay">
      <div className="confirm-box">
        <h3>Confirm Action</h3>
        <p>{message || "Are you sure you want to delete this item?"}</p>
        <div className="confirm-actions">
          <button className="confirm-btn delete" onClick={onConfirm}>
            Yes, Delete
          </button>
          <button className="confirm-btn cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
