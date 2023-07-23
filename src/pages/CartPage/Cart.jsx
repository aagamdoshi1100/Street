import { useNavigate } from "react-router-dom";
import useCartContext from "../../contexts/CartContext";
import useWishListContext from "../../contexts/WishListContext";
import { useFetchContext } from "../../contexts/FetchContext";
import NavBar from "../../Components/NavBarPage/NavBar";
import "./Cart.css";

export default function Cart() {
    const { cartItem, qtyControl, removeFromCart, totalBill } = useCartContext();
    const navigate = useNavigate();
    const { addToWishList } = useWishListContext();
    const { showClickedProduct } = useFetchContext();

    return (
        <div className="cart">
            <NavBar />
            <h2>Shopping Cart </h2>
            <div className="main-cart">
                <div className="cart-container">
                    {cartItem?.cartArray?.map((item) => {
                        const { _id, image, price, rating, title, qty } = item;
                        return (
                            <div className="cart-card" key={_id}>
                                <div className="card-left">
                                    <img
                                        src={`${image}`}
                                        width="160px"
                                        height="160px"
                                        alt=""
                                        onClick={() => showClickedProduct(item)}
                                    />
                                    <div className="cart-product-description">
                                        <p>{title}</p>
                                        <p>{rating}⭐</p>
                                        <p>Price: Rs {price}</p>
                                        <div className="qty-btns">
                                            <button onClick={() => qtyControl(item, "increment")}>
                                                +
                                            </button>
                                            <button className="qty">{qty}</button>
                                            {qty > 1 ? (
                                                <button onClick={() => qtyControl(item, "decrement")}>
                                                    -
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => qtyControl(item, "decrement")}
                                                    disabled
                                                >
                                                    -
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="cart-right">
                                    <button
                                        className="card-btn "
                                        onClick={() => removeFromCart(item)}
                                    >
                                        Remove From Cart
                                    </button>
                                    <button
                                        className="card-btn "
                                        onClick={() => addToWishList(item)}
                                    >
                                        Add To WishList
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="checkout">
                    {totalBill?.qty > 0 ? (
                        <div className="checkout-card">
                            <h3>PRICE DETAILS</h3>
                            <hr />
                            <div className="checkout-card-details">
                                <p>Price ({totalBill.qty} items)</p>
                                <p> {totalBill.price} </p>
                            </div>
                            <div className="checkout-card-details">
                                <p>Discount </p>
                                <p>-1000</p>
                            </div>
                            <div className="checkout-card-details">
                                <p>Delivery Charges</p>
                                <p>499</p>
                            </div>
                            <div className="checkout-card-details">
                                <p>Total Amount</p>
                                <p>{totalBill.price - 1000 + 499}</p>
                            </div>
                            <div className="checkout-card-offer">
                                <p>you will save 1000 Rs on this order</p>
                            </div>
                            <div className="placeorder">
                                <button
                                    className="card-btn"
                                    onClick={() => navigate("/pages/AddressPage/Address")}
                                >
                                    Place Order
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p></p>
                    )}
                </div>
            </div>
        </div>
    );
}
