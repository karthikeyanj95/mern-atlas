import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import SimulationList from "./components/SimulationList";
import CreateSimulation from "./components/CreateSimulation";
import EditSimulation from "./components/EditSimulation";
import CreateUser from "./components/CreateUser";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={SimulationList} />
        <Route path="/edit/:id" exact component={EditSimulation} />
        <Route path="/create" exact component={CreateSimulation} />
        <Route path="/user" exact component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
