import { useNavigate } from "react-router-dom";


const NavigateExample = () => {
    let navigate = useNavigate();
const handleClick = () => {
    console.log("clicked");
    navigate('/');
};

    return (
<>
        <h1>Navigate Example</h1>
        <button onClick={handleClick}>About</button>



</>
    );
};

export default NavigateExample;