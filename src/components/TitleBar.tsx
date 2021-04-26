// Assets
import XWhite from "../assets/x-white.png";
import RestoreWindow from "../assets/restore-window-1.png";

// Modules
import PropTypes, { InferProps } from "prop-types";

const TitleBar = () => {
    let iconStyle = {height: "20px", widht: "auto"};

    return (
    <div className="title-bar flex items-start justify-end flex-row">
        <div className="title-bar-icons-wrapper flex flex-row" style={{marginTop: "5px"}}>
            <Icon icon={<img src={RestoreWindow} alt="Restore" style={iconStyle} />}/>
            <Icon icon={<img src={XWhite} alt="Restore" style={iconStyle} />}/>
        </div>
    </div>
    );
}

function Icon({ icon }: InferProps<typeof Icon.propTypes>) {
    return (
        <div className="title-bar-icon flex justify-center items-center mx-2">
            {icon}
        </div>
    );
}
Icon.propTypes = {
    icon: PropTypes.element.isRequired
}

export default TitleBar;