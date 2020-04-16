import React from 'react';

import NO_ICON from "../res/icons/29.png";
import { TIER_EMBLEM_MAP } from "../constants/assetmaps";


import BottomStatsDisplay from './BottomStatsDisplay';
import Summoner from './Summoner';
import Champion from './Champion';
import {connect} from 'react-redux';

class MainDisplay extends React.Component {
    render() {
        const {summoner, league, champion} = this.props;
        return (
            <section className='summoner'>
                <div className='summoner__info'>
                    <Summoner
                        summoner={summoner? (summoner.name) : "Loading"}
                        icon={summoner? (summoner.icon) : NO_ICON}
                    />
                    <Champion
                        champ={champion}
                    />
                </div>
                <div
                    className='summoner__stats'
                    style={{ background: league.statsColor }}
                >
                    <BottomStatsDisplay 
                        wins={league.wins}
                        losses={league.losses}
                        leaguePoints={league.leaguePoints}
                        tierEmblem={TIER_EMBLEM_MAP[league.tier]}
                        tier={league.tier}
                        rank={league.rank}
                    />
                </div>
            </section>
        );
    }
}

function mapStateToProps(state){
    return {
        summoner: state.summoner,
        league: state.league,
        champion: state.champion,
    }
}

export default connect(mapStateToProps)(MainDisplay);