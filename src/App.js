import React, { useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {increment,decrement} from './actions/index';
function App() {
const dispatch = useDispatch();
const value = useSelector(state => state);

const doIncrement = () =>{
   dispatch(increment());
}
const doDecrement = () =>{
  dispatch(decrement());
}
  return (<>
    <h1>{value}</h1> 
    <button onClick={doIncrement} className='mr-4'>+</button> 
    <button onClick={doDecrement}>-</button> 
   
  </>
  );
}

export default App;
