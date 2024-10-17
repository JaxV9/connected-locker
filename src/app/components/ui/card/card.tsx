'use client';

import {  useEffect, useState } from "react";

type CardPropsType = {
    id: number,
    user: number | null,
    state: boolean,
    updateCurrentLockerProps: (id: number | null, isMenuActive: boolean) => void,
    currentLockerProps: number | null
};


export const Card = ({ id, state, updateCurrentLockerProps, currentLockerProps }: CardPropsType) => {

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
        if(state === false) {
            setCurrentBackground('#EE7E00')
        }
        if(state === true) {
            setCurrentBackground('#BC1D1C')
        }
        // if(state === true && user_id ===) {
        //     setCurrentBackground('#1A962A')
        // }
    },[state])

    useEffect(() => {
        if(currentLockerProps === id) {
            setClicked(true)
        } else {
            setClicked(false)
        }
    },[currentLockerProps, id])

    return (
        <>
            <div className={clicked && state === true ? "card-clicked" : "card"}>
                <div className={clicked && state === false ? "card-container-clicked" : "card-container"} onClick={toggle}
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
