import { useEffect, useState } from 'react'
import API from '../services/api'
import { useNavigate } from 'react-router-dom'
import { Slide, toast, ToastContainer } from 'react-toastify';

function Home({ search }) {

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("ALL");

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const isAdmin = user && user.role === "ROLE_ADMIN";

  const itemAddednotify = () => toast.info('Added to cart 🛒...', {
    position: "top-center",
    autoClose: 3000,
    theme: "colored",
    transition: Slide,
  });

  const categories = [
    "ALL",
    "marvel clothes",
    "marvel magnets",
    "marvel keychains",
    "marvel action figures",
    "marvel tools",
  ];

  // FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let res;

        if (search && search.trim() !== "") {
          res = await API.get(`/products/search/${encodeURIComponent(search)}`);
        }
        else if (category === "ALL") {
          res = await API.get("/products");
        }
        else {
          res = await API.get(`/products/category/${encodeURIComponent(category)}`);
        }

        setProducts(res.data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [category, search]);

  const addToCart = async (product) => {
    const user = JSON.parse(localStorage.getItem("user"));

    // console.log("USER:", user);

    if (!user) {
      // alert("Please login first ❗");
      toast.error("Please login to add to cart! 🔑");
      setTimeout(() => {
        navigate('/login'); // Redirect to login
      }, 2500);
      return;
    }
    
    // LOGIC: Default to "M" for clothes, null for everything else
    const defaultSize = product.category?.toLowerCase().trim() === "marvel clothes" ? "M" : null;

    try {
      await API.post("/cart/add", {
        userId: user.id,
        productId: product.id,
        quantity: 1,
        size: defaultSize
      });

      itemAddednotify(); // toast

    } catch (err) {
      console.log("ERROR:", err.response?.data);
      console.log("STATUS:", err.response?.status);
      alert("Error adding to cart ❌");
    }
  };

  return (
    <div className="container mt-4">

      <h1 className="text-center fw-bold">
        {isAdmin
          ? "WELCOME TO THE MULTIVERSE OF SHIPPING"
          : "WELCOME TO THE MULTIVERSE OF SHOPPING"}</h1>

      {/* CATEGORIES */}
      <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn rounded-pill px-4 py-2 ${category === cat ? "btn-warning" : "btn-outline-warning"
              }`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      <div className="product-grid">
        {products.map((p) => (

          <div
            className="product-card"
            key={p.id}

            // DISABLE CLICK FOR ADMIN
            onClick={() => {
              if (!user || user.role !== "ROLE_ADMIN") {
                navigate(`/product/${p.id}`);
              }
            }}
          >

            <div className="product-image">
              <img src={p.imageUrl} alt={p.name} />
            </div>

            <div className="product-info">
              <h6>{p.name}</h6>
              <p>${p.price}</p>

              {/* HIDE FOR ADMIN */}
              {user?.role !== "ROLE_ADMIN" && (
                <button
                  className="add-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(p);
                  }}
                >
                  Add to Cart
                </button>
              )}

            </div>
          </div>

        ))}
      </div>

      <ToastContainer />
    </div>
  );
}

export default Home;