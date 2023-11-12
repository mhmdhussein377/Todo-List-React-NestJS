export const handleCloseModal = (event, ref, setModalState): void => {
    if(!ref.current.contains(event.target))
        setModalState(false)
}