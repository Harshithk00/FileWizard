import classes from "@/Styles/Footer.module.css";

export default async function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <div className={classes.all}>
      <div>
        <h2>Hello</h2>
        <p className={classes.pcontent}>
          Hi, I'm Harshit! I'm a passionate full-stack developer with a love for
          bringing ideas to life on the web. My expertise includes React,
          Next.js, Node.js, and C++, and I’m constantly expanding my skills to
          take on new challenges. Whether I’m building a quiz app, developing
          innovative projects like an AI-powered blood donation platform, or
          diving into hackathons, I’m driven by the thrill of problem-solving
          and the satisfaction of creating something impactful. Thanks for
          visiting my site—let’s build something amazing together!
        </p>
        <div>
          <a href="">
            <img src=""></img>insta
          </a>
          <a href="">
            <img src=""></img>discord
          </a>
          <a href="">
            <img src=""></img>linkedin
          </a>
          <a href="">
            <img src=""></img>website
          </a>
          <a href="">
            <img src=""></img>twitter
          </a>
          <a href="">
            <img src=""></img>github
          </a>
        </div>
      </div>
      <div className={classes.cp}>
        <p>Copyright@{year}</p>
      </div>
    </div>
  );
}
