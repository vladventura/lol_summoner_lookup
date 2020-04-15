import { fetchSummoner, fetchLeague } from "./actions/actions";
import { connect } from "react-redux";

import Summoner from "./summoner.js";
import SearchBar from "./components/searchbar.js";

import NO_ICON from "./res/icons/29.png";
import { TIER_EMBLEM_MAP } from "./constants/assetmaps";

import React, { Component } from "react";

class App extends Component {

  state = {
    toSearch: ""
  }

  componentWillMount() {
    console.log("Mounted");
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
    const {summoner, league} = this.props;
    return (
      <div>
        <section id="card">
          <SearchBar
            onSubmit={this.submitSearch}
            formValue={this.state.toSearch}
            updateSearch={this.updateSearch}
          />
          <div>
            {this.props.summoner && this.props.league ? (
              <Summoner
                summoner={summoner.name}
                tier={league.tier}
                icon={summoner.icon}
                rank={league.rank}
                wins={league.wins}
                losses={league.losses}
                leaguePoints={league.leaguePoints}
                tierEmblem={TIER_EMBLEM_MAP[league.tier]}
                statsColor={league.statsColor}
              />
            ) : (
              <Summoner
                summoner="Loading"
                tier="Loading"
                icon={NO_ICON}
                rank="Loading"
                wins={0}
                losses={0}
                leaguePoints={0}
                tierEmblem={TIER_EMBLEM_MAP["FETCHING"]}
              />
            )}
          </div>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    summoner: state.summoner,
    league: state.league,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSummoner: (summoner) => {
      dispatch(fetchSummoner(summoner));
    },
    fetchLeague: (league) => {
      dispatch(fetchLeague(league));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
