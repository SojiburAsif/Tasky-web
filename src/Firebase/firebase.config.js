
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-rz7VHbpUMm4PmEIr910pYLRGH_mYjtY",
  authDomain: "my-work-web-8d14f.firebaseapp.com",
  projectId: "my-work-web-8d14f",
  storageBucket: "my-work-web-8d14f.firebasestorage.app",
  messagingSenderId: "740458460286",
  appId: "1:740458460286:web:320148c57dec4a5706d42f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)