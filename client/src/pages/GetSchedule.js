import axios from "axios";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const GetSchedule = () => {
  useDocumentTitle("Upcoming Interviews");
  const [email, setemail] = useState('');
  const [DOB,setDOB] = useState(new Date())
  const [name,setname] = useState('')
  const [batch,setbatch] = useState(0);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [scheduleData, setscheduleData] = useState('');

  const animatedComponents = makeAnimated();  
  const options = [
    { value: "1", label: "6AM - 7AM" },
    { value: "2", label: "7AM - 8AM"},
    { value: "3", label: "8AM - 9AM" },
    { value: "4", label: "5PM - 6PM" },
  ];

  var dic = {
    "1":"6AM - 7AM",
    "2":"7AM - 8AM",
    "3":"8AM - 9AM",
    "4":"5PM - 6PM"
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setIsFormSubmitting(true);

    var data = JSON.stringify({
      "email": email,
      "dob": DOB,
    });
    
    var config = {
      method: 'post',
      headers: { 
        'Content-Type': 'application/json'
      }, 
      url:'http://localhost:4040/api/users/getschedule',
      data : data
    };
    axios(config)
      .then((res) => {
        setIsFormSubmitting(false);
        console.log(res.data)
        setbatch(res.data.batch)
        setname(res.data.name)
        setscheduleData('Data')
        
      })
      .catch((error) => {
        setIsFormSubmitting(false);
        alert(error.message);
      });
  };

  const handleScheduleChange = (event)=>{
    event.preventDefault();
    setIsFormSubmitting(true);

    var data2 = JSON.stringify({
      "email": email,
      "dob": DOB,
      "batch":batch.value
    });

    var config2 = {
      method: 'post',
      headers: { 
        'Content-Type': 'application/json'
      }, 
      url:'http://localhost:4040/api/batch/userupdate',
      data : data2
    };
    axios(config2)
      .then((res) => {
        setIsFormSubmitting(false);
        alert("Schedule will be Succesfully Updated from next month")
        setDOB(new Date())
        setemail('')
        setbatch(0)
        setname('')
        setscheduleData('')        
      })
      .catch((error) => {
        setIsFormSubmitting(false);
        alert(error.message);
      });
  }

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6">
      <div className="pt-32 pb-12">
      {scheduleData? <form onSubmit={handleScheduleChange} className="flex flex-col">

<label className="mt-4 w-full">Your Name : </label>
<input
  type="text"
  value={name}
  disabled
  style={{backgroundColor:'gray'}}
  placeholder='Name'
  onChange={(e) => setname(e.target.value)}
  className='rounded-md'
  required
/>

<label className="mt-4">Email : </label>
<input
  type="text"
  value={email}
  disabled
  style={{backgroundColor:'gray'}}
  placeholder='Email'
  onChange={(e) => setemail(e.target.value)}
  required
  className="rounded-md"
/>

<label className="mt-4">Batch : </label>
<Select
  components={animatedComponents}
  defaultValue={{value:batch,label:dic[batch]}}
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
  {isFormSubmitting ? "Submitting..." : "Change Schedule"}
</button>
</form> : <div className="flex flex-col">
          
          <h2 className="text-xl text-center font-medium mb-4">
            Get your schedule
          </h2>
            <form onSubmit={handleFormSubmit} className="flex flex-col">

            <label className="mt-4">Email : </label>
              <input
                type="text"
                value={email}
                placeholder='Email'
                onChange={(e) => setemail(e.target.value)}
                required
                className="rounded-md"
              />

              <label className="mt-4">Date of Birth </label>
              <input
                type="date"
                value={DOB}
                onChange={(e) => setDOB(e.target.value)}
                required
                className="rounded-md"
              />

              <button
                type="submit"
                className="btn mx-auto mt-6 bg-blue-500 text-white"
                disabled={isFormSubmitting}
              >
                {isFormSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
        </div> }
        
      </div>
    </main>
  );
};

export default GetSchedule;
