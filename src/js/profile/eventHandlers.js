import { profile } from "../dom/domHandler.js";
import { getUserDetails } from "./profileHandler.js";
import { showToast } from "../utils/showToast.js";
import TodoApi from "../api/TodoApi.js";
const todoApi = new TodoApi();

export async function changeImage(e) {
  e.preventDefault();

  try {
    const file = profile.profileImage.files[0];
    const formData = new FormData();

    if (!file) {
      showToast('No image selected');
      return;
    }

    formData.append("DP", file);
    const uploadedContent = await todoApi.uploadPhoto(formData);

    showToast(uploadedContent.data.message);

  } catch (err) {
    showToast(err.response.data.message);
  } finally {
    getUserDetails();
    profile.profileForm.reset();
  }
}