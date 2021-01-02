import React, { ReactElement } from 'react'

interface Props {
    placeholder:string,
    type:string,
    value:string,
    onChange:any
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
            />
        </>
    )
}

export default Input;