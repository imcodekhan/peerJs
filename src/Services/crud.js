import { getDatabase, ref, set, get } from "firebase/database";

export async function registerUser(phoneNumber) {
  try {
    const db = getDatabase();
    await set(ref(db, "users/" + phoneNumber), {
      phoneNumber,
    });
    return { success: true };
  } catch (error) {
    console.error("User registration failed:", error);
    return { success: false };
  }
}

export async function getUserDetails(phoneNumber) {
  try {
    const db = getDatabase();
    const dbRef = ref(db, `users/${phoneNumber}`);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.error("No data available");
    }
  } catch (error) {
    console.error("failed to get user details: ", error);
  }
}

export async function updateUserDetails(phoneNumber, updatedUser) {
  try {
    const db = getDatabase();
    await set(ref(db, "users/" + phoneNumber), { ...updatedUser });
    return { success: true };
  } catch (error) {
    console.error("User registration failed:", error);
  }
}
