import { createContext, useContext,useEffect, useReducer, useState } from "react";
import FilterReducer from "../Reducer/FilterReducer";

const FetchContext = createContext();

export default function FetchContextProvider({children}){
    
    const [productState , productDispatcher] = useReducer(FilterReducer,{arrProducts:[],arrCategories:[],ratingSelected:null})
    
    const [checkboxes,setCheckBoxes] = useState({menCategory :false,womenCategory:false,kidCategory:false})

    const checkboxSorter = (e)=>{
        switch(e.target.value){
            case "Men":
                setCheckBoxes({...checkboxes,menCategory : !checkboxes.menCategory})
                break;
        case "Women":
                setCheckBoxes({...checkboxes,womenCategory : !checkboxes.womenCategory})
                break;
        case "Kid":
                setCheckBoxes({...checkboxes,kidCategory : !checkboxes.kidCategory})
                break;     
        }    
    }

    const sorter =(e)=>{
        productDispatcher({type: e.target.value,payload:productState.arrProducts})
    }
    const fetching =async()=>{
        try{   
            const responseProduct = await fetch("/api/products")
            const responseProductData =  await responseProduct.json()

            const responseCategories = await fetch("/api/categories")
            const responseCategoriesData= await responseCategories.json()
         productDispatcher({type : "PRODUCTS" , payload : responseProductData.products})
         productDispatcher({type : "CATEGORIES" , payload : responseCategoriesData.categories})
        }
        catch(e){
            console.error(e)
        }
    }
    useEffect(()=>{
        fetching()
     
    },[])


    const filteredData=(all)=>{
        let filtered = [...all]
        if(productState.ratingSelected !==null){
            filtered = filtered.filter(({rating}) => rating > Number(productState.ratingSelected))
        }
        if(checkboxes.menCategory && checkboxes.kidCategory){
            filtered = filtered.filter(({type})=> type ==="Men" || type === "Kid")
        }        
        if(checkboxes.kidCategory && checkboxes.menCategory){
            filtered = filtered.filter(({type})=> type ==="Kid" || type ==="Men" )
        }           
        if(checkboxes.kidCategory && checkboxes.womenCategory){
            filtered = filtered.filter(({type})=> type ==="Kid" || type ==="Women")
        }        
        if(checkboxes.womenCategory && checkboxes.kidCategory){
            filtered = filtered.filter(({type})=> type ==="Women" ||  type ==="Kid")
        }
        if(checkboxes.menCategory && checkboxes.womenCategory){
            filtered = filtered.filter(({type})=> type ==="Men" || type ==="Women")
        }  
    
        if( checkboxes.kidCategory){
            filtered = filtered.filter(({type})=>   type ==="Kid")
        }
     
    
        return filtered
    }
  const data = filteredData(productState.arrProducts)


    return(<FetchContext.Provider value={{checkboxes,data, productState,sorter,checkboxSorter}}>{children}</FetchContext.Provider>
    )
}

export const useFetchContext = ()=> useContext(FetchContext)