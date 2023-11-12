import Input from "../../components/UI/Input/Input";
import "./index.css";
import {FC, useState} from "react";
import { postRequest } from "../../utils/requests";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import { showError } from "../../utils/showError";

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
    const [error, setError] = useState<{isError: boolean, name: string, message: string}>({isError: false, name: "", message: ""})
    const navigate = useNavigate()
    localStorage.removeItem("authToken")
    localStorage.removeItem("user")

    const handleInputChange = (name: string, value: string) => {
      setInputs(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = async (event : React.FormEvent) => {
      event.preventDefault()

      const {name, email, password} = inputs
      if(!name || !email || !password) {
        showError("Missing fields", "All fields are required", setError)
        return
      }

      if(password.length < 6 || password.length > 20) {
        showError("Password length", "Password must be 6-20 characters", setError)
        return
      }

      const handleError = () => {
        showError("Email exists", "Email already exists", setError)
      }

        const response = await postRequest("/auth/register", inputs, handleError)
        response && navigate("/login")
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
                      {error.isError && <p className="error">{error.message}</p>}
                      <div className="to-login">
                        Already have an account? <Link to="/login">Login</Link>
                      </div>
                </div>
                <Button content="Register"/>
            </form>
        </div>
    );
};

export default Register;
