import React, { useState } from "react";
import ReactDOM from "react-dom";


const initialProducts = [
  {
    id: 1,
    name: "Classic Men's Polo Shirt",
    category: "Men's Clothing",
    description: "A comfortable and stylish polo shirt for everyday wear.",
    specifications: "Cotton fabric, regular fit, available in different sizes",
    rating: 4.8,
    price: 499,
    stock: 15,
    image: "https://images.unsplash.com/photo-1625910513413-5fc3b3a6d9b5?w=500"
  },
  {
    id: 2,
    name: "Men's Casual Jeans",
    category: "Men's Clothing",
    description: "Classic denim jeans suitable for casual outfits.",
    specifications: "Denim fabric, straight fit, zipper closure",
    rating: 4.7,
    price: 899,
    stock: 12,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"
  },
  {
    id: 3,
    name: "Elegant Women's Dress",
    category: "Women's Clothing",
    description: "An elegant dress perfect for parties and special occasions.",
    specifications: "Soft fabric, elegant design, available in different sizes",
    rating: 4.9,
    price: 999,
    stock: 8,
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500"
  },
  {
    id: 4,
    name: "Women's Casual Blouse",
    category: "Women's Clothing",
    description: "A fashionable blouse for casual and everyday outfits.",
    specifications: "Lightweight fabric, short sleeves, comfortable fit",
    rating: 4.6,
    price: 450,
    stock: 4,
    image: "https://images.unsplash.com/photo-1564257577-1e9a8e7e6f3b?w=500"
  },
  {
    id: 5,
    name: "Classic White Sneakers",
    category: "Shoes & Sandals",
    description: "Versatile sneakers for everyday activities.",
    specifications: "Rubber sole, lace-up closure, unisex style",
    rating: 4.8,
    price: 1299,
    stock: 10,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
  },
  {
    id: 6,
    name: "Women's Casual Sandals",
    category: "Shoes & Sandals",
    description: "Comfortable sandals for everyday use.",
    specifications: "Lightweight sole, adjustable straps, casual design",
    rating: 4.5,
    price: 599,
    stock: 3,
    image: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=500"
  },
  {
    id: 7,
    name: "Women's Fashion Handbag",
    category: "Accessories",
    description: "A stylish handbag for everyday essentials.",
    specifications: "Synthetic leather, zipper closure, shoulder strap",
    rating: 4.7,
    price: 799,
    stock: 9,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500"
  },
  {
    id: 8,
    name: "Classic Wrist Watch",
    category: "Accessories",
    description: "A fashionable wristwatch for everyday outfits.",
    specifications: "Analog display, adjustable strap, classic design",
    rating: 4.6,
    price: 1099,
    stock: 6,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
  }
];



const money = (amount) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP"
  }).format(amount);

const emptyForm = {
  name: "",
  category: "Men's Clothing",
  description: "",
  specifications: "",
  rating: "",
  price: "",
  stock: "",
  image: ""
};


const styles = {
  page: {
    minHeight: "100vh",
    background: "#F5F0E8",
    color: "#292521",
    fontFamily: "Arial, sans-serif"
  },
  header: {
    background: "#171717",
    color: "#FFFFFF",
    padding: "30px 5%",
    borderBottom: "4px solid #D6C3A5"
  },
  container: {
    maxWidth: 1200,
    margin: "auto",
    padding: "28px 20px"
  },
  panel: {
    background: "#FFFFFF",
    border: "1px solid #E8E0D5",
    borderRadius: 14,
    padding: 22,
    marginBottom: 24,
    boxShadow: "0 4px 15px rgba(0,0,0,0.04)"
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: 11,
    marginTop: 7,
    border: "1px solid #D6C3A5",
    borderRadius: 7,
    fontSize: 14
  },
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 600
  },
  button: {
    border: 0,
    borderRadius: 7,
    padding: "10px 14px",
    cursor: "pointer",
    fontWeight: 600
  },
  primary: {
    background: "#292521",
    color: "#FFFFFF"
  },
  secondary: {
    background: "#E8E0D5",
    color: "#292521"
  }
};


