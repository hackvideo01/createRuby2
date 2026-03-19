#!/bin/bash

# Script khởi động Local Web Server cho Ruby Renderer

echo "🚀 Khởi động Ruby Renderer..."
echo "📂 Thư mục: $(pwd)"
echo ""
echo "Mở trình duyệt và truy cập:"
echo "👉 http://localhost:8000/ruby_renderer.html"
echo ""
echo "Nhấn Ctrl+C để dừng server"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Khởi động Python HTTP Server
python3 -m http.server 8000
