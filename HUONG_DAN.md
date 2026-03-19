# Ruby Renderer - Tạo Ruby cho Kanji tự động

Tool tự động thêm furigana (chú thích phát âm) cho các từ kanji trong câu tiếng Nhật.

## 🚀 Cách sử dụng (CỰC KỲ ĐƠN GIẢN)

### ✅ Cách 1: Mở file trực tiếp (KHÔNG CẦN SERVER)

1. **Double-click** vào file `ruby_renderer.html`
2. File sẽ mở trong trình duyệt mặc định
3. **Cần có kết nối internet** lần đầu để tải kuromoji.js từ CDN
4. Nhập câu tiếng Nhật và nhấn "Tạo ruby"

**Ưu điểm:**
- ✅ Không cần cài đặt gì
- ✅ Không cần chạy server
- ✅ Mở file là dùng được ngay

**Nhược điểm:**
- ⚠️ Cần internet để tải thư viện lần đầu

---

### 🔧 Cách 2: Chạy Local Server (cho version offline hoàn toàn)

Nếu bạn muốn dùng hoàn toàn offline (không cần internet):

```bash
cd /Users/thuongmy/Documents/Luc/RenderRuby
./start_server.sh
```

Hoặc:

```bash
cd /Users/thuongmy/Documents/Luc/RenderRuby
python3 -m http.server 8000
```

Sau đó mở: **http://localhost:8000/ruby_renderer.html**

---

## ✨ Tính năng

- ✅ **Tự động phân tích** từ tiếng Nhật bằng kuromoji.js
- ✅ **CHỈ thêm furigana cho KANJI**, không thêm cho hiragana
- ✅ **Tách okurigana** - Ví dụ: 行きます → <ruby>行<rt>い</rt></ruby>きます
- ✅ **Chụp màn hình** kết quả để lưu ảnh
- ✅ **Font size lớn** để dễ đọc
- ✅ **Keyboard shortcut:** Ctrl/Cmd + Enter để tạo ruby nhanh

---

## 📝 Ví dụ

### Input:
```
明日は東京へ行きます。
```

### Output:
```
明日(あした)は東京(とうきょう)へ行(い)きます。
```

**Giải thích:**
- ✅ `明日` → có furigana `あした`
- ✅ `東京` → có furigana `とうきょう`
- ✅ `行` → có furigana `い`
- ❌ `は`, `へ`, `きます`, `。` → KHÔNG có furigana (vì là hiragana/ký tự)

---

## 🎯 So sánh các phiên bản

| File | Cách dùng | Internet | Server |
|------|-----------|----------|--------|
| `ruby_renderer.html` | Tự động phân tích | ✅ Cần (lần đầu) | ❌ Không cần |
| `ruby_renderer_simple.html` | Nhập thủ công | ❌ Không cần | ❌ Không cần |

---

## 🛠️ Yêu cầu kỹ thuật

- Trình duyệt hiện đại (Chrome, Firefox, Safari, Edge)
- JavaScript phải được bật
- Kết nối internet (chỉ lần đầu tải trang)

---

## 🔧 Troubleshooting

**Lỗi: "Không tải được kuromoji.js"**
- ✅ Kiểm tra kết nối internet
- ✅ Thử CDN khác: jsDelivr, unpkg
- ✅ Mở Developer Console (F12) để xem lỗi chi tiết

**Lỗi: "Không khởi tạo được tokenizer"**
- ✅ Đợi vài giây để tải dictionary
- ✅ Refresh lại trang
- ✅ Xóa cache trình duyệt

**Furigana hiển thị sai vị trí:**
- ✅ Đảm bảo font hỗ trợ ruby tag
- ✅ Zoom trình duyệt về 100%

---

## 📦 Source

- Kuromoji.js: https://github.com/takuyaa/kuromoji.js
- html2canvas: https://html2canvas.hertzen.com/

---

**Tạo bởi:** Thuong My  
**Ngày:** March 19, 2026
