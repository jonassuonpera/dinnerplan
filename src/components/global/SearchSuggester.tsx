import React, { useState } from 'react'
import Input from './Input'
import { Button } from './Button';

interface Props {
    placeholder:string,
    items:Array<string>,
    handleSelection:any
}

const SearchSuggester = (props: Props) => {

    const [searchText, setSearchText] = useState<string>('');

    const handleSelection = (text:string) => {
        setSearchText('');
    }

    return (
        <div>
            <Input 
                placeholder={props.placeholder} 
                type="text" 
                value={searchText} 
                onChange={(value:string) => setSearchText(value)} 
            />
            {
                props.items.map((item:any, index:number) => {
                    return (
                        <Button key={index} handleClick={() => handleSelection(item)} text={item} />
                    )
                })
            }          
        </div>
    )
}

export default SearchSuggester;
