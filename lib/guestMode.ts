// Guest mode utilities for non-authenticated users

const GUEST_USERNAME_KEY = "github_wrapped_guest_username";
const GUEST_USER_IMAGE_KEY = "github_wrapped_guest_user_image";
const GUEST_MODE_KEY = "github_wrapped_guest_mode";

export function setGuestUser(username: string, userImage?: string): void {
  try {
    localStorage.setItem(GUEST_USERNAME_KEY, username);
    localStorage.setItem(GUEST_MODE_KEY, "true");
    if (userImage) {
      localStorage.setItem(GUEST_USER_IMAGE_KEY, userImage);
    }
  } catch (error) {
    console.error("Error setting guest user:", error);
  }
}

export function getGuestUsername(): string | null {
  try {
    return localStorage.getItem(GUEST_USERNAME_KEY);
  } catch (error) {
    console.error("Error getting guest username:", error);
    return null;
  }
}

export function getGuestUserImage(): string | null {
  try {
    return localStorage.getItem(GUEST_USER_IMAGE_KEY);
  } catch (error) {
    console.error("Error getting guest user image:", error);
    return null;
  }
}

export function isGuestMode(): boolean {
  try {
    return localStorage.getItem(GUEST_MODE_KEY) === "true";
  } catch (error) {
    console.error("Error checking guest mode:", error);
    return false;
  }
}

export function clearGuestMode(): void {
  try {
    localStorage.removeItem(GUEST_USERNAME_KEY);
    localStorage.removeItem(GUEST_USER_IMAGE_KEY);
    localStorage.removeItem(GUEST_MODE_KEY);
  } catch (error) {
    console.error("Error clearing guest mode:", error);
  }
}
