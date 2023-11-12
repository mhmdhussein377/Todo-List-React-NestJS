import {GiBackwardTime} from 'react-icons/gi';
import {AiOutlinePlus} from 'react-icons/ai';

export const getCircularButtons = (toggleCompletedFn, openCreateTodoModalFn) => [
    {
        id: 1,
        icon: <GiBackwardTime size={25} color="white"/>,
        handleClick: toggleCompletedFn
    }, {
        id: 2,
        icon: <AiOutlinePlus size={25} color="white"/>,
        handleClick: openCreateTodoModalFn
    }
];

export const loginInputFields = [
    {
        label: "Email",
        type: "email",
        placeholder: "Enter your email",
        name: "email"
    }, {
        label: "Password",
        type: "password",
        placeholder: "Enter your password",
        name: "password"
    }
];

export const registerInputFields = [
    {
        label: "Name",
        type: "text",
        placeholder: "Enter your name",
        name: "name"
    }, {
        label: "Email",
        type: "email",
        placeholder: "Enter your email",
        name: "email"
    }, {
        label: "Password",
        type: "password",
        placeholder: "Enter your password",
        name: "password"
    }
];

export const priorityOptions = [
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