import {createStore} from 'redux'

import Reducer from './Reducer'
import {composeWithDevTools} from 'redux-devtools-extension'

const Store=createStore(Reducer,composeWithDevTools())
export default Store