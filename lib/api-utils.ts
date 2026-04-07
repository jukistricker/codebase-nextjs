export const prepareBody = (body: any) => {
  // Nếu không có body, không làm gì cả
  if (!body) return { formattedBody: undefined, headers: {} };

  // Trường hợp 1: Dữ liệu dạng File/Form (Thường dùng cho Upload log/video)
  // Lưu ý: KHÔNG set Content-Type là multipart/form-data, 
  // để trình duyệt tự thêm boundary thì mới không bị lỗi ở Backend.
  if (body instanceof FormData) {
    return { formattedBody: body, headers: {} };
  }

  // Trường hợp 2: Dữ liệu dạng Object thông thường
  if (typeof body === "object") {
    return {
      formattedBody: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    };
  }

  // Trường hợp 3: Dữ liệu dạng String/Raw
  return { formattedBody: body, headers: {} };
};