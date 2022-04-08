import {serverUrl} from "../../utils/utils"
import { LOADING_MOVIES,GET_MOVIES } from "./names"

export function getMovies(queries){

    return async function(dispatch){
        dispatch({type:LOADING_MOVIES})
        const r = await fetch(`${serverUrl}/movies${queries ? queries : ""}`)
        const data = await r.json() 
        dispatch({type:GET_MOVIES,payload:data.results})
    }
}