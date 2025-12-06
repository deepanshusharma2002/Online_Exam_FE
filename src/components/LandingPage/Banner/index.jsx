import Link from 'next/link';
import styles from './banner.module.scss';

export default function MainBanner() {
    return (
        <div className={`${styles.banner}`}>
            <div className={styles.bannerLhs}>
                <div className={styles.bannerLhsInfo}>
                    <span className={styles.tag}>Agreed Technologies</span>
                    <div className={styles.heading}>starting at just $500 for the 1st year!*</div>
                    <p>Boost your online presence with expert SEO, high-converting PPC campaigns, and stunning Web Design — all tailored to grow your brand.</p>
                    <Link href="#" className="btn btn-white">Get a Call</Link>
                </div>
            </div>
            <div className={styles.bannerRhs}>
                <div className={styles.bannerRhsInfo}>
                    <h1>Digital marketing for SMEs: <span>Spend less.</span> Achieve more.</h1>
                    <p>Allow us to take total control of your digital marketing and give you more business. More traffic. More engagement. More action. Less marketing spend.</p>
                    <Link href="#" className="btn btn-blue">Get a Call</Link>
                </div>
            </div>
        </div>
    );
}