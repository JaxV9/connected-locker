'use client';

import { ReactNode } from "react";

type CardListPropsType = {
    children: ReactNode
}


export const CardList = ({children}: CardListPropsType) => {

    return(
        <>
            <div className="card-list">
                {children}
            </div>
        </>
    )
}
