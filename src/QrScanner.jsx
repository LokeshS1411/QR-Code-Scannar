import { useState } from "react";
import "./Qr.css";

const QrScanner = () => {
  const [img,setImg]=useState("");
  const [loading,setLoading]=useState(false);
  const [name,setName]=useState("");
  const [size,setSize]=useState("")
  

   async function GenerateQr(){
    setLoading(true)
      // setImg("tom.jpg")
       try{
        const url=`https://api.qrserver.com/v1/create-qr-code/?${size}x${size}100&data=${encodeURIComponent(name)}`;
        setImg(url);
       }catch(error){
        console.error(error);
       }
       finally{
        setLoading(false);
       }
    }
    function Downloadqr(){
      fetch(img)
      .then((response)=>response.blob())
      .then((blob)=>{
        const link=document.createElement("a")
        link.href=URL.createObjectURL(blob);
        link.download="QR code.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link)
      })

       
    }
  return (
    <div className="qr">
        <h1>QR CODE GENERATER</h1>
        {loading && <p>please wait...</p>}
      {img && <img src={img} alt="" />}
      <label htmlFor="Qrsc"  id="Input"  className="il" >ENTER YOUR SITE : </label>
      <input type="text" value={name} id="Qrsc" placeholder="Enter your Site" onChange={(event)=>setName(event.target.value)}/>
      <label htmlFor="size" id="input2" className="il">ENETR YOUR SIZE :</label>
      <input type="text" value={size} id="size" placeholder="Enter Size..e.g 150px" onChange={(event)=>setSize(event.target.value)} />
      <div className="btn">
        <button className="btn1" onClick={GenerateQr}>Generate Qr</button>
        <button className="btn2 btn1" onClick={Downloadqr} >Download Qr</button>
      </div>
    </div>
  )
}

export default QrScanner
