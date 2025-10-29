import { profileHandler, getUserDetails } from "./profileHandler.js";
import { changeImage } from "./eventHandlers.js";
import { profile } from "../dom/domHandler.js";

profileHandler();
getUserDetails();

profile.profileForm.addEventListener("submit", changeImage);
