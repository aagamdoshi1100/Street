import { useFetchContext } from "../../contexts/FetchContext";
import "./Filters.css";
export default function Filters() {
  const {
    checkboxes,
    data,
    clearFilter,
    sorter,
    productDispatcher,
    productState,
  } = useFetchContext();
  return (
    <div className="filters">
      <div className="head">
        <h2>Filters</h2>
        {/* <h3 onClick={clearFilter}>Clear</h3> */}
      </div>
      <p>Price</p>
      <div className="row-price">
        <div>100</div>
        <div>1500</div>
        <div>3000</div>
      </div>
      <input
        type="range"
        min="100"
        max="3000"
        className="slider"
        onChange={(e) =>
          productDispatcher({ type: "RANGE", payload: e.target.value })
        }
      />

      <p>Category</p>
      <div className="col">
        <span>
          <input
            type="checkbox"
            value="Men"
            checked={productState.checkboxes.includes("Men")}
            onChange={(e) =>
              productDispatcher({
                type: "TOGGLE_CATEGORY",
                payload: e.target.value,
              })
            }
          />
          Men Clothing
        </span>
        <span>
          <input
            type="checkbox"
            value="Women"
            checked={productState.checkboxes.includes("Women")}
            onChange={(e) =>
              productDispatcher({
                type: "TOGGLE_CATEGORY",
                payload: e.target.value,
              })
            }
          />
          Women Clothing
        </span>
        <span>
          <input
            type="checkbox"
            value="Kids"
            checked={productState.checkboxes.includes("Kids")}
            onChange={(e) =>
              productDispatcher({
                type: "TOGGLE_CATEGORY",
                payload: e.target.value,
              })
            }
          />
          Kid's Clothing
        </span>
      </div>
      <p>Ratings</p>
      <div className="col">
        <span>
          <input
            type="radio"
            name="myids"
            value="4"
            onChange={(e) => sorter(e)}
          />
          4⭐ & above
        </span>
        <span>
          <input
            type="radio"
            name="myids"
            value="3"
            onChange={(e) => sorter(e)}
          />
          3⭐ & above
        </span>
        <span>
          <input
            type="radio"
            name="myids"
            value="2"
            onChange={(e) => sorter(e)}
          />
          2⭐ & above
        </span>
        <span>
          <input
            type="radio"
            name="myids"
            value="1"
            onChange={(e) => sorter(e)}
          />
          1⭐ & above
        </span>
      </div>
      <p>Sort By Price</p>
      <div className="col">
        <span>
          <input
            type="radio"
            name="sort"
            value="HTL"
            onChange={(e) => sorter(e)}
          />{" "}
          High To Low
        </span>
        <span>
          <input
            type="radio"
            name="sort"
            value="LTH"
            onChange={(e) => sorter(e)}
          />{" "}
          Low To High
        </span>
      </div>
    </div>
  );
}
