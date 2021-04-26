// Icons
import { ImArrowDown } from "react-icons/im";

// Modules
import PropTypes, { InferProps } from "prop-types";

// Models
import Product, { OwnershipStatus } from "../../models/Product";

const PRODUCT_PREVIEW_BANNER_HEIGHT = 300;
const PRODUCT_PREVIEW_BANNER_WIDTH = 200;

function ProductPreviewItem({ product }: InferProps<typeof ProductPreviewItem.propTypes>) {
    return (
        <div className="product-preview-item flex flex-col items-start">
            <ProductPreviewBanner bannerImgSrc={product.bannerImgSrc} productOwnershipStatus={product.ownershipStatus} productInstallationProgress={product.installationProgress} />
            <ProductInteractionSection productName={product.name} />
        </div>
    );
}
ProductPreviewItem.propTypes = {
    product: Product
}

function ProductPreviewBanner({ productOwnershipStatus, bannerImgSrc, productInstallationProgress }: InferProps<typeof ProductPreviewBanner.propTypes>) {
    let progressIndicatorWidth = 0;
    switch (productOwnershipStatus) {
        case OwnershipStatus.Installing:
            progressIndicatorWidth = (productInstallationProgress/100) * PRODUCT_PREVIEW_BANNER_WIDTH;
            break;
        case OwnershipStatus.Installed:
            progressIndicatorWidth = PRODUCT_PREVIEW_BANNER_WIDTH;
            break;
    }
    return (
        <div className="banner-wrapper" style={{ height: PRODUCT_PREVIEW_BANNER_HEIGHT+"px", width: PRODUCT_PREVIEW_BANNER_WIDTH+"px" }}>
            <div className="banner-hover-overly absolute z-20 rounded bg-white bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 ease-in-out" style={{ height: PRODUCT_PREVIEW_BANNER_HEIGHT+"px", width: PRODUCT_PREVIEW_BANNER_WIDTH+"px" }} />
            <div className="banner-progress-indicator absolute z-10 bg-left	bg-cover rounded" style={{ height: PRODUCT_PREVIEW_BANNER_HEIGHT+"px", width: progressIndicatorWidth+"px", backgroundImage: "url(" + bannerImgSrc + ")" }} />
            <div className="banner-bg absolute flex justify-center items-center" style={{ height: PRODUCT_PREVIEW_BANNER_HEIGHT+"px", width: PRODUCT_PREVIEW_BANNER_WIDTH+"px" }}>
                <img src={bannerImgSrc} alt="Banner" className="rounded filter grayscale" style={{ height: PRODUCT_PREVIEW_BANNER_HEIGHT+"px", width: PRODUCT_PREVIEW_BANNER_WIDTH+"px" }} />
            </div>
        </div>
    );
}
ProductPreviewBanner.propTypes = {
    productOwnershipStatus: OwnershipStatus,
    bannerImgSrc: PropTypes.string.isRequired,
    productInstallationProgress: PropTypes.number.isRequired,
}

function ProductInteractionSection({ productName }: InferProps<typeof ProductInteractionSection.propTypes>) {
    return (
        <div className="bottom-information flex flex-col items-start mt-1">
            <h1 className="text-base ml-1">{productName}</h1>
            <div className="app-status flex flex-row items-center" style={{ color: "#ABABAB" }}>
                <ImArrowDown style={{ height: "12px" }} />
                <p className="text-sm m-0 p-0" style={{ marginLeft: "2px", marginBottom: "1px" }}>15% installed</p>
            </div>
        </div>
    );
}
ProductInteractionSection.propTypes = {
    productName: PropTypes.string.isRequired
}

export default ProductPreviewItem;