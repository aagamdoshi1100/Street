import useAddressManagementContext from "../../contexts/AddressManagementcontext";
import useCartContext from "../../contexts/CartContext"
import "./Address.css"
export default function Address(){
    const {totalBill,cartItem} = useCartContext()
    const {updateAdd,deliveryAddress,updateInputAddress,showNewAddField,addNewAdd}= useAddressManagementContext()
    
    return(<div ><h4>Delivery Address: <button onClick={()=>showNewAddField()}>Add Address</button></h4>
        <div>
            {deliveryAddress.initialAddress.map((item,index)=>{
                const { flatNo,BuildingName,Road,City,State} = item;
                return(<div className="box" key={flatNo}>
                    
                    <p> <input type="radio" name="add" />{flatNo}, {BuildingName}, {Road}, {City}, {State}
                    <button onClick={()=>updateAdd(index)}>Update Address</button></p>
                </div>)
            })}
           
        </div>
          
        {deliveryAddress.updateAddress ? <div id="editablePara"  className="box" style={{display:"flex",flexDirection:"column",padding:"10px",backgroundColor:"#f5f3f2"}}>
            <h4>Update address</h4>
            <p id="flatNo" contentEditable = {true} >{deliveryAddress.updateAddress ? deliveryAddress.initialAddress[deliveryAddress.selectToUpdate].flatNo : ""}</p>
            <p id="BuildingName" contentEditable = {true} >{deliveryAddress.updateAddress ? deliveryAddress.initialAddress[deliveryAddress.selectToUpdate].BuildingName : ""}</p>
            <p id="Road" contentEditable = {true} >{deliveryAddress.updateAddress ? deliveryAddress.initialAddress[deliveryAddress.selectToUpdate].Road : ""}</p>
            <p id="City" contentEditable = {true} >{deliveryAddress.updateAddress ? deliveryAddress.initialAddress[deliveryAddress.selectToUpdate].City : ""}</p>
            <p id="State" contentEditable = {true} >{deliveryAddress.updateAddress ? deliveryAddress.initialAddress[deliveryAddress.selectToUpdate].State : ""}</p>
            <button onClick={ updateInputAddress  }>Update</button>
        </div> : undefined}
              
      
      {deliveryAddress.addAddress ?  <div className="box" style={{display:"flex",flexDirection:"column",padding:"10px",backgroundColor:"#f5f3f2"}}>
        <h4>Enter new address</h4>
      <input type="text" id="flatNo" placeholder="flatNo" />
      <input type="text" id="BuildingName"  placeholder="BuildingName" />
      <input type="text" id="Road" placeholder="Road" />
      <input type="text" id="City" placeholder="City" />
      <input type="text" id="State" placeholder="State" />
      <button onClick={()=>addNewAdd(document.querySelector("#flatNo").value,document.querySelector("#BuildingName").value,document.querySelector("#Road").value,document.querySelector("#City").value,document.querySelector("#State").value)}>Add Address</button>
      </div> : ""}



            <div className="box">
            <h4>Price Details</h4>
            <p>Price ({totalBill?.qty } items)</p>
            <p> {totalBill?.price } </p>
            <p>Discount  </p>
            <p>-1000</p>
            <p>Delivery Charges</p>
            <p>499</p>
            <p>Total Amount</p>
            <p>{totalBill?.price-1000+499}</p>
            <p>you will save 1000 Rs on this order</p>
            <button >Place Order</button>            
        </div>
    </div>)
}

 