# Ruby Renderer - Tạo Ruby cho Kanji tự động

Tool tự động thêm furigana (chú thích phát âm) cho các từ kanji trong câu tiếng Nhật.

## 📁 Cấu trúc thư mục

```
RenderRuby/
├── ruby_renderer.html          # Phiên bản TỰ ĐỘNG (sử dụng kuromoji.js)
├── ruby_renderer_simple.html   # Phiên bản thủ công
├── dict/                       # Thư mục chứa kuromoji.js và dictionary
│   ├── kuromoji.js            # Thư viện phân tích tiếng Nhật
│   ├── base.dat.gz            # Dictionary files
│   ├── cc.dat.gz
│   └── ... (các file .dat.gz khác)
└── README.md
```

## 🚀 Cách sử dụng

### ⚠️ QUAN TRỌNG: Cần chạy Local Server

Do trình duyệt chặn file local (CORS policy), bạn cần chạy local web server:

```bash
cd /Users/thuongmy/Documents/Luc/RenderRuby
python3 -m http.server 8000
```

Sau đó mở trình duyệt và truy cập: **http://localhost:8000/ruby_renderer.html**

### Phiên bản TỰ ĐỘNG (ruby_renderer.html)

1. **Khởi động server** (xem hướng dẫn trên)
2. **Mở** http://localhost:8000/ruby_renderer.html trong trình duyệt
3. **Nhập câu tiếng Nhật** vào ô textarea (ví dụ: `明日は東京へ行きます。`)
4. **Nhấn "Tạo ruby"** hoặc `Ctrl/Cmd + Enter`
5. Tool sẽ **tự động phân tích** và thêm furigana cho các kanji
6. Nhấn **"Chụp màn hình"** để lưu kết quả dưới dạng ảnh PNG

### Ví dụ:

**Input:** `明日は東京へ行きます。`

**Output:** 明日(あした)は東京(とうきょう)へ行(い)きます。

## ✨ Tính năng

- ✅ **Tự động phân tích** từ tiếng Nhật bằng kuromoji.js
- ✅ **Hoạt động offline** (không cần internet sau khi tải trang lần đầu)
- ✅ **Chụp màn hình** kết quả để lưu ảnh
- ✅ **Tùy chỉnh font size** lớn để dễ đọc
- ✅ **Keyboard shortcut:** Ctrl/Cmd + Enter để tạo ruby nhanh

## 🔧 Yêu cầu kỹ thuật

- Trình duyệt hiện đại (Chrome, Firefox, Safari, Edge)
- JavaScript phải được bật
- Để chụp màn hình cần kết nối internet (tải html2canvas từ CDN)

## 📝 Lưu ý

- Tool chỉ thêm furigana cho **kanji**, các ký tự hiragana/katakana giữ nguyên
- Độ chính xác phụ thuộc vào kuromoji.js tokenizer
- Nếu có lỗi, tool sẽ hiển thị text thuần thay vì báo lỗi

## 🛠️ Troubleshooting

**Lỗi: "Không tải được kuromoji.js"**
- Kiểm tra file `dict/kuromoji.js` có tồn tại không
- Mở Developer Console (F12) để xem lỗi chi tiết

**Lỗi: "Không khởi tạo được tokenizer"**
- Kiểm tra các file `.dat.gz` trong thư mục `dict/`
- Đảm bảo tất cả dictionary files đều có

## 📦 Source

- Kuromoji.js: https://github.com/takuyaa/kuromoji.js
- html2canvas: https://html2canvas.hertzen.com/

---

**Tạo bởi:** Thuong My  
**Ngày:** March 19, 2026
# createRuby
# createRuby
