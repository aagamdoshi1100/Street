import { NavLink } from "react-router-dom";
import { useFetchContext } from "../../contexts/FetchContext"
import NavBar from "../../Components/NavBarPage/NavBar";
import "./Landing.css"

export default function Landing() {
    const { productState } = useFetchContext();
    const { productDispatcher } = useFetchContext();
    return (<div className="categories-container">
        <NavBar />
        <div className="categories">
            {
                productState.arrCategories.map((item) => {
                    const { _id, categoryName, image } = item;
                    return (<div className="circle" key={_id}  >
                        <img className="pic" src={`${image}`} width="100%" height="100%" alt="" />
                        <div className="heading">
                            <NavLink
                                to={`../pages/ProductPage/Product`}
                                onClick={() => productDispatcher({ type: "TOGGLE_CATEGORY", payload: categoryName === "View all" ? ["Men", "Women", "Kids"] : categoryName })}
                                className="heading-name"
                            >
                                {categoryName}
                            </NavLink>
                        </div>
                    </div>
                    )
                })
            }
        </div>
        <div className="offer-image">
            <img src="https://shorturl.at/cxPT1" width="100%" height="100%" />
        </div>

    </div >)
}