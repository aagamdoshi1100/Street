import "./Product.css"
import { useFetchContext } from "../../contexts/FetchContext"

export default function Product(){
    const {allData} = useFetchContext()
    // console.log(allData.categories)
    return(<div className="container"> 
        {
            allData.arrProducts.map((item)=>{
                const {_id,image,price,title,Material} = item;
                return(<div className="box" key={_id}>
                    <img src={`${image}`} width="100%" height="160px" alt="" />
                    <p>{title}</p>
                    <p>Price: Rs {price}</p>
                    <button className="box-btn">Add to Cart</button>
                </div>

            )
        })
    }
    
    </div>)
}
