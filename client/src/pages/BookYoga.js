import Select from "react-select";
import axios from "axios";
import makeAnimated from "react-select/animated";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useDocumentTitle from "../hooks/useDocumentTitle";

const BookYoga = () => {
  useDocumentTitle("Book a Yoga Class");

  const navigate = useNavigate();

  const [batch, setbatch] = useState(1);
  const [DOB, setDOB] = useState(new Date());
  const [DOJ, setDOJ] = useState(new Date());
  const [email, setemail] = useState('');
  const [name, setname] = useState('');
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const animatedComponents = makeAnimated();  

  const options = [
    { value: "1", label: "6AM - 7AM" },
    { value: "2", label: "7AM - 8AM"},
    { value: "3", label: "8AM - 9AM" },
    { value: "4", label: "5PM - 6PM" },
  ];

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setIsFormSubmitting(true);

    var data = JSON.stringify({
      "name": name,
      "email": email,
      "dob": DOB,
      "doj": DOJ,
      "batch": batch.value
    });
    
    var config = {
      method: 'post',
      headers: { 
        'Content-Type': 'application/json'
      }, 
      url:'/api/users/add',
      data : data
    };
    axios(config)
      .then((res) => {
        setIsFormSubmitting(false);
        
        navigate("/payment");
      })
      .catch((error) => {
        setIsFormSubmitting(false);
        alert(error.response.data.message);
      });
  };
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6">
      <div className="pt-32 pb-12">
        <div className="flex flex-col">
          <h2 className="text-xl text-center font-medium mb-4">
            Book a Yoga Class
          </h2>
            <form onSubmit={handleFormSubmit} className="flex flex-col">

              <label className="mt-4 w-full">Your Name : </label>
              <input
                type="text"
                value={name}
                placeholder='Name'
                onChange={(e) => setname(e.target.value)}
                className='rounded-md'
                required
              />

              <label className="mt-4">Date of Birth </label>
              <input
                type="date"
                value={DOB}
                onChange={(e) => setDOB(e.target.value)}
                required
                className="rounded-md"
              />

              <label className="mt-4">Email : </label>
              <input
                type="text"
                value={email}
                placeholder='Email'
                onChange={(e) => setemail(e.target.value)}
                required
                className="rounded-md"
              />

              <label className="mt-4">Date of Joining </label>
              <input
                type="date"
                value={DOJ}
                onChange={(e) => setDOJ(e.target.value)}
                required
                className="rounded-md"
              />

              <label className="mt-4">Select Batch : </label>
              <Select
                components={animatedComponents}
                name="batch"
                options={options}
                className="basic-select"
                classNamePrefix="select"
                onChange={(selectedOption) => {
                  setbatch(selectedOption);
                }}
              />

              <button
                type="submit"
                className="btn mx-auto mt-6 bg-blue-500 text-white"
                disabled={isFormSubmitting}
              >
                {isFormSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
        </div>
      </div>
    </main>
  );
};

export default BookYoga;
