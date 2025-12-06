import Link from "next/link";
import Image from "next/image";
import revenueImg from "@/public/images/revenue.png";
import styles from "./driveRevenue.module.scss";
import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";

function DriveRevenue() {
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="whiteBox">
      <h2>How We Drive Revenue</h2>
      <p>
        By offering custom omnichannel marketing strategies, led by experts and
        backed by data, Agreed Technologies can help your business hit your
        revenue goals. Stop juggling multiple agencies and start working with a
        top-rated agency that will drive results.
      </p>
      <div className={styles.tabContainerWrap}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box>
              <TabList
                onChange={handleChange}
                aria-label="How We Drive Revenue"
              >
                {tabData?.map((ele, index) => {
                  return (
                    <Tab
                      icon={
                        <span className={styles.iconWrap}>
                          <Image
                            src={ele.icon}
                            alt="..."
                            width={54}
                            height={54}
                            layout="responsive"
                          />
                        </span>
                      }
                      label={ele?.title}
                      value={ele?.id}
                    />
                  );
                })}
              </TabList>
            </Box>
            {tabData?.map((ele, index) => {
              const { tabContent } = ele;
              return (
                <TabPanel value={ele.id}>
                  <div className={styles.infoWrap}>
                    <div className={styles.infoWrapLhs}>
                      <h2>{tabContent?.heading}</h2>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: tabContent?.desc || "",
                        }}
                      ></div>
                      {tabContent?.ctaText && (
                        <Link
                          href={tabContent?.ctaUrl || "#"}
                          className="btn btn-blue"
                        >
                          {tabContent?.ctaText}
                        </Link>
                      )}
                    </div>
                    <div className={styles.infoWrapRhs}>
                      <Image
                        src={tabContent?.imgUrl || ""}
                        alt="..."
                        className={styles.logoImage}
                        width={677}
                        height={530}
                        layout="responsive"
                      />
                    </div>
                  </div>
                </TabPanel>
              );
            })}
          </TabContext>
        </Box>
      </div>
    </div>
  );
}

const tabData = [
  {
    id: "1",
    icon: "/images/seo.png",
    title: "SEO",
    tabContent: {
      heading: "Become the number-one choice for local customers",
      desc: `<ul>
              <li>Optimize your Google Business Profile </li>
              <li>
                Automatically list your business in the top local directories{" "}
              </li>
              <li>Improve online reputation</li>
              <li>Monitor your performance and get local intel</li>
            </ul>`,
      imgUrl: revenueImg,
      ctaText: " Try Local",
      ctaUrl: "#",
    },
  },
  {
    id: "2",
    icon: "/images/local-seo.png",
    title: "Local Seo",
    tabContent: {
      heading: `Become the number-one choice for local customers`,
      desc: `<ul>
            <li>Optimize your Google Business Profile </li>
            <li>
              Automatically list your business in the top local directories{" "}
            </li>
            <li>Improve online reputation</li>
            <li>Monitor your performance and get local intel</li>
          </ul>`,
      imgUrl: revenueImg,
      ctaText: " Try Local",
      ctaUrl: "#",
    },
  },
  {
    id: "3",
    icon: "/images/ppc.png",
    title: "PPC (Pay Per Click)",
    tabContent: {
      heading: "Become the PPC (Pay Per Click) number-one choice for local customers",
      desc: `<ul>
              <li>Optimize your Google Business Profile </li>
              <li>
                Automatically list your business in the top local directories{" "}
              </li>
              <li>Improve online reputation</li>
              <li>Monitor your performance and get local intel</li>
            </ul>`,
      imgUrl: revenueImg,
      ctaText: " Try Local",
      ctaUrl: "#",
    },
  },
  {
    id: "4",
    icon: "/images/googlead.png",
    title: "Google Ads",
    tabContent: {
        heading: "Google Ads number-one choice for local customers",
        desc: `<ul>
              <li>Optimize your Google Business Profile </li>
              <li>
                Automatically list your business in the top local directories{" "}
              </li>
              <li>Improve online reputation</li>
              <li>Monitor your performance and get local intel</li>
            </ul>`,
        imgUrl: revenueImg,
        ctaText: " Try Local",
        ctaUrl: "#",
      }
  },
  {
    id: "5",
    icon: "/images/devlopment.png",
    title: "Web Development",
    tabContent: {
        heading: "Web Development for local customers",
        desc: `<ul>
              <li>Optimize your Google Business Profile </li>
              <li>
                Automatically list your business in the top local directories{" "}
              </li>
              <li>Improve online reputation</li>
              <li>Monitor your performance and get local intel</li>
            </ul>`,
        imgUrl: revenueImg,
        ctaText: " Try Local",
        ctaUrl: "#",
      }
  },
  {
    id: "6",
    icon: "/images/localMarket.png",
    title: "Local Marketing",
    tabContent: {
        heading: "Local Marketing for local customers",
        desc: `<ul>
              <li>Optimize your Google Business Profile </li>
              <li>
                Automatically list your business in the top local directories{" "}
              </li>
              <li>Improve online reputation</li>
              <li>Monitor your performance and get local intel</li>
            </ul>`,
        imgUrl: revenueImg,
        ctaText: " Try Local",
        ctaUrl: "#",
      },
  },
];

export default DriveRevenue;
