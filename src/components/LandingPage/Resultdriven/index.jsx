import Link from 'next/link';
import styles from './resultDriven.module.scss';

function ResultsDriven() {
    return(
        <div className="whiteBox">
            <h2>We're result driven digital marketing agency</h2>
            <p>Agreed Technologies is a top result-driven digital marketing agency with a diverse team of skilled marketers, talented designers, expert content writers, prompt engineers, web developers, strategists, and video creators. Our dedicated team delivers innovative, customized solutions tailored to meet the unique needs of each client. We leverage cutting-edge technology and data-driven strategies to maximize ROI and drive business growth. Focusing on creativity and efficiency, we help brands establish a strong online presence and effectively engage their target audience.</p>
            <div className={styles.ctaWrap}>
                <Link href="#" className='btn btn-blue'>Our Services</Link>
                <Link href="#" className='btn btn-black'>Case Studies</Link>
                <Link href="#" className='btn btn-black'>Business enquiry form</Link>
            </div>
        </div>
    )
}

export default ResultsDriven;