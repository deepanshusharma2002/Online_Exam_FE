"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import "./dashboard.css";
import Link from "next/link";

export default function AdminDashboard() {
  const [adminName, setAdminName] = useState("Admin");
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("job_portal");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    const storedUser = localStorage.getItem("job_portal");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setAdminName(user?.name || "Admin");
    } else {
      setAdminName("Admin");
    }
  }, [router]);

  const handleLogout = () => {
    Cookies.remove("job_portal");
    localStorage.removeItem("job_portal");
    router.push("/admin/login");
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Online Exam</h1>
        <div className="admin-info">
          <span>Welcome, <b>{adminName}</b></span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="stats-grid">
          <Link href="/admin/notes" className="no-underline">
            <div className="stat-card blue">
              <h3>Notes</h3>
              {/* <p>5</p> */}
            </div>
          </Link>
          {/* <Link href="/admin/section" className="no-underline">
            <div className="stat-card green">
              <h3>Sections</h3>
            </div>
          </Link> */}
          <Link href="/admin/contact" className="no-underline">
            <div className="stat-card blue">
              <h3>Contact Us</h3>
              {/* <p>5</p> */}
            </div>
          </Link>
          <Link href="/admin/questions" className="no-underline">
            <div className="stat-card green">
              <h3>Q & A for Student</h3>
              {/* <p>for Student</p> */}
            </div>
          </Link>
          <Link href="/admin/student" className="no-underline">
            <div className="stat-card blue">
              <h3>Students</h3>
              {/* <p>for Student</p> */}
            </div>
          </Link>
          <Link href="/admin/exam-schedule" className="no-underline">
            <div className="stat-card blue">
              <h3>Exam Schedule</h3>
              {/* <p>for Student</p> */}
            </div>
          </Link>
          <Link href="/admin/plans" className="no-underline">
            <div className="stat-card blue">
              <h3>Plan</h3>
              {/* <p>for Student</p> */}
            </div>
          </Link>

          <Link href="/admin/plan-interested" className="no-underline">
            <div className="stat-card blue">
              <h3>Interested in Plan</h3>
              {/* <p>for Student</p> */}
            </div>
          </Link>
        </section>
      </main>

      <footer className="dashboard-footer">
        © {new Date().getFullYear()} Online Exam | All Rights Reserved
      </footer>
    </div>
  );
}
