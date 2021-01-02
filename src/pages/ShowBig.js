import { useHistory } from 'react-router-dom';

export default function ShowBig({ show, config }) {
  let history = useHistory();
  return (
    <div className='relative w-full h-screen'>
      <div className='z-10 absolute m-6'>
        <button
          className='flex mb-8 bg-gray-50 border hover:bg-gray-200 shadow-md py-3 px-5 rounded-md'
          onClick={() => history.goBack()}
        >
          <svg
            className='w-6 h- mr-3'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z'
            />
          </svg>
          Go Back
        </button>
        <div className='flex space-x-8'>
          <img
            className='object-cover'
            src={
              config.base_url + config.poster_sizes[3] + '/' + show.poster_path
            }
            alt=''
          />
          <div className='text-white max-w-lg'>
            <div className='flex justify-between mb-8'>
              <div className='mr-8'>
                <div className='text-4xl font-bold mb-1'>
                  {show.name} - {show.id}
                </div>
                <div className='text-sm tracking-wider text-gray-300 italic'>
                  {show.first_air_date}
                </div>
              </div>
              <div>
                <div className='flex text-right text-3xl font-semibold'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    className='w-16 h-16 mr-2'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                    />
                  </svg>
                  <div>
                    {show.vote_average}/10
                    <div className='text-sm'>{show.vote_count} votes</div>
                  </div>
                </div>
              </div>
            </div>
            <p className='tracking-widest leading-relaxed'>{show.overview}</p>
          </div>
        </div>
      </div>
      <div className='overflow-hidden h-full bg-black'>
        <img
          className='opacity-20 object-cover w-full object-center'
          src={
            config.base_url +
            config.backdrop_sizes[3] +
            '/' +
            show.backdrop_path
          }
          alt=''
        />
      </div>
    </div>
  );
}
