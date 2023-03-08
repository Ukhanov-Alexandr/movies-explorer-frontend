import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../Movies/SavedMovies/SavedMovies';
import { Footer } from '../Footer/Footer';
import { Profile } from '../Profile/Profile';
import { Register } from '../Register/Register';
import { Login } from '../Login/Login';
import { NotFound } from '../NotFound/NotFound';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />}/>
        <Route path="/saved-movies" element={<SavedMovies />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/sign-up" element={<Register />}/>
        <Route path="/sign-in" element={<Login />}/>
        <Route path="/404" element={<NotFound />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
