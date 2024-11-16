import classes from "@/Styles/Message.module.css"

export default function Message({ user}){
return(
    <div className={classes.all}>
        <p className={classes.userName}>
            {user.username}
        </p>
        <p className={classes.msg}>
            {user.chat}
        </p>
    </div>
)
}