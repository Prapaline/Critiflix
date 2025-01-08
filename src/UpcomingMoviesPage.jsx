import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import './UpcomingMoviesPage.css';

const UpcomingMoviesPage = ({ addToWishlist }) => {
  const [movies, setMovies] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  const [page, setPage] = useState(1);
  const [addedMovie, setAddedMovie] = useState(null);
  const [animation, setAnimation] = useState(false);

  const API_KEY = '45c95c89d5fef966862cf32cfaf64554';

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=fr-FR&page=${page}`
        );
        //Ajouter uniquement les films qui ne sont pas déjà présents
        setMovies((prevMovies) => {
          const newMovies = response.data.results.filter(
            (movie) => !prevMovies.some((existingMovie) => existingMovie.id === movie.id)
          );
          return [...prevMovies, ...newMovies];
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des films à venir :', error);
      }
    };

    fetchUpcomingMovies();
  }, [page]); //Rechargement chaque fois que la page change

  const handleAddToWishlist = (movie) => {
    if (!wishlist.find((item) => item.id === movie.id)) {
      const updatedWishlist = [...wishlist, movie];
      setWishlist(updatedWishlist);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));

      //Animation de confirmation
      setAddedMovie(movie);
      setAnimation(true);
      setTimeout(() => setAnimation(false), 1000); //Arrêt l'animation après 1 seconde
    } else {
      alert('Ce film est déjà dans la wishlist !');
    }
  };

  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1); //Page suivante
  };

  return (
    <div>
      <h2 className="text-center mt-4" style={{ marginTop: '50px' }}>Prochaines Sorties</h2>
      <div className="d-flex flex-wrap justify-content-center">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="card m-2"
            style={{ width: '18rem' }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              className="card-img-top"
              alt={movie.title}
            />
            <div className="card-body">
              <h5 className="card-title">{movie.title}</h5>
              <p className="card-text">Sortie : {movie.release_date}</p>
              <Button variant="primary" onClick={() => handleAddToWishlist(movie)}>Ajouter à la Wishlist</Button>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <Button variant="secondary" onClick={loadMoreMovies}>
          Charger plus de films
        </Button>
      </div>

      {animation && addedMovie && (
        <div className="wishlist-confirmation">
          <p>Film ajouté : {addedMovie.title}</p>
        </div>
      )}
    </div>
  );
};

export default UpcomingMoviesPage;