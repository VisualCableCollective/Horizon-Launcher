// Assets
import Banner from "../assets/vtcm-banner.png";

// Icons
import {ImArrowDown} from "react-icons/im";

const HomePage = () => {
    return (
        <div className="home-page flex flex-col items-center">
            <div className="store-information-wrapper flex flex-col justify-center items-center max-w-screen-xl py-5 w-full mb-2.5">
                <h1 className="font-bold text-3xl text-center">Get ready for a new era.</h1>
                <p className="my-2">The Horizon storefront is currently under heavy developent. The Horizon storefront is currently under heavy development. You can find the latest information about our development progress on our website and on our Discord server. </p>
            </div>
            <div className="vcc-products-wrapper flex flex-col justify-center items-start w-full max-w-screen-xl">
                <h2 className="text-lg font-semibold text-left w-full">Applications made by the VisualCableCollective</h2>
                <div className="apps-row-wrapper flex flex-row items-center">
                    <div className="app-item flex flex-col items-start">
                        <div className="banner-wrapper" style={{ height: "300px", width: "200px" }}>
                            <div className="banner-progress-indicator absolute z-10 bg-left	bg-cover rounded" style={{ height: "300px", width: "30px", backgroundImage: "url(" + Banner + ")" }}>
                            </div>
                            <div className="banner-bg absolute flex justify-center items-center" style={{ height: "300px", width: "200px" }}>
                                <img src={Banner} alt="Banner" className="rounded filter grayscale" style={{ height: "300px", width: "200px" }}/>
                            </div>
                        </div>
                        <div className="bottom-information flex flex-col items-start mt-1">
                            <h1 className="text-base ml-1">VTCManager</h1>
                            <div className="app-status flex flex-row items-center" style={{color: "#ABABAB"}}>
                                <ImArrowDown style={{height: "12px"}} />
                                <p className="text-sm m-0 p-0" style={{marginLeft: "2px", marginBottom: "1px"}}>15% installed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;