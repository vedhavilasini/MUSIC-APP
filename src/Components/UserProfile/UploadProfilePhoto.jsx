import { updateProfile } from 'firebase/auth/web-extension';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { AuthUserContext } from '../../Context/AuthContextApi';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../helper/Spinner';

const UploadProfilePhoto = () => {
  let { authUser } = useContext(AuthUserContext)
  let navigate = useNavigate();
  let [photoFile, setPhotoFile] = useState("");
  let [photoPreview, setPhotoPreview] = useState(null);
  let [isLoading, setIsLoading] = useState(false)
  let handleFileInputChange = (e) => {
    let file = e.target.files[0];
    setPhotoFile(file);
    // console.log(file);
    setPhotoPreview(URL.createObjectURL(file))
  }
  let handleSumbit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!photoFile) {
        toast.error("please select a file before uploading")
        return;
      }
      // ! converting image into binary 
      // ^ formData ->
      let fileData = new FormData();
      fileData.append("file", photoFile);
      fileData.append("upload_preset", "musicapp")
      fileData.append("cloud_name", "dvvbin4ds")
      // ! upload your binary data to thr cloudinary
      let response = await fetch("https://api.cloudinary.com/v1_1/dvvbin4ds/image/upload", {
        method: "POST",
        body: fileData
      });

      let result = await response.json();
      console.log(result)
      let imageUrl = result.url;

      await updateProfile(authUser, { photoURL: imageUrl });
      toast.success("profile photo upadated succesfully");
      navigate("/user/profile")
    } catch (error) {
      toast.error(error.code.slice(5));
      console.log("error while uploading", error);
    }
    setIsLoading(false)

  }
  return (
    <section className='w-[100%] h-[calc(100vh-70px)] flex justify-center items-center flex-col'>
      <article className='w-[35%] bg-gradient-to-b from-gray-600 to-gray-300  flex flex-col justify-center items-center'>
        <header className='w-full'>
          <h1 className='text-3xl text-center font-semibold uppercase py-6'>UPLOAD PROFIE</h1>
        </header>
        {photoPreview === null ? <> <div className='w-[150px] h-[150px] border rounded-full flex justify-center items-center bg-gray-700'>No file is selected
        </div></> : <><img className='w-[150px] h-[150px] border rounded-full flex justify-center items-center bg-gray-700' src={photoPreview} /></>}
      </article>
      <main className='w-[35%] bg-gradient-to-t from-gray-600 to-gray-300'>
        <form onSubmit={handleSumbit}>
          <div className='flex flex-col justify-center my-3 px-6'>
            <label htmlFor="profile" className='font-semibold text-lg py-2' >upload your profile photo </label>
            <input type="file" name="photoFile" id="profile" className='border py-2 px-4 border-gray-700 border-dotted file:bg-white file:p-1 file:rounded cursor-pointer' onChange={handleFileInputChange} />
          </div>
          <div className='flex justify-center items-center mt-3 mb-7'>
            <button className='bg-gray-600 py-2 cursor-pointertext-lg font-semibold px-6 hover:bg-gray-700 rounded-lg'>Upload your photo</button>
          </div>
        </form>
      </main>
    </section>
  )
}

export default UploadProfilePhoto