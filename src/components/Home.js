import React, {useState,useEffect} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { logOutUser,getLoggedInUser } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import setAuthToken from '../utils/setAuthToken';
import IO from "socket.io-client";
import { getToken } from '../utils/auth';
import getServerUrl from '../utils/serverURL';
import './home.css'
const socket = IO.connect(getServerUrl());

const Home = () =>{
    
    const [profile,setProfile] = useState({});
    const [users,setUsers] = useState([]);
    const [eth,setEth] = useState(0);
    const [rank,setRank] = useState(0);
    const navigate = useNavigate();
    
    const depositUpdate = async (score) =>{
        const scoreData = {
            authToken: getToken(),
            eth : score
        }
        await socket.emit('update_score_req',scoreData);
    }

    const withdrawUpdate = async (score) =>{
        const scoreData = {
            authToken: getToken(),
            eth : score
        }
        await socket.emit('update_score_req',scoreData);
    }

    useEffect(()=>{
        socket.on('updated_score',(data)=>{
            setUsers(data)
            const currUser = getLoggedInUser()
            let idx = data.findIndex(x => x.emailId === currUser.emailId)
            setRank(idx)
            setEth(parseFloat(data[idx].eth).toFixed(2))
        })
    },[])

    //to show data as soon as page loads or refreshed
    useEffect(()=>{
        setProfile(getLoggedInUser())
        setAuthToken()
        //console.log(getLoggedInUser())
        
        axios.get(`${getServerUrl()}/api/user/allusers`)
        .then(res=>{
            setUsers(res.data.result)
            const currUser = getLoggedInUser()
            let idx = res.data.result.findIndex(x => x.emailId === currUser.emailId)
           // console.log(idx)
            setRank(idx)
            setEth(parseFloat(res.data.result[idx].eth).toFixed(2))
        }).catch(err=>{
            console.log(err);
        })
    },[])

    

    const logoutFunc = () =>{
        swal("Logout from App")
            .then(value=>{ 
                logOutUser()
                navigate("/login")
            })
    }

    const depositFunc = () =>{
        let amount = prompt("Please enter deposit amount");
        if (amount != null && amount !== "") {
            console.log(amount)
            /*const obj = {
                score:parseFloat(amount)
            }*/
            depositUpdate(amount)
            /*axios.put("http://localhost:5000/api/eth/deposit",obj)
            .then(res=>{
                swal(amount+" deposited")
            }).catch(err=>{
                console.log(err)
            })*/
        }
    }
    const withdrawFunc = () =>{
        let amount = prompt("Please enter deposit amount");
        if (amount != null && amount !== "") {
            console.log(amount)
            /*const obj = {
                score:parseFloat(amount)
            }*/
            withdrawUpdate(0-amount)
            /*axios.put("http://localhost:5000/api/eth/withdraw",obj)
            .then(res=>{
                swal(amount+" withdrawn")
            }).catch(err=>{
                console.log(err)
            })*/
        }
    }


    const allUsers = users.map((ele, i) => {
        return (
            <tr>
                <td style ={{fontSize:"15px"}}>{i+1}</td>
                <td style ={{fontSize:"15px"}}>{ele.emailId}</td>
                <td style ={{fontSize:"15px"}}>{ele.name}</td>
                <td style ={{fontSize:"15px"}}>{parseFloat(ele.eth).toFixed(2)}</td>
            </tr>
        );
    });


    return (<div>
        <div class="row" style ={{border:"1px solid black", background:"teal", 
        position:"fixed",top:0, width:"100%",
        padding:"20px 20px 0 20px"}}>
            <div class="col-md-4" style={{marginBottom:"20px"}}>
                <h5 style ={{color:"white"}}>Rank : {rank+1}</h5>
            </div>
            <div class="col-md-4" style={{marginBottom:"20px"}}>
                <div style={{display:"flex",justifyContent:"center"}}>
                            
                    <i class="fa-solid fa-square-minus" style={{color:"white",fontSize:"40px", cursor:"pointer"}}
                    onClick={withdrawFunc}></i>
                    
                    <span class = "scoreclass" style ={{color:"white",fontSize:"1.2vw",marginLeft:"20px",marginRight:"20px",marginTop:"5px"}}>Score : {eth}</span>
                    
                    <i class="fa-solid fa-square-plus" style={{color:"white",fontSize:"40px",cursor:"pointer"}} 
                    onClick={depositFunc}></i>
                    
                </div>
            </div>
            <div class="col-md-4" style={{display:"flex",justifyContent:"center", marginBottom:"20px"}}>
                    <button class="btn-light logout-btn" style={{borderRadius:"15px"}} onClick={logoutFunc}>
                        Logout
                    </button>
                    <a class="nav-link" href="#contact" style={{color:"white"}}>
                        {profile.name}
                    </a>
                    <span class="avatar rounded-circle">
                        <img alt="user profile" src="../../assets/img/person-auth.jpg" />
                    </span>
                </div>
            </div>
                <section class="slice pt-md-4 pb-5 pb-0 ml-10 mr-10 mb-6 tablesec" style={{ borderRadius:"1%", marginTop :"5%", position:"relative", zIndex:-1}}>
                            <table class="table table-cards ">
                                <thead >
                                    <tr>
                                        <th style ={{fontSize:"20px"}} scope="col">Rank</th>
                                        <th style ={{fontSize:"20px"}} scope="col">Username</th>
                                        <th style ={{fontSize:"20px"}} scope="col">Name</th>
                                        <th style ={{fontSize:"20px"}} scope="col">Ethereum</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allUsers}
                                </tbody>
                            </table>
                 </section>
        </div>)
}


export default Home;