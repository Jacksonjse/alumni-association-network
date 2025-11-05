import { useState } from "react";
import axios from "axios";

const backendURL = "https://alumni-association-network.onrender.com";

export default function Login(){
  const [loginid,setLoginid] = useState("");
  const [password,setPassword] = useState("");

  const submit = async ()=>{
    if(!loginid || !password){
      alert("All fields are required");
      return;
    }

    try{
      await axios.post(`${backendURL}/api/auth/login`,{ loginid,password });
      alert("✅ Login Successful!");
      localStorage.setItem("loggedInUser", loginid);
      window.location.href = "/";
    }catch(err){
      alert(err.response?.data?.msg || "Error");
    }
  };

  return(
    <div style={{
      height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",
      background:"#e7efff",fontFamily:"Segoe UI"
    }}>
      <div style={{
        width:"400px",background:"#fff",padding:"32px",borderRadius:"14px",
        boxShadow:"0 4px 20px rgba(0,0,0,0.18)"
      }}>
        <h2 style={{color:"#0047ff",textAlign:"center",marginBottom:"20px"}}>Login</h2>

        <input placeholder="Username or Email"
          style={inputStyle}
          onChange={e=>setLoginid(e.target.value)}
        />
        <input placeholder="Password" type="password"
          style={inputStyle}
          onChange={e=>setPassword(e.target.value)}
        />

        <button style={btnStyle} onClick={submit}>Login</button>

        <p style={{textAlign:"center",marginTop:"12px"}}>
          <a href="/register">Don't have an account? Register</a>
        </p>
      </div>
    </div>
  )
}

const inputStyle = {
  width:"100%",padding:"12px",marginBottom:"14px",
  borderRadius:"8px",border:"1px solid #bbb"
};

const btnStyle = {
  width:"100%",padding:"14px",background:"#0047ff",color:"#fff",
  border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer"
};
