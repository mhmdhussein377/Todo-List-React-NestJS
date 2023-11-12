import "./index.css"

import {FC, useRef, useState} from 'react'
import Input from '../UI/Input/Input'
import DatePicker from "react-datepicker";
import SelectSearch from "react-select-search"

import "react-datepicker/dist/react-datepicker.css";
import 'react-select-search/style.css'
import {postRequest} from "../../utils/requests";
import Button from "../UI/Button/Button";
import { priorityOptions } from "../../utils/constants";
import { handleCloseModal } from "../../utils/closeModal";

interface propsType {
    setIsCreateTodoModalOpened : React.Dispatch < React.SetStateAction < boolean >>;
    setShouldFetchTodos: (value: boolean) => void;
}

export type InputsType = {
    description: string,
    date: Date,
    priority: string
}

const CreateTodo : FC < propsType > = ({setIsCreateTodoModalOpened, setShouldFetchTodos}) => {

    const [inputs,
        setInputs] = useState<InputsType>({description: "", date: new Date(), priority: "LOW"})
    const [error, setError] = useState<boolean>(false)
    const formRef = useRef < HTMLFormElement > (null)

    const handleChange = (name : string, value : string | Date) => {
        setInputs(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const closeModal = (event : React.MouseEvent < HTMLDivElement >) => {
        handleCloseModal(event, formRef, setIsCreateTodoModalOpened)
    }

    const handlePriorityChange = (newValue : string) => handleChange("priority", newValue)

    const handleDateChange = (date: Date) => handleChange("date", date)

    const handleCreateTodo = async(e : React.FormEvent) => {
        e.preventDefault()

        if(!inputs.description) {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 3000)
            return
        }

        try {

            const response = await postRequest("/todos/create", {
                ...inputs,
                date: inputs.date.toISOString(),
                completed: false
            })

            response && setShouldFetchTodos(true)
            response && setIsCreateTodoModalOpened(false)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='create-todo' onClick={closeModal}>
            <form ref={formRef} onSubmit={handleCreateTodo}>
                <div className="inputs">
                    <Input
                        type='text'
                        label='Description'
                        name='description'
                        onChange={e => handleChange("description", e.target.value)}
                        value={inputs["description"] || ""}
                        placeholder='Enter a description'/>
                    {error && <p className="error">Description is required</p>}
                    <div className="w-50">
                        <div className="input-container date">
                            <label htmlFor="date">Date</label>
                            <DatePicker selected={inputs.date} onChange={handleDateChange}/>
                        </div>
                        <div className="input-container priority">
                            <label htmlFor="priority">Priority</label>
                            <SelectSearch
                                onChange={handlePriorityChange}
                                options={priorityOptions}
                                value={inputs.priority}/>
                        </div>
                    </div>
                </div>
                <Button content='Create'/>
            </form>
        </div>
    )
}

export default CreateTodo