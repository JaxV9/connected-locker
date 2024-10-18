"use client";

import { useEffect, useState } from "react";
import { Card } from "./components/ui/card/card";
import { CardList } from "./components/ui/cardList/cardList";
import { LockerType } from "./model/locker";
import { Menu } from "./components/ui/menu/menu";
import { UserType } from "./model/user";


export default function Home() {

  const [currentLocker, setCurrentLocker] = useState<number | null>(null)
  const [currentUser, setCurrentUser] = useState<UserType>()
  const [menuIsActive, setMenuIsActive] = useState<boolean>(false)
  const [lockerList, setLockerList] = useState<LockerType[]>([])
  const [currentToken, setCurrentToken] = useState<string | null>(localStorage.getItem('access_token'))

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNiZTk4OTE2LWM3YTctNGFlNi04ZTZiLTBlMWMzYTE1MDA1MyIsInJvbGUiOiI0MjkyNTBiNi1iZDliLTQwMjAtYTA2My0wMzMzZDZkYjdhY2IiLCJhcHBfYWNjZXNzIjp0cnVlLCJhZG1pbl9hY2Nlc3MiOmZhbHNlLCJpYXQiOjE3MjkyNTEwNDUsImV4cCI6MTcyOTc2OTQ0NSwiaXNzIjoiZGlyZWN0dXMifQ.klt6Kkn-6qck-gBCgeo2BklApzpGdeeJPYMWKOA5UNY";

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
    const headers = { 'Authorization': 'Bearer ' + token };
    try {
      const response = await fetch(`https://directus-ucmn.onrender.com/users/me`, { headers })
      const data = await response.json()

      if (data !== undefined) {
        setCurrentUser(data.data)
        localStorage.setItem('user_id', data.data.id)
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
    } catch {
      console.log("error")
    }
  }

  const updateCurrentLocker = (id: number | null, isMenuActive: boolean) => {
    setCurrentLocker(id)
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


  return (
    <>
      <Menu currentLockerProps={currentLocker} menuIsActiveProps={menuIsActive} handleCloseMenuProps={handleCloseMenu} />
      <CardList >
        {lockerList.length > 0 ?
          lockerList.map((locker) => (
            <Card key={locker.id} updateCurrentLockerProps={updateCurrentLocker} currentLockerProps={currentLocker}
              id={locker.id} lockerProps={locker}/>
          ))
          : null}
      </CardList>
    </>
  );
}
