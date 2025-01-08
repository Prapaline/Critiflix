import React, { useState, useEffect } from 'react';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    //Récupération de la wishlist depuis le localStorage
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  //Supprimer un film de la wishlist
  const handleRemoveFromWishlist = (movieId) => {
    const updatedWishlist = wishlist.filter((movie) => movie.id !== movieId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  return (
    <div>
      <h2 className="text-center mt-4" style={{ marginTop: '50px' }}>Ma Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-center">Votre wishlist est vide.</p>
      ) : (
        <div className="d-flex flex-wrap justify-content-center">
          {wishlist.map((movie) => (
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
                {/*Supprimer de la wishlist */}
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveFromWishlist(movie.id)}
                >
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

export default WishlistPage;