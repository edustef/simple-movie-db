import React from 'react';
import { NavLink } from 'react-router-dom';

export default function SideMenu({ links }) {
  return (
    <div className='h-screen bg-gray-900 w-64'>
      <h1 className='p-8 text-white font-bold text-2xl'><NavLink to='/'>MoviesDB</NavLink></h1>
      <ul className='p-8 space-y-8'>
        {links.map(link => (
          <li key={link.id}>
            <NavLink
              className='text-white hover:text-gray-400 font-semibold uppercase'
              activeClassName='text-gray-400'
              to={`/${link.name.toLowerCase()}`}
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
