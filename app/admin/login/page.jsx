"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./login.css";
import Cookies from "js-cookie";
import { fetcher } from "@/src/components/fetcher";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await fetcher("/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                credentials: "include",
            });

            localStorage.setItem("job_portal", JSON.stringify(data.user));

            Cookies.set("job_portal", data.token, { expires: 30 });
            router.push("/admin/dashboard");

            console.log("Login successful:", data);
        } catch (error) {
            console.error("Login failed:", error.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Login</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="login-button">
                        Sign In
                    </button>
                </form>

            </div>
        </div>
    );
}
