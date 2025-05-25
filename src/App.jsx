import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login.jsx"
import Success from './components/Success.jsx';
import { Switch, Route } from "react-router-dom"

function App() {


  return (
    <>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/Success" component={Success} />
      </Switch>
    </>
  )
}

export default App
