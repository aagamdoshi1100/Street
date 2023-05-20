import "./Product.css"
import { useFetchContext } from "../../contexts/FetchContext"

export default function Product(){
    const {allData} = useFetchContext()
    // console.log(allData.categories)
    return(<div className="container"> 
    <div className="filters">
    <div className="head">
        <h3>Filters</h3>
        <h3>Clear</h3>
    </div>
    <h3>Price</h3>
    <div className="row-price">
        <div>500</div>
        <div>1000</div>
        <div>1500</div>
    </div>
    <input type="range" min="1" max="3000" className="slider"/>
    
        <h3>Category</h3>
    <div className="col">
       <span><input type="checkbox" value="Men"/>  
        Men Clothing</span>  
        <span><input type="checkbox"value="Women" />   
        Women Clothing</span>  
        <span><input type="checkbox" value="Kid" />     
        Kid's Clothing</span>
    </div>
        <h3>Ratings</h3>
    <div className="col">
        <span><input  type="radio" name="myids" value="4" />
        4 stars & above</span>
        <span><input type="radio" name="myids" value="3"/>
        3 stars & above</span>
        <span><input type="radio" name="myids" value="2" />
        2 stars & above</span>
        <span><input type="radio" name="myids" value="1"/>
        1 stars & above</span>
    </div>
    <div> 
        <h3>Sort By</h3> 
        <input type="radio" name="sort" value="HTL" />
        <label> High To Low</label>
        <input type="radio" name="sort" value="LTH" />
        <label> Low To High</label>
    </div>
    </div>
    <div className="product-cards">
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
    
    </div>
    </div>)
   
}
