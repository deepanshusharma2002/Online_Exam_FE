import React from "react";
import style from "./index.module.scss";
import { fetcher } from "../fetcher";

const JobTypeCard = async () => {

  // const NEXT_URL = 'http://localhost:5500';
  const NEXT_URL = 'https://allgovjobs.com/backend';

  const data = await fetcher(`/section?page=1&limit=30`, {
    next: { revalidate: 120 },
  });

  const cardList = data?.data?.map((item, index) => ({
    id: index + 1,
    title: item?.display_name,
    imgUrl: `${NEXT_URL}${item?.img_url}`,
    url: `/${item?.url}`,
  })) || [];

  return (
    <div className={style.jobMainWrap}>
      {cardList?.map((item, index) => {
        return (
          <div className={style.jobTypeCardWrap} key={index}>
            <a href={item.url}>
              <div className={style.iconWrap}>
                <img src={item.imgUrl} alt={item.title} />
              </div>
              <h4>{item.title}</h4>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default JobTypeCard;
