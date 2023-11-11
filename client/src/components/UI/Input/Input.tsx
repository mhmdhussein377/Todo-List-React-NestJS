import {ChangeEvent, FC} from "react"
import "./index.css"

interface InputProps {
    label : string;
    type : string;
    value: string;
    placeholder : string;
    name : string;
    required?: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input : FC<InputProps> = ({label, type, value, placeholder, name, required, onChange}) => {

    return (
        <div className="input-container">
            <label htmlFor={name}>{label}</label>
            <input id={name} required={required} onChange={onChange} value={value} type={type} placeholder={placeholder} name={name}/>
        </div>
    )
}

export default Input