import { Store, } from 'redux'

import { IState, } from 'state'
import { configureStore, } from 'store/init'


export const store: Store<IState> = configureStore()
