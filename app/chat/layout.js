import classes from "./chat.module.css"

export default function chatLayout({children}){
return(
    <div className={classes.chatLayout}>
        {children}
    </div>
)
}