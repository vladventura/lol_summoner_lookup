import { FETCH_SUMMONER, FETCH_LEAGUE } from '../actions/action_types';
import { TIER_EMBLEM_MAP } from '../constants/assetmaps';

export default function SummonerReducer(state = null, action){
    const { data } = action.payload;
    switch(action.type){
        case FETCH_SUMMONER: return {
            ...state,
            summoner: data.name,
            icon: `http://ddragon.leagueoflegends.com/cdn/9.21.1/img/profileicon/${data.profileIconId}.png`,
            level: data.summonerLevel,
            id: data.id
        };
        case FETCH_LEAGUE: return {
            ...state,
            ...data
        }
    };
    return state;
}