import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const AddressManagementContext = createContext();

export const AddressManagementContextProvider=({children})=>{
    const [deliveryAddress,setDeliveryAddress] = useState({
        initialAddress : [{
        flatNo: "002",
        BuildingName : "ShankheshwarNagar",
        Road : "Desle",
        City:"Dadar",
        State:"Maharashtra"
    }],
    updateAddress : false,
    selectToUpdate : null,
    addAddress : false
    })

    console.log(deliveryAddress )

    const updateAdd =(index)=>{
        setDeliveryAddress({...deliveryAddress,
            updateAddress:!deliveryAddress.updateAddress,
            selectToUpdate : index
         }) 
    }
    const showNewAddField =()=>{
        setDeliveryAddress({...deliveryAddress,addAddress:!deliveryAddress.addAddress}) 
    }
    const addNewAdd =(f,b,r,c,s)=>{
        setDeliveryAddress({...deliveryAddress,
            initialAddress:[...deliveryAddress.initialAddress,
                {
                flatNo: f,
                BuildingName : b,
                Road : r,
                City:c,
                State:s}
            ],
            addAddress:!deliveryAddress.addAddress
        }) 
    }
    const updateInputAddress =(e) => {
     
        const flatNo = document.getElementById("flatNo").textContent;
        const BuildingName = document.getElementById("BuildingName").textContent;
        const Road = document.getElementById("Road").textContent;
        const City = document.getElementById("City").textContent;
        const State = document.getElementById("State").textContent;

        deliveryAddress.initialAddress[deliveryAddress.selectToUpdate].flatNo = flatNo;deliveryAddress.initialAddress[deliveryAddress.selectToUpdate].BuildingName = BuildingName;
        deliveryAddress.initialAddress[deliveryAddress.selectToUpdate].Road = Road;deliveryAddress.initialAddress[deliveryAddress.selectToUpdate].City = City;deliveryAddress.initialAddress[deliveryAddress.selectToUpdate].State = State;

      setDeliveryAddress({
            ...deliveryAddress,
            initialAddress:[...deliveryAddress.initialAddress ],
            updateAddress: !deliveryAddress.updateAddress
        })
    }
 
    return(<AddressManagementContext.Provider value={{deliveryAddress,updateAdd,updateInputAddress,addNewAdd,showNewAddField}}>{children}</AddressManagementContext.Provider>)
}
 
const useAddressManagementContext = ()=> useContext(AddressManagementContext)

export default useAddressManagementContext;
