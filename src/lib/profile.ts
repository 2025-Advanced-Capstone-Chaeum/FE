import axiosInstance from "./api/axios";

// lib/profile.ts
export const uploadProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append("multipartFile", file);
  const { data } = await axiosInstance.post("/api/v1/file/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data?.data?.[0]?.fileUrl;
};

export const patchUserProfile = async ({
  name,
  profileImage,
}: {
  name: string;
  profileImage: string | null | undefined;
}) => {
  const { data } = await axiosInstance.patch(
    "/api/v1/member",
    { name, profileImage },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsImVtYWlsIjoiZG9mbDg1NDlAbmF2ZXIuY29tIiwicm9sZSI6IkRPTk9SIiwiaWF0IjoxNzQ3MjE1Mjg4LCJleHAiOjE3NDcyMTg4ODh9.CxThGsWwn6TSx3LCuYdl9IoKGMaDB7wv4Zndm7ZFRRRqUUPtpoB193uil3DaAPAUy4nzpU9bBvneoEFKHYFRJQ",
      },
    }
  );
  return data;
};
