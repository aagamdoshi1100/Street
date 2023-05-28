import "./Product.css"
import { useFetchContext } from "../../contexts/FetchContext"
import useCartContext from "../../contexts/CartContext"

export default function Product(){
    const {checkboxes,data, productState,sorter,checkboxSorter} = useFetchContext()

    const {addToCart,cartItem} = useCartContext()

    return(<div className="container"> 
    <div className="filters">
    <div className="head">
        <h3>Filters</h3>
        <h3>Clear</h3>
    </div>
    <h3>Price</h3>
    <div className="row-price">
        <div>100</div>
        <div>1500</div>
        <div>3000</div>
    </div>
    <input type="range" min="100" max="3000" className="slider"/>
    
        <h3>Category</h3>
    <div className="col">
       <span><input type="checkbox" value="Men" checked={checkboxes.menCategory} onChange={(e)=>checkboxSorter(e)}  />  
        Men Clothing</span>  
        <span><input type="checkbox"value="Women" checked={checkboxes.womenCategory} onChange={(e)=>checkboxSorter(e)}  />   
        Women Clothing</span>  
        <span><input type="checkbox" value="Kid" checked={checkboxes.kidCategory} onChange={(e)=>checkboxSorter(e)}  />     
        Kid's Clothing</span>
    </div>
        <h3>Ratings</h3>
    <div className="col">
        <span><input  type="radio" name="myids" value="4" onChange={(e)=>sorter(e)} />
        4⭐ & above</span>
        <span><input type="radio" name="myids" value="3" onChange={(e)=>sorter(e)} />
        3⭐ & above</span>
        <span><input type="radio" name="myids" value="2" onChange={(e)=>sorter(e)} />
        2⭐ & above</span>
        <span><input type="radio" name="myids" value="1" onChange={(e)=>sorter(e)} />
        1⭐ & above</span>
    </div>
    <div> 
        <h3>Sort By Price</h3> 
        <input type="radio" name="sort" value="HTL" onChange={(e)=>sorter(e)} />
        <label> High To Low</label>
        <input type="radio" name="sort" value="LTH" onChange={(e)=>sorter(e)} />
        <label> Low To High</label>
    </div>
    </div>
    <div className="product-cards">
        {
            data.map((item)=>{
                const {_id,image,price,rating,title,Material} = item;
                return(<div className="box" key={_id}>
                    <img src={`${image}`} width="100%" height="160px" alt="" />
                    <p>{title}</p>
                    <p style={{textAlign:"center"}}>{rating}⭐</p>

                    <p>Price: Rs {price}</p>
                    {cartItem.cartArray.find((thing)=>thing._id === _id) ? <button>Go to Cart</button> :
                    <button className="box-btn" onClick={()=>addToCart(item)}>Add to Cart</button>}
                </div>

            )
        })
    }
    
    </div>
    </div>)
   
}
