import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

const EditMovieForm = ({ movies, updateMovie }) => {
  const { id } = useParams(); //ID depuis l'URL
  const navigate = useNavigate();

  //Film en fonction de l'id
  const movie = movies.find((movie) => movie.id === parseInt(id));

  //Si le film n'existe pas
  if (!movie) {
    return (
      <div>
        <h2>Film non trouvé</h2>
        <p>Désolé, le film que vous essayez de modifier n'existe pas.</p>
        <button onClick={() => navigate('/movies')}>Retour aux films</button>
      </div>
    );
  }

  //Etats avec les valeurs du film
  const [title, setTitle] = useState(movie.title);
  const [rating, setRating] = useState(movie.rating);
  const [description, setDescription] = useState(movie.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedMovie = { id: movie.id, title, rating, description };

    updateMovie(updatedMovie, movie.id);
    navigate('/movies');
  };

  return (
    <div>
      <h2>Modifier le film</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Titre :</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="rating">Note :</label>
          <ReactStars
            count={5}
            value={rating}
            onChange={(newRating) => setRating(newRating)}
            size={24}
            activeColor="#ffd700"
          />
        </div>
        <div>
          <label htmlFor="description">Commentaire :</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default EditMovieForm;