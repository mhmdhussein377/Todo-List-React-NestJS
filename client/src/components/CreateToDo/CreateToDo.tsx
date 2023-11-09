import "./index.css"

import {FC} from 'react'
import Input from '../UI/Input/Input'
import SubmitButton from '../UI/SubmitButton/SubmitButton'

const CreateToDo : FC = () => {
    return (
        <div className='create-todo'>
            <form>
                <div className="inputs">
                    <Input
                        type='text'
                        label='Description'
                        name='description'
                        placeholder='Enter a description'/>
                    <div className="w-50">
                        <Input
                            type='text'
                            label='Date'
                            name='date'
                            placeholder='Enter a date'/>
                        <Input
                            type='text'
                            label='Priority'
                            name='priority'
                            placeholder='Low'/>
                    </div>
                </div>
                <SubmitButton content='Create'/>
            </form>
        </div>
    )
}

export default CreateToDo