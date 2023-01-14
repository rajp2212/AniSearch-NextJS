import recoil from 'recoil'


export const inputState = recoil.atom({
    key: 'inputState',
    default: '',
})