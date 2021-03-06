import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import loginReducer from '../redux/login/reducer';
import { adminReducer, adminOpenReducer } from '../redux/admin/reducer';
import { openModalReducer } from '../redux/signup/reducer';
import { guideCardsReducer, guideModalReducer } from '../redux/map/reducer';
import { cardFilterReducer } from '../redux/mapFilter/reducer';
import scrollReducer from '../redux/scroll/reducer';
import toggleReducer from '../redux/toggle/reducer';
import { chatUserInfoReducer, chatListReducer, currentRoomReducer } from '../redux/chat/reducer';
import { guideDeleteReducer } from './management/reducer';
import {
  openTourModalReducer,
  openDeleteModalReducer,
  completeDeleteReducer,
} from './tourManagement/reducer';

const persistConfig = {
  key: 'root',
  storage,
  whiteList: ['loginReducer'],
  blacklist: [
    'scrollReducer',
    'toggleReducer',
    'cardFilterReducer',
    'guideModalReducer',
    'guideCardsReducer',
    'chatUserInfoReducer',
    'chatListReducer',
    'currentRoomReducer',
    'guideDeleteReducer',
    'openTourModalReducer',
    'openDeleteModalReducer',
    'completeDeleteReducer',
    'adminReducer',
    'adminOpenReducer',
  ],
};

const rootReducer = combineReducers({
  loginReducer,
  adminReducer,
  adminOpenReducer,
  scrollReducer,
  toggleReducer,
  openModalReducer,
  cardFilterReducer,
  guideCardsReducer,
  guideModalReducer,
  chatUserInfoReducer,
  chatListReducer,
  currentRoomReducer,
  guideDeleteReducer,
  openTourModalReducer,
  openDeleteModalReducer,
  completeDeleteReducer,
});

export default persistReducer(persistConfig, rootReducer);
