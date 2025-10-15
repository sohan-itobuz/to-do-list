import axios from "axios";
const API_BASE_URL = "http://localhost:3001/api/auth";

export default class authApi {
  api = axios.create({
    baseURL: API_BASE_URL,
  });


  async register(email, password) {
    try {
      // const response = await fetch(`${API_BASE_URL}/auth/sign-up`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ email, password }),
      // });

      const response = await this.api.post(`/sign-up`, { email, password });

    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }

  async login(email, password) {
    try {
      // const response = await fetch(`${API_BASE_URL}/auth/login`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ email, password }),
      // });

      const response = await this.api.post(`/login`, { email, password });

      localStorage.setItem('access-token', response.data.accessToken);
      localStorage.setItem('refresh-token', response.data.refreshToken);

    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }

  async verifyOTP(email, otp) {
    try {
      // const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ email, otp }),
      // });

      const response = await this.api.post(`/verify-otp`, { email, otp });

      return response;
    } catch (error) {
      console.error("Error verifying OTP:", error);
      throw error;
    }
  }

  async resendOTP(email) {
    try {
      // const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ email }),
      // });

      await this.api.post(`/send-otp`, { email });

    } catch (error) {
      console.error("Error resending OTP:", error);
      throw error;
    }
  }

  async forgetPasswordSendOtp(email) {
    try {
      await this.api.post(`/forget-password/send-otp`, { email });

    } catch (error) {
      console.error("Error resending OTP:", error);
      throw error;
    }
  }

  async forgetPasswordVerifyOtp(email, otp) {
    try {
      await this.api.post(`/forget-password/verify-otp`, { email, otp });

    } catch (error) {
      console.error("Error in otp verification", error);
      throw error;
    }
  }

  async forgetPasswordReset(email, newPassword) {
    try {
      await this.api.post(`/forget-password/reset`, { email, newPassword });

    } catch (error) {
      console.error("Error in password reset", error);
      throw error;
    }
  }

  logout() {
    TokenManager.clearTokens();
    window.location.href = './pages/loginPage.html';
  }

  isAuthenticated() {
    return TokenManager.isAuthenticated();
  }

  getToken() {
    return TokenManager.getAccessToken();
  }

  // Add refresh token endpoint
  async refreshToken() {
    try {
      // const response = await fetch(`${APIInterceptor.API_BASE_URL}/auth/refresh`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ refreshToken }),
      // });

      const response = await this.api.post(`/refresh-token`);

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      return response;
    } catch (error) {
      console.error('Token refresh error:', error);
      TokenManager.clearTokens();
      throw error;
    }
  }
};