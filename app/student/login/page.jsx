"use client";

import { useEffect, useState } from "react";
import { fetcher } from "@/src/components/agentFetcher";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import "./login.css";

export default function StudentLogin() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        const token = Cookies.get("job_portal_agent");
        const storedStudent = localStorage.getItem("job_portal_agent");

        // ✅ If not logged in, redirect
        if (token || storedStudent) {
            router.push("/student/dashboard");
            return;
        }

        // setStudent(JSON.parse(storedStudent));
    }, [router]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetcher("/student/login-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            // ✅ Store token in cookie
            Cookies.set("job_portal_agent", res.token, {
                expires: 7,
            });

            localStorage.setItem("job_portal_agent", JSON.stringify(res.student));

            alert("Login successful");
            router.push("/student/dashboard"); // change later if needed
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Student Login</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="signup-link">
                    New student? <a href="/student/signup">Create an account</a>
                </p>
            </div>
        </div>
    );
}
