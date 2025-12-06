import Link from 'next/link';
import Image from 'next/image';
import whygoImg from '@/public/images/whyGo.png';
import styles from './whyGo.module.scss';

function WhyGo() {
    return(
        <div className={styles.blackBox}>
            <div className={styles.lhs}>
                <Image
                    src={whygoImg}
                    alt='Why go with Agreed Technologies?'
                    layout='responsive'
                />
            </div>
            <div className={styles.rhs}>
                <span className={styles.tag}>AgreedTechnologies <span>guide</span></span>
                <h2>Why go with Agreed Technologies?</h2>
                <p>Because we believe that cutting-edge solutions are only as powerful as the team delivering them. At Agreed Technologies, our experts are dedicated to driving real results through tailored digital strategies, personalized support, and a commitment to your growth—every step of the way.</p>
                <Link href="#" className='btn btn-blue'>Get Help</Link>
            </div>
        </div>
    );
}


export default WhyGo;