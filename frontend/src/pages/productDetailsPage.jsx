import React, { useEffect, useState } from "react";
import axios from "axios";
//import Header from "../components/Header";
//import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductDetailsPage() {
  const { id } = useParams();                   // get product ID from URL
  const navigate = useNavigate();

  const [product, setProduct] = useState(null); // product info
  const [reviews, setReviews] = useState([]);   // customer reviews
  const [qty, setQty] = useState(1);            // quantity selector
  const [loading, setLoading] = useState(true);

  // ---------------------------
  // LOAD PRODUCT + REVIEWS
  // ---------------------------
  useEffect(() => {
    async function loadData() {
      try {
        // GET PRODUCT DETAILS
        
        const productRes = await axios.get(`http://API/products/${id}`);

        // GET REVIEWS
        const reviewsRes = await axios.get(
          `http://API/products/${id}/reviews`
        );

        setProduct(productRes.data);
        setReviews(reviewsRes.data);
      } catch (err) {
        console.error("Loading failed", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  // ---------------------------
  // ADD TO CART
  // ---------------------------
  const handleAddToCart = async () => {
    try {
      
      await axios.post("http://API/cart/add", {
        productId: product.id,
        quantity: qty,
      });

      alert("Item added to cart!");
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

  // ---------------------------
  // BUY NOW → CHECKOUT PAGE
  // ---------------------------
  const handleBuyNow = () => {
    navigate("/checkout");
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!product) return <div className="text-center py-20">Product not found</div>;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <div className="container mx-auto px-6 py-10">
        {/* --------------------------- */}
        {/* PRODUCT SECTION */}
        {/* --------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* LEFT: Product Image */}
          <div>
            {/* Image from database */}
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-[420px] object-cover rounded-lg shadow"
            />
          </div>

          {/* RIGHT: Product Info */}
          <div>
            {/*Star Rating */}
            <div className="flex text-yellow-500 text-xl mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>
                  {i < product.rating ? "★" : "☆"}
                </span>
              ))}
            </div>

            {/* Name */}
            <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>

            {/* Price */}
            <p className="text-xl font-bold text-gray-700 mb-1">
              LKR {product.price}
            </p>

            {/* Availability */}
            <p
              className={`${
                product.inStock ? "text-green-600" : "text-red-500"
              } mb-4`}
            >
              {product.inStock ? "✔ In stock" : "✖ Not available"}
            </p>

            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <button
                className="px-3 py-1 bg-[#ececec]"
                onClick={() => qty > 1 && setQty(qty - 1)}
              >
                -
              </button>

              <span className="px-4 py-1 bg-white border rounded">
                {qty}
              </span>

              <button
                className="px-3 py-1 bg-[#ececec]"
                onClick={() => setQty(qty + 1)}
              >
                +
              </button>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="px-6 py-3 rounded bg-[#8F9AA2] text-white"
              >
                Add to cart
              </button>

              <button
                onClick={handleBuyNow}
                className="px-6 py-3 border border-[#8F9AA2] text-[#8F9AA2] hover:bg-[#8F9AA2] hover:text-white"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* --------------------------- */}
        {/* CUSTOMER REVIEWS SECTION */}
        {/* --------------------------- */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold mb-6">Customers Feedback</h2>

          {reviews.map((rev, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow-sm mb-4"
            >
              <div className="font-semibold">
                {rev.firstName} {rev.lastName}{" "}
                <span className="text-yellow-500 ml-2">
                  {"★".repeat(rev.rating)}{" "}
                </span>
              </div>

              <p className="text-gray-600 my-3">{rev.comment}</p>

              <div className="flex justify-between text-sm text-gray-500">
                <span>{rev.date}</span>
                <button className="hover:underline">Like</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
