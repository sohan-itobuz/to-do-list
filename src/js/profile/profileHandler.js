// const emailSpan = document.getElementById('user-email');
// const logoutBtn = document.getElementById('logout-btn');
import { profile } from "../dom/domHandler.js";
import { showToast } from "../utils/showToast.js";
import TodoApi from "../api/TodoApi.js";
const todoApi = new TodoApi();

const profilePreview = document.getElementById('profile-preview');
const profileIcon = document.getElementById('icon-preview');
const profileImage = document.getElementById('profileImage');
const userEmail = document.getElementById('user-profile-email');
const submitButton = document.querySelector('button[type="submit"]');
const profileForm = document.getElementById('edit-profile-form');

export function profileHandler() {
  document.addEventListener('DOMContentLoaded', () => {

    const userEmail = localStorage.getItem('userEmail');
    const userEmailFirst = userEmail.split('')[0];

    if (userEmail && userEmailFirst && profile.emailSpan) {
      profile.emailSpan.textContent = userEmailFirst;
    }

    profile.logoutBtn.addEventListener('click', () => {
      localStorage.clear();
      window.location.href = '../pages/loginPage.html';
    });
  });
}

export async function getUserDetails() {
  try {
    const email = localStorage.getItem('userEmail');
    userEmail.innerHTML = email;

    const userData = await todoApi.getUserData();
    // const dates = userData.userDetails.createdAt.split("-");
    // createdAt.innerHTML = `${dates[2].split("T")[0]} / ${dates[1]} / ${dates[0]
    //   }`;

    if (userData.data.userDetails.imagePath) {
      profilePreview.src = userData.data.userDetails.imagePath;
      profileIcon.src = userData.data.userDetails.imagePath;
    } else {
      profilePreview.setAttribute(
        "src",
        "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
      );
    }
  } catch (err) {
    showToast(err.message);
  }
}

profileForm.addEventListener("submit", changeImage);

async function changeImage(e) {
  e.preventDefault();

  try {
    const file = profileImage.files[0];
    const formData = new FormData();

    if (!file) {
      showToast('No image selected');
      return;
    }

    formData.append("DP", file);
    const uploadedContent = await todoApi.uploadPhoto(formData);

    if (uploadedContent.success) {
      showToast(uploadedContent.message);
    } else {
      showToast(uploadedContent.message);
    }

  } catch (err) {
    showToast(err.message);
  } finally {
    getUserDetails();
    profileForm.reset();
  }
}

document.addEventListener("DOMContentLoaded", previewImage);

function previewImage() {
  const file = profileImage.files[0];

  if (file) {
    userImage.src = URL.createObjectURL(file);
  }
}