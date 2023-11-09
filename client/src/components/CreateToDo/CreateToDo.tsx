import {FC} from 'react'
import Input from '../UI/Input/Input'
import SubmitButton from '../UI/SubmitButton/SubmitButton'

const CreateToDo : FC = () => {
    return (
        <div className='create-todo'>
            <form>
                <Input
                    type='text'
                    label='Description'
                    name='description'
                    placeholder='Enter a description'/>
                <div>
                    <Input
                        type='text'
                        label='Description'
                        name='description'
                        placeholder='Enter a description'/>
                    <Input
                        type='text'
                        label='Description'
                        name='description'
                        placeholder='Enter a description'/>
                </div>
                <SubmitButton content='Create' />
            </form>
        </div>
    )
}

export default CreateToDo