import { NavLink } from "react-router-dom";
import { useFetchContext } from "../../contexts/FetchContext"
import "./Landing.css"
export default function Landing(){
    const {productState} = useFetchContext()
    return(<div className="container"> 
   
    {
        productState.arrCategories.map((item)=>{
            const {_id,categoryName,image,description} = item;
            return(<div className="circle" key={_id}>
                <img className="pic" src={`${image}`} width="100%" height="160px" alt="" />
                <NavLink to="../pages/ProductPage/Product" className="heading">{categoryName}</NavLink>
            </div>

        )
    })
    
}

{/* <div> <img src="https://m.media-amazon.com/images/G/31/img22/Fashion/AF/Newseason/revamp/N2GLoffers/cashback-pc._CB590089559_.gif" width="100%" height="300px" style={{marginTop:"30px"}}></img>
    </div> */}
   
</div>)
}