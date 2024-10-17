'use client';

import {  useEffect, useState } from "react";

type CardPropsType = {
    id: number,
    user: number | null,
    state: string,
    updateCurrentLockerProps: (locker: number) => void,
    currentLockerProps: number | null
};


export const Card = ({ id, state, updateCurrentLockerProps, currentLockerProps }: CardPropsType) => {

    const [clicked, setClicked] = useState<boolean>(false);
    const [currentBackground, setCurrentBackground] = useState<string>("")

    const ableToClick = ["available", "yours"]

    const toggle = () => {
        updateCurrentLockerProps(id)
    }

    useEffect(() => {
        if(state === "available") {
            setCurrentBackground('#EE7E00')
        }
        if(state === "assigned") {
            setCurrentBackground('#BC1D1C')
        }
        if(state === "yours") {
            setCurrentBackground('#1A962A')
        }
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
            <div className={clicked && ableToClick.includes(state) ? "card-clicked" : "card"}>
                <div className={clicked && state === "available" ? "card-container-clicked" : "card-container"} onClick={toggle}
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
