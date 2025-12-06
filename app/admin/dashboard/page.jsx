"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import "./dashboard.css";
import Link from "next/link";
import UpdateHomeText from "@/src/components/Jobs/UpdateHomeText";
import { fetcher } from "@/src/components/fetcher";

export default function AdminDashboard() {
  const [adminName, setAdminName] = useState("Admin");
  const [editData, setEditData] = useState({});
  const router = useRouter();

  useEffect(() => {
    // Check token in cookies
    const token = Cookies.get("job_portal");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    // Get user info from localStorage
    const storedUser = localStorage.getItem("job_portal");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setAdminName(user?.name || "Admin");
    } else {
      setAdminName("Admin");
    }
  }, [router]);

  const fetchPosts = async () => {
    try {
      const data = await fetcher(`/home/text`);
      if (!data.success) throw new Error(data.message || "Failed to fetch posts");

      setEditData(data.data[0] || {});
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong while fetching posts.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLogout = () => {
    Cookies.remove("job_portal");
    localStorage.removeItem("job_portal");
    router.push("/admin/login");
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Government Job Portal</h1>
        <div className="admin-info">
          <span>Welcome, <b>{adminName}</b></span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="stats-grid">
          <Link href="/admin/job" className="no-underline">
            <div className="stat-card blue">
              <h3>Jobs</h3>
              {/* <p>5</p> */}
            </div>
          </Link>
          <Link href="/admin/section" className="no-underline">
            <div className="stat-card green">
              <h3>Sections</h3>
              {/* <p>5</p> */}
            </div>
          </Link>
          <Link href="/admin/home-links" className="no-underline">
            <div className="stat-card orange">
              <h3>Home Links</h3>
              {/* <p>12,543</p> */}
            </div>
          </Link>
          <Link href="/admin/government-jobs" className="no-underline">
            <div className="stat-card red">
              <h3>Government Jobs</h3>
              {/* <p>23</p> */}
            </div>
          </Link>
          <Link href="/admin/contact" className="no-underline">
            <div className="stat-card blue">
              <h3>Contact Us</h3>
              {/* <p>5</p> */}
            </div>
          </Link>
          <Link href="/admin/job-priority" className="no-underline">
            <div className="stat-card green">
              <h3>Job Priority</h3>
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
        </section>

        {/* <section className="recent-activity">
          <h2>Recent Job Postings</h2>
          <table>
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Department</th>
                <th>Posted On</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Junior Engineer</td>
                <td>Public Works Department</td>
                <td>Oct 5, 2025</td>
                <td><span className="status active">Active</span></td>
              </tr>
              <tr>
                <td>Data Entry Operator</td>
                <td>Education Board</td>
                <td>Oct 3, 2025</td>
                <td><span className="status closed">Closed</span></td>
              </tr>
              <tr>
                <td>Assistant Manager</td>
                <td>Finance Department</td>
                <td>Oct 2, 2025</td>
                <td><span className="status pending">Pending</span></td>
              </tr>
            </tbody>
          </table>
        </section> */}
        <UpdateHomeText editData={editData} />
      </main>

      <footer className="dashboard-footer">
        © {new Date().getFullYear()} Government Job Portal | All Rights Reserved
      </footer>
    </div>
  );
}
