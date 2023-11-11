import "./index.css"

import {FC, useRef, useState} from 'react'
import Input from '../UI/Input/Input'
import SubmitButton from '../UI/SubmitButton/SubmitButton'
import DatePicker from "react-datepicker";
import SelectSearch from "react-select-search"

import "react-datepicker/dist/react-datepicker.css";
import 'react-select-search/style.css'

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
        value: 'sv'
    }, {
        name: 'Medium',
        value: 'en'
    }, {
        name: "High",
        value: "High"
    }
];

const CreateToDo : FC < propsType > = ({setIsCreateTodoModalOpened}) => {

    const [inputs,
        setInputs] = useState({description: "", date: "", priority: ""})
    const [startDate,
        setStartDate] = useState(new Date());
    const formRef = useRef < HTMLFormElement > (null)

    const handleChange = (name : string, value : string) => {
        setInputs(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const closeModal = (event : React.MouseEvent < HTMLDivElement >) => {
        if (!formRef.current
            ?.contains(event.target as HTMLDivElement)) 
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
                        onChange={e => handleChange("description", e.target.value)}
                        value={inputs["description"] || ""}
                        placeholder='Enter a description'/>
                    <div className="w-50">
                        <div className="input-container date">
                            <label htmlFor="date">Date</label>
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}/>
                        </div>
                        <div className="input-container priority">
                            <label htmlFor="priority">Priority</label>
                            <SelectSearch options={options} value="sv" placeholder="Low"/>
                        </div>
                        {/* <Input
                            type='text'
                            value={inputs["priority"] || ""}
                            onChange={e => handleChange("priority", e.target.value)}
                            label='Priority'
                            name='priority'
                            placeholder='Low'/> */}
                    </div>
                </div>
                <SubmitButton content='Create'/>
            </form>
        </div>
    )
}

export default CreateToDo