import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Show from './Show';
import { useRouteMatch, Link, Route } from 'react-router-dom';
import properUrl from '../utils/properUrl';
import ShowBig from './ShowBig';

export default function Shows({ genre, baseUrl, posterSize }) {
  let triggerRef = useRef(null);
  let scrollerRef = useRef(null);
  let [shows, setShows] = useState(null);
  let [currentPage, setCurrentPage] = useState(1);
  let [currentShow, setCurrentShow] = useState(null);
  let { path, url } = useRouteMatch();

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

  return (
      <div
        ref={scrollerRef}
        className='flex flex-wrap h-screen overflow-y-auto'
      >
        <Route exact path={path}>
          {shows
            ? shows.map((show, key) => (
                <Link
                  onClick={() => setCurrentShow(show)}
                  key={key}
                  to={`${url}/${properUrl(show.name)}`}
                >
                  <Show baseUrl={baseUrl} posterSize={posterSize} show={show} />
                </Link>
              ))
            : null}
          <div ref={triggerRef} className='hidden'></div>
        </Route>
        {currentShow ? (
          <Route exact path={`${path}/${properUrl(currentShow.name)}`}>
            <ShowBig
              baseUrl={baseUrl}
              posterSize={posterSize}
              show={currentShow}
            />
          </Route>
        ) : null}
      </div>
  );
}
