import React, { useState } from 'react'
import Input from './Input'
import { Button } from './Button';

interface Props {
    placeholder:string,
    items:Array<string>,
    handleSuggestionSelection:any,
    updateInputToParent:any,
    handleAddInput:any
}

const SearchSuggester = (props: Props) => {

    const [searchText, setSearchText] = useState<string>('');

    const handleSelection = (text:string) => {
        setSearchText('');        
        props.handleSuggestionSelection(text);
        props.updateInputToParent('');
    }

    const updateInputToParent = (text:string) => {
        setSearchText(text);
        props.updateInputToParent(text);
    }

    return (
        <div>
            <Input 
                placeholder={props.placeholder} 
                type="text" 
                value={searchText} 
                onChange={(value:string) => updateInputToParent(value)} 
                onKeyUp={(e:any) => {
                    if (e.keyCode === 13) {
                        props.handleAddInput(searchText)
                    }
                }}
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
