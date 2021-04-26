// Assets
import VTCMBanner from "../assets/vtcm-banner.png";

// Components
import ProductPreviewItem from "../components/products/ProductPreviewItem";

// Models
import Product, {OwnershipStatus} from "../models/Product";

const HomePage = () => {
    let dummyProduct = new Product("VTCManager", VTCMBanner.toString(), OwnershipStatus.Owned);
    dummyProduct.installationProgress = 10;

    return (
        <div className="home-page flex flex-col items-center">
            <div className="store-information-wrapper flex flex-col justify-center items-center max-w-screen-xl py-5 w-full mb-2.5">
                <h1 className="font-bold text-3xl text-center">Get ready for a new era.</h1>
                <p className="mt-2">The Horizon storefront is currently under heavy developent. The Horizon storefront is currently under heavy development. You can find the latest information about our development progress on our website and on our Discord server. </p>
            </div>
            <div className="vcc-products-wrapper flex flex-col justify-center items-start w-full max-w-screen-xl">
                <h2 className="text-lg font-semibold text-left w-full mb-2">Applications made by the VisualCableCollective</h2>
                <div className="apps-row-wrapper flex flex-row items-center">
                    <ProductPreviewItem product={dummyProduct}/>
                </div>
            </div>
        </div>
    )
}

export default HomePage;