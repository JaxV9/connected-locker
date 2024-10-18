'use client';

type MenuPropsType = {
    currentLockerProps: number | null,
    menuIsActiveProps: boolean,
    handleCloseMenuProps: () => void
}

export const Menu = ({currentLockerProps, menuIsActiveProps, handleCloseMenuProps}: MenuPropsType) => {


    return (
        <>
        <div className={menuIsActiveProps ? "menu-enabled" : "menu-disabled"}>
            <div className="cross" onClick={handleCloseMenuProps}></div>
            <h2>{currentLockerProps}</h2>
        </div>
        </>
    )
}
