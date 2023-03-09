import "./Header.css";
import React, { useCallback, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import icon from "../../images/profile_icon.svg";
import { NavTab } from "../Main/NavTab/NavTab";

export const Header = () => {
  const { pathname } = useLocation();
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handlBurgerClick = () => {
    setIsNavMenuOpen(!isNavMenuOpen);
    setIsActive(!isActive);
  };

  const closePopup = () => {
    setIsNavMenuOpen(false);
    setIsActive(false);
  };

  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup();
    }
  };



  return (
    <>
      {!(
        pathname === "/sign-up" ||
        pathname === "/sign-in" ||
        pathname === "/404"
      ) && (
        <header
          className={pathname === "/" ? "header header-landing" : "header"}
        >
          <Link to="/" className="logo" aria-label="На главную" type="button" />
          <div
            className={
              pathname === "/"
                ? ""
                : isActive
                ? "header__burger active"
                : "header__burger"
            }
            onClick={handlBurgerClick}
          >
            <span></span>
          </div>
          <NavTab isOpen={isNavMenuOpen} handleOverlayClick={handleOverlayClick} closePopup={closePopup}/>
          {pathname === "/" && (
            <div className="header__sign-container header__sign-container-landing">
              <Link to="/sign-up" className="text header__text" type="button">
                Регистрация
              </Link>
              <Link to="/sign-in" className="header__button" type="button">
                Войти
              </Link>
            </div>
          )}
          {(pathname === "/movies" ||
            pathname === "/saved-movies" ||
            pathname === "/profile") && (
            <>
              <div className="header__sign-container">
                <Link
                  to="/movies"
                  className={
                    pathname === "/movies"
                      ? "text header__text header__text-bold"
                      : "text header__text"
                  }
                  type="button"
                >
                  Фильмы
                </Link>
                <Link
                  to="/saved-movies"
                  className={
                    pathname === "/saved-movies"
                      ? "text header__text header__text-bold"
                      : "text header__text"
                  }
                  type="button"
                >
                  Сохраненные фильмы
                </Link>
              </div>
              <Link
                to="/profile"
                className="header__button-profile"
                type="button"
              >
                <img className="header__button-icon" src={icon} alt="icon" />
                Аккаунт
              </Link>
            </>
          )}
        </header>
      )}
    </>
  );
};
