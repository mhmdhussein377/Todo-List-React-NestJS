import {FC} from "react"
import "./index.css"

interface InputProps {
    label : string;
    type : string;
    placeholder : string;
    name : string;
}

const Input : FC<InputProps> = ({label, type, placeholder, name}) => {
    return (
        <div className="input-container">
            <label htmlFor={name}>{label}</label>
            <input id={name} type={type} placeholder={placeholder} name={name}/>
        </div>
    )
}

export default Input