import React, { useEffect, useState } from "react";
import CustomSlider from "../CustomSlider";
import style from "./index.module.scss";
import { getJobList } from "@/src/lib/getJobList";

const JobListCard = () => {
  const [cardList, setCardList] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function setJobList() {
      try {
        const cardList = await getJobList();
        setCardList(cardList);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }
    setJobList();
  }, []);

  // if (loading) return <p>Loading...</p>;

  return (
    <div className={style.jobListMainWrap}>
      <div className={style.innerWrap}>
        {cardList?.map((item, index) => {
          return (
            <div className={style.jobCardWrap} key={`item` + index}>
              <h4>{item.jobType}</h4>
              <ul>
                {item?.jobList?.map((item, index) => {
                  return (
                    <li title={item.jobTitle} key={index}>
                      <a href={item.url}>{item.jobTitle}</a>
                    </li>
                  );
                })}
              </ul>
              {/* <div className={style.viewBtn}>
                <a href={"#"}>{"View All"}</a>
              </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobListCard;
