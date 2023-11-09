import Input from "../../components/Input/Input"

const Register = () => {

    return (
        <div className="register-screen">
            <form className="box">
                <div className="inputs">
                    <Input label="Name" type="text" placeholder="Enter your name" name="name"/>
                    <Input label="Email" type="email" placeholder="Enter your email" name="email"/>
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        name="password"/>
                </div>
                <button>Register</button>
            </form>
        </div>
    )
}

export default Register