"use client";
import classes from "./styles.module.css";
import FileUpload from "@/components/Fileupload";
import Filedownload from "@/components/Filedownload";

export default function Files() {

  return (
    <>
      <FileUpload></FileUpload>
      <hr></hr>
      <Filedownload></Filedownload>
    </>
  );
}
