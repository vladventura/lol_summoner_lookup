const functions = require("firebase-functions");
const axios = require("axios");

const API = "https://na1.api.riotgames.com";
const SUMMONER_NAME_ENDPOINT = "/lol/summoner/v4/summoners/by-name/";
const LEAGUE_ID_ENDPOINT = `/lol/league/v4/entries/by-summoner/`;
const MASTERY_ENDPOINT =
  "/lol/champion-mastery/v4/champion-masteries/by-summoner/";
const apiKey = functions.config().riotgames.key;

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.fetchSummoner = functions.https.onRequest((request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  var requestUrl = `${API}${SUMMONER_NAME_ENDPOINT}${request.query.summoner}?api_key=${apiKey}`;
  return axios.get(requestUrl).then((resp) => {
    return response.status(200).json(resp.data);
  });
});

exports.fetchLeague = functions.https.onRequest((request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  var requestUrl = `${API}${LEAGUE_ID_ENDPOINT}${request.query.summonerId}?api_key=${apiKey}`;
  return axios.get(requestUrl).then((resp) => {
    var data = {};
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
  var requestUrl = `${API}${MASTERY_ENDPOINT}${request.query.summonerId}?api_key=${apiKey}`;
  return axios.get(requestUrl).then((resp) => {
    var firstElement = resp.data[0];
    var data = {
      championId: firstElement.championId,
      championLevel: firstElement.championLevel,
      championPoints: firstElement.championPoints,
    };
    return response.status(200).json(data);
  });
});

const getVersion = async () => {
  return fetch('https://ddragon.leagueoflegends.com/api/versions.json').then(r => r.json()).then(data => data[0])
};

exports.fetchChampion = functions.https.onRequest(async (request, response) => {
  let ver = await getVersion();
  response.set("Access-Control-Allow-Origin", "*");
  var requestUrl =
    `http://ddragon.leagueoflegends.com/cdn/${ver}/data/de_DE/champion.json`;
  return axios.get(requestUrl).then((resp) => {
    var data = {};
    var entries = Object.entries(resp.data.data);
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
