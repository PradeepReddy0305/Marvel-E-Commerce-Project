import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import API from '../services/api';
import 'react-toastify/dist/ReactToastify.css';

function OrderPlacing() {
  const navigate = useNavigate();
  const [isCodSelected, setIsCodSelected] = useState(false);

  // Form State for shipping details
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const handleInputChange = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.id]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    // Restored cart retrieval (Teammate had this commented out)
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const user = JSON.parse(localStorage.getItem("user"));

    // Keep Teammate's strict login validation
    if (!user) {
      toast.error("Please login to place an order! 🔑");
      navigate('/login');
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty! 🛒");
      return;
    }

    // Merged Payload Logic
    const ordersPayload = cart.map(item => ({
      username: user.email || "Unknown Hero", 
      itemName: item.name,
      itemCategory: item.category || "Marvel Gear",
      size: item.selectedSize || "N/A",
      quantity: item.quantity || 1,
      totalPrice: Number(item.price) * (item.quantity || 1),
      dateOfOrder: new Date().toISOString().split('T')[0], 
      deliveryStatus: "PENDING",
      address: `${shippingDetails.phone}, ${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.pincode}`
    }));

    try {
      await API.post("/orders/place", ordersPayload);

      await API.delete(`/cart/clear/${user.id}`);
      
      localStorage.removeItem("cart"); 

      toast.success("Order recorded in the Asgardian Vault! 🚀", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
      

      setTimeout(() => {
        navigate('/'); 
      }, 2500);

    } catch (err) {
      console.error("Backend Error:", err);
      toast.error("Bridge to Asgard failed. Is the Backend running? ⚡");
    }
  };

  const styles = {
    pageBg: { backgroundColor: '#000000', minHeight: '100vh', paddingTop: '50px' },
    labelBlue: { color: '#00BFFF', fontWeight: 'bold', textShadow: '0 0 5px rgba(0, 191, 255, 0.5)' },
    inputLoki: { backgroundColor: '#000000', color: '#32CD32', border: '2px solid #00BFFF', borderRadius: '8px' },
    cardBorder: { border: '3px solid #00BFFF', backgroundColor: '#000000', boxShadow: '0 0 20px rgba(0, 191, 255, 0.3)' }
  };

  return (
    <div style={styles.pageBg}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <ToastContainer />

        <div className="card p-4 shadow-lg" style={styles.cardBorder}>
          <h2 className="text-center mb-4 fw-bold" style={styles.labelBlue}>ASGARDIAN SHIPPING</h2>
          
          <form onSubmit={handlePlaceOrder}>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label" style={styles.labelBlue}>Full Name</label>
              <input type="text" id="fullName" className="form-control loki-input" style={styles.inputLoki} placeholder="e.g. Tony Stark" onChange={handleInputChange} required />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label" style={styles.labelBlue}>Phone Number</label>
              <input type="tel" id="phone" className="form-control loki-input" placeholder="e.g. +91..." style={styles.inputLoki} onChange={handleInputChange} required />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label" style={styles.labelBlue}>House Address</label>
              <textarea id="address" className="form-control loki-input" style={styles.inputLoki} rows="2" placeholder="Street, Apartment..." onChange={handleInputChange} required></textarea>
            </div>
            
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="city" className="form-label" style={styles.labelBlue}>City</label>
                <input type="text" id="city" className="form-control loki-input" style={styles.inputLoki} onChange={handleInputChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="state" className="form-label" style={styles.labelBlue}>State</label>
                <input type="text" id="state" className="form-control loki-input" style={styles.inputLoki} onChange={handleInputChange} required />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="pincode" className="form-label" style={styles.labelBlue}>Pincode</label>
              <input type="text" id="pincode" className="form-control loki-input" style={styles.inputLoki} onChange={handleInputChange} required />
            </div>

            <div className="p-3 rounded mb-4" style={{ border: '1px solid #32CD32' }}>
              <label className="form-label d-block fw-bold mb-2" style={styles.labelBlue}>Payment Method:</label>
              <div className="form-check">
                <input className="form-check-input" type="radio" id="cod" name="payment" onChange={() => setIsCodSelected(true)} />
                <label className="form-check-label text-white" htmlFor="cod">Cash on Delivery (COD)</label>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-outline-info w-100 fw-bolder fs-4 py-2" 
              style={{ 
                borderColor: '#00BFFF', 
                backgroundColor: isCodSelected ? '#00fbff' : '#222', 
                color: isCodSelected ? '#ff0000' : '#555' 
              }}
              disabled={!isCodSelected}
            >
              PLACE ORDER
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .loki-input::placeholder { color: rgba(255, 255, 0, 0.52); }
        .loki-input:focus { background-color: #000 !important; color: #32CD32 !important; border-color: #32CD32 !important; box-shadow: 0 0 10px #32CD32; outline: none; }
        .form-check-input:checked { background-color: #ee00ff; border-color: #32CD32; }
      `}</style>
    </div>
  );
}

export default OrderPlacing;