import React from "react";

import NO_ICON from "../res/icons/29.png";

import BottomStatsDisplay from "./BottomStatsDisplay";
import Summoner from "./Summoner";
import Champion from "./Champion";
import { connect } from "react-redux";

class MainDisplay extends React.Component {
  render() {
    const { summoner, league, champion } = this.props;
    return (
      <section className="summoner">
        <div className="summoner__info">
          <Summoner
            summoner={summoner ? summoner.name : "Loading"}
            icon={summoner ? summoner.icon : NO_ICON}
          />
          <Champion champ={champion} />
        </div>
        <div
          className="summoner__stats"
          style={league ? { background: league.statsColor } : {}}
        >
          <BottomStatsDisplay league={league} />
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    summoner: state.summoner,
    league: state.league,
    champion: state.champion,
  };
}

export default connect(mapStateToProps)(MainDisplay);
