import React, { useState } from "react";
import "./TipPage.css";
import Victor1 from "../../assets/Victor1.png";
import Victor2 from "../../assets/Victor2.png";
import Victor3 from "../../assets/Victor3.png";
import Arrow from "../../assets/ArrowVictor.png";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";

function TipPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSwiperInstance, setCurrentSwiperInstance] = useState();
  const TipPageImages = [Victor1, Victor2, Victor3];

  return (
    <div id="TipPageContainer">
      <img
        id="TipPageImg"
        src={TipPageImages[currentSlide]}
        alt="Imagem 3d do sirio"
      />
      <h1 id="TipPageTitle">Dicas!</h1>
      {/* Carrousel aqui embaixo */}
      <div className="SwiperContainer">
        <Swiper
          style={{
            "--swiper-pagination-color": "var(--main-red-color)",
            "--swiper-pagination-bullet-size": "16px",
          }}
          className="Swiper"
          modules={[Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          pagination
          onSwiper={(swiper) => {
            setCurrentSwiperInstance(swiper);
          }}
          onSlideChange={() => {
            setCurrentSlide(currentSwiperInstance.activeIndex);
          }}
        >
          <SwiperSlide className="SwiperSlide">
            <div className="TipPageSliderContainer">
              <p className="TipPageSliderContent">
                O Prof. Victor tem capacidade de conversar com você sobre
                assuntos complexos, mas ainda é uma inteligência artificial,
                podendo cometer alguns erros e demorar para responder perguntas
                mais elaboradas!
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="TipPageSliderContainer">
              <p className="TipPageSliderContent">
                O Prof. Victor <strong>não substitui um profissional </strong>
                ele apenas presta um suporte imediato em um momento de
                necessidade onde o encontro presencial com seu professor é
                dificultado!
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="TipPageSliderContainer">
              <p className="TipPageSliderContent">
                Aproveite o auxílio do Prof. Victor sempre que precisar, porém,
                recomendamos sempre os professores <strong>STEM</strong> do
                <span style={{ color: "var(--main-green-color)" }}>
                  <strong>
                    <a
                      style={{
                        textDecoration: "none",
                        color: "var(--main-red-color)",
                      }}
                      href="http://colegiotrivium.com.br"
                      target="blank"
                    >
                      <span> Colégio Trivium</span>
                    </a>
                  </strong>
                </span>
                . Uma escola preparada para você e para o futuro!{" "}
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="tipPageButton">
        {currentSlide === 2 ? (
          <Link to="TriviumGPT">
            <button className="startChatButton">Começar conversa!</button>
          </Link>
        ) : (
          <img
            onClick={() => {
              currentSwiperInstance.slideNext();
            }}
            id="SwipeButton"
            src={Arrow}
          />
        )}
      </div>
    </div>
  );
}

export default TipPage;
