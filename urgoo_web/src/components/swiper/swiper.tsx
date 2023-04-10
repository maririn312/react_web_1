import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { URL_IMG_ROOT } from "../../app/appConst";
import poster from "../../assets/img/poster.png";
const NomadSwiper = () => {
  return (
    <Swiper navigation={true} modules={[Navigation]}>
      <SwiperSlide>
        <img
          src={poster}
          alt="swiper"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default NomadSwiper;
