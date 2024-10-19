'use client';

import { LockerType } from "@/app/model/locker";
import {  useEffect, useState } from "react";

type CardPropsType = {
    lockerProps: LockerType,
    updateCurrentLockerProps: (locker: LockerType | null, isMenuActive: boolean) => void,
    currentLockerProps: LockerType | null
};


export const Card = ({ lockerProps, updateCurrentLockerProps, currentLockerProps }: CardPropsType) => {

    const [currentBackground, setCurrentBackground] = useState<string>("")


    const toggle = () => {
        if(currentLockerProps !== lockerProps) {
            updateCurrentLockerProps(lockerProps, true)
        }
        if(currentLockerProps === lockerProps){
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


    return (
        <>
            <div className={lockerProps === currentLockerProps ? "card-clicked" : "card"}>
                <div className={lockerProps === currentLockerProps ? "card-container-clicked" : "card-container"} onClick={toggle}
                style={{ backgroundColor: currentBackground}}>
                    <div className="card-content">
                        {lockerProps.id} 
                        {lockerProps.status === true &&
                        lockerProps.user_id !== localStorage.getItem('user_id')? ": reserved" : null}
                        {lockerProps.user_id === localStorage.getItem('user_id') ? ": yours" : null}
                    </div>
                    <div className="handle-locker"></div>
                </div>
            </div>
        </>
    )
}
