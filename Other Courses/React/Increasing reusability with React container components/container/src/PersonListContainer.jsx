import React, {Component} from "react";
import PersonList from "./PersonList";


class PersonListContainer extends Component {
  constructor() {
    super();
    this.state = {
      people: [],
    };
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData() {
    fetch("https://api.randomuser.me/?results=10&seed=bbqftw")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          people: data.results.map((res) => res),
        });
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return <PersonList people={this.state.people}/>;
  }
}

export default PersonListContainer;