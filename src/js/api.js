const API_BASE_URL = "http://localhost:3001/api";
import { loadTasks } from './main.js';

export const todoAPI = {
  async getAllTasks(searchTerm = "", searchCategory = "") {
    try {
      let url = `${API_BASE_URL}/todos`;
      const queryParams = [];

      if (searchTerm.trim() && searchCategory) {
        queryParams.push(`search=${encodeURIComponent(searchTerm)}`);
        queryParams.push(`category=${encodeURIComponent(searchCategory)}`);
      }

      if (queryParams.length) {
        url += `?${queryParams.join("&")}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch tasks");
      return await response.json();
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },

  async createTask(task) {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      loadTasks();
      if (!response.ok) throw new Error("Failed to create task");
      return await response.json();
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  },

  async updateTask(id, updates) {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });
      loadTasks();
      if (!response.ok) throw new Error("Failed to update task");
      return await response.json();
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  },

  async deleteTask(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete task");
      if (response.status === 204) {
        return;
      }
      return await response.json();
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  },

  async deleteAllTasks() {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete all tasks");
      return await response.json();
    } catch (error) {
      console.error("Error deleting all tasks:", error);
      throw error;
    }
  },
};