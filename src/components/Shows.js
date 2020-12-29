import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Shows.module.css';

export default function Shows({ genre, baseUrl, posterSize }) {
  let [shows, setShows] = useState(null);
  let [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      let res = await axios.get('/api/tvs', {
        params: {
          genreId: genre.id,
          page: currentPage,
        },
      });
      let showsWithPoster = res.data.results.filter(show => show.poster_path);
      setShows(shows => {
        if (shows) {
          return [...shows, ...showsWithPoster];
        }

        return res.data.results;
      });
    };

    fetchData();
  }, [currentPage, genre]);

  return (
    <div className='flex flex-wrap'>
      {shows
        ? shows.map((show, key) => (
            <div className={styles.card} key={key}>
              <img src={baseUrl + posterSize + '/' + show.poster_path} alt='' />
            </div>
          ))
        : null}
      <button
        onClick={() => {
          setCurrentPage(page => page + 1);
        }}
      >
        Load more
      </button>
    </div>
  );
}
