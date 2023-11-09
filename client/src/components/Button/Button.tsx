import { FC } from "react"
import "./index.css"

interface ButtonProps {
    content: string,
}

const Button: FC<ButtonProps> = ({content}) => {
    return (
        <button type="submit">{content}</button>
    )
}

export default Button