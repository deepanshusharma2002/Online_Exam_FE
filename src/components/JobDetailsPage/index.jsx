"use client";

import React, { useEffect, useState } from "react";
import AdsCard from "../AdsCard";
import NewJobCard from "../NewJobCard";
import style from "./index.module.scss";

function renderRichText(content) {
  return content?.map((block, i) => {
    if (block.type === "paragraph") {
      return (
        <p key={i}>
          {block.children?.map((child, j) => {
            if (child.type === "link") {
              return (
                <a key={j} href={child.url} target="_blank" rel="noopener noreferrer">
                  {child.children?.map((c, k) => c.text)}
                </a>
              );
            }
            return <span key={j}>{child.text}</span>;
          })}
        </p>
      );
    }
    return null;
  });
}

const JobDetailsPage = ({ data, loading }) => {
  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No data found.</p>;


  const jobSummaryData = [
    {
      label: "Name of Post:",
      desc: data?.name_of_post,
    },
    {
      label: "Post Date / Update:",
      desc: data?.post_date,
    },
    {
      label: "Short Information :",
      desc: data?.short_desc, // yeh rich text json hai
      isRichText: true,
    },
  ];

  const jobDetails = {
    jobTitle: "Bank of Baroda BOB Office Assistant (Peon) Recruitment 2025",
    subtitle: "BOB Peon Exam 2025 :  Short Details of Notification",
    dept: "Bank of Baroda (BOB) ",
    impDates: {
      regStart: "03/05/2025",
      lastDate: "23/05/2025",
      lastPaymentDate: "23/05/2025",
      examDate: "As per Schedule",
      ageOnDate: " 01/05/2025",
      admitCardAvail: "Before Exam",
    },
    fees: [
      {
        category: "General / OBC / EWS : ",
        amt: "600",
      },
      {
        category: "SC / ST : ",
        amt: "100",
      },
      {
        category: "PH (Divyang) : ",
        amt: "100",
      },
      {
        category: "All Category Women Candidates : ",
        amt: "100",
      },
      {
        category:
          "Pay the Exam Fees Through Debit Card / Credit Card / Net Banking Only. ",
        amt: "",
      },
    ],
  };

  const importantDates = jobDetails?.impDates;
  return (
    <div className={style.detailsMainWrapp}>
      <div className="container">
        <div className={style.jobSummaryWrap}>
          <table>
            {jobSummaryData?.map((item, index) => {
              const { label, desc, isRichText } = item;
              return (
                <tr key={`row${index}`}>
                  <td>
                    <h4>{label}</h4>
                  </td>
                  <td>
                    <p>{isRichText ? renderRichText(desc) : <p>{desc}</p>}</p>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>

        <div className="ads_banner_wrapp">
          <AdsCard />
        </div>

        <div className={style.jobBodyInfoWrap}>
          <table>
            <tr>
              <td colSpan={2}>
                <div className={style.headingWrapp}>
                  <h3>{data?.name_of_post}</h3>
                  <h3>{data?.short_detail}</h3>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className={style.impWrapp}>
                  <p>Important Dates</p>
                </div>
                <ul>
                  {data?.important_dates?.dates?.map((item, index) => {
                    const { label, date } = item;
                    return (
                      <li key={index}>
                        {label} : <strong>{date || ""}</strong>
                      </li>
                    );
                  })}
                </ul>
              </td>
              <td>
                <div className={style.feesWrapp}>
                  <p>Application Fee</p>
                </div>
                <ul>
                  {data?.application_fee?.categories?.map((item, index) => {
                    const { name, fee } = item;
                    return (
                      <li key={index}>
                        {name} : <strong>{fee || ""}</strong>
                      </li>
                    );
                  })}
                </ul>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <div className={style.ageWrapp}>
                  <h3>Bank of Baroda Office Assistant (Peon) Exam 2025 </h3>
                  <p>Minimum Age : <span className={style.ageValue}>{data?.age_limit?.minimum_age + " " + "years" || ""}</span></p>
                  <p>Maximum Age : <span className={style.ageValue}>{data?.age_limit?.maximum_age + " " + "years" || ""}</span></p>
                  <p><strong>{data?.age_limit?.notes || ""}</strong></p>
                  {data?.age_limit?.relaxations && data?.age_limit?.relaxations?.map((item, index) => {
                    return (
                      <p key={index}>
                        {item.category} : <span className={style.ageValue}>{item.relaxation_years + " " + "years" || ""}</span>
                      </p>
                    );
                  })}
                </div>
              </td>
            </tr>
          </table>

          <div style={{ marginTop: '20px' }}>
            <div
              className="overflow-x-auto border rounded-lg p-4 bg-white"
              dangerouslySetInnerHTML={{
                __html: data.vacancy_details
                  .map((block) => block.children[0]?.text)
                  .join(""),
              }}
            />
          </div>
        </div>

        <div className={style.jobBodyInfoWrap}>
          <table>
            <tr>
              <td colSpan={2}>
                <div className={style.headingWrapp}>
                  <h3>{data?.name_of_post} :  Mode Of Selection</h3>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <ul>
                  {data?.selection_process?.steps?.map((item, index) => {
                    return (
                      <li key={index} style={{ fontSize: '16px' }}>
                        <strong>{item || ""}</strong>
                      </li>
                    );
                  })}
                </ul>
              </td>
            </tr>
          </table>
        </div>

        <div className={style.jobBodyInfoWrap}>
          <table>
            <tr>
              <td colSpan={2}>
                <div className={style.headingWrapp}>
                  <h3>Some Useful Important Links</h3>
                </div>
              </td>
            </tr>
            {
              data?.important_links?.links?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td style={{ color: '#EE2C3C', fontSize: '18px', fontWeight: 'bold' }}>{item.label}</td>
                    <td><a href={item.url}><strong>Click Here</strong></a></td>
                  </tr>
                );
              })
            }
          </table>
        </div>

        <div className={style.jobBodyInfoWrap}>
          <table>
            <tr>
              <td colSpan={2}>
                <div className={style.headingWrapp}>
                  <h3>Important Questions</h3>
                </div>
              </td>
            </tr>
            {data?.faq?.questions?.map((item, index) => {
              return (
                <tr key={index}>
                  <td style={{ width: '50%' }}><strong>Question : </strong>{item.q}</td>
                  <td>{item.a}</td>
                </tr>
              );
            })}
          </table>

          <div className={style.disclaimer}>
            Disclaimer: Information Regarding Any Exam Form, Results/Marks, Answer Key Are Published On This Website Are Provided Just For The Immediate Information Of The Examinees And Should Not Be Considered As A Legal Document. While Every Effort Has Been Made By Sarkariresult Team To Ensure The Accuracy Of The Information Provided Which Includes Official Links, We Are Not Responsible For Any Inadvertent Errors That May Appear In The Examination Results/Marks, Answer Key Or Time Table/Admission Dates. Additionally, We Disclaim Any Liability For Any Loss Or Damage Caused By Any Shortcomings, Defects, Or Inaccuracies In The Information Available On This Website. In Case Of Any Correction Is Needed Feel Free To Contact Us Through Contact Us Page.
          </div>
        </div>

        <NewJobCard />

        <div className="ads_banner_wrapp">
          <AdsCard imgUrl={"img/add_icon2.png"} />
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
