import {FC, useRef, useState} from 'react'
import Input from '../UI/Input/Input'
import DatePicker from "react-datepicker";
import SelectSearch from "react-select-search"

import "react-datepicker/dist/react-datepicker.css";
import 'react-select-search/style.css'
import {postRequest, updateRequest} from "../../utils/requests";
import Button from "../UI/Button/Button";

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

type Props = {
    setIsUpdateTodoModalOpened: (arg0: boolean) => void;
}

const UpdateTodoModal: FC<Props> = ({setIsUpdateTodoModalOpened, updatedTodo}) => {

    const [inputs, setInputs] = useState({description: updatedTodo.description, date: new Date(), priority: updatedTodo.priority})
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
            setIsUpdateTodoModalOpened(false)
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

            const response = await updateRequest(`/todos/${updatedTodo.id}/update`, {
                ...inputs,
                date: inputs.date.toISOString(),
            })

            response && setIsUpdateTodoModalOpened(false)

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
                <Button content='Update'/>
            </form>
        </div>
    )
}

export default UpdateTodoModal