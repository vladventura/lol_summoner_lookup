import React from 'react';
import BottomStatsDisplay from './BottomStatsDisplay';
import Summoner from './Summoner';
import Champion from './Champion';

class MainDisplay extends React.Component {
    render() {
        const {summoner, league, champ} = this.props;
        return (
            <section className='summoner'>
                <div className='summoner__info'>
                    <Summoner
                        summoner={this.props.summoner}
                        icon={this.props.icon}
                    />
                    <Champion
                        champ={this.props.champ}
                    />
                </div>
                <div
                    className='summoner__stats'
                    style={{ background: this.props.statsColor }}
                >
                    <BottomStatsDisplay 
                        wins={this.props.wins}
                        losses={this.props.losses}
                        leaguePoints={this.props.leaguePoints}
                        tierEmblem={this.props.tierEmblem}
                        tier={this.props.tier}
                        rank={this.props.rank}
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
    }
}

export default MainDisplay;