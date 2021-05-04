// Modules
import PropTypes, { InferProps } from "prop-types";

// Window Control SVG paths
const closePath = 'M 0,0 0,0.7 4.3,5 0,9.3 0,10 0.7,10 5,5.7 9.3,10 10,10 10,9.3 5.7,5 10,0.7 10,0 9.3,0 5,4.3 0.7,0 Z';
const restorePath = 'm 2,1e-5 0,2 -2,0 0,8 8,0 0,-2 2,0 0,-8 z m 1,1 6,0 0,6 -1,0 0,-5 -5,0 z m -2,2 6,0 0,6 -6,0 z';
const maximizePath = 'M 0,0 0,10 10,10 10,0 Z M 1,1 9,1 9,9 1,9 Z';
const minimizePath = 'M 0,5 10,5 10,6 0,6 Z';

const TitleBar = () => {
    return (
    <div className="title-bar flex items-start justify-end flex-row">
        <div className="title-bar-icons-wrapper flex flex-row" style={{marginTop: "5px"}}>
            <Icon svgPath={minimizePath}/>
            <Icon svgPath={maximizePath}/>
            <Icon svgPath={closePath}/>
        </div>
    </div>
    );
}

function Icon({ svgPath }: InferProps<typeof Icon.propTypes>) {
    return (
        <div className="title-bar-icon flex justify-center items-center mx-2" style={{width: "25px"}}>
            <svg version="1.1" width="10" height="10" fill="currentColor">
                <path d={svgPath} />
            </svg>
        </div>
    );
}
Icon.propTypes = {
    svgPath: PropTypes.string.isRequired
}

export default TitleBar;