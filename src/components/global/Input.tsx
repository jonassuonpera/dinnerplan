import React, { ReactElement } from 'react'

interface Props {
    placeholder:string,
}

function Input(props: Props): ReactElement {
    return (
        <>
            <Input placeholder={props.placeholder} />
        </>
    )
}

export default Input;