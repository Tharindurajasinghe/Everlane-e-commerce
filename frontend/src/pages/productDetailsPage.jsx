import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
//import Header from "../components/Header";
//import Footer from "../Footer/components/Footer";
import { CartContext } from "../context/CartContext";

export default function ProductDetailsPage() {
  // get product ID from URL
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addItem } = useContext(CartContext);

  // load product + reviews
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const p = await fetch(`/api/products/${id}`);
        const r = await fetch(`/api/products/${id}/reviews`);

        if (!p.ok) throw new Error("Cannot load product");
        if (!r.ok) throw new Error("Cannot load reviews");

        setProduct(await p.json());
        setReviews(await r.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  // add to cart
  function handleAddToCart() {
    if (!product) return;
    addItem({ id: product.id, name: product.name, price: product.price, image: product.imageUrl, quantity: 1 });
    alert("Product added to cart");
  }

  // buy now
  function handleBuyNow() {
    if (!product) return;
    addItem({ id: product.id, name: product.name, price: product.price, image: product.imageUrl, quantity: 1 });
    navigate("/checkout");
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      

      {/* CONTENT */}
      <main className="container mx-auto px-6 py-10 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* LEFT: PRODUCT IMAGE */}
          <div className="w-full">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="rounded-lg shadow-md w-full h-[420px] object-cover"
            />
          </div>

          {/* RIGHT: DETAILS */}
          <div>
            <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
            <div className="flex items-center mb-3 text-yellow-500 text-xl">★★★★★</div>

            <p className="text-xl font-bold text-gray-700 mb-1">LKR {product.price}</p>
            <p className="text-green-600 text-sm mb-4">✔ In stock</p>

            <p className="text-gray-600 mb-6 max-w-xl leading-relaxed">{product.description}</p>

            {/* QUANTITY SELECTOR */}
            <div className="flex items-center gap-4 mb-6">
              <button className="px-3 py-1 border rounded">-</button>
              <span className="px-4 py-1 border rounded bg-white">5</span>
              <button className="px-3 py-1 border rounded">+</button>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="px-6 py-3 rounded-md bg-[#8F9AA2] text-white hover:opacity-90 shadow"
              >
                Add to cart
              </button>

              <button
                onClick={handleBuyNow}
                className="px-6 py-3 rounded-md border border-[#8F9AA2] text-[#8F9AA2] hover:bg-[#8F9AA2] hover:text-white transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* FEEDBACK SECTION */}
        <div className="mt-20">
          <h2 className="text-xl font-semibold mb-6">Customers Feedback</h2>

          <div className="bg-gray-100 p-6 rounded-lg shadow-sm w-full md:w-3/4">
            <div className="font-semibold mb-1">Ane <span className="text-yellow-500">★★★★★</span></div>
            <p className="text-gray-600 mb-3">Great!, I really love this</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>3 days ago</span>
              <div className="flex gap-5">
                <span className="cursor-pointer hover:underline">Like</span>
                <span className="cursor-pointer hover:underline">Reply</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      
    </div>
  );
}

// END OF FILE
