import axios from 'axios';
const API_BASE_URL = "http://localhost:3001/api";
//import { loadTasksSearch } from './main.js';

export default class TodoApi {
  api = axios.create({
    baseURL: API_BASE_URL,
  });

  constructor() {
    this.api.interceptors.request.use(
      function (config) {
        const token = localStorage.getItem('access-token');

        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
      },
      function (error) {
        console.log(error);
      }
    );

    this.api.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          try {
            const response = await axios.get(
              'http://localhost:3001/api/auth/refresh-token',
              {
                headers: {
                  Authorization:
                    'Bearer ' + localStorage.getItem('refresh-token'),
                },
              }
            );
            console.log(response);

            if (response) {
              localStorage.clear();
              localStorage.setItem('access-token', response.data.accessToken);
              localStorage.setItem('refresh-token', response.data.refreshToken);

              originalRequest.headers[
                'Authorization'
              ] = `Bearer ${response.data.accessToken}`;

              return this.api(originalRequest);
            }
          } catch (error) {
            console.log(error);
            localStorage.clear();

            window.location.reload();
          }
        }

        return Promise.reject(error);
      }
    );
  }

  async getAllTasks(searchTerm = "", searchCategory = "") {
    try {
      const response = this.api.get(`/todos/?search=${searchTerm}&category=${searchCategory}`);

      return await response;

    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }

  async createTask(task) {
    try {
      const { taskText, taskPriority, tagsArray } = task;

      const response = await this.api.post(`/todos/`, {
        title: taskText,
        priority: taskPriority,
        tags: tagsArray
      });

      const data = response.data;
      return data;

    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }

  async updateTask(id, updates) {
    try {
      const response = await this.api.put(`/todos/${id}`, updates);

      const data = response.data;
      return data;

    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }

  async deleteTask(id) {
    try {
      const response = await this.api.delete(`/todos/${id}`);

      return response.data;

    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }

  async deleteAllTasks() {
    try {
      const response = await this.api.delete(`/todos`);

      return response;
    } catch (error) {
      console.error("Error deleting all tasks:", error);
      throw error;
    }
  }

  async forgetPasswordSendOtp(email) {
    try {
      const response = await this.api.post('/forget-password/send-otp', { email });

      return response;
    } catch (error) {
      console.error("Error in sending otp:", error);
      throw error;
    }
  }

  async forgetPasswordVerifyOtp(email, otp) {
    try {
      const response = await this.api.post('/forget-password/verify-otp', { email, otp });

      return response;
    } catch (error) {
      console.error("Error in verifying otp:", error);
      throw error;
    }
  }

  async forgetPasswordSetEmail(email, newPassword) {
    try {
      const response = await this.api.post('/forget-password/reset', { email, newPassword });

      return response;
    } catch (error) {
      console.error("Error in setting new password:", error);
      throw error;
    }
  }

  async logout() {
    localStorage.clear();
    window.location.href = '../../pages/loginPage.html';
  }

  async resetPassword(email, oldPassword, newPassword) {
    try {
      const response = await this.api.post('/todos/reset-password', { email, oldPassword, newPassword });

      return response;
    } catch (error) {
      throw error;
    }
  }
};