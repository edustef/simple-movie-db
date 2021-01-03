import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

export default function Show({ config, show }) {
  let [isDescShowing, setIsDescShowing] = useState(false);
  let [isPosterLoaded, setIsPosterLoaded] = useState(false);

  const fadeDesc = useSpring({
    opacity: isDescShowing ? 1 : 0,
  });

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translate3d(0,-20px,0)' },
    to: { opacity: 1, transform: 'translate3d(0,0px,0)' },
    transform: isPosterLoaded
      ? 'translate3d(0, 0px,0)'
      : 'translate3d(0,-20px,0)',
  });

  return (
    <animated.div
      onMouseEnter={() => setIsDescShowing(true)}
      onMouseLeave={() => setIsDescShowing(false)}
      className='overflow-hidden relative m-4'
      style={fadeIn}
      onLoad={() => setIsPosterLoaded(true)}
    >
      <animated.div
        style={fadeDesc}
        className='desc text-white opacity-0 absolute w-full h-full bg-gradient-to-t from-black to-transparent'
      >
        <div className='p-4 flex flex-col space-y-4 justify-end w-full h-full'>
          <p className='font-bold uppercase'>{show.name}</p>
          <p className='text-sm h-16 overflow-hidden'>{show.overview}</p>
          <p className='text-gray-400'>{show.vote_average}/10</p>
        </div>
      </animated.div>
      <img
        className='object-cover w-full h-full'
        src={config.base_url + config.poster_sizes[3] + '/' + show.poster_path}
        alt=''
      />
    </animated.div>
  );
}
