import emailjs from "emailjs-com";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/firebase";

interface ArticleInfo {
  id: string;
  title: string;
  description: string;
}

export const sendArticleToAllUsers = async ({
  id,
  title,
  description,
}: ArticleInfo): Promise<void> => {
  console.log("📩 START sending newsletter");

  try {
    const usersSnap = await getDocs(collection(db, "subscribers"));
    const emails = usersSnap.docs
      .map((doc) => {
        const data = doc.data() as { email?: unknown };
        return typeof data.email === "string" ? data.email : null;
      })
      .filter((email): email is string => email !== null);

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
