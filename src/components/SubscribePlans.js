"use client";
import { useState, useEffect } from "react";
import './sub.css';

export default function SubscribePlans() {
  const [loading, setLoading] = useState(false);
  const [isSubscribedmb, setIsSubscribedmb] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('INR');

  const plan = {
    name: "Full Access",
    amount: selectedCurrency === 'INR' ? 799 : 9.99,
    currency: selectedCurrency,
    description:
      "Enter the cyber grid. Hack systems, expose secrets, rewrite the digital world.",
  };

  useEffect(() => {
    if (localStorage.getItem("subscribedmb") === "true") {
      setIsSubscribedmb(true);
    }
  }, []);

  const handleSubscribe = async (plan) => {
    try {
      setLoading(true);

      // Create order on server
      const res = await fetch(`/api/create-order?currency=${plan.currency}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: plan.amount }),
      });

      const order = await res.json();

      // Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Mr. Bot",
        description: `Subscription to Mr. Bot - ${plan.currency} ${plan.amount}`,
        order_id: order.id,
        handler: function (response) {
          alert(
            `Payment successful! ID: ${response.razorpay_payment_id}`
          );
          localStorage.setItem("subscribedmb", "true"); // unlock content
          setIsSubscribedmb(true);
        },
        theme: { color: "#00f2ea" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isSubscribedmb) {
    return (
      <div className="recon-container" style={{ textAlign: "center" }}>
        <h2>Subscription Successful!</h2>
        <p>You now have access to download the APK.</p>
        <a href="/mr-bot.apk" className="btn primary" data-text="Mr. Bot">
          <span className="btn-text">Download APK</span>
        </a>
      </div>
    );
  }

  return (
    <div className="hasa" style={{marginRight:"1.7rem",marginLeft:'1.7rem'}}>
      {loading ? 
<div className="banter-loader">
  <div className="banter-loader__box"></div>
  <div className="banter-loader__box"></div>
  <div className="banter-loader__box"></div>
  <div className="banter-loader__box"></div>
  <div className="banter-loader__box"></div>
  <div className="banter-loader__box"></div>
  <div className="banter-loader__box"></div>
  <div className="banter-loader__box"></div>
  <div className="banter-loader__box"></div>
</div> : ""}
      <div className="sub-wrapper">
          <div className="sub-card">
            <div className="sub-header">
              <h3 className="sub-name" data-text={plan.name}>
                {plan.name}
              </h3>
            </div>
            
            <div className="sub-body">
              <p className="sub-des">{plan.description}</p>
              <div className="currency-toggle" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ marginRight: '0.5rem' }}>INR</span>
                <input 
                  type="checkbox" 
                  checked={selectedCurrency === 'USD'} 
                  onChange={() => setSelectedCurrency(selectedCurrency === 'INR' ? 'USD' : 'INR')} 
                  style={{ margin: '0 0.5rem' }}
                />
                <span>USD</span>
              </div>
              <p
                className="sub-amo"
                data-text={
                  plan.currency === "INR"
                    ? `₹${plan.amount}`
                    : `$${plan.amount}`
                }
              >
                {plan.currency === "INR"
                  ? `₹${plan.amount}`
                  : `$${plan.amount}`}
              </p>

              {/* ✅ Features list */}
              <ul className="sub-list">
                <li className="sub-item">
                  <span className="check">✔</span> Unlock Full Game
                </li>
                <li className="sub-item">
                  <span className="check">✔</span> Master Hacking Skills
                </li>
                <li className="sub-item">
                  <span className="check">✔</span> Exclusive Content
                </li>
              </ul>

              {/* ✅ Button */}
              <button
                data-text="Mr. Bot"
                onClick={() => handleSubscribe(plan)}
                disabled={loading}
              >
                {loading ? "Processing..." : <span>Download Now</span>}
              </button>
              </div>
          </div>
      </div>
    </div>
  );
}