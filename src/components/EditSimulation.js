import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class EditSimulation extends Component {
    constructor(props) {
        super(props);
    
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeValues = this.onChangeValues.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          username: '',
          description: '',
          values: '',
          date: new Date(),
          users: []
        }
      }
    
      componentDidMount() {
        axios.get('http://localhost:5000/simulations/'+this.props.match.params.id)
          .then(response => {
            this.setState({
              username: response.data.username,
              description: response.data.description,
              values: response.data.values.map(String).join(),
              date: new Date(response.data.date)
            })   
          })
          .catch(function (error) {
            console.log(error);
          })
    
        axios.get('http://localhost:5000/users/')
          .then(response => {
            if (response.data.length > 0) {
              this.setState({
                users: response.data.map(user => user.username),
              })
            }
          })
          .catch((error) => {
            console.log(error);
          })
    
      }
    
      onChangeUsername(e) {
        this.setState({
          username: e.target.value
        })
      }
    
      onChangeDescription(e) {
        this.setState({
          description: e.target.value
        })
      }
    
      onChangeValues(e) {
        this.setState({
          values: e.target.value
        })
      }
    
      onChangeDate(date) {
        this.setState({
          date: date
        })
      }
    
      onSubmit(e) {
        e.preventDefault();
    
        const simulation = {
          username: this.state.username,
          description: this.state.description,
          values: this.state.values,
          date: this.state.date
        }
    
        console.log(simulation);
    
        axios.put('http://localhost:5000/simulations/update/' + this.props.match.params.id, simulation)
          .then(res => console.log(res.data));
    
        window.location = '/';
      }
    
      render() {
        return (
        <div>
          <h3>Edit Simulation</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
              <label>Username: </label>
              <select ref="userInput"
                  required
                  className="form-control"
                  value={this.state.username}
                  onChange={this.onChangeUsername}>
                  {
                    this.state.users.map(function(user) {
                      return <option 
                        key={user}
                        value={user}>{user}
                        </option>;
                    })
                  }
              </select>
            </div>
            <div className="form-group"> 
              <label>Description: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  />
            </div>
            <div className="form-group">
              <label>Values (comma seperated): </label>
              <input 
                  type="text" 
                  className="form-control"
                  value={this.state.values}
                  onChange={this.onChangeValues}
                  />
            </div>
            <div className="form-group">
              <label>Date: </label>
              <div>
                <DatePicker
                  selected={this.state.date}
                  onChange={this.onChangeDate}
                />
              </div>
            </div>
    
            <div className="form-group">
              <input type="submit" value="Edit Simulation" className="btn btn-primary" />
            </div>
          </form>
        </div>
        )
      }
}

export default EditSimulation;