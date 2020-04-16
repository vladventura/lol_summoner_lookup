import { searchSubmitted, fetchSummoner, fetchLeague } from "./actions/actions";
import { connect } from "react-redux";

import MainDisplay from "./components/MainDisplay.js";
import SearchBar from "./components/SearchBar.js";

import React, { Component } from "react";

class App extends Component {
  state = {
    toSearch: "",
  };

  componentWillMount() {
    this.props.fetchSummoner("Sleepy Bullets");
  }

  validateForm = () => {
    var errors = [];
    if (this.state.toSearch.length < 3) {
      errors.push("The length of the Summoner Name is too short");
    }
    if (this.state.toSearch.length > 16) {
      errors.push("The length of the Summoner Name is too long");
    }
    return errors;
  };

  submitSearch = (event) => {
    event.preventDefault();
    var validation = this.validateForm();
    if (Array.isArray(validation) && validation.length) {
      alert(validation);
    } else {
      this.setState({
        summoner: this.state.toSearch,
      });
      this.props.fetchSummoner(this.state.toSearch);
    }
    this.setState({
      toSearch: "",
    });
  };

  updateSearch = (event) => {
    this.setState({
      toSearch: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <section id="card">
          <SearchBar
            onSubmit={this.submitSearch}
            formValue={this.state.toSearch}
            updateSearch={this.updateSearch}
          />
          <div>
            <MainDisplay />
          </div>
        </section>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    searchSubmitted: () => dispatch(searchSubmitted()),
    fetchSummoner: (summoner) => {
      dispatch(fetchSummoner(summoner));
    },
    fetchLeague: (league) => {
      dispatch(fetchLeague(league));
    },
  };
}

export default connect(null, mapDispatchToProps)(App);
