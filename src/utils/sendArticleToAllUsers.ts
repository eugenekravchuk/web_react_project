import emailjs from "emailjs-com";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/firebase";

export const sendArticleToAllUsers = async ({ id, title, description }) => {
    console.log("📩 START sending newsletter");
  
    try {
      const usersSnap = await getDocs(collection(db, "subscribers"));
      const emails = usersSnap.docs
        .map((doc) => doc.data()?.email)
        .filter((email) => typeof email === "string");
  
      console.log("✅ Emails to send:", emails);
  
      const sendTasks = emails.map((email) =>
        emailjs.send(
          "service_54589qv",
          "template_jwqqvxd",
          {
            to_email: email,
            article_title: title,
            article_description: description,
            article_link: `https://furrymagazine.netlify.app/articles/${id}`,
          },
          "RV60k2-86zcYbljzp"
        )
      );
  
      await Promise.all(sendTasks);
      console.log("✅ All emails sent");
    } catch (err) {
      console.error("❌ Failed to send emails:", err);
    }
  };
  