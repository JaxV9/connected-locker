'use client';

import { LockerType } from "@/app/model/locker";
// import { useEffect, useState } from "react";

type MenuPropsType = {
  currentLockerProps: LockerType | null,
  menuIsActiveProps: boolean,
  handleCloseMenuProps: () => void,
  refreshLockerList: () => void,
  currentUserIdProps: string | undefined
}

export const Menu = ({ currentUserIdProps, refreshLockerList, currentLockerProps, menuIsActiveProps, handleCloseMenuProps }: MenuPropsType) => {

  const newReservation = async () => {
    const body = {
      "status": true,
      "user_id": currentUserIdProps
    }
    try {
      await fetch(`https://directus-ucmn.onrender.com/items/locker/${currentLockerProps?.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        },
        body: JSON.stringify(body)
      })
      refreshLockerList()
    } catch {
      console.log("error")
    }
  }
  
  const test = () => {
    console.log(currentUserIdProps)
  }

  return (
    <>

      <div className={menuIsActiveProps ? "menu-enabled" : "menu-disabled"}>
      <button onClick={test}>test</button>
        <div className="cross" onClick={handleCloseMenuProps}></div>
        <div className="menu-content">
          {currentLockerProps?.status && currentLockerProps.user_id !== localStorage.getItem('user_id') ?
            <h2 className="menu-title">{currentLockerProps?.id} : This locker is taken</h2>
            :
            null
          }
          {
            currentLockerProps?.status && currentLockerProps.user_id === localStorage.getItem('user_id') ?
              <h2 className="menu-title">{currentLockerProps?.id} : This locker is yours</h2>
              : null
          }
          {
            !currentLockerProps?.status ?
              <div>
                <h2 className="menu-title">{currentLockerProps?.id} : This locker is available</h2>
                <button className="reserve-btn" onClick={newReservation}>Take it</button>
              </div>
              : null
          }
        </div>
      </div>
    </>
  )
}
