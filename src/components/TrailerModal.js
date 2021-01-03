import React from 'react';

export default function TrailerModal({ urlId, size, name, closeModal }) {
  return (
    <div className='grid place-items-center fixed inset-0 z-20 w-screen h-screen bg-black bg-opacity-80'>
      <div className='flex flex-col items-center'>
        <button
          onClick={() => closeModal()}
          className='mb-4 text-white hover:text-gray-300'
        >
          <svg
            className='w-16 h-16'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${urlId}`}
          width={1280}
          height={720}
          frameBorder='0'
          allowFullScreen
          title={name}
        ></iframe>
      </div>
    </div>
  );
}
