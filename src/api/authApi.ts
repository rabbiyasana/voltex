import apiClient from "./apiClient";

interface LoginCredentials {
  username: string;
  password: string;
  expiresInMins?: number;
}

interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}
interface RegisterPayload {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
  }
  
  interface RegisterResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
  }

export async function loginUser(credentials: LoginCredentials): Promise<LoginResponse> {
  const response =await apiClient.post<LoginResponse>(
      "/auth/login",
      credentials
    );

  return response.data;
}
export async function registerUser(
    payload: RegisterPayload
  ): Promise<RegisterResponse> {
    const response =
      await apiClient.post<RegisterResponse>(
        "/users/add",
        payload
      );
  
    return response.data;
  }