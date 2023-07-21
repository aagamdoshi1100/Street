import { NavLink } from "react-router-dom";
import { useFetchContext } from "../../contexts/FetchContext"
import "./Landing.css"
import useAuthContext from "../../contexts/AuthContext";
export default function Landing() {
    const { productState } = useFetchContext();
    const { navigate } = useAuthContext();
    return (<div className="categories-container">
        <div className="categories">
            {
                productState.arrCategories.map((item) => {
                    const { _id, categoryName, image } = item;
                    return (<div className="circle" key={_id} onClick={() => navigate("../pages/ProductPage/Product")}>
                        <img className="pic" src={`${image}`} width="100%" height="100%" alt="" />
                        <div className="heading">
                            <NavLink to="../pages/ProductPage/Product" className="heading-name">{categoryName}</NavLink>
                        </div>
                    </div>
                    )
                })
            }
        </div>
        <div className="offer-image">
            <img src="https://shorturl.at/cxPT1" width="100%" height="100%" />
        </div>

    </div>)
}