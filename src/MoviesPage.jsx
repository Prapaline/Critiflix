import React, { useState, useEffect } from 'react';
import ReactStars from 'react-rating-stars-component';
import { FaSortAlphaDown, FaSortAlphaUp, FaSortNumericDown, FaSortNumericUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MoviesPage = ({ movies, handleDelete }) => {
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('title');
  const [searchQuery, setSearchQuery] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [maxRating, setMaxRating] = useState(5);
  const [sortedMovies, setSortedMovies] = useState([]);

  //Fonction de tri des films
  const sortMovies = (order, by) => {
    const sorted = [...movies].sort((a, b) => {
      if (by === 'title') {
        return order === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      } else if (by === 'rating') {
        return order === 'asc' ? a.rating - b.rating : b.rating - a.rating;
      }
      return 0;
    });
    setSortedMovies(sorted);
  };

  useEffect(() => {
    sortMovies(sortOrder, sortBy);
  }, [movies, sortOrder, sortBy]);

  const filteredMovies = sortedMovies.filter((movie) => 
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    movie.rating >= minRating && movie.rating <= maxRating
  );

  return (
    <div>
    <h2 className="mb-4 text-center" style={{ marginTop: '50px' }}> Films Enregistrés</h2>
      {/*Recherche par titre*/}
      <div className="mb-4 text-center">
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher par titre..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
          style={{ width: '50%', margin: 'auto' }}
        />
      </div>

      {/*Filtrage par note*/}
      <div className="d-flex justify-content-center mb-4">
        <div className="me-3">
          <label>Note minimale</label>
          <input
            type="number"
            className="form-control"
            min="0"
            max="5"
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            style={{ width: '100px' }}
          />
        </div>
        <div>
          <label>Note maximale</label>
          <input
            type="number"
            className="form-control"
            min="0"
            max="5"
            value={maxRating}
            onChange={(e) => setMaxRating(Number(e.target.value))}
            style={{ width: '100px' }}
          />
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          {/*Tri par titre*/}
          <button
            className={`btn btn-info me-2 ${sortBy === 'title' ? 'active' : ''}`}
            onClick={() => {
              setSortBy('title'); // Changer le critère à 'title'
              sortMovies(sortOrder, 'title');
            }}
          >
            <FaSortAlphaUp /> Tri par Titre
            {sortBy === 'title' && (sortOrder === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />)}
          </button>

          {/*Tri par note*/}
          <button
            className={`btn btn-info ${sortBy === 'rating' ? 'active' : ''}`}
            onClick={() => {
              setSortBy('rating');
              sortMovies(sortOrder, 'rating'); 
            }}
          >
            <FaSortNumericUp /> Tri par Note
            {sortBy === 'rating' && (sortOrder === 'asc' ? <FaSortNumericDown /> : <FaSortNumericUp />)}
          </button>
        </div>

        {/*Ordre croissant ou décroissant*/}
        <div>
          <button
            className="btn btn-outline-dark"
            onClick={() => {
              const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
              setSortOrder(newOrder);
              sortMovies(newOrder, sortBy);
            }}
          >
            {sortOrder === 'asc' ? 'Ordre Croissant' : 'Ordre Décroissant'}
          </button>
        </div>
      </div>

      {filteredMovies.length === 0 ? (
        <p className="text-center">Aucun film trouvé avec ces critères.</p>
      ) : (
        <div className="list-group">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{movie.title}</strong>
                <div>
                  <ReactStars
                    count={5}
                    value={movie.rating}
                    edit={false}
                    size={24}
                    activeColor="#ffd700"
                  />
                </div>
                {movie.description && <p className="mb-0"><em>Description :</em> {movie.description}</p>}
              </div>
              <div>
                <Link to={`/edit-movie/${movie.id}`} className="btn btn-warning btn-sm me-2">
                  Modifier
                </Link>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(movie.id)}>
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoviesPage;