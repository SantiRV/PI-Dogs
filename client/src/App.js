import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from './components/LandingPage.jsx';
import Home from "./components/Home.jsx";
import Detail from './components/Detail.jsx';
import DogCreate from './components/DogCreate.jsx';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/create" component={DogCreate} />
          <Route path="/:id" component={Detail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
