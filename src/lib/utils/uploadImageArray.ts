import config from "@/config";

export const uploadImagesToCloudinary = async (files: FileList) => {
  try {
    if (!files || files?.length === 0) throw new Error("No files provided");

    const { cloudinary_preset, cloudinary_cloudname } = config;
    const uploadedUrls: string[] = [];

    for (const file of Array?.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", cloudinary_preset as string);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinary_cloudname}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response?.ok) throw new Error("Image upload failed");

      const data = await response.json();
      uploadedUrls?.push(data.secure_url);
    }

    return uploadedUrls; // Array of uploaded image URLs
  } catch (error) {
    console.error("Error uploading images:", error);
    return null;
  }
};
