import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
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
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={4}
        navigation
        slidesOffsetBefore={40} // 좌측 offset
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
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
