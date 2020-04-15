import { FETCH_SUMMONER, FETCH_LEAGUE } from "./action_types";
import axios from "axios";

const API_KEY = process.env.REACT_APP_LOL_API_KEY;
const API = "https://na1.api.riotgames.com";
const SUMMONER_NAME_ENDPOINT = "/lol/summoner/v4/summoners/by-name/";
const LEAGUE_ID_ENDPOINT = `/lol/league/v4/entries/by-summoner/`;
const PROXY = "https://cors-anywhere.herokuapp.com/";

export function fetchSummoner(summoner) {
  return (dispatch, getState) => {
    var requestUrl = `${API}${SUMMONER_NAME_ENDPOINT}${summoner}?api_key=${API_KEY}`;
    axios.get(`${PROXY}${requestUrl}`).then((response) => {
      var action = {
        type: FETCH_SUMMONER,
        payload: response.data,
      };
      dispatch(action);
    });
  };
}

export function fetchLeague(summonerId) {
  return (dispatch, getState) => {
    var requestUrl = `${API}${LEAGUE_ID_ENDPOINT}${summonerId}?api_key=${API_KEY}`;
    axios.get(`${PROXY}${requestUrl}`).then(response => {
        var action = {
            type: FETCH_LEAGUE,
            payload: response.data
        };
        dispatch(action);
    })
  };
}
