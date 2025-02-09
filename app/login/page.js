"use client"
import classes from "./styles.module.css";
import VerticalLine from "@/components/Verticleline";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {

  
  const router = useRouter();

    
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Login successful');
        router.push("/chat");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('An error occurred during login');
      console.error(error);
    }
  };

  const handleSignup = () => {
    router.push("/signup")
}

  return (
    <div className={classes.all}>
      <div className={classes.signupform}>
        <form onSubmit={handleLogin}>
          <p>UserName</p>
          <input type="email" onChange={(e)=>{setUsername(e.target.value)}}></input>
          <p>Password</p>
          <input type="password" onChange={(e)=>{setPassword(e.target.value)}}></input>
          <div className={classes.formbtn}>
            <button className={classes.formbtn1} type="submit">
              Submit
            </button>
          </div>
        </form>
        <p>{message}</p>
      </div>
      <VerticalLine className={classes.verticalline} />
      <div className={classes.loginform}>
        <p>Signup</p>
        <button onClick={handleSignup}>Click here</button>
      </div>
    </div>
  );
}
