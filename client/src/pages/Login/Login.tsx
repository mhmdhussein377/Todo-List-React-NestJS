import {FC, useState} from "react";
import Input from "../../components/UI/Input/Input";
import "./index.css";
import {Link, useNavigate} from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import {useAuth} from "../../Context/AuthContext";
import {showError} from "../../utils/showError";
import { postRequest } from "../../utils/requests";
import { loginInputFields } from "../../utils/constants";
import { ErrorType } from "../Register/Register";

type InputsType = { email: string, password: string} 

const Login : FC = () => {

    const [inputs, setInputs] = useState <InputsType> ({email: "", password: ""})
    const [error, setError] = useState<ErrorType>({isError: false, name: "", message: ""})
    const navigate = useNavigate()
    const {login} = useAuth()
    localStorage.removeItem("authToken")
    localStorage.removeItem("user")

    const handleInputChange = (name : string, value : string) => {
        setInputs(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async(event : React.FormEvent) => {
        event.preventDefault()

        const {email, password} = inputs

        if (!email || !password) {
            showError("Missing fields", "All fields are required", setError)
            return
        }

        const handleError = () => {
            showError("Wrong credentials", "Wrong credentials", setError)
        }

        const response = await postRequest("/auth/login", inputs, handleError)

        if (response) {
            const {user, token} = response
            login(user, token)
            navigate("/")
        }
    }

    console.log(error)

    return (
        <div className="login-screen">
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                    {loginInputFields.map(({name, label, type, placeholder}) => (<Input
                        key={name}
                        label={label}
                        type={type}
                        value={inputs[name] || ""}
                        placeholder={placeholder}
                        name={name}
                        onChange={e => handleInputChange(name, e.target.value)}/>))}
                    {error.isError && <p className="error">{error.message}</p>}
                    <div className="to-register">
                        Don't have an account?
                        <Link to="/register">Register</Link>
                    </div>
                </div>
                <Button content="Login"/>
            </form>
        </div>
    );
};

export default Login;
