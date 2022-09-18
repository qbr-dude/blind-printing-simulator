
//В режиме разработки useEffect вызывается дважды, поэтому привязка происходит дважды
export const handleKeyPress = () => {
    document.body.addEventListener('keydown', (event) => {
        console.log(event);
    })
}