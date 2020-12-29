import React from 'react'

interface Props {
    text?: String,
    image?: any,
    handleClick: any
}

export const Button = (props: Props) => {
    return (
        <div onClick={() => { props.handleClick() }}>
            {props.text ? props.text : props.image}
        </div>
    )
}
