// src/components/NewsletterForm.tsx
import { useState } from "react";
import { db } from "../data/firebase";
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import emailjs from "emailjs-com";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      alert("Будь ласка, введіть дійсну email-адресу.");
      return;
    }

    setLoading(true);
    try {
      const q = query(collection(db, "subscribers"), where("email", "==", email.trim()));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert("Цей email вже підписаний.");
        setLoading(false);
        return;
      }

      await addDoc(collection(db, "subscribers"), {
        email: email.trim(),
        createdAt: serverTimestamp(),
      });

      await emailjs.send(
        "service_54589qv",
        "template_2xxuqil",
        { user_email: email },
        "RV60k2-86zcYbljzp"
      );

      alert("Дякуємо! Ми надіслали вам листа.");
      setEmail("");
    } catch (error) {
      console.error("❌ EmailJS error:", error);
      alert("Щось пішло не так. Спробуйте ще раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex w-full max-w-md" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        className="bg-white flex-grow px-4 py-2 text-black mr-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 self-end bg-white text-black text-sm font-bold transition duration-200 border border-white hover:bg-transparent hover:text-white cursor-pointer"
      >
        {loading ? "Sending..." : "SIGN UP"}
      </button>
    </form>
  );
};

export default NewsletterForm;
