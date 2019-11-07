import React from 'react';
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
                    style={{ background: this.props.statsColor }}>
                    <ul>
                        <li>
                            <i>{this.props.wins}</i><span>Wins</span>
                        </li>
                        <li>
                            <i>{this.props.losses}</i><span>Losses</span>
                        </li>
                        <li>
                            <i>{this.props.leaguePoints}</i><span>LP</span>
                        </li>
                        <li>
                            <img
                                height={50}
                                alt=''
                                src={this.props.tierEmblem}
                                mode='fit' />
                            <span>{`${this.props.tier} ${this.props.rank}`}</span>
                        </li>
                    </ul>
                </div>
            </section>
        );
    }
}

export default Summoner;