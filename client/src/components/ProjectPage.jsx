import React from "react";
import axios from "axios";

export default class ProjectsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {
        name: "",
        description: "",
        actions: []
      }
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:4000/projects/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          data: {
            name: res.data.name,
            description: res.data.description,
            actions: res.data.actions,
          }
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h2>{this.state.data.name}</h2>
        <p>{this.state.data.description}</p>
        <h3>Actions:</h3>
        {this.state.data.actions.map(el => {
          return (
            <div>
              <h4>{el.description}</h4>
              <p>{el.notes}</p>
            </div>
          );
        })}
      </div>
    );
  }
}
