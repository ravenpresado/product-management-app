
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const initialProducts = [
  { id: 1, name: 'Wireless Mouse', category: 'Electronics', price: 599, stock: 25 },
  { id: 2, name: 'Mechanical Keyboard', category: 'Electronics', price: 1899, stock: 12 },
  { id: 3, name: 'Notebook', category: 'Stationery', price: 55, stock: 40 },
  { id: 4, name: 'USB-C Cable', category: 'Accessories', price: 199, stock: 5 },
];

const money = (amount) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 2,
  }).format(amount);

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [form, setForm] = useState({
    name: '',
    category: 'Electronics',
    price: '',
    stock: '',
  });
  const [editingId, setEditingId] = useState(null);

  const categories = [
    'All',
    'Electronics',
    'Stationery',
    'Accessories',
    'Other',
  ];

  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const inventoryValue = products.reduce(
    (sum, p) => sum + p.price * p.stock,
    0
  );
  const lowStock = products.filter((p) => p.stock <= 5).length;

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || p.category === category;
    return matchesSearch && matchesCategory;
  });

  function handleSubmit(e) {
    e.preventDefault();

    const name = form.name.trim();
    const price = Number(form.price);
    const stock = Number(form.stock);

    if (!name || form.price === '' || form.stock === '' ||
        !Number.isFinite(price) || price < 0 ||
        !Number.isInteger(stock) || stock < 0) {
      alert('Enter a product name, a valid price, and a whole-number stock quantity.');
      return;
    }

    if (editingId !== null) {
      setProducts((current) =>
        current.map((p) =>
          p.id === editingId
            ? { ...p, name, category: form.category, price, stock }
            : p
        )
      );
    } else {
      setProducts((current) => [
        ...current,
        {
          id: Date.now(),
          name,
          category: form.category,
          price,
          stock,
        },
      ]);
    }

    resetForm();
  }

  function resetForm() {
    setForm({ name: '', category: 'Electronics', price: '', stock: '' });
    setEditingId(null);
  }

  function editProduct(product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
    });
    window.scrollTo(0, 0);
  }

  function deleteProduct(id) {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts((current) => current.filter((p) => p.id !== id));
      if (editingId === id) resetForm();
    }
  }

  const styles = {
    page: {
      minHeight: '100vh',
      background: '#f4f7fb',
      color: '#182230',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      background: '#172554',
      color: 'white',
      padding: '24px 5%',
    },
    container: {
      maxWidth: 1150,
      margin: '0 auto',
      padding: '28px 20px',
    },
    cards: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
      gap: 16,
      marginBottom: 26,
    },
    card: {
      background: 'white',
      borderRadius: 12,
      padding: 22,
      boxShadow: '0 2px 10px #15223b0b',
      border: '1px solid #e5eaf2',
    },
    panel: {
      background: 'white',
      border: '1px solid #e5eaf2',
      borderRadius: 12,
      padding: 24,
      marginBottom: 24,
      overflowX: 'auto',
    },
    input: {
      width: '100%',
      boxSizing: 'border-box',
      padding: 11,
      border: '1px solid #cbd5e1',
      borderRadius: 7,
      fontSize: 14,
      marginTop: 7,
    },
    button: {
      border: 0,
      borderRadius: 7,
      padding: '11px 16px',
      cursor: 'pointer',
      fontWeight: 600,
    },
    label: {
      display: 'block',
      fontSize: 13,
      fontWeight: 600,
      marginBottom: 12,
    },
    table: {
      width: '100%',
      minWidth: 700,
      borderCollapse: 'collapse',
      textAlign: 'left',
    },
    cell: {
      padding: '14px 12px',
      borderBottom: '1px solid #e5eaf2',
      fontSize: 14,
    },
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={{ maxWidth: 1150, margin: 'auto' }}>
          <div style={{ fontSize: 13, color: '#bfdbfe', marginBottom: 8 }}>
            INVENTORY CONTROL
          </div>
          <h1 style={{ margin: '0 0 8px', fontSize: 28 }}>
            Product Management
          </h1>
          <p style={{ margin: 0, color: '#dbeafe' }}>
            Manage your products, prices, and stock in one place.
          </p>
        </div>
      </header>

      <main style={styles.container}>
        <div style={styles.cards}>
          <div style={styles.card}>
            <div style={{ color: '#64748b', fontSize: 14 }}>Total Products</div>
            <h2 style={{ fontSize: 30, margin: '12px 0 0' }}>{products.length}</h2>
          </div>
          <div style={styles.card}>
            <div style={{ color: '#64748b', fontSize: 14 }}>Units in Stock</div>
            <h2 style={{ fontSize: 30, margin: '12px 0 0' }}>{totalStock}</h2>
          </div>
          <div style={styles.card}>
            <div style={{ color: '#64748b', fontSize: 14 }}>Inventory Value</div>
            <h2 style={{ fontSize: 25, margin: '12px 0 0' }}>
              {money(inventoryValue)}
            </h2>
          </div>
          <div style={styles.card}>
            <div style={{ color: '#64748b', fontSize: 14 }}>Low-Stock Items</div>
            <h2 style={{ fontSize: 30, margin: '12px 0 0', color: lowStock ? '#dc2626' : '#15803d' }}>
              {lowStock}
            </h2>
          </div>
        </div>

        <section style={styles.panel}>
          <h2 style={{ marginTop: 0, fontSize: 20 }}>
            {editingId !== null ? 'Edit Product' : 'Add New Product'}
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 16,
            }}>
              <label style={styles.label}>
                Product Name *
                <input
                  style={styles.input}
                  placeholder="e.g. Wireless Headphones"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </label>

              <label style={styles.label}>
                Category
                <select
                  style={styles.input}
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  {categories.filter((c) => c !== 'All').map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </label>

              <label style={styles.label}>
                Price (PHP) *
                <input
                  style={styles.input}
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  required
                />
              </label>

              <label style={styles.label}>
                Stock Quantity *
                <input
                  style={styles.input}
                  type="number"
                  min="0"
                  step="1"
                  placeholder="0"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  required
                />
              </label>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <button type="submit" style={{
                ...styles.button,
                background: '#2563eb',
                color: 'white',
              }}>
                {editingId !== null ? 'Save Changes' : '+ Add Product'}
              </button>
              {editingId !== null && (
                <button type="button" onClick={resetForm} style={{
                  ...styles.button,
                  background: '#e2e8f0',
                  color: '#1e293b',
                }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section style={styles.panel}>
          <h2 style={{ marginTop: 0, fontSize: 20 }}>Product Inventory</h2>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            marginBottom: 18,
          }}>
            <input
              style={{ ...styles.input, flex: '1 1 230px', marginTop: 0 }}
              placeholder="Search products by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              style={{ ...styles.input, flex: '0 1 200px', marginTop: 0 }}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
              ))}
            </select>
          </div>

          <table style={styles.table}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Product', 'Category', 'Price', 'Stock', 'Stock Status', 'Actions'].map((heading) => (
                  <th key={heading} style={{ ...styles.cell, color: '#64748b' }}>
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr key={p.id}>
                  <td style={{ ...styles.cell, fontWeight: 600 }}>{p.name}</td>
                  <td style={styles.cell}>{p.category}</td>
                  <td style={styles.cell}>{money(p.price)}</td>
                  <td style={styles.cell}>{p.stock}</td>
                  <td style={styles.cell}>
                    <span style={{
                      display: 'inline-block',
                      borderRadius: 20,
                      padding: '5px 9px',
                      fontSize: 12,
                      fontWeight: 600,
                      background: p.stock <= 5 ? '#fee2e2' : p.stock <= 10 ? '#fef3c7' : '#dcfce7',
                      color: p.stock <= 5 ? '#b91c1c' : p.stock <= 10 ? '#92400e' : '#166534',
                    }}>
                      {p.stock <= 5 ? 'Low Stock' : p.stock <= 10 ? 'Running Low' : 'In Stock'}
                    </span>
                  </td>
                  <td style={styles.cell}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => editProduct(p)}
                        style={{ ...styles.button, background: '#dbeafe', color: '#1d4ed8', padding: '7px 10px' }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        style={{ ...styles.button, background: '#fee2e2', color: '#b91c1c', padding: '7px 10px' }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ ...styles.cell, textAlign: 'center', color: '#64748b', padding: 30 }}>
                    No products found. Try another search or add a product.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <p style={{ color: '#64748b', fontSize: 13, marginBottom: 0, marginTop: 16 }}>
            Showing {filteredProducts.length} of {products.length} products.
          </p>
        </section>

        <footer style={{ textAlign: 'center', color: '#64748b', fontSize: 13, padding: '8px 0 24px' }}>
          Product Management App · Pre-Final Exam Project
        </footer>
      </main>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
