import React from "react";
import CustomSlider from "../CustomSlider";
import style from "./index.module.scss";
import { fetcher } from "../fetcher";
import Link from "next/link";

async function getCardListsData() {
  try {
    const json = await fetcher("/naukari?page=1&limit=6&type=new", {
      next: { revalidate: 120 },
    });
    if (json?.success && json?.data?.length > 0) {
      return json.data?.map((item) => ({
        title: item?.title,
        ctaLabel: 'Apply Now',
        desc: new Date(item?.postDate).toLocaleDateString("en-IN"),
        url: `/${item.seo_section}/${item.slug}`
      }));
    }
  } catch (error) {
    console.error("Error fetching home text:", error);
  }
  return null;
}

const RecentJobCard = async () => {
  const cardList = [
    {
      id: 1,
      title: "Railway Assistant Loco Pilot (ALP) 2025",
      ctaLabel: 'Apply Now',
      desc: 'Apply Last Date : 19/05/2025',
      url: '#'
    },
    {
      id: 2,
      title: "Bihar Civil Court Clerk Mains Admit Card 2025",
      ctaLabel: 'Download',
      desc: 'Admit Card Available:  14/05/2025',
      url: '#'
    },
    {
      id: 3,
      title: "UPSSSC Combined Technical Service 2016 PET PST Result 2025",
      ctaLabel: 'View Result',
      desc: 'Exam Result: 17/05/2025',
      url: '#'
    }
  ];

  
  const apiData = await getCardListsData();
  const cardLists = apiData?.length >= 3 ? apiData : cardList;

  const sliderSetting = {
    slidesToShow: 3,
    infinite: true,
    arrows: false

  }
  return (
    <div className={style.jobMainWrap}>
      <div className={style.innerWrap}>
        <CustomSlider customSettings={sliderSetting} className="revenueCardSlide">
          {cardLists?.map((item, index) => {
            return (
              <div className={style.jobCardWrap} key={item.title + index}>
                <div className={style.iconWrap}>
                  <img src={'/img/new_icon.png'} alt={item.title} />
                </div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
                <Link href={item.url} target="_blank">{item.ctaLabel}</Link>
              </div>
            );
          })}
        </CustomSlider>
      </div>
    </div>
  );
};

export default RecentJobCard;
