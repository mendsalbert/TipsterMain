import React from 'react'
import { useMoralis } from "react-moralis";
import Avatar from "./Avatar";
import ChangeUsername from "./ChangeUsername";
import photo from '../photo.png';

function Header({ props, messag }) {
    const {user}=useMoralis();
    return (
        <div className="container-fluid bg-dark mt-3">
            <div className="row">
                { props.images
                    .filter(
                        (v, i, a) => a.findIndex((v2) => v2.author === v.messag.get("username")) === i
                    )
                    .map((image) => {
                    return(
                    <div>
                <div className="col">
                <img src={photo} width="100" height="100" className="d-inline-block align-top" alt="" />
                </div>
                <div className="col" align='center'>
                <div className="mt-5 border-4 rounded-circle">
                    <div><Avatar username={messag.get("username")} logoutOnPress/></div>
                </div>
                <h2 className="text-white font-bold">Welcome {image.author}</h2>
                </div>
                <div className="col mt-5" align='right'>
                <ChangeUsername/>
                </div>
                </div>
            );})}
            </div>
        </div>
    )
}

export default Header;