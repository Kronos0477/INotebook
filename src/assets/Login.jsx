import React,{useState,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
const Login = (props) => {
  const navigateTo = useNavigate();
  const [email, setemail] = useState('')
  const [Password, setPassword] = useState('')
 
  const handlelogined = async(e)=>{
    e.preventDefault();
    const responce = await fetch('http://localhost:8000/api/auth/login',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Email: email,Password:Password }),
 
    })
    const res = await responce.json()
      if(res.success){
      console.log(`${JSON.stringify(res.authtoken)}`);
      sessionStorage.setItem('token', res.authtoken);
      navigateTo('/');
    }else{
      props.setAlert(`${res.error}`)
      setTimeout(()=>{
        props.setAlert('')
      },1500)

    }

  }
  const onchange =(e)=>{setemail(e.target.value)}
  const onchanged =(e)=>{setPassword(e.target.value)}
  return (
    <form onSubmit={handlelogined}>
  <div className="my-5 ">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" value={email} onChange={onchange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control"value={Password} onChange={onchanged} id="exampleInputPassword1"/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit"  className="btn btn-primary">Submit</button>
</form>
  )
}

export default Login
