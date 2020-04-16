import {
  FETCH_SUMMONER,
  FETCH_LEAGUE,
  FETCH_MASTERY,
  FETCH_CHAMPION,
  SEARCH_SUBMITTED,
  SEARCH_COMPLETE,
} from "./action_types";
import { STATS_COLORS } from "../constants/assetmaps";
import axios from "axios";

export function fetchSummoner(summoner) {
  return (dispatch, getState) => {
    var requestUrl =
      "https://us-central1-lol-summoner-lookup.cloudfunctions.net/fetchSummoner?summoner=" +
      summoner;
    return axios
      .get(requestUrl)
      .then((response) => {
        var action = {
          type: FETCH_SUMMONER,
          payload: {
            ...response.data,
            icon: `https://ddragon.leagueoflegends.com/cdn/10.8.1/img/profileicon/${response.data.profileIconId}.png`,
          },
        };
        dispatch(action);
        dispatch(fetchLeague(response.data.id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

function fetchLeague(summonerId) {
  return (dispatch, getState) => {
    var requestUrl =
      "https://us-central1-lol-summoner-lookup.cloudfunctions.net/fetchLeague?summonerId=" +
      summonerId;
    axios
      .get(requestUrl)
      .then((response) => {
        var data = {
          ...response.data,
          statsColor: STATS_COLORS[response.data.tier],
        };
        var action = {
          type: FETCH_LEAGUE,
          payload: { ...data },
        };
        dispatch(action);
        dispatch(fetchMastery(summonerId));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

function fetchMastery(summonerId) {
  return (dispatch, getState) => {
    var requestUrl =
      "https://us-central1-lol-summoner-lookup.cloudfunctions.net/fetchMastery?summonerId=" +
      summonerId;
    return axios.get(requestUrl).then((response) => {
      var action = {
        type: FETCH_MASTERY,
        payload: response.data,
      };
      dispatch(action);
      dispatch(fetchChampion(response.data.championId));
    });
  };
}

function fetchChampion(championId) {
  return (dispatch, getState) => {
    var requestUrl =
      "https://us-central1-lol-summoner-lookup.cloudfunctions.net/fetchChampion?championId=" +
      championId;
    return axios.get(requestUrl).then((response) => {
      var action = {
        type: FETCH_CHAMPION,
        payload: response.data,
      };
      dispatch(action);
      dispatch({
        type: SEARCH_COMPLETE,
      });
    });
  };
}

export function searchSubmitted() {
  return (dispatch, getState) => {
    dispatch({
      type: SEARCH_SUBMITTED,
    });
  };
}
