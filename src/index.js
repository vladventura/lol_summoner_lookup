import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/searchbar.js';
import Summoner from './summoner.js';
// Tier Images and Colors
import { TIER_EMBLEM_MAP, STATS_COLORS } from './constants/assetmaps';
import NO_ICON from './res/icons/29.png';
import './index.scss';



const API_KEY = process.env.REACT_APP_LOL_API_KEY;
const API = 'https://na1.api.riotgames.com';
const SUMMONER_NAME_ENDPOINT = '/lol/summoner/v4/summoners/by-name/';
const LEAGUE_ID_ENDPOINT = `/lol/league/v4/entries/by-summoner/`;
const PROXY = 'https://cors-anywhere.herokuapp.com/';


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
                icon: `http://ddragon.leagueoflegends.com/cdn/9.21.1/img/profileicon/${responseToJson.profileIconId}.png`,
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

    validateForm = () => {
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
                    <SearchBar 
                        onSubmit={this.submitSearch}
                        formValue={this.state.formValue}
                        updateSearch={this.updateSearch}/>
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
                        tierEmblem={TIER_EMBLEM_MAP['FETCHING']}
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