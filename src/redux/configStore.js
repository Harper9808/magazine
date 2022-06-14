import { createStore, combineReducers, applyMiddleware} from "redux";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";
import User  from "./modules/user";
import Image from "./modules/image"
import Post from "./modules/post"
const middlewares = [thunk];


export const history = createBrowserHistory();

const rootReducer = combineReducers({ user: User, image:Image,post:Post});
const enhancer = applyMiddleware(...middlewares);
const store = createStore(rootReducer, enhancer);

export default store;