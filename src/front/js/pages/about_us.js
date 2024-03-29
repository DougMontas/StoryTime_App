import React, { useState, useContext, useEffect } from "react";
// import Hangmen from "../component/Hangmen.js";
import { Transform } from "react-animation-components";
import "../../styles/about_us.css";
import alanHeadshot from "../../img/headshot_alan.jpg";

// import { motion } from "framer-motion";

export const AboutUs = () => {
  const [state, setState] = useState(false);
  const [modalState, setModalState] = useState(false);

  function toggleOpen() {
    setModalState((prevModalState) => !prevModalState);
  }
  function toggle() {
    setState((prevState) => !prevState);
  }
  useEffect(() => {
    toggle();
  }, []);

  return (
    <div>
      <div className="ABusCont">
        <div
          className={state && "box" ? " box active" : "box"}
          onClick={toggleOpen}
        >
          <div className="slide">
            <img
              className={state && "pics" ? "pics active" : "pics"}
              src="https://ca.slack-edge.com/T0BFXMWMV-U03538G6V9D-ac975af7b40f-512"
            />

            <div className={state ? "left active" : "left"}>
              <h1 className="name">Doug Montas</h1>
              <p className="smallText">Coder professional</p>

              <p className="text">
                A Miami native. Doug is a future Blockchain specialist and
                coding expert.
              </p>
              <h5>
                <a href="https://github.com/DougMontas">Github</a> -{" "}
                <a href="https://www.linkedin.com/in/futureitprofessional/">
                  LinkedIn
                </a>
              </h5>
            </div>
          </div>
          <div className="slide">
            <img
              className={state && "pics" ? "pics active" : "pics"}
              src="https://ca.slack-edge.com/T0BFXMWMV-U033E6TK4QK-76ec8fa3b0b4-512"
            />

            <div className={state ? "left active" : "left"}>
              <h1 className="name">Sean Campbell</h1>
              <p className="smallText">Coder professional</p>
              <p className="text">
                a New York native. Sean is a musician with aspirations of being
                a Python expert{" "}
              </p>
            </div>
          </div>
          <div className="slide">
            <img
              className={state && "pics" ? "pics active" : "pics"}
              src="https://ca.slack-edge.com/T0BFXMWMV-U032MF8R23Z-e5010381314f-512"
            />

            <div className={state ? "left active" : "left"}>
              <h1 className="name">Alan Martinez</h1>
              <p className="smallText">Coder professional</p>
              <p className="text">
                a Texas native, Alan is a gamer with a dream of being a coder
                for google.{" "}
              </p>
            </div>
          </div>
          <div className="slide">
            <img
              className={state && "pics" ? "pics active" : "pics"}
              src="https://ca.slack-edge.com/T0BFXMWMV-U02FKP23DEJ-275306524d96-512"
            />

            <div className={state ? "left active" : "left"}>
              <h1 className="name">Nick Sisneros</h1>
              <p className="smallText">Coder professional</p>
              <p className="text">
                A Colorado native, Nick is based in Shanghai and has dreams of
                making video games.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
