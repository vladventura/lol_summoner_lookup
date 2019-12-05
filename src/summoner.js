import React from 'react';
import BottomStatsDisplay from './components/bottom_stats_display';
import NameIconDisplay from './components/name_icon_display';

class Summoner extends React.Component {
    render() {
        return (
            <section className='summoner'>
                <div className='summoner__info'>
                    <NameIconDisplay
                        summoner={this.props.summoner}
                        icon={this.props.icon}
                    />
                    <NameIconDisplay
                        summoner={"Summoner"}
                        icon={this.props.icon}
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

export default Summoner;