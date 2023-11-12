import { FC } from "react"
import "./index.css"

interface ButtonProps {
    content: string,
    handleClick?: () => void;
}

const Button: FC<ButtonProps> = ({content, handleClick}) => {
    return (
        <button onClick={handleClick} className="submit-button" type="submit">{content}</button>
    )
}

export default Button