import { createContext, useContext, useState,useEffect } from "react";

const FetchContext = createContext();

export default function FetchContextProvider({children}){
    const [allData,setAllData] =useState({arrProducts:[],arrCategories:[]})
    const fetching =async()=>{
        try{
            const responseProduct = await fetch("/api/products")
            const responseProductData =  await responseProduct.json()
            console.log(responseProductData.products,"pro")

            const responseCategories = await fetch("/api/categories")
            const responseCategoriesData =  await responseCategories.json()
            console.log(responseCategoriesData.categories,"cat")

            setAllData({...allData, arrProducts: responseProductData.products, arrCategories: responseCategoriesData.categories })
        }
        catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        fetching()
    },[])

    return(<FetchContext.Provider value={{allData}}>{children}</FetchContext.Provider>
    )
}

export const useFetchContext = ()=> useContext(FetchContext)