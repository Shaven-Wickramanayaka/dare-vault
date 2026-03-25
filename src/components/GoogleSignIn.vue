<script setup>
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "vue-router";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useFirestore } from "vuefire";
const router = useRouter();
const db = useFirestore();
const googleSignIn = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(getAuth(), provider);
    const user = result.user;
    const userRef = doc(db, "users", user.uid);
    await setDoc(
      userRef,
      {
        name: user.displayName ?? "",
        email: user.email ?? "",
        createdAt: serverTimestamp(),
      },
      { merge: true },
    );

    router.push("/");
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <button
    @click="googleSignIn"
    class="mt-6 p-3 bg-(--secondary-accent) cursor-pointer rounded-xl flex items-center justify-center hover:bg-(--highlight) font-[Raleway] font font-bold"
  >
    <span class="mdi mdi-google text-[2.4vh] mr-2" aria-hidden="true"></span
    >Sign in with google
  </button>
</template>
