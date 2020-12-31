import React from 'react';
import { NavLink } from 'react-router-dom';
import properUrl from '../utils/properUrl';

export default function SideMenu({ links }) {
  return (
    <div className='h-screen bg-gray-900 w-64 flex-shrink-0'>
      <h1 className='p-8 text-white font-bold text-2xl'>
        <NavLink to='/'>MoviesDB</NavLink>
      </h1>
      <ul className='p-8 space-y-8'>
        {links
          ? links.map(link => (
              <li key={link.id}>
                <NavLink
                  className='text-white hover:text-gray-400 font-semibold uppercase'
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
  );
}
