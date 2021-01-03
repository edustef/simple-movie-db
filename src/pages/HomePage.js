import React from 'react';
import { NavLink } from 'react-router-dom';
import properUrl from '../utils/properUrl';
import { useSpring, animated } from 'react-spring';

export default function HomePage({ links }) {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translate3d(0,-20px,0)' },
    to: { opacity: 1, transform: 'translate3d(0,0px,0)' },
  });

  return (
    <animated.div style={fadeIn} className='h-screen grid place-items-center'>
      <div className=''>
        <h1 className='text-center p-8 font-bold text-9xl'>
          <NavLink to='/'>MoviesDB</NavLink>
        </h1>
        <ul className='flex p-8 space-x-8'>
          {links
            ? links.map(link => (
                <li key={link.id}>
                  <NavLink
                    className='hover:text-gray-700 font-semibold uppercase'
                    activeClassName='text-gray-400'
                    to={`/${properUrl(link.name)}`}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))
            : null}
        </ul>
      </div>
    </animated.div>
  );
}
