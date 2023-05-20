import { createContext, useContext, useState,useEffect } from "react";

const FetchContext = createContext();

export default function FetchContextProvider({children}){
    const [allData,setAllData] =useState({arr:[]})
    const fetching =async()=>{
        try{
            const response = await fetch("/api/products")
            const responseData =  await response.json()
            console.log(responseData.products)
            setAllData({arr: responseData.products })
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