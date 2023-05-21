export default  function FilterReduce(state,action){
    switch(action.type){
        case "PRODUCTS" :
        //    console.log([...action.payload],"reducer")
            return {...state, arrProducts: [...action.payload]}
        case "CATEGORIES" :
        //    console.log([...action.payload],"Catreducer")
            return {...state, arrCategories : [...action.payload]}
        case "HTL" :
            console.log([...action.payload],"Catreducer")
            return {...state, arrProducts : [...action.payload.sort((a,b)=>b.price - a.price)]}
        case "LTH" :
            console.log([...action.payload],"Catreducer")
            return {...state, arrProducts : [...action.payload.sort((a,b)=>a.price - b.price)]}
     
        default:
            return state
    }
}