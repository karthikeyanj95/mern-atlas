import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Simulation = props => (
  <tr>
    <td>{props.simulation.username}</td>
    <td>{props.simulation.description}</td>
    <td>{props.simulation.values.map(String).join()}</td>
    <td>{props.simulation.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.simulation._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteSimulation(props.simulation._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

class SimulationList extends Component {
  constructor(props) {
    super(props);

    this.deleteSimulation = this.deleteSimulation.bind(this);

    this.state = { simulations: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/simulations/")
      .then(response => {
        this.setState({ simulations: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteSimulation(id) {
    axios.delete("http://localhost:5000/simulations/" + id).then(response => {
      console.log(response.data);
    });

    this.setState({
      simulations: this.state.simulations.filter(el => el._id !== id)
    });
  }

  simulationList() {
    return this.state.simulations.map(currentsimulation => {
      return (
        <Simulation
          simulation={currentsimulation}
          deleteSimulation={this.deleteSimulation}
          key={currentsimulation._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Simulation List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Value</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.simulationList()}</tbody>
        </table>
      </div>
    );
  }
}

export default SimulationList;
