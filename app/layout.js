import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
import classes from "./page.module.css"

export const metadata = {
  title: 'Home',
  description: 'File transfer webapp',
}

export default function RootLayout({ children }) {
  
  return (
    <html className={classes.all}>
      <body style={{margin:"0px"}} className={classes.body}>
        <NavBar/>
        <hr className={classes.hr}/>
        <div>
          {children}
        </div>
        <hr className={classes.hr}/>
        <Footer/>
        </body>
    </html>
  )
}
