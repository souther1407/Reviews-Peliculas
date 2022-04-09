import {serverUrl} from "../../utils/utils"
import { LOADING_MOVIES,GET_MOVIES, LOADING_CATEGORIES, GET_CATEGORIES } from "./names"

export function getMovies(queries){

    return async function(dispatch){
        dispatch({type:LOADING_MOVIES})
        const r = await fetch(`${serverUrl}/movies${queries ? queries : ""}`)
        const data = await r.json() 
        dispatch({type:GET_MOVIES,payload:data.results})
    }
}

export function getCategories(){

    return async (dispatch) => {
        dispatch({ type: LOADING_CATEGORIES })
        const r = await fetch(`${serverUrl}/categories`)
        const data = await r.json()
        dispatch({ type: GET_CATEGORIES, payload: data })
    }
}