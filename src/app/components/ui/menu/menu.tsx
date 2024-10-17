'use client';

import { Dispatch, SetStateAction } from "react";

type MenuPropsType = {
    menuIsActiveProps: boolean,
    setMenuIsActiveProps: Dispatch<SetStateAction<boolean>>
}

export const Menu = ({menuIsActiveProps, setMenuIsActiveProps}: MenuPropsType) => {


    return (
        <>
        <div className={menuIsActiveProps ? "menu-enabled" : "menu-disabled"} onClick={() => setMenuIsActiveProps(!menuIsActiveProps)}>

        </div>
        </>
    )
}
