import React,{useEffect, useState} from "react";
import "./lecture.css"
import axios from "axios"
import {useNavigate, useParams} from "react-router-dom"
import {server} from "../../main"
import Loading from "../../Components/Loder/loading";
import toast from "react-hot-toast";


const Lecture = ({ user }) => {
    const [lecture, setLecture] = useState([]);
    const [lecures, setLectures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lecloading, setLecloading] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [video, setVideo] = useState("");
    const [videoPrev, setVideoPrev] = useState();
    const [btnLoading, setBtnLoading] = useState(false);

    if(user && user.role !== "admin" && !user.subscription.includes(params.id))
      return navigate("/");


    async function fetchlectures() {
      const token = localStorage.getItem("token");
      try {
        const { data } = await axios.get(`${server}/api/v1/lectures/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setLectures(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  
    async function fetchlecture(id) {
      setLecloading(true);
      const token = localStorage.getItem("token");
      try {
        const { data } = await axios.get(`${server}/api/v1/lecture/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLecture(data.lecture);
        setLecloading(false);
      } catch (error) {
        console.log(error);
        setLecloading(false);
      }
    }
  
    const chnageVidehandler = (e)=>{
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend = () =>{
          setVideoPrev(reader.result);
          setVideo(file);
        };
    };

    const submitHandler = async (e) => {
      setBtnLoading(true);
      e.preventDefault();
  
      const myForm = new FormData();
      myForm.append("title", title);
      myForm.append("description", description);
      myForm.append("files", video);
      myForm.append("course", params.id)
  
      const token = localStorage.getItem("token");
      for (const [key, value] of myForm.entries()) {
          console.log(key, value);
      }
  
      try {
          const { data } = await axios.post(
              `${server}/api/v1/course/${params.id}`,
              myForm,
              {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
          );
          console.log(data)
          toast.success(data.message);
          setBtnLoading(false);
          setShow(false);
          fetchlectures();
          setTitle("");
          setDescription("");
          setVideo("");
      } catch (error) {
          toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
          setBtnLoading(false);
          console.log(error)
      }
  };
  const deleteHandler = async(id) =>{
    if(confirm("Are you sure you want to delete this lecture")){
      const token = localStorage.getItem("token")
    try {
      const {data} = await axios.delete(`${server}/api/v1//lecture/${id}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      toast.success(data.message)
      fetchlectures();
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
    }
  
  
    useEffect(() => {
      fetchlectures();
    }, []);
  
    const getvideoUrl = () => {
        if (lecture && lecture.video) {
          // Assuming 'lecture.video' contains a full path, split by "/" and get the last segment
          const videoPath = lecture.video.replace(/\\/g, "/"); // Normalize path to avoid issues with backslashes
          const videoFileName = videoPath.substring(videoPath.lastIndexOf("/") + 1); // Get the file name after the last "/"
          
          const videoUrl = `${server}/tmp/my-uploada/${videoFileName}`; // Construct the video URL
          return videoUrl;
        }
        return ""; // Return empty string if no video is available
      };
      
  
    const Videourl = lecture && lecture.video ? getvideoUrl() : "";
    // console.log(lecture, Videourl);
  
    return (
      <>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="lecture-page">
              <div className="left">
                {lecloading ? (
                  <Loading />
                ) : (
                  <>
                    {lecture.video ? (
                      <>
                        <video
                          src={Videourl}
                          width={"100%"}
                          controls
                          controlsList="nodownload noremoteplaybck"
                          disablePictureInPicture
                          disableRemotePlayback
                          autoPlay
                        ></video>
                        <h1>{lecture.title}</h1>
                        <h3>{lecture.description}</h3>
                      </>
                    ) : (
                      <h1>Please Select a Lecture</h1>
                    )}
                  </>
                )}
              </div>
              <div className="right">
                {user && user.role === "admin" && (
                  <button onClick={() => setShow((prev) => !prev)}
                  className="comman-btn"
                  style={{backgroundColor: "#8a4baf", color: "#fff"}}
                  >Add Lecture</button>
                )}
  
                {show && (
                  <div className="lecture-form">
                    <h2>Add Lecture</h2>
                    <form onSubmit={submitHandler}>
                      <label htmlFor="text">Title</label>
                      <input type="text" 
                      value={title}
                      onChange={(e)=>setTitle(e.target.value)}
                      required />
  
                      <label htmlFor="text">Description</label>
                      <input type="text"
                      value={description}
                      onChange={(e)=>setDescription(e.target.value)}
                      required />
  
                      <input type="file" placeholder="Choose Video" 
                      onChange={chnageVidehandler}
                      required />
                      {
                        videoPrev && <video src={videoPrev} alt ="" width={300} controls></video>
                      }
  
                      <button type="submit" 
                      className="comman-btn"
                      disabled={btnLoading}
                      style={{backgroundColor: "#8a4baf", color: "#fff"}}
                      >
                        {btnLoading? "Please Wait...." : "ADD"}
                      </button>
                    </form>
                  </div>
                )}
  
                {lecures && lecures.length > 0 ? (
                  lecures.map((e) => (
                    <>
                        <div onClick={() => fetchlecture(e._id)} key={e._id} 
                    className={`lecture-number ${
                        lecture._id === e._id && "active"
                    }`}>
                      {e.title}
                    </div>
                    {
                        user && user.role === "admin" && (
                            <button className="comman-btn" 
                                style={{backgroundColor: "red", color: "#fff"}}
                                onClick={()=>deleteHandler(e._id)}
                                >Delete {e.title}</button>
                        )
                    }
                    </>
                  ))
                ) : (
                  <p>No Lecture Yet!</p>
                )}
              </div>
            </div>
          </>
        )}
      </>
    );
  };
  
  export default Lecture;
  

