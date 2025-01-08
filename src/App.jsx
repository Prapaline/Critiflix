import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddMovieForm from './AddMovieForm';
import MoviesPage from './MoviesPage';
import EditMovieForm from './EditMovieForm';
import ReactStars from 'react-rating-stars-component';
import logo from './assets/critiflix.png';
import UpcomingMoviesPage from './UpcomingMoviesPage';
import WishlistPage from './WishlistPage';

//Fonctions
const App = () => {
  const [movies, setMovies] = useState(() => {
    const storedMovies = localStorage.getItem('movies');
    return storedMovies ? JSON.parse(storedMovies) : [];
  });
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (movie) => {
    if (!wishlist.find((item) => item.id === movie.id)) {
      setWishlist([...wishlist, movie]);
    } else {
      alert('Ce film est déjà dans la wishlist !');
    }
  };
  const [editingMovie, setEditingMovie] = useState(null);

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  const addMovie = (movie) => {
    setMovies((prevMovies) => [...prevMovies, movie]);
  };

  const updateMovie = (updatedMovie, id) => {
    const updatedMovies = movies.map((movie) =>
      movie.id === id ? updatedMovie : movie
    );
    setMovies(updatedMovies);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Voulez-vous vraiment supprimer ce film ?');
    if (confirmDelete) {
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    }
  };

  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <Header />
        <div className="d-flex flex-grow-1">
          <Sidebar />
          <div className="container-fluid">
            <Routes>
              <Route path="/add-movie" element={<AddMovieForm addMovie={addMovie} />} />
              <Route path="/movies" element={<MoviesPage movies={movies} handleDelete={handleDelete} />} />
              <Route path="/edit-movie/:id" element={<EditMovieForm movies={movies} updateMovie={updateMovie} />} />
              <Route path="/" element={<h2 style={{ marginTop: '50px' }}>Bienvenue sur Critiflix</h2>} />
              <Route path="/upcoming" element={<UpcomingMoviesPage addToWishlist={addToWishlist} />} />
              <Route path="/wishlist" element={<WishlistPage wishlist={wishlist} />} />
              </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

const Header = () => {
  return (
    <header className="bg-dark text-white p-3">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
        <Link to="/" className="navbar-brand">
        <img src={logo} alt="Critiflix Logo" style={{ width: '100px', height: 'auto' }} />
        </Link>          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/movies" className="nav-link">Films</Link>
              </li>
              <li className="nav-item">
                <Link to="/add-movie" className="nav-link">Ajouter un Film</Link>
              </li>
              <li className="nav-item">
                <Link to="/upcoming" className="nav-link">Prochaines Sorties</Link>
              </li>
              <li className="nav-item">
                <Link to="/wishlist" className="nav-link">Ma Wishlist</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

const Sidebar = () => {
  return (
    <aside className="bg-light p-3" style={{ width: '250px' }}>
      <ul className="list-group">
        <li className="list-group-item">
          <Link to="/movies" className="text-decoration-none">Voir les Films</Link>
        </li>
        <li className="list-group-item">
          <Link to="/add-movie" className="text-decoration-none">Ajouter un Film</Link>
        </li>
        <li className="list-group-item">
          <Link to="/upcoming" className="text-decoration-none">Prochaines Sorties</Link>
        </li>
        <li className="list-group-item">
          <Link to="/wishlist" className="text-decoration-none">Ma Wishlist</Link>
        </li>
      </ul>
    </aside>
  );
};

export default App;