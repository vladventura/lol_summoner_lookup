const functions = require("firebase-functions");
const axios = require("axios");

const API = "https://na1.api.riotgames.com";
const SUMMONER_NAME_ENDPOINT = "/lol/summoner/v4/summoners/by-name/";
const LEAGUE_ID_ENDPOINT = `/lol/league/v4/entries/by-summoner/`;
const MASTERY_ENDPOINT =
  "/lol/champion-mastery/v4/champion-masteries/by-summoner/";
const apiKey = functions.config().riotgames.key;

exports.fetchSummoner = functions.https.onRequest(async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  const getVersion = async () => {
    return axios.get('https://ddragon.leagueoflegends.com/api/versions.json').then(data => 
     data.data[0]
    );
  };

  let ver = await getVersion();

  let requestUrl = `${API}${SUMMONER_NAME_ENDPOINT}${request.query.summoner}?api_key=${apiKey}`;
  return axios.get(requestUrl).then((resp) => {
    return response.status(200).json({...resp.data, ver});
  });
});

exports.fetchLeague = functions.https.onRequest((request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  let requestUrl = `${API}${LEAGUE_ID_ENDPOINT}${request.query.summonerId}?api_key=${apiKey}`;
  return axios.get(requestUrl).then((resp) => {
    let data = {};
    console.log(requestUrl);
    console.log(request.query.summonerId);
    console.log(resp.data);
    resp.data
      .filter((gameMode) => gameMode.queueType === "RANKED_SOLO_5x5")
      .forEach((gameMode) => {
        data = {
          tier: gameMode.tier,
          rank: gameMode.rank,
          wins: gameMode.wins,
          losses: gameMode.losses,
          leaguePoints: gameMode.leaguePoints,
        };
      });
    return response.status(200).json(data);
  });
});

exports.fetchMastery = functions.https.onRequest((request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  let requestUrl = `${API}${MASTERY_ENDPOINT}${request.query.summonerId}?api_key=${apiKey}`;
  return axios.get(requestUrl).then((resp) => {
    let firstElement = resp.data[0];
    let data = {
      championId: firstElement.championId,
      championLevel: firstElement.championLevel,
      championPoints: firstElement.championPoints,
    };
    return response.status(200).json(data);
  });
});


exports.fetchChampion = functions.https.onRequest(async (request, response) => {
  const getVersion = async () => {
    return axios.get('https://ddragon.leagueoflegends.com/api/versions.json').then(data => 
     data.data[0]
    );
  };
  let ver = await getVersion();
  response.set("Access-Control-Allow-Origin", "*");
  let requestUrl =
    `http://ddragon.leagueoflegends.com/cdn/${ver}/data/de_DE/champion.json`;
  return axios.get(requestUrl).then((resp) => {
    let data = {};
    let entries = Object.entries(resp.data.data);
    entries.forEach((entry) => {
      if (parseInt(entry[1].key) === parseInt(request.query.championId)) {
        data = {
          id: entry[1].id,
          name: entry[1].name,
          key: entry[1].key,
        };
      }
    });
    return response.status(200).json(data);
  });
});
