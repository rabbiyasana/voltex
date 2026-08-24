import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, } from "../api/authApi";

interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  registerLoading: boolean;
  registerError: string | null;
  registerSuccess: boolean;
  isAuthenticated: boolean;
}
const savedAuth =localStorage.getItem("voltex-auth");
const initialState: AuthState =
  savedAuth
    ? JSON.parse(savedAuth)
    : {
        user: null,
        accessToken: null,
        refreshToken: null,
        loading: false,
        error: null,
        registerLoading: false,
        registerError: null,
        registerSuccess: false,      
        isAuthenticated: false,
      };

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    return await loginUser({
      username,
      password,
    });
  }
);
export const registerThunk =
  createAsyncThunk(
    "auth/register",
    async ({
      firstName,
      lastName,
      email,
      username,
      password,
    }: {
      firstName: string;
      lastName: string;
      email: string;
      username: string;
      password: string;
    }) => {
      return await registerUser({
        firstName,
        lastName,
        email,
        username,
        password,
      });
    }
  );

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.user = {
          id: action.payload.id,
          username: action.payload.username,
          email: action.payload.email,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          gender: action.payload.gender,
          image: action.payload.image,
        };

        state.accessToken =
          action.payload.accessToken;

        state.refreshToken =
          action.payload.refreshToken;

        state.isAuthenticated = true;
      })

      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;

        state.error =
          action.error.message ??
          "Login failed.";
      })
      .addCase(
        registerThunk.pending,
        (state) => {
          state.registerLoading = true;
          state.registerError = null;
          state.registerSuccess = false;
        }
      )
      
      .addCase(
        registerThunk.fulfilled,
        (state) => {
          state.registerLoading = false;
          state.registerSuccess = true;
        }
      )
      
      .addCase(
        registerThunk.rejected,
        (state, action) => {
          state.registerLoading = false;
          state.registerSuccess = false;
      
          state.registerError =
            action.error.message ??
            "Registration failed.";
        }
      );
  },
});

export const { logout } =authSlice.actions;

export default authSlice.reducer;