import { all } from 'redux-saga/effects'
import { watchCreatProductType , watchGetListProductType } from './productType'

export const productTypeSaga = [
        watchCreatProductType(),
        watchGetListProductType()
]