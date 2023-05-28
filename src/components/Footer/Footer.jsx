import "./Footer.css";
import React from "react";
import { useLocation } from "react-router-dom";

export const Footer = () => {
  const { pathname } = useLocation();

  return (
    <>
      {!(
        pathname === "/profile" ||
        pathname === "/sign-up" ||
        pathname === "/sign-in" ||
        pathname === "/404"
      ) && (
        <footer className="article footer">
            <h2 className="footer__about">
              Учебный проект Яндекс.Практикум х BeatFilm.
            </h2>
            <div className="footer__info">
              <span className="footer__year">&copy; 2023</span>
              <ul className="footer__links">
                <li>
                  <a
                    href="https://practicum.yandex.ru/"
                    className="animation footer__link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Яндекс.Практикум
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Ukhanov-Alexandr"
                    className="animation footer__link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Github
                  </a>
                </li>
              </ul>
            </div>
        </footer>
      )}
    </>
  );
};
