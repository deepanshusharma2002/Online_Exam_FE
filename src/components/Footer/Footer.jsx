import Link from "next/link";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-left">
          <p className="footer-title">Online Exam</p>
          <p className="footer-text">
            Secure and trusted platform for online examinations worldwide.
          </p>
        </div>

        <div className="footer-links">
          <Link href="/" className="footer-link">Home</Link>
          <Link href="/about" className="footer-link">About Us</Link>
          <Link href="/contact" className="footer-link">Contact Us</Link>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} OnlineExam. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
