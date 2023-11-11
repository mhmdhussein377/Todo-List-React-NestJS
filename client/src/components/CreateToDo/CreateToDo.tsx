import "./index.css"

import {FC, useRef, useState} from 'react'
import Input from '../UI/Input/Input'
import DatePicker from "react-datepicker";
import SelectSearch from "react-select-search"

import "react-datepicker/dist/react-datepicker.css";
import 'react-select-search/style.css'
import {postRequest} from "../../utils/requests";
import Button from "../UI/Button/Button";

interface propsType {
    setIsCreateTodoModalOpened : React.Dispatch < React.SetStateAction < boolean >>;
}

export type InputsType = {
    name: string,
    email: string,
    password: string
}

const options = [
    {
        name: 'Low',
        value: 'LOW'
    }, {
        name: 'Medium',
        value: 'MEDIUM'
    }, {
        name: "High",
        value: "HIGH"
    }
];

const CreateToDo : FC < propsType > = ({setIsCreateTodoModalOpened}) => {

    const [inputs,
        setInputs] = useState({description: "", date: new Date(), priority: "LOW"})
    const [error, setError] = useState(false)
    const formRef = useRef < HTMLFormElement > (null)

    const handleChange = (name : string, value : string) => {
        setInputs(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const closeModal = (event : React.MouseEvent < HTMLDivElement >) => {
        if (!formRef.current?.contains(event.target as HTMLDivElement)) 
            setIsCreateTodoModalOpened(false)
    }

    const handlePriorityChange = (newValue : string) : void => {
        setInputs(prev => ({
            ...prev,
            priority: newValue
        }))
    }

    const handleDateChange = (newDate) : void => {
        setInputs(prev => ({
            ...prev,
            date: newDate
        }))
    }

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
                            <DatePicker selected={inputs.date} onChange={(date) => handleDateChange(date)}/>
                        </div>
                        <div className="input-container priority">
                            <label htmlFor="priority">Priority</label>
                            <SelectSearch
                                onChange={(newValue : string) => handlePriorityChange(newValue)}
                                options={options}
                                value={inputs.priority}
                                placeholder="Low"/>
                        </div>
                    </div>
                </div>
                <Button content='Create'/>
            </form>
        </div>
    )
}

export default CreateToDo