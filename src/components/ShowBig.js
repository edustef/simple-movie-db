import { useHistory } from 'react-router-dom';

export default function ShowBig({ show, baseUrl, posterSize }) {
  let history = useHistory();
  return (
    <div className='w-full h-screen'>
      <button onClick={() => history.goBack()}>Go Back</button>
      <div className='overflow-hidden m-4'>
        <img
          className='object-cover'
          src={baseUrl + posterSize + '/' + show.poster_path}
          alt=''
        />
      </div>
    </div>
  );
}
