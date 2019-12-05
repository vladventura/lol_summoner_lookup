import { FETCH_SUMMONER, FETCH_LEAGUE } from './action_types';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_LOL_API_KEY;
const API = 'https://na1.api.riotgames.com';
const SUMMONER_NAME_ENDPOINT = '/lol/summoner/v4/summoners/by-name/';
const LEAGUE_ID_ENDPOINT = `/lol/league/v4/entries/by-summoner/`;
const PROXY = 'https://cors-anywhere.herokuapp.com/';

export function fetchSummoner(summoner){
    const requestUrl = `${API}${SUMMONER_NAME_ENDPOINT}${summoner}?api_key=${API_KEY}`;
    const request = axios.get(`${PROXY}${requestUrl}`);
    return {
        type: FETCH_SUMMONER,
        payload: request
    };
}

export function fetchLeague(summonerId){
    const requestUrl = `${API}${LEAGUE_ID_ENDPOINT}${summonerId}?api_key=${API_KEY}`;
    const leagueObject = {};
    const request = axios.get(`${PROXY}${requestUrl}`)
    .then(() => {
        request.filter(gamemode => gamemode.queueType === 'RANKED_SOLO_5x5')
        .forEach(gamemode => {
            leagueObject = {
                tier: gamemode.tier,
                rank: gamemode.rank,
                wins: gamemode.wins,
                losses: gamemode.losses,
                leaguePoints: gamemode.leaguePoints,
            }
        });
    });
    return {
        type: FETCH_LEAGUE,
        payload: leagueObject
    }
}