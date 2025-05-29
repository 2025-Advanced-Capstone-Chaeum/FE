import axios from "axios";

export interface OcrRequestData {
  multipartFile: File;
  name: string;
  doc_type: string;
}
const OCR_API_URL = "http://211.188.50.163:8080/ocr";

export const recipientRegister = async (data: OcrRequestData) => {
  const formData = new FormData();
  formData.append("multipartFile", data.multipartFile);
  formData.append("name", data.name);
  formData.append("doc_type", data.doc_type);

  try {
    const response = await axios.post(OCR_API_URL, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsImVtYWlsIjoiZG9mbDg1NDlAbmF2ZXIuY29tIiwibWVtYmVySWQiOjgsInJvbGUiOiJET05PUiIsImlhdCI6MTc0ODQ4NjU1NCwiZXhwIjoxNzQ4NDkwMTU0fQ.yCJ8ALdiUDNWKc6xmvSNKue8ptYP6k5SVyCTXULwMUkbo7qG6-aOqTtFo1zagJ3y22RK-25kJMRgPZQeY1XxvQ", // ⚠️ 실제로는 안전하게 관리 필요
      },
    });

    console.log("OCR 응답:", response.data);
    // 필요한 정보 추출해서 저장할 수 있음
    return response.data;
  } catch (error) {
    console.error("OCR 요청 실패:", error);
    if (axios.isAxiosError(error)) {
      // Axios 에러인 경우 좀 더 자세한 정보 로깅
      console.error("Axios error details:", error.response?.data);
    }
    throw error;
  }
};
