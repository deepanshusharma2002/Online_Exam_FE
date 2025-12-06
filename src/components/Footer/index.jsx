// "use client";
// import React, { useEffect, useState } from "react";
// import style from "./footer.module.scss";
// import { footer_list, footer_other_list } from "@/src/utils/constants";
// import { fetcher } from "../fetcher";
// const Footer = async () => {
//   const [footerLinks, setFooterLinks] = useState([]);

//   const fetchFooterLinks = async () => {
//     try {
//       const data = await fetcher("/home/links?type=footer");
//       if (data.success) {
//         setFooterLinks(data.data || []);
//       } else {
//         console.error("Failed to fetch footer links:", data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching footer links:", error);
//     }
//   };
//   useEffect(() => {
//     fetchFooterLinks();
//   }, [])

//   return (
//     <footer className={style.footerWrap}>
//       <div className="container">
//         <div className={style.footer_innner}>
//           <div className={style.row_wrapp}>
//             <div className={style.first_item_wrapp}>
//               <ul>
//                 {footerLinks?.map((item, index) => {
//                   return (
//                     <li key={`footr_link${index}`}>
//                       <a href={item?.url}>{item?.display_name}</a>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//             <div className={style.last_item_wrapp}>
//               <ul>
//                 {footer_other_list?.map((item, index) => {
//                   return (
//                     <li key={`footr_link${index}`}>
//                       <a href={item?.path}>{item?.name}</a>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className={style.copy_wrapp}>
//         <p>Copyright@2025 All Govt Jobs</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

"use client";
import React, { useEffect, useState } from "react";
import style from "./footer.module.scss";
import { footer_other_list } from "@/src/utils/constants";
import { fetcher } from "../fetcher";
import Image from "next/image";

const Footer = () => {
  const [footerLinks, setFooterLinks] = useState([]);

  const fetchFooterLinks = async () => {
    try {
      const data = await fetcher("/home/links?type=footer");
      if (data.success) {
        setFooterLinks(data.data || []);
      } else {
        console.error("Failed to fetch footer links:", data.message);
      }
    } catch (error) {
      console.error("Error fetching footer links:", error);
    }
  };

  useEffect(() => {
    fetchFooterLinks();
  }, []);

  return (
    <footer className={style.footerWrap}>

      <div className={style.copy_wrapp}>
        <p className={style.footer_logo}>
          
          <a href="/">
            <Image
              src="/images/allgovjobs_logo_white.png"
              alt="..."
              width={300}
              height={80}
            />
          </a>
        </p>
      </div>

      <div className="container">
        <div className={style.footer_innner}>
          <div className={style.row_wrapp}>
            <div className={style.first_item_wrapp}>
              <ul>
                {footerLinks.map((item, index) => (
                  <li key={`footer_link_${index}`}>
                    <a target="_blank" href={item?.url}>{item?.display_name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className={style.last_item_wrapp}>
              <ul>
                {footer_other_list.map((item, index) => (
                  <li key={`footer_other_${index}`}>
                    <a href={item?.path}>{item?.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={style.copy_wrapp}>
        <p>Copyright © 2025 All Govt Jobs</p>
      </div>
    </footer>
  );
};

export default Footer;
