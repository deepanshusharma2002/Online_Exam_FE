import Link from "next/link";
import "./header.css";

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Logo */}
        <div className="brand">
          <span className="brand-mark">OE</span>
          <Link href="/">
            <span className="brand-text">
              Online <span>Exam</span>
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="main-nav">
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link href="/about" className="nav-link">
            About Us
          </Link>
          <Link href="/contact" className="nav-link nav-cta">
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
