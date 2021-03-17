import React,{useState,useEffect} from 'react';

export default function Result() {
    const [message, setMessage] = useState("No Message");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

    return (
        <div>
            <h1 className='text-success'>{message}</h1>
        </div>
    )
}
