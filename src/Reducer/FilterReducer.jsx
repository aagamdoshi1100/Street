 export default  function FilterReduce(state,action){
 
    switch(action.type){
        case "PRODUCTS" :
          
            return {...state, arrProducts: [...action.payload]}
        case "CATEGORIES" :
            return {...state, arrCategories : [...action.payload]}
        case "HTL" :
            return {...state, arrProducts : [...action.payload.sort((a,b)=>b.price - a.price)]}
        case "LTH" :
            return {...state, arrProducts : [...action.payload.sort((a,b)=>a.price - b.price)]}
        case "1" :
        case "2" :
        case "3" :
        case "4" :
            return {...state, ratingSelected : action.type}

        default:
            return state
    }
}