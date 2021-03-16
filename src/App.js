import { Switch, Route ,BrowserRouter} from 'react-router-dom';
import Navigation from './components/Navigation';
import MinCost from './components/MinCost';
import MinDistance from './components/MinDistance';
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
      <h1 className="Heading">TravelSimplified</h1>
      <h1 className="Heading"> </h1>
      <div>
      <Navigation/>
      </div>
      <Switch>
      <Route exact path="/" >
      <MinDistance/>
      </Route>
      <Route exact path='/minimumcost' >
      <MinCost/>
      </Route>
      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
