import { useState } from "react";
import axios from "axios";

const backendURL = "https://alumni-association-network.onrender.com";

export default function Register() {
  const [form, setForm] = useState({
    full_name:"",
    email:"",
    username:"",
    password:"",
    confirm:""
  });

  const submit = async () => {
    if(!form.full_name || !form.email || !form.username || !form.password || !form.confirm){
      alert("All fields must be filled");
      return;
    }
    if(form.password !== form.confirm){
      alert("Passwords do not match");
      return;
    }

    try{
      await axios.post(`${backendURL}/api/auth/register`,{
        full_name:form.full_name,
        email:form.email,
        username:form.username,
        password:form.password
      });
      alert("✅ Registration Successful!");
      setForm({ full_name:"", email:"", username:"", password:"", confirm:"" });
    }catch(err){
      alert(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div style={{
      height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",
      background:"#e7efff",fontFamily:"Segoe UI"
    }}>
      <div style={{
        width:"420px",background:"#fff",padding:"32px",borderRadius:"14px",
        boxShadow:"0 4px 20px rgba(0,0,0,0.18)"
      }}>
        <h2 style={{color:"#0047ff",textAlign:"center",marginBottom:"20px"}}>Register</h2>

        <input placeholder="Full Name"
          style={inputStyle}
          value={form.full_name}
          onChange={e=>setForm({...form,full_name:e.target.value})}
        />
        <input placeholder="Email"
          style={inputStyle}
          value={form.email}
          onChange={e=>setForm({...form,email:e.target.value})}
        />
        <input placeholder="Username"
          style={inputStyle}
          value={form.username}
          onChange={e=>setForm({...form,username:e.target.value})}
        />
        <input placeholder="Password" type="password"
          style={inputStyle}
          value={form.password}
          onChange={e=>setForm({...form,password:e.target.value})}
        />
        <input placeholder="Confirm Password" type="password"
          style={inputStyle}
          value={form.confirm}
          onChange={e=>setForm({...form,confirm:e.target.value})}
        />

        <button style={btnStyle} onClick={submit}>Create Account</button>

        <p style={{textAlign:"center",marginTop:"12px"}}>
          <a href="/login">Already have an account? Login</a>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width:"100%",padding:"12px",marginBottom:"14px",
  borderRadius:"8px",border:"1px solid #bbb"
};

const btnStyle = {
  width:"100%",padding:"14px",background:"#0047ff",color:"#fff",
  border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer"
};
