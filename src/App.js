import axios from 'axios';
import { useEffect, useState } from 'react';
import SideMenu from './components/SideMenu';
import { Route, useLocation } from 'react-router-dom';
import Home from './pages/HomePage';
import Shows from './pages/Shows';
import ShowBig from './pages/ShowBig';
import properUrl from './utils/properUrl';

function App() {
  const [genres, setGenres] = useState(null);
  const [config, setConfig] = useState(null);
  const location = useLocation();
  const [currentShow, setCurrentShow] = useState(null);

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

  useEffect(() => {
    let pathSections = location.pathname.split('/');
    if (pathSections.length > 1) {
      let [showName, showId] = pathSections[pathSections.length - 1].split('_');
      setCurrentShow({ name: showName, id: showId });
    }
  }, [location]);

  return (
    <div className='h-screen flex'>
      <SideMenu links={genres} />
      <main className='flex-grow'>
        {currentShow ? (
          <Route
            path={`/${currentShow.name}_${currentShow.id}`}
            exact
            render={() => <ShowBig showId={currentShow.id} config={config} />}
          />
        ) : null}
        <Route path='/' exact render={() => <Home links={genres} />} />
        {genres && config
          ? genres.map(genre => (
              <Route
                key={genre.id}
                path={`/${properUrl(genre.name)}`}
                render={() => (
                  <Shows
                    setCurrentShow={setCurrentShow}
                    config={config}
                    genre={genre}
                  />
                )}
              />
            ))
          : null}
      </main>
    </div>
  );
}

export default App;
