'use client';

import { LockerType } from "@/app/model/locker";
import { useState } from "react";

export const Card = ({ id }: LockerType) => {

    const [clicked, setClicked] = useState<boolean>(false);

    const toggle = () => {
        setClicked(!clicked)
        console.log(!clicked)
    }

    return (
        <>
            <div className={clicked ? "card-clicked" : "card"}>
                <div className={clicked ? "card-container-clicked" : "card-container"} onClick={toggle}>
                    <div className="card-content">
                        {id}
                    </div>
                    <div className="handle-locker"></div>
                </div>
            </div>
        </>
    )
}
