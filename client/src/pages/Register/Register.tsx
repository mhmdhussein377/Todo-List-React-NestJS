import SubmitButton from "../../components/UI/SubmitButton/SubmitButton";
import Input from "../../components/UI/Input/Input";
import "./index.css";
import {FC, useState} from "react";
import { postRequest } from "../../utils/requests";
import { useNavigate } from "react-router-dom";

const inputFields = [
    {
        label: "Name",
        type: "text",
        placeholder: "Enter your name",
        name: "name"
    }, {
        label: "Email",
        type: "email",
        placeholder: "Enter your email",
        name: "email"
    }, {
        label: "Password",
        type: "password",
        placeholder: "Enter your password",
        name: "password"
    }
];

export type InputsType = {name: string, email: string, password: string}

const Register : FC = () => {

    const [inputs, setInputs] = useState<InputsType>({name: "", email: "", password: ""})
    const navigate = useNavigate()

    const handleInputChange = (name: string, value: string) => {
      setInputs(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = async (event : React.FormEvent) => {
      event.preventDefault()

      const handleErros = (errors) => console.log(errors)

      try {
        const response = await postRequest("/auth/register", inputs, handleErros)
        response && navigate("/login")
      } catch (error) {
        console.log(error)
      }
    }

    return (
        <div className="register-screen">
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                    {inputFields.map(({name, label, type, placeholder}) => (<Input
                        key={name}
                        label={label}
                        type={type}
                        value={inputs[name] || ""}
                        placeholder={placeholder}
                        name={name}
                        onChange={e => handleInputChange(name, e.target.value)}/>
                      ))}
                </div>
                <SubmitButton content="Register"/>
            </form>
        </div>
    );
};

export default Register;
