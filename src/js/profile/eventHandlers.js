import { profile } from "../dom/domHandler.js";

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
    showToast(err.message);
  } finally {
    getUserDetails();
    profileForm.reset();
  }
}