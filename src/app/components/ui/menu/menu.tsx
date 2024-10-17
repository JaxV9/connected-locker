'use client';

type MenuPropsType = {
    menuIsActiveProps: boolean,
    handleCloseMenuProps: () => void
}

export const Menu = ({menuIsActiveProps, handleCloseMenuProps}: MenuPropsType) => {


    return (
        <>
        <div className={menuIsActiveProps ? "menu-enabled" : "menu-disabled"}>
            <div className="cross" onClick={handleCloseMenuProps}></div>
        </div>
        </>
    )
}
