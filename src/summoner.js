import React from 'react';

class Summoner extends React.Component{
    render(){
        return(
            <section className='summoner'>
                <div className='summoner__info'>
                    <a
                    rel='noopener noreferrer'
                    href={`https://na.op.gg/summoner/userName=${this.props.summoner}`} 
                    target='_blank'
                    title={this.props.summoner}>
                        <img 
                        src={this.props.icon} 
                        alt={`${this.props.tier} ${this.props.rank}`}
                        />
                    </a>
                    <h2>
                        <a
                        rel='noopener noreferrer' 
                        href={`https://na.op.gg/summoner/userName=${this.props.summoner}`}
                        target='_blank'
                        title={this.props.summoner}>
                            {this.props.summoner}
                        </a>
                        </h2>
                </div>
                <div 
                className='summoner__stats'
                style={{background: this.props.statsColor}}>
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
                            mode='fit'/>
                            <span>{`${this.props.tier} ${this.props.rank}`}</span>
                        </li>
                    </ul>
                </div>
            </section>
        );
    }
}

export default Summoner;