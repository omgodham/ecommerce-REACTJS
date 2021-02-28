export const counterReducer = (state = 0,action) => {
    console.log('reducer',state,action);
   switch(action.type){
       case 'INCREMENT' :
            return  state = state + 1 ;  
       case 'DECREMENT' : return  state = state - 1  
    
   }
}