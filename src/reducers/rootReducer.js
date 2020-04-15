import { FETCH_SUMMONER, FETCH_LEAGUE } from '../actions/action_types';

var initState = {
    summoner: null,
    league: null,
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
        default: return state;
    };
}

export default rootReducer;