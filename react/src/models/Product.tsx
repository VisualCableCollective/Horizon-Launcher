export default class Product{
    name: string;
    bannerImgSrc: string;
    ownershipStatus: OwnershipStatus;
    installationProgress: number = 0;

    constructor(name: string, bannerImgSrc: string, ownershipStatus: OwnershipStatus) {
        this.name = name;
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