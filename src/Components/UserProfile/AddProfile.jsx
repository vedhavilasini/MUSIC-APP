import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import Languages from "./JSON/languages.json"
import City from "./JSON/city.json"
import Countries from "./JSON/countries.json"
import { AuthUserContext } from '../../Context/AuthContextApi';
import { doc, setDoc } from 'firebase/firestore';
import { __DB } from '../../backend/firebaseconfig';
import { useLocation, useNavigate } from 'react-router-dom';
import State from "./JSON/state.json";


const AddProfile = () => {
  let {authUser}=useContext(AuthUserContext);
  let navigate=useNavigate();
  let location= useLocation();
  let[userDetails,setUserDetails]=useState({
    username:location?.state?.username,
    contactnumber:location?.state?.contactnumber,
    gender:location?.state?.gender,
    dob:location?.state?.dob,
    age:location?.state?.age,
    lang:location?.state?.lang,
    country:location?.state?.country,
    state:location?.state?.state,
    city:location?.state?.city,
    address:location?.state?.address,
    role:"user"
  }
)
let{
  username,
  contactnumber,
  gender,
  dob,
  age,
  lang,
  country,
  state,
  city,
  address,
  role,
}=userDetails;
let handleInputChange=(e)=>{
  let name= e.target.name;
  let value=e.target.value;
  setUserDetails({...userDetails,[name]:value});
}
let handleSubmit=async(e)=>{
  e.preventDefault();
  try{
    let{displayName,photoURL,email,uid}=authUser;
    //!Create an object to send inside the database
    // !payload object is nothing actual object which is sent to a database in the programming the actual object is called as payload
    let payload={
      ...userDetails,
      displayName,
      photoURL,
      email,
      uid
    }
    // ^ step-1:create a document reference inside the database (cloud firestore)
    let user_profilre_collection=doc(__DB,"user_details",uid);
    // ^ step-2: set or store the data inside the database
    await setDoc(user_profilre_collection,payload);
    navigate("/user/profile");
    toast.success("user details has been upadated")
  }catch(error){
    toast.error(error.code||"Something went wrong")
  } 
}
  return (
    <section className="w-full h-[calc(100vh-70px)] flex justify-center items-center">
      <article className="w-[80%] min-h-[70vh] flex flex-col justify-center items-center p-5">
        <form className="w-full"onSubmit={handleSubmit}>
          <table className="border border-white w-full bg-gray-500 text-white">
            <tr>
              <th className="border border-white p-4 bg-blue-900 text-white text-lg" colSpan="3">
                Add User Details
              </th>
            </tr>
            <tr>
              <th className="border border-white p-2 bg-gray-700 text-white text-lg" colSpan="3">
                Personal Details
              </th>
            </tr>
            <tr>
              <td className="border border-white p-4">
                <label htmlFor='username' className="font-semibold">UserName</label>
                <input type="text" className="w-full outline-none rounded-lg p-2 bg-gray-700 text-white ring-1 ring-gray-400 mt-2" name='username'id="username"onChange={handleInputChange}value={username}  />
              </td>
              <td className="border border-white p-4">
                <label htmlFor='contactnumber' className="font-semibold">Contact Number</label>
                <input type="tel" className="w-full outline-none rounded-lg p-2 bg-gray-700 text-white ring-1 ring-gray-400 mt-2" name='contactnumber'id="contactnumber"onChange={handleInputChange}value={contactnumber}/>
              </td>
              <td className="border border-white p-4">
                <label className="font-semibold">Gender</label>
                <div className="flex gap-4 mt-2">
                  <label htmlFor="gender"className="flex items-center gap-1">
                    <input type="radio" className="accent-gray-600"name='gender'value="male" checked={gender==="male"}onChange={handleInputChange}/> Male
                  </label>
                  <label className="flex items-center gap-1">
                    <input type="radio" className="accent-gray-600"name='gender'value="female" checked={gender==="female"}onChange={handleInputChange} /> Female
                  </label>
                  <label className="flex items-center gap-1">
                    <input type="radio" className="accent-gray-600"name='gender'value="others" checked={gender==="others"}onChange={handleInputChange} /> Others
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <td className="border border-white p-4">
                <label  htmlFor="dob"className="font-semibold">DOB</label>
                <input type="date" className="w-full outline-none rounded-lg p-2 bg-gray-700 text-white ring-1 ring-gray-400 mt-2"name='dob'id="dob"onChange={handleInputChange} value={dob}/>
              </td>
              <td className="border border-white p-4">
                <label htmlFor="age" className="font-semibold">Age</label>
                <input type="number" className="w-full outline-none rounded-lg p-2 bg-gray-700 text-white ring-1 ring-gray-400 mt-2"name='age'onChange={handleInputChange} value={age}/>
              </td>
              <td className="border border-white p-4">
                <label htmlFor="lang"className="font-semibold">Language</label>
                <input className="w-full outline-none rounded-lg p-2 bg-gray-700 text-white ring-1 ring-gray-400 mt-2"name='lang'id="lang"onChange={handleInputChange} value={lang} list="langList"/>
                <datalist id='langList'>
                    {
                      Languages.map((language,index)=>{
                        return<option>{language}</option>
                      })
                    }
                </datalist>
              </td>
            </tr>
            <tr>
              <td className="border border-white p-4">
                <label htmlFor="country" className="font-semibold">Country</label>
                <input type="text"className="w-full outline-none rounded-lg p-2 bg-gray-700 text-white ring-1 ring-gray-400 mt-2"name='country'id="country"onChange={handleInputChange}value={country}list="countryList"/>
                <datalist id='countryList'>
                    {
                      Countries.map((country,index)=>{
                        return<option>{country}</option>
                      })
                    }
                </datalist>
              </td>
              <td className="border border-white p-4">
                <label  htmlFor="state" className="font-semibold">State</label>
                <input type="text" className="w-full outline-none rounded-lg p-2 bg-gray-700 text-white ring-1 ring-gray-400 mt-2"name='state'id="state"onChange={handleInputChange}value={state}list="stateList"/>
                <datalist id='stateList'>
                    {
                      State.map((state,index)=>{
                        return<option>{state}</option>
                      })
                    }
                </datalist>
              </td>
              <td className="border border-white p-4">
                <label  htmlFor="city" className="font-semibold">City</label>
                <input type="text" className="w-full outline-none rounded-lg p-2 bg-gray-700 text-white ring-1 ring-gray-400 mt-2" name='city'id="city"onChange={handleInputChange}value={city} list="cityList"/>
                <datalist id='cityList'>
                    {
                      City.map((city,index)=>{
                        return<option>{city}</option>
                      })
                    }
                </datalist>
              </td>
            </tr>
            <tr>
              <td  className="border border-white p-4"colSpan="3">
              <label className="font-semibold">Address</label>
                <textarea className="w-full outline-none rounded-lg p-2 bg-gray-700 text-white ring-1 ring-gray-400 mt-2" name="address" onChange={handleInputChange} value={address} />
              </td>
            </tr>
            <tr>
              <td colSpan="3" className="border border-white p-4 text-center">
                <button className="bg-gray-700 text-white px-20 py-2 rounded-lg mt-5 hover:bg-gray-700">
                  ADD HERE
                </button>
              </td>
            </tr>
          </table>
        </form>
      </article>
    </section>
  );
};

export default AddProfile;
