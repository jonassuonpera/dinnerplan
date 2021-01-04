import React from 'react'

interface Props {
    text?: string,
    image?: any,
    handleClick: any,
    classes?:string
}

export const Button = (props: Props) => {
    return (
        <button className={props.classes ? props.classes :"cursor-pointer bg-green-500 rounded"} onClick={() => { props.handleClick() }}>
            {props.text ? props.text : props.image}
        </button>
    )
}
