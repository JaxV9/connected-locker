"use client";

import { useEffect, useState } from "react";
import { Card } from "./components/ui/card/card";
import { CardList } from "./components/ui/cardList/cardList";
import { LockerType } from "./model/locker";
import { Menu } from "./components/ui/menu/menu";


export default function Home() {

  const [currentLocker, setCurrentLocker] = useState<LockerType | null>(null)
  const [currentUserId, setCurrentUserId] = useState<string>()
  const [menuIsActive, setMenuIsActive] = useState<boolean>(false)
  const [lockerList, setLockerList] = useState<LockerType[]>([])
  const [currentToken, setCurrentToken] = useState<string | null>(null)

  const fetchLockerList = async () => {
    try {
      const response = await fetch(`https://directus-ucmn.onrender.com/items/locker`)
      const data = await response.json()

      if (data !== undefined) {
        setLockerList(data.data)
      }

    } catch {
      console.log("error")
    }
  }

  const fetchCurrentUser = async () => {
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') };
    try {
      const response = await fetch(`https://directus-ucmn.onrender.com/users/me`, { headers })
      const data = await response.json()

      if (data !== undefined) {
        setCurrentUserId(data.data.id)
      }
    } catch {
      console.log("error")
    }
  }

  const loginUser = async () => {
    const body = {
      "email": "test@example.com",
      "password": "d1r3ctu5"
    }
    try {
      const response = await fetch(`https://directus-ucmn.onrender.com/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      const data = await response.json()
      localStorage.setItem('access_token', data.data.access_token)
      setCurrentToken(data.data.access_token)
    } catch {
      console.log("error")
    }
  }

  const updateCurrentLocker = (locker: LockerType | null, isMenuActive: boolean) => {
    setCurrentLocker(locker)
    setMenuIsActive(isMenuActive)
  }

  const handleCloseMenu = () => {
    setMenuIsActive(!menuIsActive)
    setCurrentLocker(null)
  }

  useEffect(() => {
    if (currentToken === null) {
      loginUser()
    }
    if (currentToken !== null || currentToken !== "") {
      fetchCurrentUser()
      fetchLockerList()
    }
  }, [currentToken])

  useEffect(() => {
    if (currentUserId !== undefined) {
      localStorage.setItem('user_id', currentUserId?.toString())
    }
  }, [currentUserId])

  return (
    <>
      <Menu currentUserIdProps={currentUserId} refreshLockerList={fetchLockerList} currentLockerProps={currentLocker} menuIsActiveProps={menuIsActive} handleCloseMenuProps={handleCloseMenu} />
      <CardList >
        {lockerList.length > 0 ?
          lockerList.map((locker) => (
            <Card key={locker.id} updateCurrentLockerProps={updateCurrentLocker} currentLockerProps={currentLocker}
              lockerProps={locker} />
          ))
          : null}
      </CardList>
    </>
  );
}
