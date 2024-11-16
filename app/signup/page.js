"use client"
import classes from "./styles.module.css";
import VerticalLine from "@/components/Verticleline";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      router.push("/files")
    } else {
      const error = await response.json();
      alert(`Login failed: ${error.message}`);
    }
  };

  const handleLogin = () => {
      router.push("/login")
  }

  return (
    <div className={classes.all}>
      <div className={classes.signupform}>
        <form onSubmit={handleSubmit}>
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
      </div>
      <VerticalLine className={classes.verticalline} />
      <div className={classes.loginform}>
        <p>Login</p>
        <button onClick={handleLogin}>Click here</button>
      </div>
    </div>
  );
}
