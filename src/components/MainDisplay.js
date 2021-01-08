import React from "react";

import NO_ICON from "../res/icons/29.png";

import BottomStatsDisplay from "./BottomStatsDisplay";
import Summoner from "./Summoner";
import Champion from "./Champion";
import { connect } from "react-redux";

class MainDisplay extends React.Component {
  render() {
    const { summoner, league, champion, loaded } = this.props;
    console.log(champion)
    return (
      <section className="summoner">
        <div className="summoner__info">
          <Summoner
            summoner={loaded ? summoner.name : "Loading"}
            icon={loaded ? summoner.icon : NO_ICON}
          />
          <Champion champ={champion} loaded={loaded} />
        </div>
        <div
          className="summoner__stats"
          style={loaded ? { background: league.statsColor } : {}}
        >
          <BottomStatsDisplay league={league} loaded={loaded} />
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
    loaded: state.loaded,
  };
}

export default connect(mapStateToProps)(MainDisplay);
