"use client"
import { usePathname } from "next/navigation";
// import {useState, useEffect} from "react";
import React from 'react';

export default function New({params}){
const path = usePathname();
const {slug} = React.use(params);
    return(
        <>
            <h1>{slug}</h1>
            {path}
        </>
    );
};