import { NavLink } from "react-router-dom";
import { useFetchContext } from "../../contexts/FetchContext"
import "./Landing.css"
export default function Landing() {
    const { productState } = useFetchContext()
    return (<div className="categories-container">
        <div className="categories">

            {
                productState.arrCategories.map((item) => {
                    const { _id, categoryName, image, description } = item;
                    return (<div className="circle" key={_id}>
                        <img className="pic" src={`${image}`} width="100%" height="100%" alt="" />
                        <div className="heading">
                            <NavLink to="../pages/ProductPage/Product" className="heading-name">{categoryName}</NavLink>
                        </div>
                    </div>

                    )
                })

            }
        </div>
        <div>
            <img src="https://shorturl.at/cxPT1" width="100%" height="100%" />
        </div>

    </div>)
}