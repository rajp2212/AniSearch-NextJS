import { atom } from "recoil";

export const searchPageLoadingStatus = atom<boolean>({
    key: 'searchPageLoadingStatus',
    default: true
});