import { getDatabase, ref, set, get, child } from "firebase/database";

export function registerUser(phoneNumber) {
  try {
    const db = getDatabase();
    set(ref(db, "users/" + phoneNumber), {
      phoneNumber,
    });
  } catch (error) {
    console.error("User registration failed:", error);
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

export async function updatedUser(phoneNumber, updateValue) {
  try {
    const db = getDatabase();
    const userDetails = await getUserByPhoneNumber(phoneNumber);
    console.log({ userDetails });
    const updatedUser = {
      ...userDetails,
      ...updateValue,
    };
    set(ref(db, "users/" + phoneNumber), updatedUser);
  } catch (error) {
    console.error("User registration failed:", error);
  }
}
