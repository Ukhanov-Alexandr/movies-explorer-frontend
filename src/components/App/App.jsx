import "./App.css";
import React, { useState, useEffect, useMemo } from "react";
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

function App() {
  const [currentUser, setСurrentUser] = useState({});
  // const [email, setEmail] = useState("");
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  // const [isSavedMoviesCardList, setIsSavedMoviesCardList] = useState(false);

  const navigate = useNavigate();

  const handleUpdateUser = (data) => {
    // setIsRequestingServer(true);
    if (localStorage.getItem("jwt")) {
      MainApi.patchProfile(data)
        .then((res) => {
          setСurrentUser(res);
          // closeAllPopups();
        })
        .catch((err) => {
          console.log(`Ошибка с кодом: ${err.errorCode}`);
          console.dir(err);
          // openErrorPopup(err);
        })
        .finally(() => {
          setTimeout(() => {
            // setIsRequestingServer(false);
          }, 300);
        });
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
            navigate("/sign-in");
          }, 800);
        } else {
          setLoggedIn(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = ({ email, password }) => {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          tokenCheck();
        } else {
          setLoggedIn(false);
          // setIsInfoTooltipOpen(true);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  function signOut() {
    localStorage.removeItem("jwt");
    navigate("/sign-in");
    setLoggedIn(false);
  }

  function tokenCheck() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      MainApi.getUser(jwt)
        .then((user) => {
          if (!Array.isArray(user)) {
            setСurrentUser(user);
            // setEmail(user.email);
            setLoggedIn(true);
            navigate("/movies");
            // if (user) {
            //   api.getCards(jwt).then((cards)=> {
            //     setCards(cards)
            //   })
            //   setLoggedIn(true);
            //   navigate("/");
            // }
          } else {
            signOut();
          }
        })
        .catch((err) => console.log(err));
    }
  }

  const handleSearch = () => {
    MoviesApi.getMovies()
      .then((res) => {
        setMovies(res);
      })
      .catch((err) => console.log(err));
  };

  const handSavedMovies = (mov) => {
    console.log(mov);
    MainApi.createMovie(mov)
      .then((res) => {
        setSavedMovies((old) => [...old, res]);
      })
      .catch((err) => console.log(err));
  };

  const handDeleteMovies = (mov) => {
    console.dir(savedMovies);
    console.log(!!(savedMovies.some((m) => m.movieId === mov.movieId)))

    function filterByID(item) {
      if (!(item.movieId === mov.movieId)) {
        return true
      }
      return false;
    }

    MainApi.deleteMovie(mov._id)
      .then((res) => {
        console.log(res);
        let newArray = savedMovies.filter(filterByID);
        setSavedMovies(newArray);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    MainApi.getMovies().then((res) => {
      setSavedMovies(res);
    });
  }, []);

  // const memoizedValue = useMemo(() => {
  //   MainApi.getMovies().then((res) => {
  //     res.map((mov) => {
  //       MainApi.deleteMovie(mov._id).then((res) => {
  //         console.log(res);
  //       });
  //     });
  //   });
  // } ,[]);

  // useEffect(() => {
  //   MainApi.getMovies().then((res) => {
  //       res.map((mov) =>{
  //         MainApi.deleteMovie(mov._id)
  //         .then((res) => {
  //           console.log(res);
  //         })
  //       })
  //   });
  // },
  // []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
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
                handleHeardClick={handSavedMovies}
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
    </CurrentUserContext.Provider>
  );
}

export default App;
