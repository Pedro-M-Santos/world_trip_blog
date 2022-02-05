import { Swiper, SwiperSlide } from "swiper/react";

import { ReactNode } from "react";

// // import Swiper core and required modules
import SwiperCore, { Navigation, Pagination } from "swiper";

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

export const SwiperCarousel = ({ children }: { children: ReactNode[] }) => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      centeredSlides
      onSlideChange={() => console.log("slide change")}
      navigation
      pagination
    >
      {children?.map((slide, i) => (
        <SwiperSlide key={i} style={{ width: "1000px" }}>
          {slide}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
