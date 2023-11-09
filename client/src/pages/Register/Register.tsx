import SubmitButton from "../../components/UI/SubmitButton/SubmitButton";
import Input from "../../components/UI/Input/Input";
import "./index.css";

const Register = () => {
  return (
    <div className="register-screen">
      <form>
        <div className="inputs">
          <Input
            label="Name"
            type="text"
            placeholder="Enter your name"
            name="name"
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            name="email"
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            name="password"
          />
        </div>
        <SubmitButton content="Register" />
      </form>
    </div>
  );
};

export default Register;
