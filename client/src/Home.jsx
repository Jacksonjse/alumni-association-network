import { useState, useEffect } from "react";
import axios from "axios";

const backendURL = "https://alumni-association-network.onrender.com";

export default function Home() {

    
  const [form, setForm] = useState({ name:"", email:"", batch:"", department:"" });
  const [data, setData] = useState([]);

  const loadData = async () => {
    const res = await axios.get(`${backendURL}/api/alumni`);
    setData(res.data);
  };

  const addRecord = async () => {
    await axios.post(`${backendURL}/api/alumni/add`, form);
    alert("✅ Record Added Successfully!");
    setForm({ name:"", email:"", batch:"", department:"" });
    loadData();
  };

  const deleteRecord = async (id) => {
    await axios.delete(`${backendURL}/api/alumni/${id}`);
    alert("🗑️ Record Deleted Successfully!");
    loadData();
  };

  useEffect(() => { loadData(); }, []);

  return (
    <div style={{
      minHeight:"100vh",
      background:"#f1f3f7",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      fontFamily:"Segoe UI, sans-serif"
    }}>

      <div style={{
        width:"500px",
        background:"#ffffff",
        borderRadius:"14px",
        padding:"30px",
        boxShadow:"0 4px 20px rgba(0,0,0,0.15)"
      }}>

        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"20px" }}>
          <h2 style={{ margin:0, color:"#333" }}>Alumni Records</h2>
          <button 
            onClick={()=>{
                localStorage.removeItem("loggedInUser");
                window.location.href="/login";
              }}
              
            style={{padding:"8px 12px",background:"#d9534f",color:"#fff",border:"none",borderRadius:"6px",cursor:"pointer"}}
          >
            Logout
          </button>
        </div>

        <input placeholder="Full Name" value={form.name}
          style={inputStyle}
          onChange={e=>setForm({...form,name:e.target.value})}
        />
        <input placeholder="Email" value={form.email}
          style={inputStyle}
          onChange={e=>setForm({...form,email:e.target.value})}
        />
        <input placeholder="Batch" value={form.batch}
          style={inputStyle}
          onChange={e=>setForm({...form,batch:e.target.value})}
        />
        <input placeholder="Department" value={form.department}
          style={inputStyle}
          onChange={e=>setForm({...form,department:e.target.value})}
        />

        <button style={btnStyle} onClick={addRecord}>Add Alumni Record</button>

        <hr style={{margin:"25px 0",borderColor:"#ddd"}}/>

        <h3 style={{marginBottom:"14px",color:"#222"}}>Saved Records</h3>

        {data.map(x=>(
          <div key={x._id} style={{
            display:"flex",
            justifyContent:"space-between",
            padding:"10px",
            background:"#fafafa",
            borderRadius:"8px",
            marginBottom:"10px",
            border:"1px solid #eee"
          }}>
            <span>{x.name} — {x.email}</span>
            <button 
              onClick={()=>deleteRecord(x._id)}
              style={{background:"#ff4444",color:"white",border:"none",padding:"5px 12px",borderRadius:"6px"}}
            >
              Delete
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}

const inputStyle = {
  width:"100%",padding:"12px",marginBottom:"14px",
  borderRadius:"8px",border:"1px solid #bbb",background:"#fafafa"
};

const btnStyle = {
  width:"100%",padding:"14px",background:"#0047ff",color:"#fff",
  border:"none",borderRadius:"8px",fontWeight:"600",cursor:"pointer"
};
