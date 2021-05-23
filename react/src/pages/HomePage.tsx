// Assets
import VTCMBanner from "../assets/vtcm-banner.png";

// Components
import ProductPreviewItem from "../components/products/ProductPreviewItem";
import ProductPlaceholderPreviewItem from "../components/products/ProductPlaceholderPreviewItem";
import TitleBar from "../components/TitleBar";

// Models
import Product, { OwnershipStatus } from "../models/Product";

// Handlers
import { HorizonAPIClient } from "horizon-api-client-ts";
import Log from "../handlers/Log";

import { useEffect, useState } from "react";

const HomePage = () => {
    let [products, setProducts] = useState<JSX.Element[]>([<ProductPlaceholderPreviewItem key={1} />, <ProductPlaceholderPreviewItem key={2} />, <ProductPlaceholderPreviewItem key={3} />]);
    useEffect(() => {
        // Get Apps by the VCC
        HorizonAPIClient.getTeam(1).then((team) => {
            if (team === null) {
                return;
            }
            team.getProducts().then((products) => {
                if (products === null) {
                    return;
                }
                if (products.length < 1) {
                    return;
                }
                let newProducts: JSX.Element[] = [];
                products.forEach((product) => {
                    let newProduct = new Product(product, VTCMBanner.toString(), OwnershipStatus.Installing);
                    newProduct.installationProgress = 80;
                    newProducts.push(<ProductPreviewItem key={newProduct.id} product={newProduct} />);
                });
                setProducts(newProducts);
            });
        });
    }, []);

    return (
        <div className="home-page overflow-y-hidden h-screen">
            <TitleBar />
            <div className="flex flex-col items-start px-4 overflow-x-hidden overflow-y-scroll h-full">
                <div className="store-information-wrapper flex flex-col justify-center items-center w-full max-w-screen-xl py-5 mb-2.5">
                    <h1 className="font-bold text-3xl text-center">Get ready for a new era.</h1>
                    <p className="mt-2">The Horizon storefront is currently under heavy developent. The Horizon storefront is currently under heavy development. You can find the latest information about our development progress on our website and on our Discord server. </p>
                </div>
                <div className="vcc-products-wrapper flex flex-col justify-center items-start max-w-screen-xl py-5">
                    <h2 className="text-lg font-semibold text-left w-full mb-2">Applications made by the VisualCableCollective</h2>
                    <div className="apps-row-wrapper flex flex-wrap flex-row items-start gap-3 overflow-x-auto">
                        {products}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;