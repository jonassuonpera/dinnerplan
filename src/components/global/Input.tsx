import React, { ReactElement } from 'react'

interface Props {
    placeholder:string,
    type:string,
    value:string,
    onChange:any,
    onKeyUp?:any
}

function Input(props: Props): ReactElement {
    return (
        <>
            <input 
                className="input"
                placeholder={props.placeholder} 
                type={props.type}
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
                onKeyUp={e => props.onKeyUp ? props.onKeyUp(e) : null}
            />
        </>
    )
}

export default Input;