import axios from 'axios';
const API_BASE_URL = "http://localhost:3001/api";
import { loadTasks } from './main.js';

export class todoAPI {
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
          error.response.data.message === 'jwt expired' &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          try {
            const response = await axios.post(
              'http://localhost:3001/api/auth/refresh-token',
              { refreshToken: localStorage.getItem('refresh-token') }
            );
            console.log(response);

            if (response) {
              localStorage.setItem('access-token', response.data.accessToken);
              localStorage.setItem('refresh-token', response.data.refreshToken);

              originalRequest.headers[
                'Authorization'
              ] = `Bearer ${response.data.accessToken}`;

              return this.api(originalRequest);
            }
          } catch (error) {
            console.log(error);
            localStorage.removeItem('access-token');
            localStorage.removeItem('refresh-token');

            window.location.reload();
          }
        }

        return Promise.reject(error);
      }
    );
  }

  async getAllTasks(searchTerm = "", searchCategory = "") {
    try {
      // let url = `${API_BASE_URL}/todos`;
      const queryParams = [];

      if (searchTerm.trim() && searchCategory) {
        queryParams.push(`search=${encodeURIComponent(searchTerm)}`);
        queryParams.push(`category=${encodeURIComponent(searchCategory)}`);
      }

      if (queryParams.length) {
        url += `?${queryParams.join("&")}`;
      }

      const response = await this.api.get(`/todos`)

      if (!response.ok) throw new Error("Failed to fetch tasks");
      return await response.json();
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }

  async createTask(task) {
    try {
      // const response = await fetch(`${API_BASE_URL}/todos`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(task),
      // });

      const response = await this.api.post(`/todos`, task, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error("Failed to create task");
      console.log(response);

      loadTasks();
      return await response.json();

    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }

  async updateTask(id, updates) {
    try {
      // const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(updates),
      // });

      const response = await this.api.put(`/todos/${id}`, updates);

      if (!response.ok) throw new Error("Failed to update task");

      loadTasks();
      return await response.json();

    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }

  async deleteTask(id) {
    try {
      // const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      //   method: "DELETE",
      // });

      const response = await this.api.delete(`/todos/${id}`);
      if (!response.ok) throw new Error("Failed to delete task");

      return await response.json();
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }

  async deleteAllTasks() {
    try {
      // const response = await fetch(`${API_BASE_URL}/todos`, {
      //   method: "DELETE",
      // });

      const response = await this.api.delete(`/todos`);
      if (!response.ok) throw new Error("Failed to delete all tasks");

      return await response.json();
    } catch (error) {
      console.error("Error deleting all tasks:", error);
      throw error;
    }
  }
};