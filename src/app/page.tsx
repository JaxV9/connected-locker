"use client";

import { useState } from "react";
import { Card } from "./components/ui/card/card";
import { CardList } from "./components/ui/cardList/cardList";
import { LockerType } from "./model/locker";
import { Menu } from "./components/ui/menu/menu";


export default function Home() {

  const [currentLocker, setCurrentLocker] = useState<number | null>(null)
  const [menuIsActive, setMenuIsActive] = useState<boolean>(false)

  const lockerList: LockerType[] = [
    {
      id: 1,
      user: 1,
      state: "assigned"
    },
    {
      id: 2,
      user: null,
      state: "available"
    },
    {
      id: 3,
      user: 1,
      state: "assigned"
    },
    {
      id: 4,
      user: null,
      state: "available"
    },
    {
      id: 5,
      user: 1,
      state: "assigned"
    },
    {
      id: 6,
      user: null,
      state: "available"
    },
    {
      id: 7,
      user: 1,
      state: "yours"
    },
    {
      id: 8,
      user: null,
      state: "available"
    }
  ]

  const updateCurrentLocker = (id: number | null, isMenuActive: boolean) => {
    setCurrentLocker(id)
    setMenuIsActive(isMenuActive)
  }

  const handleCloseMenu = () => {
    setMenuIsActive(!menuIsActive)
    setCurrentLocker(null)
  }

  return (
    <>
      <Menu menuIsActiveProps={menuIsActive} handleCloseMenuProps={handleCloseMenu}/>
      <CardList >
        {lockerList.length > 0 ?
          lockerList.map((locker) => (
            <Card key={locker.id} updateCurrentLockerProps={updateCurrentLocker} currentLockerProps={currentLocker}
              id={locker.id} user={locker.user} state={locker.state} />
          ))
          : null}
      </CardList>
    </>
  );
}
