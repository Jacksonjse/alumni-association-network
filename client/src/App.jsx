import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [form, setForm] = useState({ name:"", email:"", batch:"", department:"" });
  const [data, setData] = useState([]);

  const loadData = async () => {
    const res = await axios.get("http://localhost:5000/api/alumni");
    setData(res.data);
  };

  const addRecord = async () => {
    await axios.post("http://localhost:5000/api/alumni/add", form);
    setForm({ name:"", email:"", batch:"", department:"" });
    loadData();
  };

  const deleteRecord = async (id) => {
    await axios.delete(`http://localhost:5000/api/alumni/${id}`);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

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
        width:"430px",
        background:"#ffffff",
        borderRadius:"14px",
        padding:"30px",
        boxShadow:"0 4px 20px rgba(0,0,0,0.15)"
      }}>
  
        <h2 style={{textAlign:"center",marginBottom:"25px",fontWeight:"600",color:"#333"}}>
          Alumni Record Entry Form
        </h2>
  
        <label>Full Name</label>
        <input
          style={{
            width:"100%",padding:"12px",marginBottom:"14px",
            borderRadius:"8px",border:"1px solid #bbb",background:"#fafafa"
          }}
          placeholder="Enter Full Name"
          value={form.name}
          onChange={e=>setForm({...form,name:e.target.value})}
        />
  
        <label>Email ID</label>
        <input
          style={{
            width:"100%",padding:"12px",marginBottom:"14px",
            borderRadius:"8px",border:"1px solid #bbb",background:"#fafafa"
          }}
          placeholder="Enter Email"
          value={form.email}
          onChange={e=>setForm({...form,email:e.target.value})}
        />
  
        <label>Batch</label>
        <input
          style={{
            width:"100%",padding:"12px",marginBottom:"14px",
            borderRadius:"8px",border:"1px solid #bbb",background:"#fafafa"
          }}
          placeholder="Enter Batch"
          value={form.batch}
          onChange={e=>setForm({...form,batch:e.target.value})}
        />
  
        <label>Department</label>
        <input
          style={{
            width:"100%",padding:"12px",marginBottom:"20px",
            borderRadius:"8px",border:"1px solid #bbb",background:"#fafafa"
          }}
          placeholder="Enter Department"
          value={form.department}
          onChange={e=>setForm({...form,department:e.target.value})}
        />
  
        <button
          style={{
            width:"100%",padding:"14px",
            background:"#0055ff",
            color:"#fff",
            border:"none",
            borderRadius:"8px",
            cursor:"pointer",
            fontSize:"15px",
            fontWeight:"600"
          }}
          onClick={addRecord}
        >
          Add Alumni Record
        </button>
  
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
              style={{
                background:"#ff4444",
                color:"white",
                border:"none",
                padding:"5px 12px",
                borderRadius:"6px"
              }}
            >
              Delete
            </button>
          </div>
        ))}
  
      </div>
    </div>
  );
}  
export default App;
