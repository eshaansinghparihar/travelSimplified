import logo from './logo.svg';
import { useState } from 'react';
import { Switch, Route, Redirect ,BrowserRouter} from 'react-router-dom';
import Navigation from './components/Navigation';
import MinCost from './components/MinCost';
import MinDistance from './components/MinDistance';
import './App.css';

function App() {
  const [numberOfCities,setNumber]=useState('');
  var inputNumber=0;
  function numberChangeHandler(event)
  {
    inputNumber=event.target.value
    setNumber(inputNumber)
  }

  function numberSubmitHandler()
  {

  }
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
      <h1 className="Heading">TravelSimplified</h1>
      <h1 className="Heading"> </h1>
      <div className="number">
      <input 
      value={numberOfCities}
      placeholder="How many cities are you travelling?"
      onChange={numberChangeHandler}
      className="Input"
      />
      </div>
      {(numberOfCities !== '' && numberOfCities>0)? 
      (
      <div>
      <div className="number">
      <Navigation/>
      </div>
      <Switch>
      <Route exact path="/" >
      <MinDistance number={numberOfCities}/>
      </Route>
      <Route exact path='/minimumcost' >
      <MinCost number={numberOfCities}/>
      </Route>
      </Switch>
      </div>
      )
      :
      (<div/>)}
    </header>
    </div>
    </BrowserRouter>
  );
}

export default App;
