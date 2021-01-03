import axios from 'axios';
import { useEffect, useState } from 'react';
import SideMenu from './components/SideMenu';
import { Route } from 'react-router-dom';
import Home from './pages/HomePage';
import Shows from './pages/Shows';
import properUrl from './utils/properUrl';

function App() {
  let [genres, setGenres] = useState(null);
  let [config, setConfig] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      let res = await axios.get('/api/genres');
      setGenres(res.data);
    };
    const fetchConfig = async () => {
      let res = await axios.get('/api/configuration');
      setConfig(res.data);
    };

    fetchGenres();
    fetchConfig();
  }, []);

  return (
    <div className='h-screen flex'>
      <SideMenu links={genres} />
      <main className='flex-grow'>
        <Route path='/' exact component={Home}></Route>
        {genres && config
          ? genres.map(genre => (
              <Route
                key={genre.id}
                path={`/${properUrl(genre.name)}`}
                render={() => <Shows config={config} genre={genre} />}
              />
            ))
          : null}
      </main>
    </div>
  );
}

export default App;
