import React from 'react';

const PaymentButton = () => {
  const handlePayment = () => {
    window.location.href = 'https://nowpayments.io/payment/?iid=4380342004';
  };

  return (
    <button onClick={handlePayment} className="payment-button">
      Buy Now with USDT
    </button>
  );
};

export default PaymentButton;
