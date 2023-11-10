import "./index.css"

import {FC, useRef} from 'react'
import Input from '../UI/Input/Input'
import SubmitButton from '../UI/SubmitButton/SubmitButton'

interface propsType {
    setIsCreateTodoModalOpened : React.Dispatch <React.SetStateAction <boolean>>;
}

const CreateToDo : FC<propsType> = ({setIsCreateTodoModalOpened}) => {

    const formRef = useRef < HTMLFormElement > (null)

    const closeModal = (event : React.MouseEvent <HTMLDivElement>) => {
        if (!formRef.current?.contains(event.target as HTMLDivElement)) 
            setIsCreateTodoModalOpened(false)
    }

    return (
        <div className='create-todo' onClick={closeModal}>
            <form ref={formRef}>
                <div className="inputs">
                    <Input
                        type='text'
                        label='Description'
                        name='description'
                        placeholder='Enter a description'/>
                    <div className="w-50">
                        <Input type='text' label='Date' name='date' placeholder='Enter a date'/>
                        <Input type='text' label='Priority' name='priority' placeholder='Low'/>
                    </div>
                </div>
                <SubmitButton content='Create'/>
            </form>
        </div>
    )
}

export default CreateToDo