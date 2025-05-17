import { useState } from "react";
import { db } from "../data/firebase";
import { query, collection, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import emailjs from "emailjs-com";
import MagazinCover from "../assets/magazin-cover.png";

const Sidebar = () => {
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
    // 1. Перевіряємо, чи вже є такий email у базі
    const q = query(collection(db, "subscribers"), where("email", "==", email.trim()));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      alert("Цей email вже підписаний.");
      setLoading(false);
      return;
    }

    // 2. Додаємо до бази
    await addDoc(collection(db, "subscribers"), {
      email: email.trim(),
      createdAt: serverTimestamp(),
    });

    // 3. Надсилаємо лист через EmailJS
    await emailjs.send(
      "service_54589qv",
      "template_2xxuqil",
      { user_email: email },
      "RV60k2-86zcYbljzp"
    );

    alert("Дякуємо! Ми надіслали вам листа.");
    setEmail("");
  } catch (error) {
    console.error("Помилка:", error);
    alert("Щось пішло не так. Спробуйте ще раз.");
  } finally {
    setLoading(false);
  }
};

  return (
    <aside className="w-full lg:w-[300px] xl:w-[360px] flex flex-col gap-14 text-sm text-black">
      {/* PRINTMAGAZINE */}
      <div className="pb-8">
        <h4 className="uppercase text-[14px] tracking-wide text-black mb-1 font-bold">
          Printmagazine
        </h4>
        <h3 className="text-6xl font-bold mb-4 pb-4">03/2022</h3>
        <img src={MagazinCover} alt="Magazine Cover" className="w-full mb-4" />
        <button
          type="button"
          className="bg-black text-white text-sm px-7 py-4 font-bold border border-black hover:bg-transparent hover:text-black transition"
        >
          ORDER
        </button>
      </div>

      {/* MOST POPULAR */}
      <div>
        <h4 className="uppercase text-[16px] tracking-wide text-black mb-5 font-bold">
          Most Popular
        </h4>

        <div className="divide-y divide-black-500">
          {[1, 2, 3].map((num) => (
            <div key={num} className="py-7">
              <a href="/articles/street-art-festival" className="block group transition">
                <div className="flex items-start">
                  <p
                    className="font-bold text-[24px] leading-none mt-1"
                    style={{ marginRight: "20px", minWidth: "32px" }}
                  >
                    {String(num).padStart(2, "0")}
                  </p>
                  <div>
                    <p className="font-bold text-[24px] leading-snug group-hover:underline">
                      Street art festival
                    </p>
                    <p className="text-[14px] text-black text-bold mt-3">
                      <strong className="text-black font-medium mr-1">Text</strong>
                      Jakob Gronberg
                    </p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* NEWSLETTER */}
      <div className="bg-gray-100 p-6">
        <h4 className="uppercase text-[16px] tracking-wide text-black font-bold mb-2">
          Newsletter
        </h4>
        <h3 className="text-4xl font-bold mb-4 leading-snug">
          Design News to <br /> your inbox
        </h3>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="bg-white px-3 py-2 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 self-end bg-black text-white text-sm font-bold border border-black hover:bg-transparent hover:text-black transition"
          >
            {loading ? "Sending..." : "SIGN UP"}
          </button>
        </form>
      </div>
    </aside>
  );
};

export default Sidebar;
