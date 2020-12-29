import axios from 'axios';
import { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import SideMenu from './components/SideMenu';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Shows from './components/Shows';

function App() {
  let [genres, setGenres] = useState(null);
  let [config, setConfig] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      let res = await axios.get('/api/genres');
      setGenres(shuffle(res.data.genres).slice(0, 5));
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
      <main className='flex-grow overflow-y-auto'>
        <Switch>
          <Route path='/' exact component={Home}></Route>
          {genres && config
            ? genres.map(genre => (
                <Route
                  key={genre.id}
                  exact
                  path={`/${genre.name.toLowerCase()}`}
                  render={() => (
                    <Shows
                      baseUrl={config.baseUrl}
                      posterSize={config.posterSizes[3]}
                      genre={genre}
                    />
                  )}
                />
              ))
            : null}
        </Switch>
      </main>
    </div>
  );
}

export default App;
