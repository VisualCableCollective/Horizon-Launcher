const PRODUCT_PREVIEW_BANNER_HEIGHT = 300;
const PRODUCT_PREVIEW_BANNER_WIDTH = 200;

function ProductPlaceholderPreviewItem() {
    return (
        <div className="product-preview-item flex flex-col items-start animate-pulse">
            <div className="product-preview-banner-wrapper" style={{ height: PRODUCT_PREVIEW_BANNER_HEIGHT + "px", width: PRODUCT_PREVIEW_BANNER_WIDTH + "px" }}>
                <div className="banner-bg absolute flex justify-center items-center" style={{ height: PRODUCT_PREVIEW_BANNER_HEIGHT + "px", width: PRODUCT_PREVIEW_BANNER_WIDTH + "px" }}>
                    <div className="rounded bg-gray-800" style={{ height: PRODUCT_PREVIEW_BANNER_HEIGHT + "px", width: PRODUCT_PREVIEW_BANNER_WIDTH + "px" }} />
                </div>
            </div>
            <div className="product-preview-interaction-section flex flex-col items-start mt-1">
                <div className="text-base ml-1 bg-gray-800 h-4 w-32"/>
                <div className="product-status flex flex-row items-center">
                <div className="text-base ml-1 bg-gray-800 h-4 w-16 mt-1"/>
                </div>
            </div>
        </div>
    )
}
export default ProductPlaceholderPreviewItem;