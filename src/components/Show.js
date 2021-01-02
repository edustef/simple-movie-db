import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

export default function Show({ config, show }) {
  let [isDescShowing, setIsDescShowing] = useState(false);

  const fadeDesc = useSpring({
    opacity: isDescShowing ? 1 : 0,
  });

  return (
    <div
      onMouseEnter={() => setIsDescShowing(true)}
      onMouseLeave={() => setIsDescShowing(false)}
      className='overflow-hidden relative m-4'
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
    </div>
  );
}
