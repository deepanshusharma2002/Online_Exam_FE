"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import "../dashboard/dashboard.css";
import Link from "next/link";
import PlanInterestedList from "@/src/components/Jobs/PlanInterestedList";

export default function PlainDashboard() {
    const [adminName, setAdminName] = useState("Admin");
    const router = useRouter();

    useEffect(() => {
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

    const handleLogout = () => {
        Cookies.remove("job_portal");
        localStorage.removeItem("job_portal");
        router.push("/admin/login");
    };



    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Plans</h1>
                <div className="admin-info">
                    <Link href="/admin/dashboard">Click for Dashboard</Link>
                    <span>Welcome, <b>{adminName}</b></span>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </header>

            <PlanInterestedList />
            <footer className="dashboard-footer">
                © {new Date().getFullYear()} Online Exam | All Rights Reserved
            </footer>
        </div>
    );
}
