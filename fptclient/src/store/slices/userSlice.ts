import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { APP, KEY_AUTH } from 'config/constants';
import { app, navigateToPublicRoute } from 'routes';
import store from 'store';
import { AdminLoginRes } from 'types/SwaggerTypeAdmin';
import { UserLoginRes } from 'types/SwaggerTypeUser';

type UserState = {
  [APP.ADMIN]: AdminLoginRes | undefined;
  [APP.PROVIDER]: UserLoginRes | undefined;
};

const initialState: UserState = {
  [APP.ADMIN]: undefined,
  [APP.PROVIDER]: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<UserLoginRes | undefined>) => {
      return {
        ...state,
        [app]: action.payload,
      };
    },
    logout: (state) => {
      return {
        ...state,
        [app]: undefined,
      };
    },
  },
});

// Action creators are generated for each case reducer function
const { loginUser, logout } = userSlice.actions;

const login = (state: AdminLoginRes | UserLoginRes) => {
  store.dispatch(loginUser(state));
  window.localStorage.setItem(KEY_AUTH[app], JSON.stringify(store.getState().user[app]));
};

const logoutUser = () => {
  store.dispatch(logout());
  window.location.assign(navigateToPublicRoute());
  window.localStorage.removeItem(KEY_AUTH[app]);
};

export { login, logoutUser };
const userReducer = userSlice.reducer;
export default userReducer;
