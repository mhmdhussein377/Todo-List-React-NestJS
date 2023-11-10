export type InputsType = {
    [key : string]: string
}

export const handleInputChange = (name : string, value : string, prevInputs : InputsType): InputsType => ({
    ...prevInputs,
    [name]: value
});