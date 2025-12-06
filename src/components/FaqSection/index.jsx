import React, { useState } from 'react'
import style from './index.module.scss'
import CustomAccordion from '../CustomAccordion';

const FaqSection = () => {
    const [expandedItemId, setExpandedItemId] = useState<any>(1);
    const data = [
        {
          id: 1,
          title: "What is an SEO Agency and why do I need one?",
          content:
            "An SEO agency helps businesses improve their website's visibility on search engines. They use techniques to make your website more attractive to search engines, which in turn brings in more visitors",
        },
        {
          id: 2,
          title: "How big is your team?",
          content:
            " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. An SEO agency helps businesses improve their website's visibility on search engines. They use techniques to make your website more attractive to search engines, which in turn brings in more visitors",
        },
        {
          id: 3,
          title: "How old is your SEO Company?",
          content:
            " An SEO agency helps businesses improve their website's visibility on search engines. They use techniques to make your website more attractive to search engines, which in turn brings in more visitors Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
        },

        {
            id: 4,
            title: "Where is your office located?",
            content:
              " An SEO agency helps businesses improve their website's visibility on search engines. They use techniques to make your website more attractive to search engines, which in turn brings in more visitors Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
          },

          {
            id: 5,
            title: "Do you work with all Business categories & niches?",
            content:
              " An SEO agency helps businesses improve their website's visibility on search engines. They use techniques to make your website more attractive to search engines, which in turn brings in more visitors Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
          },
      ];
  return (
    <div className={style.faqMainWrap}>
        <div className={style.innerWap}>
            <div className={style.topHeadingWrap}>
                <span>{'FAQs'}</span>
                <h3>{'Find everything you need to know about Infidigit right here.'}</h3>
            </div>
            <div className={style.faqMainWrapp}>
            {data.map((item) => {
          return (
            <CustomAccordion
              title={item.title}
              content={item.content}
              expandedItem={expandedItemId == item.id}
              setExpandedId={()=>{
                if(expandedItemId === item.id){
                  setExpandedItemId(null)
                }else{
                  setExpandedItemId(item.id)
                }
              }}
            />
          );
        })}
            </div>
        </div>
    </div>
  )
}

export default FaqSection