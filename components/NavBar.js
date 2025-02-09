"use client";
import Link from "next/link";
import classes from "@/Styles/NavBar.module.css";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function NavBar() {
  const path = usePathname();
  const [dropdown, setdropdown] = useState(false);

  // function handleonclick() {
  //   setdropdown((prev) => !prev);
  // }
  function handleMouseLeave() {
    setdropdown(false);
  }
  function handleMouseEnter() {
    setdropdown(true);
  }
  return (
    <>
      <div className={`${classes.NavBar} ${classes.all} `}>
        <div className={classes.NavBar1}>
          <Link href={"/"} className={classes.NavLink}>
            H
          </Link>
        </div>
        <div className={classes.NavBar2}>
          <div className="Files">
            <Link
              href={"/files"}
              className={`${classes.NavLink} ${
                path === "/files" ? classes.active : undefined
              }`}
            >
              Files
            </Link>
          </div>
          <div className="Chat">
            <Link
              href={"/chat"}
              className={`${classes.NavLink} ${
                path === "/chat" ? classes.active : undefined
              }`}
            >
              Chat
            </Link>
          </div>
          <div className="Media">
            <Link
              href={"/media"}
              className={`${classes.NavLink} ${
                path === "/media" ? classes.active : undefined
              }`}
            >
              Media
            </Link>
          </div>
        </div>
        <div className={classes.NavBar3}>
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button className={classes.btn} >User</button>
            {dropdown && (
              <div
                className={classes.dropdownmenu}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className={classes.dropdownItem}>
                  <Link href={"/profile"} className={classes.NavLink}>
                    Profile
                  </Link>
                </div>
                <div className={classes.dropdownItem}>
                  <Link href={"/friends"} className={classes.NavLink}>Friends</Link>
                </div>
                <div className={classes.dropdownItem}>
                  <Link href={"/api/logout"} className={classes.NavLink}>Logout</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
