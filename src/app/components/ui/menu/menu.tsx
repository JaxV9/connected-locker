'use client';

import { LockerType } from "@/app/model/locker";
import { useEffect, useState } from "react";

type MenuPropsType = {
  currentLockerProps: LockerType | null,
  menuIsActiveProps: boolean,
  handleCloseMenuProps: () => void,
  refreshLockerList: () => void,
  currentUserIdProps: string | undefined
}

export const Menu = ({ currentUserIdProps, refreshLockerList, currentLockerProps, menuIsActiveProps, handleCloseMenuProps }: MenuPropsType) => {

  const [reservationIsPending, setReservationIsPending] = useState<boolean>(false)
  const [countDown, setCountDown] = useState<number>(10)
  const [reservationCompleted, setReservationCompleted] = useState<boolean | null>(null)

  const newReservation = async (user: string | undefined | null) => {
    const body = {
      "status": false,
      "user_id": user
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
    } catch {
      console.log("error")
    }
  }

  const fetchLocker = async () => {
    try {
      const response = await fetch(`https://directus-ucmn.onrender.com/items/locker/${currentLockerProps?.id}`)
      const data = await response.json()

      if (data !== undefined && data.data.status === false) {
        newReservation(null)
        setReservationCompleted(false)
      }
      if (data !== undefined && data.data.status === true) {
        setReservationCompleted(true)
      }

    } catch {
      console.log("error")
    }
  }


  useEffect(() => {
    if (countDown > 0 && reservationIsPending === true) {
      const timer = setInterval(() => {
        setCountDown((prevCompte) => prevCompte - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setReservationIsPending(false)
    }
  }, [reservationIsPending, countDown, currentUserIdProps]);

  useEffect(() => {
    if (reservationCompleted === true || reservationCompleted === false) {
      setReservationCompleted(null)
    }
  }, [currentLockerProps]);

  const handleAfterCountDown = async () => {
    setCountDown(10)
    refreshLockerList()
    fetchLocker()
  }

  useEffect(() => {
    if (countDown === 0) {
      handleAfterCountDown()
    }
  }, [countDown])

  useEffect(() => {
    if (reservationIsPending === true) {
      newReservation(currentUserIdProps)
    }
  }, [reservationIsPending])

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
            !currentLockerProps?.status && !reservationIsPending?
              <button className="reserve-btn" onClick={() => setReservationIsPending(true)}>Take it</button>
              : null
          }
          {
            reservationIsPending ?
              <p>You have {countDown}s to open your locker, with the physical button.</p>
              : null
          }
          {reservationCompleted ?
            <p>The locker is reserved !</p>
            : null}
          {reservationCompleted === false ?
            <p>You don&apos;t have push the button...</p>
            : null}
        </div>
      </div>
    </>
  )
}
