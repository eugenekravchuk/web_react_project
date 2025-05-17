// utils/uploadToCloudinary.ts
export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ml_default"); // <- your real unsigned preset

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dwcbm3x3w/image/upload/",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  if (!res.ok) {
    console.error("Cloudinary upload error", data);
    throw new Error(data.error?.message || "Upload failed");
  }

  return data.public_id; // or `data.secure_url` if you don’t plan to use Cloudinary SDK
};
