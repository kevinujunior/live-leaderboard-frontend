import React, {useState,useEffect} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { logOutUser,getLoggedInUser } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Home = () =>{
    const [profile,setProfile] = useState({});
    //to show data as soon as page loads or refreshed
    useEffect(()=>{
        setProfile(getLoggedInUser())
        console.log(getLoggedInUser())
    },[])
    const navigate = useNavigate();
    const logoutFunc = () =>{
        swal("Logout from App")
            .then(value=>{ 
                logOutUser()
                navigate("/login")
            })
    }
    return (<div>
    <nav class="navbar navbar-horizontal navbar-expand-lg navbar-light" style ={{border:"1px solid black"}}>
                <div class="container">
                    <a class="navbar-brand" href="/">
                    <img style={{ width: "250px", height: "150px" }} alt="home logo" src="../../assets/img/logo.png" id="navbar-logo" />
                    </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-info" aria-controls="navbar-info" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbar-info">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item">
                                <a class="nav-link" onClick={logoutFunc}>
                                    Logout
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#contact">
                                    {profile.name}
                                </a>
                            </li>
                        </ul>
                        <div class="order-lg-4 ml-lg-3">
                            <span class="avatar rounded-circle">
                                <img alt="user profile" src="../../assets/img/person-auth.jpg" />
                            </span>
                        </div>
                    </div>
                </div>
            </nav>
    </div>)
}


export default Home;