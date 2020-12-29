import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styles from './Shows.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Shows({ genre, baseUrl, posterSize }) {
  let triggerRef = useRef(null);
  let scrollerRef = useRef(null);
  let [shows, setShows] = useState(null);
  let [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      scroller: scrollerRef.current,
      trigger: triggerRef.current,
      start: 'center top',
      end: 'bottom bottom',
      onUpdate: self => {
        let progress = self.progress.toFixed(2);
        if (progress >= 0.9 && self.direction === 1) {
          setCurrentPage(page => page + 1);
          ScrollTrigger.refresh();
        }
      },
    });
  }, []);

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
        return showsWithPoster;
      });
    };

    fetchData();
  }, [currentPage, genre]);

  function handleShowDesc(el) {}
  function handleHideDesc(el) {}

  return (
    <div ref={scrollerRef} className='flex flex-wrap h-screen overflow-y-auto'>
      {shows
        ? shows.map((show, key) => (
            <div
              onMouseEnter={handleShowDesc}
              onMouseLeave={handleHideDesc}
              className='relative'
              key={key}
            >
              <div className='text-white absolute w-full h-full bg-gradient-to-t from-black to-transparent'>
                <div className='p-4 flex flex-col space-y-4 justify-end w-full h-full'>
                  <p className='font-bold uppercase'>{show.name}</p>
                  <p className='text-sm h-16 overflow-hidden'>
                    {show.overview}
                  </p>
                  <p className='text-gray-400'>{show.vote_average}/10</p>
                </div>
              </div>
              <img
                className='object-cover w-full h-full'
                src={baseUrl + posterSize + '/' + show.poster_path}
                alt=''
              />
            </div>
          ))
        : null}
      <div ref={triggerRef} className='hidden'></div>
    </div>
  );
}
