import intl from 'react-intl-universal';

export const getLabel = component => {
    return intl.get(component)?.label ?? {};
}

export const getMsg = component => {
    return intl.get(component)?.message ?? {};
}