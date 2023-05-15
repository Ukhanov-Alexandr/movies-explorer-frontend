import "./NavTab.css";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import icon from "../../../images/profile_icon.svg";

export const NavTab = ({ isOpen, handleOverlayClick, closePopup }) => {
  const { pathname } = useLocation();

  return (
    <nav className={isOpen ? "nav__menu nav__menu_opened" : "nav__menu"} onMouseDown={handleOverlayClick}>
      <div className="nav__content">
        <ul className="nav__list">
          <li className="nav__list-item">
            <Link
              to="/"
              className={
                pathname === "/"
                  ? "nav__list-item-link nav__list-item-link-bold"
                  : "nav__list-item-link"
              }
              aria-label="На главную"
              type="button"
              onClick={closePopup}
            >
              Главная
            </Link>
          </li>
          <li className="nav__list-item">
            <Link
              to="/movies"
              className={
                pathname === "/movies"
                  ? "nav__list-item-link nav__list-item-link-bold"
                  : "nav__list-item-link"
              }
              type="button"
              onClick={closePopup}
            >
              Фильмы
            </Link>
          </li>
          <li className="nav__list-item">
            <Link
              to="/saved-movies"
              className={
                pathname === "/saved-movies"
                  ? "nav__list-item-link nav__list-item-link-bold"
                  : "nav__list-item-link"
              }
              type="button"
              onClick={closePopup}
            >
              Сохраненные фильмы
            </Link>
          </li>
        </ul>
        <Link to="/profile" className="nav__button-profile" type="button" onClick={closePopup}>
          <img className="nav__button-icon" src={icon} alt="icon" />
          Аккаунт
        </Link>
      </div>
    </nav>
  );
};
