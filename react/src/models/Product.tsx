import {Product as APIProduct} from 'horizon-api-client-ts';

export default class Product extends APIProduct{
    bannerImgSrc: string;
    ownershipStatus: OwnershipStatus;
    installationProgress: number = 0;

    constructor(apiProduct: APIProduct, bannerImgSrc: string, ownershipStatus: OwnershipStatus) {
        super(apiProduct);
        this.ownershipStatus = ownershipStatus;
        this.bannerImgSrc = bannerImgSrc;
    }
}

export enum OwnershipStatus{
    NotOwned,
    Owned,
    Installing,
    Installed,
}