function App() {
  const [products, setProducts] = useState(initialProducts);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [message, setMessage] = useState("");

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category))
  ];

  const totalUnits = products.reduce(
    (sum, product) => sum + product.stock,
    0
  );

  const inventoryValue = products.reduce(
    (sum, product) => sum + product.price * product.stock,
    0
  );

  const lowStock = products.filter(
    (product) => product.stock < 5
  ).length;

  const cartItems = products.filter(
    (product) => (cart[product.id] || 0) > 0
  );

  const cartTotal = cartItems.reduce(
    (sum, product) =>
      sum + product.price * (cart[product.id] || 0),
    0
  );

  const cartQuantity = cartItems.reduce(
    (sum, product) => sum + cart[product.id],
    0
  );

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  function updateForm(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value
    }));
  }

  function addProduct(event) {
    event.preventDefault();

    const price = Number(form.price);
    const stock = Number(form.stock);
    const rating = Number(form.rating);

    if (
      !form.name.trim() ||
      !form.category ||
      !form.description.trim() ||
      !form.specifications.trim() ||
      !form.image.trim() ||
      form.rating === "" ||
      form.price === "" ||
      form.stock === "" ||
      !Number.isFinite(price) ||
      price < 0 ||
      !Number.isInteger(stock) ||
      stock < 0 ||
      !Number.isFinite(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      setMessage(
        "Please fill in every field with valid values. Rating must be from 1 to 5."
      );
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: form.name.trim(),
      category: form.category,
      description: form.description.trim(),
      specifications: form.specifications.trim(),
      rating,
      price,
      stock,
      image: form.image.trim()
    };

    setProducts((current) => [...current, newProduct]);
    setForm(emptyForm);
    setMessage("Product added successfully!");
  }

  function changeCart(product, amount) {
    setCart((current) => {
      const currentQuantity = current[product.id] || 0;
      const nextQuantity = currentQuantity + amount;

      if (nextQuantity < 0 || nextQuantity > product.stock) {
        return current;
      }

      return {
        ...current,
        [product.id]: nextQuantity
      };
    });
  }

  function removeFromCart(productId) {
    setCart((current) => ({
      ...current,
      [productId]: 0
    }));
  }

  function openDetails(product) {
    setSelectedProduct(product);
    window.scrollTo(0, 0);
  }

  function addToCart(product) {
    const currentQuantity = cart[product.id] || 0;

    if (currentQuantity >= product.stock) {
      setMessage("No more stock is available for this product.");
      return;
    }

    changeCart(product, 1);
    setMessage(product.name + " added to cart.");
  }

  function buttonStyle(background, color = "white") {
    return {
      ...styles.button,
      background,
      color
    };
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={{ maxWidth: 1200, margin: "auto" }}>

        <h1 style={{
            margin: "10px 0 5px",
            fontSize: 38,
            fontFamily: "Georgia, serif",
            fontWeight: "normal",
            letterSpacing: 5
          }}>
            RAVÉLLE
          </h1>

          <p style={{ margin: 0, color: "#D6C3A5" }}>
            FASHION • FOOTWEAR • ACCESSORIES
          </p>
        </div>
      </header>

      <main style={styles.container}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 16,
            marginBottom: 24
          }}
        >
          {[
  ["TOTAL PRODUCTS", products.length],
  ["UNITS IN STOCK", totalUnits],
  ["INVENTORY VALUE", money(inventoryValue)],
  ["CART TOTAL", money(cartTotal)]
].map(([label, value]) => (
  <div
    key={label}
    style={{
      ...styles.panel,
      borderRadius: 4,
      borderTop: "3px solid #A8875A",
      boxShadow: "0 5px 18px rgba(41, 37, 33, 0.05)"
    }}
  >
    <div style={{
      color: "#A8875A",
      fontSize: 11,
      letterSpacing: 1.5,
      fontWeight: 600
    }}>
      {label}
    </div>

    <h2 style={{
      marginBottom: 0,
      fontSize: 25,
      fontFamily: "Georgia, serif",
      fontWeight: "normal",
      color: "#292521"
    }}>
      {value}
    </h2>
  </div>
))}
        </div>

        {message && (
          <div
            role="status"
            style={{
              ...styles.panel,
              padding: 14,
              color: "#3730a3"
            }}
          >
            {message}
            <button
              onClick={() => setMessage("")}
              style={{
                ...styles.button,
                float: "right",
                padding: "2px 8px",
                background: "#e0e7ff"
              }}
            >
              Dismiss
            </button>
          </div>
        )}

        {selectedProduct ? (
          <section style={styles.panel}>
            <button
              style={buttonStyle("#e0e7ff", "#3730a3")}
              onClick={() => setSelectedProduct(null)}
            >
              ← Back to Products
            </button>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: 28,
                marginTop: 22
              }}
            >
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                style={{
                  width: "100%",
                  maxHeight: 350,
                  objectFit: "cover",
                  borderRadius: 12,
                  background: "#f1f5f9"
                }}
              />

              <div>
                <div style={{ color: "#64748b", fontSize: 13 }}>
                  {selectedProduct.category}
                </div>

                <h2>{selectedProduct.name}</h2>

                <h2 style={{ color: "#4f46e5" }}>
                  {money(selectedProduct.price)}
                </h2>

                <p>{selectedProduct.description}</p>

                <p>
                  <strong>Specifications:</strong>{" "}
                  {selectedProduct.specifications}
                </p>

                <p>
                  <strong>Rating:</strong> ⭐ {selectedProduct.rating} / 5
                </p>

                <p>
                  <strong>Available quantity:</strong>{" "}
                  {selectedProduct.stock}
                </p>

                {selectedProduct.stock < 5 && (
                  <p style={{ color: "#b91c1c", fontWeight: 700 }}>
                    Low Stock
                  </p>
                )}

                <button
                  disabled={
                    (cart[selectedProduct.id] || 0) >= selectedProduct.stock
                  }
                  style={{
                    ...buttonStyle("#4f46e5"),
                    opacity:
                      (cart[selectedProduct.id] || 0) >=
                      selectedProduct.stock
                        ? 0.5
                        : 1
                  }}
                  onClick={() => addToCart(selectedProduct)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </section>
        ) : (
          <>
            <section style={styles.panel}>
            <h2 style={{
              marginTop: 0,
              fontFamily: "Georgia, serif",
              fontWeight: "normal",
              letterSpacing: 1
            }}></h2>

              <p style={{ color: "#64748b", fontSize: 13 }}>
                All fields are required. Use an image URL for the featured image.
              </p>

              <form onSubmit={addProduct}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
                    gap: 16
                  }}
                >
                  <label style={styles.label}>
                    Featured Image URL *
                    <input
                      style={styles.input}
                      type="url"
                      name="image"
                      value={form.image}
                      onChange={updateForm}
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                  </label>

                  <label style={styles.label}>
                    Product Name *
                    <input
                      style={styles.input}
                      name="name"
                      value={form.name}
                      onChange={updateForm}
                      placeholder="Enter product name"
                      required
                    />
                  </label>

                  <label style={styles.label}>
                    Product Category *
                    <select
                      style={styles.input}
                      name="category"
                      value={form.category}
                      onChange={updateForm}
                      required
                    >
                      <option value="Men's Clothing">Men's Clothing</option>
                      <option value="Women's Clothing">Women's Clothing</option>
                      <option value="Shoes and Sandals">Shoes and Sandals</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </label>

                  <label style={styles.label}>
                    Rating (1–5) *
                    <input
                      style={styles.input}
                      type="number"
                      name="rating"
                      min="1"
                      max="5"
                      step="0.1"
                      value={form.rating}
                      onChange={updateForm}
                      placeholder="e.g. 4.5"
                      required
                    />
                  </label>

                  <label style={styles.label}>
                    Price (PHP) *
                    <input
                      style={styles.input}
                      type="number"
                      name="price"
                      min="0"
                      step="0.01"
                      value={form.price}
                      onChange={updateForm}
                      placeholder="e.g. 599"
                      required
                    />
                  </label>

                  <label style={styles.label}>
                    Quantity *
                    <input
                      style={styles.input}
                      type="number"
                      name="stock"
                      min="0"
                      step="1"
                      value={form.stock}
                      onChange={updateForm}
                      placeholder="Available quantity"
                      required
                    />
                  </label>
                </div>

                <label style={{ ...styles.label, marginTop: 18 }}>
                  Product Description *
                  <textarea
                    style={{ ...styles.input, minHeight: 85 }}
                    name="description"
                    value={form.description}
                    onChange={updateForm}
                    placeholder="Describe the product"
                    required
                  />
                </label>

                <label style={{ ...styles.label, marginTop: 18 }}>
                  Product Specifications *
                  <textarea
                    style={{ ...styles.input, minHeight: 75 }}
                    name="specifications"
                    value={form.specifications}
                    onChange={updateForm}
                    placeholder="Enter product specifications"
                    required
                  />
                </label>

                <button
                  type="submit"
                  style={{
                    ...buttonStyle("#4f46e5"),
                    marginTop: 18
                  }}
                >
                  + Add Product
                </button>
              </form>
            </section>

            <section style={styles.panel}>
              <h2 style={{ marginTop: 0 }}>Product List</h2>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                  marginBottom: 20
                }}
              >
                <input
                  style={{ ...styles.input, flex: "1 1 220px", marginTop: 0 }}
                  placeholder="Search product name..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />

                <select
                  style={{ ...styles.input, flex: "0 1 200px", marginTop: 0 }}
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item === "All" ? "All Categories" : item}
                    </option>
                  ))}
                </select>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                  gap: 18
                }}
              >
                {filteredProducts.map((product) => {
                  const quantity = cart[product.id] || 0;
                  const subtotal = product.price * quantity;

                  return (
                    <article
                      key={product.id}
                      style={{
                        border: "1px solid #E8E0D5",
                        borderRadius: 4,
                        overflow: "hidden",
                        background: "#FFFFFF",
                        boxShadow: "0 5px 18px rgba(41, 37, 33, 0.06)",
                        transition: "transform 0.2s ease"
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: "100%",
                          height: 220,
                          objectFit: "cover",
                          background: "#F5F0E8",
                          display: "block"
                        }}
                      />

                      <div style={{ padding: 16 }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 8
                          }}
                        >
                          <span style={{ color: "#64748b", fontSize: 12 }}>
                            {product.category}
                          </span>

                          <span
                            style={{
                              background:
                                product.stock < 5 ? "#fee2e2" : "#dcfce7",
                              color:
                                product.stock < 5 ? "#b91c1c" : "#166534",
                              padding: "4px 8px",
                              borderRadius: 20,
                              fontSize: 11,
                              fontWeight: 700
                            }}
                          >
                            {product.stock < 5 ? "Low Stock" : "In Stock"}
                          </span>
                        </div>

                        <h3 style={{
                          marginBottom: 8,
                          fontFamily: "Georgia, serif",
                          fontWeight: "normal",
                          fontSize: 19,
                          color: "#292521"
                        }}>
                          {product.name}
                        </h3>

                        <div style={{ color: "#64748b", fontSize: 13 }}>
                          ⭐ {product.rating} / 5
                        </div>

                        <h3 style={{
                                color: "#A8875A",
                                fontFamily: "Georgia, serif",
                                fontWeight: "normal",
                                fontSize: 20
                              }}>
                                {money(product.price)}
                              </h3>

                        <p style={{ fontSize: 13 }}>
                          Available: {product.stock}
                        </p>

                        <button
                          style={buttonStyle("#e0e7ff", "#3730a3")}
                          onClick={() => openDetails(product)}
                        >
                          View Details
                        </button>

                        <button
                          disabled={quantity >= product.stock}
                          style={{
                            ...buttonStyle("#4f46e5"),
                            marginLeft: 6,
                            opacity: quantity >= product.stock ? 0.5 : 1
                          }}
                          onClick={() => addToCart(product)}
                        >
                          Add to Cart
                        </button>

                        {quantity > 0 && (
                          <div
                            style={{
                              marginTop: 16,
                              paddingTop: 12,
                              borderTop: "1px solid #e2e8f0"
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10
                              }}
                            >
                              <button
                                style={buttonStyle("#e2e8f0", "#172033")}
                                onClick={() => changeCart(product, -1)}
                              >
                                −
                              </button>

                              <strong>{quantity}</strong>

                              <button
                                disabled={quantity >= product.stock}
                                style={buttonStyle("#e2e8f0", "#172033")}
                                onClick={() => changeCart(product, 1)}
                              >
                                +
                              </button>

                              <span style={{ fontSize: 12 }}>
                                Subtotal: <strong>{money(subtotal)}</strong>
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>

              {filteredProducts.length === 0 && (
                <p>No products found. Try another search or category.</p>
              )}
            </section>
          </>
        )}

        <section style={styles.panel}>
          <h2 style={{ marginTop: 0 }}>
            Shopping Cart ({cartQuantity} items)
          </h2>

          {cartItems.length === 0 ? (
            <p style={{ color: "#64748b" }}>
              Your cart is empty. Add a product to get started.
            </p>
          ) : (
            <>
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    textAlign: "left",
                    minWidth: 550
                  }}
                >
                  <thead>
                    <tr style={{ background: "#f1f5f9" }}>
                      {["Product", "Price", "Quantity", "Subtotal", "Action"].map(
                        (heading) => (
                          <th
                            key={heading}
                            style={{
                              padding: 12,
                              borderBottom: "1px solid #e2e8f0"
                            }}
                          >
                            {heading}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>

                  <tbody>
                    {cartItems.map((product) => {
                      const quantity = cart[product.id];

                      return (
                        <tr key={product.id}>
                          <td style={{ padding: 12 }}>
                            {product.name}
                          </td>

                          <td style={{ padding: 12 }}>
                            {money(product.price)}
                          </td>

                          <td style={{ padding: 12 }}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10
                              }}
                            >
                              <button
                                style={buttonStyle("#e2e8f0", "#172033")}
                                onClick={() => changeCart(product, -1)}
                              >
                                −
                              </button>

                              {quantity}

                              <button
                                disabled={quantity >= product.stock}
                                style={buttonStyle("#e2e8f0", "#172033")}
                                onClick={() => changeCart(product, 1)}
                              >
                                +
                              </button>
                            </div>
                          </td>

                          <td style={{ padding: 12 }}>
                            {money(product.price * quantity)}
                          </td>

                          <td style={{ padding: 12 }}>
                            <button
                              style={buttonStyle("#fee2e2", "#b91c1c")}
                              onClick={() => removeFromCart(product.id)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div
                style={{
                  textAlign: "right",
                  marginTop: 22,
                  paddingTop: 18,
                  borderTop: "2px solid #e2e8f0"
                }}
              >
                <p style={{ color: "#64748b" }}>
                  Total items: {cartQuantity}
                </p>

                <h2 style={{ color: "#4f46e5" }}>
                  Overall Total: {money(cartTotal)}
                </h2>
              </div>
            </>
          )}
        </section>

        <section
          style={{
            ...styles.panel,
            background: "#fff7ed",
            borderColor: "#fed7aa"
          }}
        >
          <h3 style={{ marginTop: 0 }}>Inventory Alerts</h3>

          <p>
            Products with quantity below 5:{" "}
            <strong style={{ color: "#b91c1c" }}>{lowStock}</strong>
          </p>

          {lowStock > 0 ? (
            products
              .filter((product) => product.stock < 5)
              .map((product) => (
                <p key={product.id} style={{ color: "#b91c1c" }}>
                  ⚠ {product.name}: Only {product.stock} remaining.
                </p>
              ))
          ) : (
            <p>All products have sufficient stock.</p>
          )}
        </section>

        <footer
          style={{
            textAlign: "center",
            color: "#64748b",
            fontSize: 13,
            padding: "8px 0 24px"
          }}
        >
          CCDI Sorsogon · RAVÉLLE Fashion Store · Pre-Final Exam Project
        </footer>
      </main>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));