// Assets
import XWhite from "../assets/x-white.png";

const TitleBar = () => {

    return (
    <div className="title-bar flex items-start justify-end flex-row">
        <div className="icons-wrapper" style={{marginTop: "5px", marginRight: "9px"}}>
            <img src={XWhite} alt="X" style={{height:"20px", width: "auto"}} />
        </div>
    </div>
    );
}

export default TitleBar;