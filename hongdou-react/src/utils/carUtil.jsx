import intl from 'react-intl-universal';

export const getBrand = brand => {
    let carBrand = '';
    switch (brand) {
        case 0: //丰田田
            carBrand = intl.get('CarList_lbl_brand_toyota');
            break;
        case 1: //本田
            carBrand = intl.get('CarList_lbl_brand_honda');
            break;
        case 2: //大众
            carBrand = intl.get('CarList_lbl_brand_volkswagen');
            break;
        case 3: //雪佛兰
            carBrand = intl.get('CarList_lbl_brand_chevrolet');
            break;
        default:
            carBrand = intl.get('CarList_lbl_brand_unknow');
            break;
    }
    return carBrand;
}

export const getDefault = isDefault => isDefault ? '*' : '-';