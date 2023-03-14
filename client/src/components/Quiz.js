import React, { useEffect } from 'react'
import Questions from './Questions'
import { useState } from 'react';
import { MoveNextQuestion } from '../hooks/FetchQuestion';
import { MovePrevQuestion } from '../hooks/FetchQuestion';
import {useSelector,useDispatch} from 'react-redux'
import { PushAnswer } from '../hooks/setResult';
import { Navigate } from 'react-router-dom'
export default function Quiz() {
    const [check, setChecked] = useState(undefined)
    const result = useSelector(state => state.result.result);
    // const trace = useSelector(state => state.questions.trace);
    const {queue,trace} = useSelector(state => state.questions);
    const dispatch = useDispatch()
    // useEffect(()=> { 
    //     console.log(result)
    //     // dispatch()
    // })
    function onNext(){
      // console.log(queue.length)
      if(trace< queue.length){
        // console.log('On next click')
        dispatch(MoveNextQuestion())
        if(result.length <= trace){
          dispatch(PushAnswer(check))
      }
      }
      // reset value of checked variable
      setChecked(undefined)
    }
    function onPrev(){
      if(trace>0){
        dispatch(MovePrevQuestion())
      }
      
    }
    function onChecked(check){
      // console.log(check)
      setChecked(check)
    }

    if(result.length && result.length >= queue.length){
      // console.log('hi')
      return <Navigate to={'/result'} replace={true}></Navigate>
    }


  return (
    <div className='container'>
      <h1 className='title text-light'>Quiz Application</h1>
      {/* displaying questions */}
      <Questions onChecked={onChecked} />



      <div className='grid'>
        {trace> 0 ?         <button className='btn prev' onClick={onPrev}>Prev</button>
 :<div></div>}
        <button className='btn next' onClick={onNext}>Next</button>
 
      </div>
    </div>
  )
}
