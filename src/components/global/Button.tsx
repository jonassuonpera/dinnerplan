import React from 'react'

interface Props {
    text?: string,
    image?: any,
    handleClick: any
}

export const Button = (props: Props) => {
    return (
        <button className="cursor-pointer bg-blue-300" onClick={() => { props.handleClick() }}>
            {props.text ? props.text : props.image}
        </button>
    )
}
