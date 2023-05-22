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
import { ErrorPopup } from "../ErrorPopup/ErrorPopup";
import { useLocation } from "react-router-dom";

function App() {
  const [currentUser, setСurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [serverError, setServerError] = useState(null);
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const closeErrorPopup = () => {
    setServerError(null);
  };

  const openErrorPopup = (error) => {
    setServerError(error);
  };

  const handleUpdateUser = (data) => {
    if (localStorage.getItem("jwt")) {
      MainApi.patchProfile(data, localStorage.getItem("jwt"))
        .then((res) => {
          setСurrentUser(res);
        })
        .catch((err) => {
          console.log(`Ошибка с кодом: ${err.errorCode}`);
          openErrorPopup(err);
        })
    }
  };

  const handleSignUp = ({ name, email, password }) => {
    if (!name || !email || !password) {
      return;
    }
    auth
      .register(name, email, password)
      .then((res) => {
        if (res.ok) {
          setLoggedIn(true);
          setTimeout(() => {
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
        if (data.token) {
          MainApi.getMovies(localStorage.getItem("jwt"))
          .then((res) => {
            setSavedMovies(res);
          })
          .catch((err) => {
            console.log(err);
          });
          ownCheck();
          console.log('authorize complete')
        } else {
          console.log('authorize error')
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function signOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("isShort");
    localStorage.removeItem("word");
    localStorage.removeItem("wordSaved");
    localStorage.removeItem("isLiked")
    localStorage.removeItem("id");
    navigate("/");
    setLoggedIn(false);
  }

  const tokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      MainApi.getUser(jwt)
        .then((user) => {
          if (!Array.isArray(user)) {
            setСurrentUser(user);
            setLoggedIn(true);
              if (!loggedIn && !(pathname === "/sign-in" || pathname ==="/sign-up")) {              
                navigate(`${pathname}`);
            } else {
              navigate("/");
            }
          } else {
            signOut();
          }
        })
        .catch((err) => {
          openErrorPopup(err);
        });
    }
  }

  function ownCheck() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      MainApi.getUser(jwt)
        .then((user) => {
          if (!Array.isArray(user)) {
            setСurrentUser(user);
            setLoggedIn(true);
            navigate("/movies");
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
        ownCheck();
      })
      .catch((err) => {
        openErrorPopup(err);
      });
  };

 ////////////////////////////////////////////////////////////
  const handleHeardClick = useCallback((movie, savedMovies, setSavedMovies, isSaved, setIsSaved) => {

    console.log(isSaved);
    if ((pathname === "/saved-movies") ? true : isSaved ) {
        function filterByID(item) {
          if (!(item.movieId === movie.id)) {
            return true;
          }
          return false;
        }
        MainApi.deleteMovie(savedMovies.find(m => m.movieId === movie.id)._id, localStorage.getItem("jwt"))
        .then((res) => {
          setSavedMovies(savedMovies.filter(filterByID));
          console.log("____________unlike")
          setIsSaved(false);
        })
        .catch((err) => {
          openErrorPopup(err);
        });
    } else {
      MainApi.createMovie(movie, localStorage.getItem("jwt"))
        .then((res) => {
          setIsSaved(true);
          console.log(res._id);
          setSavedMovies((old) => [...old, res]);
          console.log("___________like");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handDeleteMovies = (mov) => {
    function filterByID(item) {
      if (!(item.movieId === mov.movieId)) {
        return true;
      }
      return false;
    }
    console.log(mov._id)
    MainApi.deleteMovie(mov._id, localStorage.getItem("jwt"))
      .then((res) => {
        let newArray = savedMovies.filter(filterByID);
        setSavedMovies(newArray);
        console.log('DEL')
      })
      .catch((err) => {
        openErrorPopup(err);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      MainApi.getMovies(localStorage.getItem("jwt"))
      .then((res) => {
        setSavedMovies(res);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [handleHeardClick]);




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
                setSavedMovies={setSavedMovies}
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
                setSavedMovies={setSavedMovies}
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
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ErrorPopup error={serverError} onClose={closeErrorPopup} />
    </CurrentUserContext.Provider>
  );
}

export default App;
