import { FETCH_SUMMONER, FETCH_LEAGUE, FETCH_MASTERY, FETCH_CHAMPION, SEARCH_SUBMITTED } from '../actions/action_types';

var initState = {
    summoner: null,
    league: null,
    mastery: null,
    champion: null,
};

export function rootReducer(state = initState, action){
    switch(action.type){
        case FETCH_SUMMONER: return {
            ...state,
            summoner: action.payload,
        };
        case FETCH_LEAGUE: return {
            ...state,
            league: action.payload,
        };
        case FETCH_MASTERY: return {
            ...state,
            mastery: action.payload
        };
        case FETCH_CHAMPION: return {
            ...state,
            champion: action.payload
        }
        case SEARCH_SUBMITTED: return initState;
        default: return state;
    };
}

export default rootReducer;