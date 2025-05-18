import emailjs from "emailjs-com";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/firebase";
import { ArticleType } from "../data/types";

export const sendArticleToAllUsers = async (article: ArticleType & { id: string }) => {
  const usersSnap = await getDocs(collection(db, "users"));
  const emails = usersSnap.docs
    .map(doc => doc.data()?.email)
    .filter(email => typeof email === "string");

  const publicKey = "RV60k2-86zcYbljzp";
  const serviceID = "service_54589qv";
  const templateID = "template_otq64zn";

  const sendPromises = emails.map(email =>
    emailjs.send(serviceID, templateID, {
      to_email: email,
      article_title: article.title,
      article_description: article.description,
      article_link: `https://yourdomain.com/magazine/${article.id}`
    }, publicKey)
  );

  await Promise.all(sendPromises);
};
