import { GET_MOVIES,LOADING_MOVIES } from "../actions/names"


const initState = {
    movies:[],
    loadingMovies:true,
}



export default function reducer(state = initState,action){

    switch(action.type){

        case GET_MOVIES:
            return {
                ...state,
                movies:action.payload,
                loadingMovies:false
            }
        case LOADING_MOVIES:
            return {
                ...state,
                loadingMovies:true
            }
        default:
            return state
    }
}