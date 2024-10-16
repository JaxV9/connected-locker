import { Card } from "./components/ui/card/card";
import { CardList } from "./components/ui/cardList/cardList";
import { LockerType } from "./model/locker";


export default function Home() {

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
      state: "assigned"
    },
    {
      id: 8,
      user: null,
      state: "available"
    }
  ]
  return (
    <>
      <h1>Connected locker</h1>

      <CardList >
        {lockerList.length > 0 ?
          lockerList.map((locker) => (
            <Card key={locker.id} id={locker.id} user={locker.user} state={locker.state} />
          ))
          : null}
      </CardList>
    </>
  );
}
