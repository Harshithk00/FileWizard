import classes from "@/Styles/Footer.module.css";
import Image from "next/image";

export default async function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <div className={classes.all}>
      <div>
        <h2>Hello</h2>
        <p className={classes.pcontent}>
          Hi, I&apos;m Harshit! I&apos;m a passionate full-stack developer with a love for
          bringing ideas to life on the web. My expertise includes React,
          Next.js, Node.js, and C++, and I&apos;m constantly expanding my skills to
          take on new challenges. Whether I&apos;m building a quiz app, developing
          innovative projects like an AI-powered blood donation platform, or
          diving into hackathons, I&apos;m driven by the thrill of problem-solving
          and the satisfaction of creating something impactful. Thanks for
          visiting my site—let&apos;s build something amazing together!
        </p>
        <div>
          <a href="">
            <Image src="" alt=""></Image>insta
          </a>
          <a href="">
            <Image src="" alt=""></Image>discord
          </a>
          <a href="">
            <Image src="" alt=""></Image>linkedin
          </a>
          <a href="">
            <Image src="" alt=""></Image>website
          </a>
          <a href="">
            <Image src="" alt=""></Image>twitter
          </a>
          <a href="">
            <Image src="" alt=""></Image>github
          </a>
        </div>
      </div>
      <div className={classes.cp}>
        <p>Copyright@{year}</p>
      </div>
    </div>
  );
}
