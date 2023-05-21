import { createContext, useContext,useEffect, useReducer } from "react";
import FilterReducer from "../Reducer/FilterReducer";

const FetchContext = createContext();

export default function FetchContextProvider({children}){
    const [productState , productDispatcher] = useReducer(FilterReducer,{arrProducts:[],arrCategories:[]})
    const sorter =(e)=>{
        productDispatcher({type: e.target.value,payload:productState.arrProducts})
    }
    const fetching =async()=>{
        try{
            const responseProduct = await fetch("/api/products")
            const responseProductData =  await responseProduct.json()
            console.log(responseProductData.products,"pro")

            const responseCategories = await fetch("/api/categories")
            const responseCategoriesData =  await responseCategories.json()
            console.log(responseCategoriesData.categories,"cat")
         productDispatcher({type : "PRODUCTS" , payload : responseProductData.products})
         productDispatcher({type : "CATEGORIES" , payload : responseCategoriesData.categories})
        }
        catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        fetching()
    },[])

    return(<FetchContext.Provider value={{productState,sorter}}>{children}</FetchContext.Provider>
    )
}

export const useFetchContext = ()=> useContext(FetchContext)