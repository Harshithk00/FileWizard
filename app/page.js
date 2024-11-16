import Image from "next/image";
import classes from "./page.module.css";
import "@/Styles/globals.css";
import Image1 from "@/Public/Images/background.jpg";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className={classes.heading}>Welcome to File Wizard🐦‍🔥</h1>
      <div className={classes.content}>
        <h3>
          Simplifying Your Digital Interactions At File Wizard, we
          believe in making communication and collaboration effortless. Our
          platform brings together file sharing, real-time chatting, and
          seamless media viewing, all in one user-friendly space. Whether you’re
          working on a project, catching up with friends, or sharing cherished
          memories, we’ve got you covered.
        </h3>
        {/* <h4>Key Features:</h4>
        <div className={classes.pContent}>
          <p>
            🔄 Effortless File Sharing Share documents, images, and videos
            quickly and securely. Upload your files with ease and distribute
            them via shareable links or direct connections. No more complicated
            processes—just fast and simple file sharing.
          </p>
          <p>
            💬 Real-Time Chat Connect with others instantly through our
            integrated chat feature. Whether it’s a one-on-one conversation or a
            group discussion, you can communicate freely and efficiently. Share
            files, images, and links directly within your chats for a smooth
            exchange of information.
          </p>
          <p>
            🎥 Seamless Media Viewing Experience your media like never before!
            Our platform supports a variety of formats, allowing you to view
            images, listen to audio, and watch videos without leaving the site.
            Create personalized galleries and playlists for easy access to your
            favorite content.
          </p>
          <p>
            🌟 User-Friendly Interface Designed with you in mind, our clean and
            intuitive layout ensures that navigating our platform is a breeze.
            Enjoy customizable profiles and a robust search feature to find what
            you need, when you need it.
          </p>
          <p>
            🔒 Secure and Private Your privacy is our priority. With
            state-of-the-art security measures and customizable privacy
            settings, you can share your files and communicate with confidence.
          </p>
          <p>
            🌍 Join Our Community Become part of a vibrant community where
            collaboration and connection thrive. Share tips, collaborate on
            projects, and enhance your online experience through user feedback
            and suggestions.
          </p>
        </div> */}
        <div className={classes.imgGrid}>
          <div className={classes.image1}>
            <Link href={"/"}>
              <Image src={Image1} width={500} alt=""></Image>
            </Link>
          </div>
          <div className={classes.image1}>
            <Link href={"/"}>
              <Image src={Image1} width={500} alt=""></Image>
            </Link>
          </div>
          <div className={classes.image1}>
            <Link href={"/"}>
              <Image src={Image1} width={500} alt=""></Image>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
