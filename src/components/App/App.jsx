import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { Header } from "../Header/Header";
import { Main } from "../Main/Main";
import { Movies } from "../Movies/Movies";
import { SavedMovies } from "../Movies/SavedMovies/SavedMovies";
import { Footer } from "../Footer/Footer";
import { Profile } from "../Profile/Profile";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import { NotFound } from "../NotFound/NotFound";
import * as auth from "../../utils/auth";
import MainApi from "../../utils/MainApi";
import MoviesApi from "../../utils/MoviesApi";
import ErrorPopup from "../ErrorPopup/ErrorPopup";

function App() {
  const [currentUser, setСurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [serverError, setServerError] = useState(null);

  const navigate = useNavigate();

  const closeErrorPopup = () => {
    setServerError(null);
  };

  const openErrorPopup = (error) => {
    setServerError(error);
  };

  const handleUpdateUser = (data) => {
    if (localStorage.getItem("jwt")) {
      MainApi.patchProfile(data)
        .then((res) => {
          setСurrentUser(res);
        })
        .catch((err) => {
          console.log(`Ошибка с кодом: ${err.errorCode}`);
          console.dir(err);
          openErrorPopup(err);
        })
    }
  };

  const handleSignUp = ({ name, email, password }) => {
    // console.log(name, email, password)
    if (!name || !email || !password) {
      return;
    }
    auth
      .register(name, email, password)
      .then((res) => {
        if (res.ok) {
          setLoggedIn(true);
          setTimeout(() => {
            // navigate("/movie");
            handleLogin({email, password})
          }, 600);
        } else {
          setLoggedIn(false);
        }
      })
      .catch((err) => {
        openErrorPopup(err);
      });
  };

  const handleLogin = ({ email, password }) => {
    auth
      .authorize(email, password)
      .then((data) => {
        console.log('authorize complete')
        if (data.token) {
          tokenCheck();
        } else {
          console.log('qweqweeqwasas')
          setLoggedIn(false);
        }
      })
      .catch((err) => {
        console.log('im here')
        openErrorPopup(err);
      });
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  function signOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("isShort");
    localStorage.removeItem("word");
    console.log(localStorage.getItem("word"))
    navigate("/sign-in");
    setLoggedIn(false);
  }

  function tokenCheck() {
    console.log(!!localStorage.getItem("jwt"))
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      console.log(jwt)
      MainApi.getUser(jwt)
        .then((user) => {
          console.log(!Array.isArray(user))
          if (!Array.isArray(user)) {
            // console.log(user)
            setСurrentUser(user);
            setLoggedIn(true);
            navigate("/movies");
          } else {
            signOut();
          }
        })
        .catch((err) => {
          openErrorPopup(err);
        });
    }
  }

  const handleSearch = () => {
    MoviesApi.getMovies()
      .then((res) => {
        setMovies(res);
        tokenCheck();
      })
      .catch((err) => {
        openErrorPopup(err);
      });
  };
  

  ////////////////////////////////////////////////////////////
  const handleHeardClick = useCallback((mov) => {
    let isLiked = (!!localStorage.getItem("isLiked")?(JSON.parse((localStorage.getItem("isLiked"))) === true):false);
    let currentId = (!!localStorage.getItem("id")?localStorage.getItem("id"):'');

      console.log(isLiked)
      
      if (isLiked) {
        function filterByID(item) {
          if (!(item.movieId === mov.movieId)) {
            return true;
          }
          return false;
        }
        console.log('____________unlike')
        MainApi.deleteMovie(currentId)
        .then((res) => {
            // console.log('wait a minute');
            localStorage.removeItem("isLiked");
            localStorage.removeItem("id");
            // console.log(res);
            let newArray = savedMovies.filter(filterByID);
            setSavedMovies(newArray);
          })
          .catch((err) => {
            openErrorPopup(err);
          })

      } else {
        console.log('___________like')
        MainApi.createMovie(mov)
          .then((res) => {
            localStorage.setItem("isLiked", true);
            localStorage.setItem("id", res._id);
            // console.log(res._id);
            setSavedMovies((old) => [...old, res]);
          })
          .catch((err) => {
            openErrorPopup(err);
          })
      }
  },[] )

  const handDeleteMovies = (mov) => {

    function filterByID(item) {
      if (!(item.movieId === mov.movieId)) {
        return true;
      }
      return false;
    }
    // console.log(mov._id)
    MainApi.deleteMovie(mov._id)
      .then((res) => {
        // console.log(res);
        let newArray = savedMovies.filter(filterByID);
        setSavedMovies(newArray);
      })
      .catch((err) => {
        openErrorPopup(err);
      });
  };

  /////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (loggedIn) {
      // tokenCheck();
      MainApi.getMovies()
      .then((res) => {
        setSavedMovies(res);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    
  }, [handleHeardClick]);

  // console.log(savedMovies);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header loggedIn={loggedIn}/>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          exact
          path="/movies"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Movies
                movies={movies}
                onSearchClick={handleSearch}
                handleHeardClick={handleHeardClick}
                savedMovies={savedMovies}
              />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/saved-movies"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <SavedMovies
                movies={savedMovies}
                handleHeardClick={handDeleteMovies}
                savedMovies={savedMovies}
              />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/profile"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Profile onUpdateUser={handleUpdateUser} signOut={signOut} />
            </ProtectedRoute>
          }
        />
        <Route path="/sign-up" element={<Register onSignUp={handleSignUp} />} />
        <Route path="/sign-in" element={<Login onSignIn={handleLogin} />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
      <Footer />
      <ErrorPopup error={serverError} onClose={closeErrorPopup} />
    </CurrentUserContext.Provider>
  );
}

export default App;
