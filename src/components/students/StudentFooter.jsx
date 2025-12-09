import React from "react";
import "./StudentLayout.css";

const StudentFooter = () => {
  return (
    <footer className="student-footer">
      <p>
        © {new Date().getFullYear()} Student Learning Portal. All rights reserved.
      </p>
    </footer>
  );
};

export default StudentFooter;
