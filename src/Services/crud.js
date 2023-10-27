import { getDatabase, ref, set, get, child } from "firebase/database";

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

export async function getUserByPhoneNumber(phoneNumber) {
  console.log("getUserByPhoneNumber");
  try {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `users/${phoneNumber}`));
    console.log(snapshot.val());
    if (snapshot.exists()) {
      console.log(snapshot.val());
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error("failed to get user details :", error);
  }
}

export async function updatedUser(phoneNumber, updatedUser) {
  try {
    const db = getDatabase();
    await set(ref(db, "users/" + phoneNumber), updatedUser);
    return { success: true };
  } catch (error) {
    console.error("User registration failed:", error);
  }
}
