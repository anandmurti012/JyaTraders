import React from 'react';
import './PricingPlans.css';

const PricingPlans = () => {
  return (
    <div className="pricing-plans-container">
      <div className="pricing-card startup-plan">
        <h2 className="plan-title">Startup Plan</h2>
        <div className="plan-price">$49<span>/month</span></div>
        <ul className="plan-features">
          <li>2 App and project</li>
          <li>400 Gb/s storage</li>
          <li>Free custom domain</li>
          <li>Chat Support</li>
          <li>No transaction fees</li>
          <li>Unlimited Storage</li>
        </ul>
        <button className="choose-plan-btn">Choose plan</button>
      </div>
      <div className="pricing-card enterprise-plan">
        <h2 className="plan-title">Enterprise Plan</h2>
        <div className="plan-price">$99<span>/month</span></div>
        <ul className="plan-features">
          <li>2 App and project</li>
          <li>400 Gb/s storage</li>
          <li>Free custom domain</li>
          <li>Chat Support</li>
          <li>No transaction fees</li>
          <li>Unlimited Storage</li>
        </ul>
        <button className="choose-plan-btn">Choose plan</button>
      </div>
    </div>
  );
};

export default PricingPlans;
