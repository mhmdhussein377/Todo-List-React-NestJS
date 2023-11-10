import {ChangeEvent, FC} from "react"
import "./index.css"

interface InputProps {
    label : string;
    type : string;
    placeholder : string;
    name : string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input : FC<InputProps> = ({label, type, placeholder, name, onChange}) => {

    return (
        <div className="input-container">
            <label htmlFor={name}>{label}</label>
            <input id={name} onChange={onChange} type={type} placeholder={placeholder} name={name}/>
        </div>
    )
}

export default Input