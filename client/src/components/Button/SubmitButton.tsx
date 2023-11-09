import { FC } from "react"
import "./index.css"

interface SubmitButtonProps {
    content: string,
}

const SubmitButton: FC<SubmitButtonProps> = ({content}) => {
    return (
        <button className="submit-button" type="submit">{content}</button>
    )
}

export default SubmitButton