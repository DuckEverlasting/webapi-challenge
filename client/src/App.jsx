import React from "react";
import "./App.css";
import axios from "axios";
import { Route } from "react-router-dom";
import ProjectsList from "./components/ProjectsList.jsx";
import ActionsList from "./components/ActionsList.jsx";
import Nav from "./components/Nav.jsx";
import ProjectPage from "./components/ProjectPage";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      actions: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/projects/")
      .then(res =>
        this.setState({
          projects: res.data
        })
      )
      .catch(err => console.log(err));
    axios
      .get("http://localhost:4000/actions")
      .then(res =>
        this.setState({
          actions: res.data
        })
      )
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Route path="/" component={Nav} />
        <Route
          exact path="/projects"
          render={props => <ProjectsList {...props} projects={this.state.projects} />}
        />
        <Route path="/projects/:id" component={ProjectPage} />
        <Route
          path="/actions"
          render={props => <ActionsList {...props} actions={this.state.actions} />}
        />
      </div>
    );
  }
}

export default App;
