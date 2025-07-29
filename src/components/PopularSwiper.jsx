import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import MovieCard from "./MovieCard";

function PopularSwiper({ movies }) {
  //   console.log(movies);
  // 평점 순 정렬
  const sorted = [...movies].sort((a, b) => b.vote_average - a.vote_average);
  //   console.log(sorted);
  return (
    <div className="popular-slider">
      <h2>인기순</h2>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        slidesOffsetBefore={40} // 좌측 offset
        autoplay={{
          delay: 2000, // 2초마다 자동 슬라이드
          disableOnInteraction: false, // 사용자가 조작해도 자동 재생 유지 (false면 계속 돌아감)
          pauseOnMouseEnter: true,  // 마우스 올리면 자동재생 멈춤
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          460: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {sorted.slice(0, 10).map((movie, index) => (
          <>
            <SwiperSlide key={movie.id}>
              <div className="popular-slide-item">
                <div className="ranking-number">TOP {index + 1}</div>
                <MovieCard
                  id={movie.id}
                  title={movie.title}
                  poster={movie.poster_path}
                  rating={movie.vote_average}
                />
              </div>
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </div>
  );
}

export default PopularSwiper;
