import { GET_MOVIES,LOADING_CATEGORIES,LOADING_MOVIES,GET_CATEGORIES } from "../actions/names"


const initState = {
    movies:[],
    loadingMovies:true,
    categories:[],
    loadingCategories:true,
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
        case LOADING_CATEGORIES:
            return {
                ...state,
                loadingCategories:true
            }
        case GET_CATEGORIES:
            return {
                ...state,
                categories:action.payload,
                loadingCategories:false
            }
        default:
            return state
    }
}