'use client';

import { LockerType } from "@/app/model/locker";
import {  useEffect, useState } from "react";

type CardPropsType = {
    id: number,
    lockerProps: LockerType,
    updateCurrentLockerProps: (id: number | null, isMenuActive: boolean) => void,
    currentLockerProps: number | null
};


export const Card = ({ id, lockerProps, updateCurrentLockerProps, currentLockerProps }: CardPropsType) => {

    const [clicked, setClicked] = useState<boolean>(false);
    const [currentBackground, setCurrentBackground] = useState<string>("")


    const toggle = () => {
        if(currentLockerProps !== id) {
            updateCurrentLockerProps(id, true)
        }
        if(currentLockerProps === id){
            updateCurrentLockerProps(null, false)
        }
    }

    useEffect(() => {
        if(lockerProps.status === false) {
            setCurrentBackground('#EE7E00')
        }
        if(lockerProps.status === true) {
            setCurrentBackground('#BC1D1C')
        }
        if(lockerProps.status === true && lockerProps.user_id === localStorage.getItem('user_id')) {
            setCurrentBackground('#1A962A')
        }
    },[lockerProps])

    useEffect(() => {
        if(currentLockerProps === id) {
            setClicked(true)
        } else {
            setClicked(false)
        }
    },[currentLockerProps, id])

    return (
        <>
            <div className={clicked && lockerProps.status === true ? "card-clicked" : "card"}>
                <div className={clicked && lockerProps.status === false ? "card-container-clicked" : "card-container"} onClick={toggle}
                style={{ backgroundColor: currentBackground}}>
                    <div className="card-content">
                        {id}
                    </div>
                    <div className="handle-locker"></div>
                </div>
            </div>
        </>
    )
}
