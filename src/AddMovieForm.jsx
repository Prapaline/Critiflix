import React, { useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import './AddMovieForm.css';

const AddMovieForm = ({ addMovie }) => {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const [addedMovie, setAddedMovie] = useState(null);
  const [animation, setAnimation] = useState(false);

  //Générer un ID unique
  const generateId = () => {
    return Date.now();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      alert('Veuillez remplir le titre.');
      return;
    }

    const newMovie = {
      id: generateId(),
      title,
      rating,
      description,
    };

    //Ajout du film au localStorage
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    movies.push(newMovie);
    localStorage.setItem('movies', JSON.stringify(movies));

    addMovie(newMovie);

    //Animation de confirmation
    setAddedMovie(newMovie);
    setAnimation(true);
    setTimeout(() => setAnimation(false), 2000);

    //Remise à zéro du formulaire
    setTitle('');
    setRating(0);
    setDescription('');
  };

  return (
    <div>
      <h2
        className="text-center mb-4" style={{ marginTop: '50px'}} >Ajouter un Film</h2>      
        <form onSubmit={handleSubmit} className="p-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Titre du film :</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Entrez le titre du film"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">Note :</label>
          <ReactStars
            count={5}
            value={rating}
            onChange={(newRating) => setRating(newRating)}
            size={24}
            activeColor="#ffd700"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Commentaire (optionnel) :</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Entrez un commentaire (facultatif)"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Ajouter le film</button>
      </form>

      {/*Animation de confirmation*/}
      {animation && addedMovie && (
        <div className="movie-confirmation">
          <p>Film ajouté : {addedMovie.title}</p>
        </div>
      )}
    </div>
  );
};

export default AddMovieForm;