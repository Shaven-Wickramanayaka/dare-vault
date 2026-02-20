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

    router.push("/dashboard");
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <button @click="googleSignIn">Sign in with google</button>
</template>
