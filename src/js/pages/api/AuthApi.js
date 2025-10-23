import axios from "axios";
const API_BASE_URL = "http://localhost:3001/user/auth";

export default class AuthApi {
  api = axios.create({
    baseURL: API_BASE_URL,
  });


  async register(email, password) {
    try {

      const response = await this.api.post(`/sign-up`, { email, password });

      return response;
    } catch (error) {
      throw error.response.data;
    }
  }

  async login(email, password) {
    try {

      const response = await this.api.post(`/login`, { email, password });

      localStorage.setItem('access-token', response.data.accessToken);
      localStorage.setItem('refresh-token', response.data.refreshToken);

    } catch (error) {
      throw error.response.data;
    }
  }

  async verifyOTP(email, otp) {
    try {

      const response = await this.api.post(`/verify-otp`, { email, otp });

      return response;
    } catch (error) {
      throw error.response.data;
    }
  }

  async resendOTP(email) {
    try {

      await this.api.post(`/send-otp`, { email });

    } catch (error) {
      throw error.response.data;
    }
  }

  async forgetPasswordSendOtp(email) {
    try {
      await this.api.post(`/forget-password/send-otp`, { email });

    } catch (error) {
      throw error.response.data;
    }
  }

  async forgetPasswordVerifyOtp(email, otp) {
    try {
      const response = await this.api.post(`/forget-password/verify-otp`, { email, otp });

      return response;
    } catch (error) {
      throw error.response.data;
    }
  }

  async forgetPasswordReset(email, newPassword) {
    try {
      await this.api.post(`/forget-password/reset`, { email, newPassword }, {
        headers: {
          Authorization:
            'Bearer ' + sessionStorage.getItem('sessionToken'),
        },
      });

    } catch (error) {
      throw error.response.data;
    }
  }

  async refreshToken() {
    try {
      const response = await this.api.post(`/refresh-token`);

      return response;

    } catch (error) {
      throw error.response.data;
    }
  }
};