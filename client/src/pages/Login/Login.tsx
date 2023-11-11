import {FC, useState} from "react";
import SubmitButton from "../../components/UI/SubmitButton/SubmitButton";
import Input from "../../components/UI/Input/Input";
import "./index.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";

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
                <SubmitButton content="Login"/>
            </form>
        </div>
    );
};

export default Login;
