import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type SliderTypeProps = {
  modules?: any;
  slidesPerView?: number;
  spaceBetween?: number;
  pagination?: any;
  navigation?: boolean;
  breakpoints?: any;
  className?: string;
  autoPlay?: boolean;
};
const CustomSlider = (props: SliderTypeProps) => {
  const {
    modules = [Pagination, Navigation],
    slidesPerView = 1,
    spaceBetween = 50,
    pagination = {
      clickable: true,
    },
    navigation = true,
    breakpoints = {
      540: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },
    className = "",
    autoPlay = true,
  } = props;
  return (
    <div>
      <Swiper
        modules={modules}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        pagination={pagination}
        navigation={navigation}
        breakpoints={breakpoints}
        autoplay={autoPlay}
        className={className}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper>
    </div>
  );
};

export default CustomSlider;
