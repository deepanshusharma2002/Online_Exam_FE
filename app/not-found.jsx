"use client";
import { useRouter } from "next/navigation";
import "./notFound.css";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="notfound-container">
      <div className="notfound-box">
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Oops! Page Not Found</h2>
        <p className="notfound-text">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <button className="notfound-btn" onClick={() => router.push("/")}>
          Go Back Home
        </button>
      </div>
    </div>
  );
}
