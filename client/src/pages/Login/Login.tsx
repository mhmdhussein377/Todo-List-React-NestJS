import {FC, useState} from "react";
import Input from "../../components/UI/Input/Input";
import "./index.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Button from "../../components/UI/Button/Button";
import { useAuth } from "../../Context/AuthContext";

const inputFields = [
    {
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

const Login : FC = () => {

    const [inputs, setInputs] = useState({email: "", password: ""})
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

        try {
            const response = await axios.post("/auth/login", inputs)

            if(response) {
                login(response.data.user)
            }

            response && localStorage.setItem("authToken", response.data.token)
            response && navigate("/")
        } catch (error) {
            console.error("Login failed:", error)
        }
    }

    return (
        <div className="login-screen">
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                    {inputFields.map(({name, label, type, placeholder}) => (<Input
                        key={name}
                        label={label}
                        type={type}
                        value={inputs[name] || ""}
                        placeholder={placeholder}
                        name={name}
                        required={true}
                        onChange={e => handleInputChange(name, e.target.value)}/>))}
                </div>
                <Button content="Login"/>
            </form>
        </div>
    );
};

export default Login;
