import React from 'react';
import style from './index.module.scss'

const AdsCard = ({imgUrl}) => {
  return (
    <div className={style.adsBannerWrapp}>
        <img src={imgUrl || "img/allgovjobs_webiste_image.webp" || "img/add_icon.png"} alt="" />
    </div>
  )
}

export default AdsCard