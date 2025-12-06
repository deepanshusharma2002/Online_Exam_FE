import Image from 'next/image';
import styles from './seoResults.module.scss';

function SeoResults() {
    return(
        <div className={`whiteBox`}>
            <h2>Historic SEO Results</h2>
            <p className='text-center'>Agreed Technologies enjoyed a historic year in 2025 helping of all sizes and industries with their SEO needs. Two of our core beliefs are relationships and results, and you can see with the following numbers how much impact we had for business. Here's a look at Agreed Technologies 2025 cumulative SEO results across all the client served.</p>

            <div className={styles.seovalues}>
                {SeoValueData && SeoValueData.map((data, index) => {
                    return(
                        <div key={index} className={styles.seovaluesItem}>
                            <span className={styles.iconWrap}>
                            <Image 
                                src={data.icon}
                                alt={data.title}
                                width={90}
                                height={90}
                                layout='responsive'
                            />
                            </span>
                            <h3>{data.value}</h3>
                            <p>{data.title}</p>
                        </div>
                    )
                })}
                
            </div>
        </div>
    )
}

const SeoValueData = [
    {
       id: '1',
       icon: '/images/websiteTraffic.png',
       value: '58,274,319',
       title: '-Total Website Traffic' 
    },
    
    {
       id: '2',
       icon: '/images/totalLead.png',
       value: '4,158,317',
       title: '-Total Leads' 
    },
    
    {
       id: '3',
       icon: '/images/topKeyword.png',
       value: '19,910',
       title: '-Top 6 Keywords' 
    },
]

export default SeoResults;