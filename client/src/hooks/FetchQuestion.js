// import { get } from "immer/dist/internal"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
// import data,{answers} from "../Database/data"
import { getServerData } from "../helper/helper"
import * as Action from '../redux/question_reducer'
// import { useImmer } from "use-immer"
export const useFetchQuestion = () =>{
    const dispatch = useDispatch();
    const [getData,setGetData] = useState({isLoading: false,apiData : [], serverError: null})
    useEffect(()=>{
        setGetData(prev => ({...prev, isLoading : true}));
        (async()=>{
            try {
                // let question = await data;
                const [{ questions,answers }] = await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`,(data)=>data)
                // console.log({questions,answers})
                if(questions.length >0){
                    setGetData(prev => ({...prev, isLoading : false}));
                    setGetData(prev => ({...prev, apiData : questions}));

                    dispatch(Action.startExamAction({question: questions,answers}))
                }else{
                    throw new Error("No Question Available");
                }
            } catch (error) {
                setGetData(prev => ({...prev, isLoading : false}));
                setGetData(prev => ({...prev, serverError : error}));
            }
        })();
    },[dispatch]);
    return [getData,setGetData];
}

export const MoveNextQuestion = ()=> async(dispatch) => {
    try {
        dispatch(Action.moveNextAction());
    } catch (error) {
        console.log(error)
    }
}

export const MovePrevQuestion = ()=> async(dispatch) => {
    try {
        dispatch(Action.movePrevAction());
    } catch (error) {
        console.log(error)
    }
}