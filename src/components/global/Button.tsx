import React from 'react'

interface Props {
    text?: String,
    image?: any,
    handleClick: any
}

export const Button = (props: Props) => {
    return (
        <div className="cursor-pointer" onClick={() => { props.handleClick() }}>
            {props.text ? props.text : props.image}
        </div>
    )
}
