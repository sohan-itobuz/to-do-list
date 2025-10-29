import { profile } from "../dom/domHandler.js";
import { showToast } from "../utils/showToast.js";
import TodoApi from "../api/TodoApi.js";
const todoApi = new TodoApi();

export function profileHandler() {
  const userEmail = localStorage.getItem("userEmail");
  const userEmailFirst = userEmail.split("")[0].toUpperCase();

  if (userEmail && userEmailFirst && profile.emailSpan) {
    profile.emailSpan.textContent = userEmailFirst;
  }

  profile.logoutBtn.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "../pages/loginPage.html";
  });
}

export async function getUserDetails() {
  try {
    const userData = await todoApi.getUserData();

    const email = userData.data.userDetails.email;
    profile.userEmail.innerHTML = email;

    if (userData.data.userDetails.imagePath) {
      profile.profilePreview.src = userData.data.userDetails.imagePath;
      profile.profileIcon.src = userData.data.userDetails.imagePath;
    } else {
      profile.profilePreview.setAttribute(
        "src",
        "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
      );
    }
  } catch (err) {
    showToast(err.message);
  }
}
