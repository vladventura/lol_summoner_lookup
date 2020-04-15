import { FETCH_SUMMONER, FETCH_LEAGUE } from "./action_types";
import { STATS_COLORS } from "../constants/assetmaps";
import axios from "axios";

const API_KEY = process.env.REACT_APP_LOL_API_KEY;
const API = "https://na1.api.riotgames.com";
const SUMMONER_NAME_ENDPOINT = "/lol/summoner/v4/summoners/by-name/";
const LEAGUE_ID_ENDPOINT = `/lol/league/v4/entries/by-summoner/`;
const PROXY = "https://cors-anywhere.herokuapp.com/";

export function fetchSummoner(summoner) {
  return (dispatch, getState) => {
    var requestUrl = `${API}${SUMMONER_NAME_ENDPOINT}${summoner}?api_key=${API_KEY}`;
    return axios
      .get(`${PROXY}${requestUrl}`)
      .then((response) => {
        console.log(response.data);
        var action = {
          type: FETCH_SUMMONER,
          payload: {
            ...response.data,
            icon: `http://ddragon.leagueoflegends.com/cdn/9.21.1/img/profileicon/${response.data.profileIconId}.png`,
          },
        };
        dispatch(action);
        dispatch(fetchLeague(response.data.id))
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function fetchLeague(summonerId) {
  console.log("Summoner ID recieved", summonerId)
  return (dispatch, getState) => {
    var requestUrl = `${API}${LEAGUE_ID_ENDPOINT}${summonerId}?api_key=${API_KEY}`;
    axios
      .get(`${PROXY}${requestUrl}`)
      .then((response) => {
        var data = {};
        response.data
          .filter((gameMode) => gameMode.queueType === "RANKED_SOLO_5x5")
          .forEach((gameMode) => {
            data = {
              tier: gameMode.tier,
              rank: gameMode.rank,
              wins: gameMode.wins,
              losses: gameMode.losses,
              leaguePoints: gameMode.leaguePoints,
              statsColor: STATS_COLORS[gameMode.tier],
            };
          });
        console.log(data);
        var action = {
          type: FETCH_LEAGUE,
          payload: { ...data },
        };
        dispatch(action);
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
