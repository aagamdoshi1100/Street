import "./Product.css"
import { useFetchContext } from "../../contexts/FetchContext"

export default function Product(){
    const {allData} = useFetchContext()
    console.log(allData)
    return(<div className="container"> 
        {
            allData.arr.map((item)=>{
                const {_id,image,price,title,Material} = item;
                return(<div className="box">
                    <img src={`${image}`} width="100%" height="160px" alt="" />
                    <p>{title}</p>
                    <p>Price: Rs {price}</p>
                    <button>Add to Cart</button>
                </div>

            )
        })
    }
    
    </div>)
}
