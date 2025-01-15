import React from "react";
import "./Pricing.css";

const Pricing = () => {
  return (
    <div className="pricing-container">
      <h1>Pricing Plans</h1>
      <p>Choose the plan that fits your needs.</p>
      <div className="pricing-cards">
        <div className="pricing-card">
          <h2>Basic</h2>
          <p className="price">$10/month</p>
          <ul>
            <li>Basic AI Replica</li>
            <li>5 Custom Profiles</li>
            <li>Email Support</li>
          </ul>
          <button>Choose Plan</button>
        </div>
        <div className="pricing-card">
          <h2>Pro</h2>
          <p className="price">$30/month</p>
          <ul>
            <li>Advanced AI Replica</li>
            <li>Unlimited Profiles</li>
            <li>Priority Support</li>
          </ul>
          <button>Choose Plan</button>
        </div>
        <div className="pricing-card">
          <h2>Enterprise</h2>
          <p className="price">Contact Us</p>
          <ul>
            <li>Custom AI Solutions</li>
            <li>Dedicated Support</li>
            <li>API Access</li>
          </ul>
          <button>Contact Sales</button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
