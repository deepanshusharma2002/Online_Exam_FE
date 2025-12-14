"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import "./dashboard.css";

export default function StudentDashboard() {
  const router = useRouter();

  const [student, setStudent] = useState(null);

  useEffect(() => {
    const token = Cookies.get("job_portal_agent");
    const stored = localStorage.getItem("job_portal_agent");

    if (!token || !stored) {
      router.push("/student/login");
      return;
    }

    setStudent(JSON.parse(stored));
  }, []);

  if (!student) return null;

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="profile-card">
          <h3>Welcome, {student.name}</h3>
          <p>{student.email}</p>
        </div>
      </div>
    </div>
  );
}
