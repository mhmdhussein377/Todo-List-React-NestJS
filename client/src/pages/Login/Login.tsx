import SubmitButton from "../../components/Button/SubmitButton"
import Input from "../../components/Input/Input"
import "./index.css"

const Login = () => {
    return (
        <div className="login-screen">
            <form>
                <div className="inputs">
                    <Input label="Email" type="email" placeholder="Enter your email" name="email"/>
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        name="password"/>
                </div>
                <SubmitButton content="Login"/>
            </form>
        </div>
    )
}

export default Login