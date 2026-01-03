import "./AboutUs.css";

export default function AboutUs() {
  return (
    <div className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About Our Coaching Institute</h1>
          <p>
            Empowering students with quality education, strong fundamentals,
            and confidence to succeed.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="about-section">
        <h2>Who We Are</h2>
        <p className="about-text">
          We are a dedicated coaching institute committed to helping students
          achieve academic excellence and career success. With experienced
          faculty, structured study material, and a student-first approach, we
          ensure every learner reaches their true potential.
        </p>
      </section>

      {/* MISSION & VISION */}
      <section className="about-section light">
        <div className="about-grid">
          <div className="about-card">
            <h3>🎯 Our Mission</h3>
            <p>
              To provide high-quality education that builds strong concepts,
              discipline, and confidence in students from Class 6 to
              competitive-level exams.
            </p>
          </div>

          <div className="about-card">
            <h3>🌟 Our Vision</h3>
            <p>
              To become a trusted coaching brand known for results, innovation,
              and shaping future leaders.
            </p>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="about-section">
        <h2>Why Choose Us</h2>
        <div className="about-grid">
          <div className="about-card">
            <h3>👨‍🏫 Experienced Faculty</h3>
            <p>
              Highly qualified teachers with years of classroom and competitive
              exam experience.
            </p>
          </div>

          <div className="about-card">
            <h3>📚 Concept-Focused Teaching</h3>
            <p>
              We focus on fundamentals, not rote learning, to ensure long-term
              success.
            </p>
          </div>

          <div className="about-card">
            <h3>📈 Proven Track Record</h3>
            <p>
              Thousands of successful students with consistently high results.
            </p>
          </div>
        </div>
      </section>

      {/* DIRECTOR MESSAGE */}
      <section className="about-section light">
        <h2>Message from the Director</h2>
        <p className="about-text">
          “Our goal is not just to help students score marks, but to develop
          confidence, discipline, and a love for learning. We believe every
          student can succeed with the right guidance.”
        </p>
        <p className="director-name">— Director, Coaching Institute</p>
      </section>
    </div>
  );
}
