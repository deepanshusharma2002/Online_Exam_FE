import Link from "next/link";
import "./LandingPage.css";
import ViewPlans from "@/src/components/Jobs/ViewPlans";

export default function LandingPage() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Build Your Future with <span>Expert Coaching</span>
          </h1>
          <p>
            Trusted coaching institute for Class 6–12, Competitive Exams &
            Career Guidance.
          </p>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-us">
        <h2>Why Choose Our Coaching?</h2>
        <div className="why-grid">
          <div className="why-card">
            <h3>👨‍🏫 Expert Faculty</h3>
            <p>Highly experienced teachers with proven results.</p>
          </div>
          <div className="why-card">
            <h3>📚 Quality Study Material</h3>
            <p>Well-structured notes, tests & regular practice sessions.</p>
          </div>
          <div className="why-card">
            <h3>🏆 Proven Results</h3>
            <p>Consistent top ranks and high success ratio.</p>
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section className="courses">
        <h2>Popular Courses</h2>
        <div className="course-grid">
          <div className="course-card">
            <h3>Class 1–10</h3>
            <p>Foundation & Concept Building</p>
          </div>
          <div className="course-card">
            <h3>Class 11–12</h3>
            <p>Board + Competitive Preparation</p>
          </div>
          {/* <div className="course-card">
            <h3>Competitive Exams</h3>
            <p>SSC, Banking, NDA, CUET & more</p>
          </div> */}
        </div>
      </section>

      <ViewPlans />
    </>
  );
}
