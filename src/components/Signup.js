import React, {useState} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import {useNavigate} from 'react-router-dom';
import getServerUrl from '../utils/serverURL';


const Signup = () => {
    const [name, setName] = useState("");
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const signupFunc = () =>{
        const newUser = {
            name,
            emailId:email,
            password
        }
        console.log(newUser)
        axios.post(`${getServerUrl()}/api/user/signup`,newUser)
        .then(res=>{
            swal(res.data.Result)
            .then(value=>{
                navigate("/login")
            })
        }).catch(err=>{
            console.log("line 19"+err);
        })
    }
    return (<div>
            <div>
                <h3>User Signup</h3>
            </div>
            <section class="slice pl-5 pr-5 pt-md-4 pb-5 pb-0 bg-section-dark ml-10 mr-10">
            
                <form>
                    <div class="form-group">
                    <div class="d-flex align-items-center justify-content-between">
                            <div>
                                <label class="form-control-label">Email Id</label>
                            </div>
                        </div>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-user"></i></span>
                            </div>
                            <input type="text" class="form-control" id="input-regno" placeholder="ex: john@gmail.com" 
                                onChange = {e=>{setEmail(e.target.value)}}
                            />
                        </div>
                    </div>

                    <div class="d-flex align-items-center justify-content-between">
                            <div>
                                <label class="form-control-label">Name</label>
                            </div>
                        </div>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-user"></i></span>
                            </div>
                            <input type="text" class="form-control" id="input-regno" placeholder="ex: John Siemens"
                            onChange = {e=>{setName(e.target.value)}} />
                    </div>
                    

                    <div class="form-group mb-0">
                        <div class="d-flex align-items-center justify-content-between">
                            <div>
                                <label class="form-control-label">Password</label>
                            </div>
                        </div>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-key"></i></span>
                            </div>
                            <input type="password" class="form-control" id="input-password" placeholder="Password" 
                                onChange = {e=>{setPassword(e.target.value)}}
                            />
                        </div>
                    </div>
                    <div class="mb-2 text-right">
                        Already have an account? 
                        <a href="/login">  Sign in</a>
                    </div>
                    <div class="mt-4">
                        <button type="button" class="btn btn-sm btn-primary btn-icon rounded-pill" onClick={signupFunc}>
                            <span class="btn-inner--text">Sign Up</span>
                            <span class="btn-inner--icon"><i class="fas fa-arrow-right"></i></span>
                        </button>
                    </div>
                </form>
            </section>
            </div>)
} 

export default Signup;