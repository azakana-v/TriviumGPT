import React, { useState } from "react";
import "./Home.css";
import VictorHomePage from "../../assets/VictorHomePage.png";
import LogoTriviumBranco from "../../assets/trivium logo branca 1.png";
import TipPage from "../TipPage/TipPage";
import VoiceRec from "../../components/VoiceRec/VoiceRec";

function Home() {
  const pages = [{ id: 0, imgsrc: "link", title: "", content: "" }, "tipPage"];
  const [currentPage, setCurrentPage] = useState("homePage");

  return (
    <div id="pagesContainer">
      {currentPage === "homePage" ? (
        <div className="mainContent">
          <img
            src={VictorHomePage}
            alt="Foto em 3D do Dr.Sirio"
            id="homePageImg"
          />
          <h1 id="pageTitle">Conheça o Prof. Victor!</h1>
          <p id="pageContent">
            O Prof. Victor é o professor virtual do{" "}
            <span style={{ color: "var(--main-red-color)" }}>
              <strong>
                <a
                  style={{
                    textDecoration: "none",
                    color: "var(--main-green-color)",
                  }}
                  href="http://colegiotrivium.com.br"
                  target="blank"
                >
                  Colégio Trivium
                </a>
              </strong>
            </span>
            , ele está aqui para te ajudar imediatamente com suas duvidas STEM!
          </p>
          <button
            onClick={() => setCurrentPage("tipPage")}
            className="startButton"
          >
            Começar Agora
          </button>
        </div>
      ) : (
        <TipPage />
      )}
      <div className="logo">
        <img id="logoTrivium" src={LogoTriviumBranco} alt="" />
      </div>
    </div>
  );
}

export default Home;
