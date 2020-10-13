import intl from 'react-intl-universal';

export const getLabel = component => {
    return intl.get(component)?.label ?? {};
}

export const getMessage = component => {
    return intl.get(component)?.message ?? {};
}

export const replaceStr = (str, params) => {
    if (Array.isArray(params)) {
        params.map((item, index) => str = str.replace(`{${index}}`, item));
    }
    return str;
}