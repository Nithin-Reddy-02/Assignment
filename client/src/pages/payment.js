import makeAnimated from "react-select/animated";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useDocumentTitle from "../hooks/useDocumentTitle";

const Payment = () => {
  useDocumentTitle("Payment");

  const navigate = useNavigate();

  const [CardNumber, setCardNumber] = useState('');
  const [CVV, setCVV] = useState('');
  const [name, setname] = useState('');
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const animatedComponents = makeAnimated(); 

  const checkAlphabets= (str)=>{
    let regExp = /[a-zA-Z]/g;
    return regExp.test(str)
  }

  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

  const handleFormSubmit =async (event) => {
    event.preventDefault();
    if (CardNumber.length<16 || checkAlphabets(CardNumber)) {
      alert("Invalid Card Number")
    } else if(CVV.length<3 || checkAlphabets(CVV)) {
      alert("CVV invalid");
    }
    else{
      setIsFormSubmitting(true);
      await timeout(1000);
      setIsFormSubmitting(false);
      alert("Interview was successfully added.");
      navigate("/upcoming");
    }
    
  };
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6">
      <div className="pt-32 pb-12">
        <div className="flex flex-col">
          <h2 className="text-xl text-center font-medium mb-4">
            Payment
          </h2>
            <form onSubmit={handleFormSubmit} className="flex flex-col">

              <label className="mt-4 w-full">Card Holder Name : </label>
              <input
                type="text"
                value={name}
                placeholder='Name on card'
                onChange={(e) => setname(e.target.value)}
                className='rounded-md'
                required
              />

              <label className="mt-4">Card Number : </label>
              <input
                type="text"
                value={CardNumber}
                placeholder='Card Number'
                required
                className="rounded-md"
                maxLength="16"
                onChange={(e) => setCardNumber(e.target.value)}
                
              />

              <label className="mt-4">CVV</label>
              <input
                type="text"
                value={CVV}
                required
                className="rounded-md"
                maxLength="3"
                onChange={(e) => setCVV(e.target.value)}
                
              />

              <button
                type="submit"
                className="btn mx-auto mt-6 bg-green-500 text-white"
                disabled={isFormSubmitting}
              >
                {isFormSubmitting ? "Paying..." : "Pay Now"}
              </button>
            </form>
        </div>
      </div>
    </main>
  );
};

export default Payment;
