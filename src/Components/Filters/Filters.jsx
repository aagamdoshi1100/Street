import { useFetchContext } from "../../contexts/FetchContext";
import { AiOutlineClose } from "react-icons/ai";
import { IoStarSharp } from "react-icons/io5";
import styles from "./filters.module.css";

export default function Filters() {
  const { productDispatcher, productState, filterHandler } = useFetchContext();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>FILTER</h2>
        <AiOutlineClose
          size="1.3em"
          className={styles.filterMenucloseIcon}
          onClick={filterHandler}
        />
      </div>
      <p className={styles.heading}>PRICE RANGE</p>
      <div className={styles.range}>
        <input
          type="number"
          className={styles.rangeInput}
          placeholder="Min Price"
          value={productState.filter.range.low}
          onChange={(e) =>
            productDispatcher({ type: "LOW_RANGE", payload: e.target.value })
          }
        />
        <input
          type="number"
          className={styles.rangeInput}
          placeholder="Max Price"
          value={productState.filter.range.high}
          onChange={(e) =>
            productDispatcher({ type: "HIGH_RANGE", payload: e.target.value })
          }
        />
      </div>

      <div className={styles.category}>
        <p className={styles.heading}>CATEGORY</p>
        <span>
          <input
            type="checkbox"
            value="Electronics"
            className={styles.categoryInput}
            checked={
              productState.filter.categoryCheckboxes.length === 0
                ? false
                : productState.filter.categoryCheckboxes.includes("Electronics")
            }
            onChange={(e) =>
              productDispatcher({ type: "CATEGORY", payload: e.target.value })
            }
          />
          Electronics
        </span>
        <span>
          <input
            type="checkbox"
            value="FootWear"
            className={styles.categoryInput}
            checked={
              productState.filter.categoryCheckboxes.length === 0
                ? false
                : productState.filter.categoryCheckboxes.includes("FootWear")
            }
            onChange={(e) =>
              productDispatcher({ type: "CATEGORY", payload: e.target.value })
            }
          />
          Foot Wear
        </span>
      </div>
      <div className={styles.rating}>
        <p className={styles.heading}>RATING</p>
        <span>
          <input
            type="radio"
            name="myids"
            className={styles.ratingInput}
            value="4.5"
            checked={
              productState.filter.ratingSelected === null
                ? false
                : productState.filter.ratingSelected === "4.5"
            }
            onChange={(e) =>
              productDispatcher({
                type: e.target.value,
              })
            }
          />
          4.5
          <IoStarSharp className={styles.ratingIcon} /> & above
        </span>
        <span>
          <input
            type="radio"
            name="myids"
            className={styles.ratingInput}
            value="4"
            checked={
              productState.filter.ratingSelected === null
                ? false
                : productState.filter.ratingSelected === "4"
            }
            onChange={(e) =>
              productDispatcher({
                type: e.target.value,
              })
            }
          />
          4<IoStarSharp className={styles.ratingIcon} /> & above
        </span>
        <span>
          <input
            type="radio"
            name="myids"
            className={styles.ratingInput}
            value="3"
            checked={
              productState.filter.ratingSelected === null
                ? false
                : productState.filter.ratingSelected === "3"
            }
            onChange={(e) =>
              productDispatcher({
                type: e.target.value,
              })
            }
          />
          3<IoStarSharp className={styles.ratingIcon} /> & above
        </span>
        <span>
          <input
            type="radio"
            name="myids"
            className={styles.ratingInput}
            value="2"
            checked={
              productState.filter.ratingSelected === null
                ? false
                : productState.filter.ratingSelected === "2"
            }
            onChange={(e) =>
              productDispatcher({
                type: e.target.value,
              })
            }
          />
          2<IoStarSharp className={styles.ratingIcon} /> & above
        </span>
        <span>
          <input
            type="radio"
            name="myids"
            className={styles.ratingInput}
            value="1"
            checked={
              productState.filter.ratingSelected === null
                ? false
                : productState.filter.ratingSelected === "1"
            }
            onChange={(e) =>
              productDispatcher({
                type: e.target.value,
              })
            }
          />
          1<IoStarSharp className={styles.ratingIcon} /> & above
        </span>
      </div>
      <div className={styles.sortBy}>
        <p className={styles.heading}>SORT BY PRICE</p>
        <span>
          <input
            type="radio"
            name="sort"
            className={styles.sortByInput}
            value="HTL"
            checked={
              productState.filter.sortBy === ""
                ? false
                : productState.filter.sortBy === "HTL"
            }
            onChange={(e) =>
              productDispatcher({
                type: e.target.value,
              })
            }
          />
          High To Low
        </span>
        <span>
          <input
            type="radio"
            name="sort"
            className={styles.sortByInput}
            value="LTH"
            checked={
              productState.filter.sortBy === ""
                ? false
                : productState.filter.sortBy === "LTH"
            }
            onChange={(e) =>
              productDispatcher({
                type: e.target.value,
              })
            }
          />
          Low To High
        </span>
      </div>
      <button
        className={styles.filterClear}
        onClick={() =>
          productDispatcher({
            type: "CLEAR_FILTER",
          })
        }
      >
        Clear Filter
      </button>
    </div>
  );
}
