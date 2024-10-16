'use client';

type LoadMoreBtnPropsType = {
    functionProps?: () => void,
    textProps: string
}

export const LoadMoreBtn = ({functionProps, textProps}: LoadMoreBtnPropsType) => {

    return(
        <>
            <button onClick={functionProps} className="some-btn">{textProps}</button>
        </>
    )
}
