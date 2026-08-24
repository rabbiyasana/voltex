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

export async function loginUser(credentials: LoginCredentials): Promise<LoginResponse> {
  const response =await apiClient.post<LoginResponse>(
      "/auth/login",
      credentials
    );

  return response.data;
}