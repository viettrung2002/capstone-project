export interface IAddress {
    addressId?: string;
    userId?: string;
    provinceId?: string;
    districtId?: string;
    wardId?: string;
    streetAddress?: string;
    phoneNumber?: string;
    name?: string;
}

export interface IProvince {
    provinceId: string;
    provinceName: string;
}

export interface IDistrict {
    districtId: string;
    districtName: string;
}

export interface IWard {
    wardId: string;
    wardName: string;
}

export interface IAddressResponse {
    addressId?: string;
    userId?: string;
    province : IProvince;
    district : IDistrict;
    ward : IWard;
    streetAddress?: string;
    phoneNumber?: string;
    name?: string;
    isDefault?: boolean;
}