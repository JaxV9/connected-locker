'use client';

import { LockerType } from "@/app/model/locker";
import { useState } from "react";

type MenuPropsType = {
  currentLockerProps: LockerType | null,
  menuIsActiveProps: boolean,
  handleCloseMenuProps: () => void,
  refreshLockerList: () => void,
  currentUserIdProps: string | undefined
}

export const Menu = ({ currentUserIdProps, refreshLockerList, currentLockerProps, menuIsActiveProps, handleCloseMenuProps }: MenuPropsType) => {

  const [pending, setPending] = useState<boolean>(false)

  const editReservation = async (status: boolean, user_id: string | undefined | null) => {
    setPending(true)
    const body = {
      "status": status,
      "user_id": user_id
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
      setPending(false)
      handleCloseMenuProps()
    } catch {
      console.log("error")
    }
  }

  return (
    <>

      <div className={menuIsActiveProps ? "menu-enabled" : "menu-disabled"}>
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
              <h2 className="menu-title">{currentLockerProps?.id} : This locker is available</h2>
              : null
          }
          {
            !currentLockerProps?.status && !pending ?
              <button className="reserve-btn" onClick={() => editReservation(true, currentUserIdProps)}>Take it</button>
              : null
          }
          {
            currentLockerProps?.status && !pending ?
              <button className="reserve-btn" onClick={() => editReservation(false, null)}>Free the locker</button>
              : null
          }
          {pending ?
            <p className="pending">pending...</p>
            : null}
        </div>
      </div>
    </>
  )
}
