import './Portfolio.css';
import React from "react";

export const Portfolio = () => (
  <section className="portfolio">
    <h2 className="portfolio__header">Портфолио</h2>
    <ul className="portfolio__items">
      <li>
        <a
          className="animation portfolio__item"
          href="https://how-to-learn2.vercel.app/"
          target="_blank"
          rel="noreferrer"
        >
          Статичный сайт
        </a>
      </li>
      <li>
        <a
          className="animation portfolio__item"
          href="https://russian-travel-o19o.vercel.app/"
          target="_blank"
          rel="noreferrer"
        >
          Адаптивный сайт
        </a>
      </li>
      <li>
        <a
          className="animation portfolio__item portfolio__item-last"
          href="https://mesto.front.ukh.nomoredomains.club/"
          target="_blank"
          rel="noreferrer"
        >
          Одностраничное приложение
        </a>
      </li>
    </ul>
  </section>
);