import { useFetchContext } from "../../contexts/FetchContext"
import "./Filters.css"
export default function Filters() {
    const { checkboxes, data, clearFilter, sorter, checkboxSorter, showClickedProduct, productDispatcher } = useFetchContext();
    return (<div className="filters">
        <div className="head">
            <h3>Filters</h3>
            <h3 onClick={clearFilter}>Clear</h3>
        </div>
        <h3>Price</h3>
        <div className="row-price">
            <div>100</div>
            <div>1500</div>
            <div>3000</div>
        </div>
        <input type="range" min="100" max="3000" className="slider" onChange={(e) => productDispatcher({ type: "RANGE", payload: e.target.value })} />

        <h3>Category</h3>
        <div className="col">
            <span><input type="checkbox" value="menCategory" checked={checkboxes.menCategory} onChange={(e) => checkboxSorter(e)} />
                Men Clothing</span>
            <span><input type="checkbox" value="womenCategory" checked={checkboxes.womenCategory} onChange={(e) => checkboxSorter(e)} />
                Women Clothing</span>
            <span><input type="checkbox" value="kidCategory" checked={checkboxes.kidCategory} onChange={(e) => checkboxSorter(e)} />
                Kid's Clothing</span>
        </div>
        <h3>Ratings</h3>
        <div className="col">
            <span><input type="radio" name="myids" value="4" onChange={(e) => sorter(e)} />
                4⭐ & above</span>
            <span><input type="radio" name="myids" value="3" onChange={(e) => sorter(e)} />
                3⭐ & above</span>
            <span><input type="radio" name="myids" value="2" onChange={(e) => sorter(e)} />
                2⭐ & above</span>
            <span><input type="radio" name="myids" value="1" onChange={(e) => sorter(e)} />
                1⭐ & above</span>
        </div>
        <div>
            <h3>Sort By Price</h3>
            <input type="radio" name="sort" value="HTL" onChange={(e) => sorter(e)} />
            <label> High To Low</label>
            <input type="radio" name="sort" value="LTH" onChange={(e) => sorter(e)} />
            <label> Low To High</label>
        </div>
    </div>)
}