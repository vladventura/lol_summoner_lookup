import React from 'react';
import ReactDOM from 'react-dom';
import Summoner from './summoner.js';
import './index.scss';

// Tier Images
import IRON from './res/emblems/IRON.png';
import BRONZE from './res/emblems/BRONZE.png';
import SILVER from './res/emblems/SILVER.png';
import GOLD from './res/emblems/GOLD.png';
import PLATINUM from './res/emblems/PLATINUM.png';
import DIAMOND from './res/emblems/DIAMOND.png';
import MASTER from './res/emblems/MASTER.png';
import GRANDMASTER from './res/emblems/GRANDMASTER.png';
import CHALLENGER from './res/emblems/CHALLENGER.png';
import FETCHING from './res/emblems/FETCHING.png';

import NO_ICON from './res/icons/29.png';

const API_KEY = process.env.REACT_APP_LOL_API_KEY;
const API = 'https://na1.api.riotgames.com';
const SUMMONER_NAME_ENDPOINT = '/lol/summoner/v4/summoners/by-name/';
const LEAGUE_ID_ENDPOINT = `/lol/league/v4/entries/by-summoner/`;
const PROXY = 'https://cors-anywhere.herokuapp.com/';

const TIER_EMBLEM_MAP = {
    BRONZE: BRONZE,
    IRON: IRON,
    SILVER: SILVER,
    GOLD: GOLD,
    PLATINUM: PLATINUM,
    DIAMOND: DIAMOND,
    MASTER: MASTER,
    GRANDMASTER: GRANDMASTER,
    CHALLENGER: CHALLENGER
}

const STATS_COLORS = {
    BRONZE: '#8F5335',
    IRON: '#6D6260',
    SILVER: '#76929C',
    GOLD: '#D1A035',
    PLATINUM: '#1ABB5F',
    DIAMOND: '#6860B7',
    MASTER: '#724492',
    GRANDMASTER: '#A11E27',
    CHALLENGER: '#D9C1C0'
}


class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            summoner: 'Sleepy Bullets',
            level: null,
            icon: null,
            id: null,
            tier: null,
            rank: null,
            wins: null,
            losses: null,
            leaguePoints: null,
            statsColor: null,
            loaded: false,
            toSearch: '',
        }
        this.baseState = this.state;
        this.getSummoner(this.state.summoner);
    }

    getSummoner = async (username) => {
        var url = `${API}${SUMMONER_NAME_ENDPOINT}${username}?api_key=${API_KEY}`;
        var response = await fetch(`${PROXY}${url}`);
        if (response.ok){
            var responseToJson = await response.json();
            this.setState ({
                summoner: responseToJson.name,
                icon: `http://ddragon.leagueoflegends.com/cdn/9.15.1/img/profileicon/${responseToJson.profileIconId}.png`,
                level: responseToJson.summonerLevel,
                id: responseToJson.id,
            });
        } else {
            alert("This Summoner does not exist");
        }

        await this.getLeague();
    }

    getLeague = async () => {
        var url = `${API}${LEAGUE_ID_ENDPOINT}${this.state.id}?api_key=${API_KEY}`;
        var response = await fetch(PROXY + url);
        var responseToJson = await response.json();
        responseToJson.filter(gamemode => gamemode.queueType === "RANKED_SOLO_5x5")
        .forEach(gamemode => {
            console.log(gamemode)

                this.setState({
                    tier: gamemode.tier,
                    rank: gamemode.rank,
                    wins: gamemode.wins,
                    losses: gamemode.losses,
                    leaguePoints: gamemode.leaguePoints,
                    statsColor: STATS_COLORS[gamemode.tier],
                });

        });
        this.setState({
            loaded: true,
        });
    }

    validateForm = () =>{
        var errors = [];
        if (this.state.toSearch.length < 3){
            errors.push(
                "The length of the Summoner Name is too short"
            );
        }
        if (this.state.toSearch.length > 16){
            errors.push(
                "The length of the Summoner Name is too long"
            );
        }
        return errors;
    }

    submitSearch = event => {
        event.preventDefault();
        var validation = this.validateForm();
        if(Array.isArray(validation) && validation.length){
            alert(
                validation
            );
        } else {
            this.setState({
                summoner: this.state.toSearch,
                loaded: false,
            });
            this.getSummoner(this.state.toSearch);
        }
        this.setState({
            toSearch: ""
        });
    }

    updateSearch = event => {
        this.setState({
            toSearch: event.target.value
        });
    }

    render(){
        return(
            <div>
                <section id='card'>
                    <div className='form-box'>
                        <form onSubmit={this.submitSearch}>
                            <label><input 
                            type='text' 
                            value={this.state.toSearch} 
                            onChange={this.updateSearch}
                            placeholder="Type the Summoner's name and then hit Enter!"/></label>
                </form>
                </div>
                <div>
                    {this.state.loaded? (
                        <Summoner 
                        summoner={this.state.summoner}
                        tier={this.state.tier}
                        icon={this.state.icon}
                        rank={this.state.rank}
                        wins={this.state.wins}
                        losses={this.state.losses}
                        leaguePoints={this.state.leaguePoints}
                        tierEmblem={TIER_EMBLEM_MAP[this.state.tier]}
                        statsColor={this.state.statsColor}/>
                    ):(
                        <Summoner
                        summoner="Fetching"
                        tier="Fetching"
                        icon={NO_ICON}
                        rank="Fetching"
                        wins={0}
                        losses={0}
                        leaguePoints={0}
                        tierEmblem={FETCHING}
                        />
                    )}
                </div>
                </section>
            </div>
        );
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
);