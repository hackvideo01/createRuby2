const els = {
  input: document.getElementById("jpInput"),
  renderBtn: document.getElementById("renderBtn"),
  clearBtn: document.getElementById("clearBtn"),
  output: document.getElementById("output"),
  status: document.getElementById("status"),
};

function setStatus(msg) {
  els.status.textContent = msg || "";
}

function escapeHtml(s) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeRubyHtml(html) {
  // Kuroshiro thường trả: <ruby><rb>明日</rb><rt>あした</rt></ruby>
  // Mình chuyển sang: <ruby>明日<rp>(</rp><rt>あした</rt><rp>)</rp></ruby>
  return String(html)
    .replaceAll("<rb>", "")
    .replaceAll("</rb>", "")
    .replace(/<ruby>([\s\S]*?)<rt>/g, "<ruby>$1<rp>(</rp><rt>")
    .replaceAll("</rt></ruby>", "</rt><rp>)</rp></ruby>")
    .replace(/>\s+</g, "><")
    .trim();
}

let kuroshiroInstance = null;
let kuroshiroInitPromise = null;

async function initWithDictPath(ks, KuromojiAnalyzer, dictPath) {
  await ks.init(
    new KuromojiAnalyzer({
      // tải dictionary từ CDN; không cần cài đặt local
      dictPath,
    })
  );
}

async function initKuroshiroOnce() {
  if (kuroshiroInstance) return kuroshiroInstance;
  if (kuroshiroInitPromise) return kuroshiroInitPromise;

  kuroshiroInitPromise = (async () => {
    if (location.protocol === "file:") {
      setStatus(
        "Lưu ý: bạn đang mở bằng file://. Hãy chạy qua local server (vd: python3 -m http.server) để tải dictionary."
      );
    }

    const Kuroshiro = window.Kuroshiro;
    const KuromojiAnalyzer = window.KuroshiroAnalyzerKuromoji;

    if (!Kuroshiro || !KuromojiAnalyzer) {
      throw new Error("Thiếu thư viện Kuroshiro/Kuromoji (CDN chưa tải).");
    }

    const ks = new Kuroshiro();
    // Một số mạng/tiện ích chặn unpkg; thử thêm CDN dự phòng.
    try {
      await initWithDictPath(ks, KuromojiAnalyzer, "https://unpkg.com/kuromoji@0.1.2/dict/");
    } catch (e1) {
      await initWithDictPath(
        ks,
        KuromojiAnalyzer,
        "https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict/"
      );
    }

    kuroshiroInstance = ks;
    return ks;
  })();

  return kuroshiroInitPromise;
}

async function renderRuby() {
  const text = (els.input.value || "").trim();
  if (!text) {
    els.output.textContent = "";
    setStatus("Hãy nhập một câu tiếng Nhật.");
    return;
  }

  // Nếu user dán sẵn HTML ruby, render trực tiếp (không qua Kuroshiro)
  if (text.toLowerCase().includes("<ruby")) {
    els.output.innerHTML = text;
    setStatus("Đã render HTML ruby trực tiếp.");
    return;
  }

  setStatus("Đang tạo ruby...");

  try {
    const ks = await initKuroshiroOnce();
    const html = await ks.convert(text, {
      to: "hiragana",
      mode: "furigana",
    });
    // Kuroshiro trả HTML có <ruby><rb>...</rb><rt>...</rt></ruby>
    const normalized = normalizeRubyHtml(html);
    els.output.innerHTML = normalized;
    if (!String(html).includes("<ruby")) {
      setStatus(
        "Đã render nhưng không thấy thẻ <ruby>. Nếu bạn mở bằng file:// hoặc CDN bị chặn, furigana sẽ không tạo được."
      );
    } else {
      setStatus("Xong.");
    }
  } catch (err) {
    // Fallback: vẫn hiển thị chữ thường nếu không tạo được ruby
    els.output.innerHTML = escapeHtml(text);
    setStatus(
      `Không tạo được ruby (fallback). Mở DevTools Console để xem lỗi chi tiết: ${String(
        err && err.message ? err.message : err
      )}`
    );
    console.warn(err);
  }
}

function clearAll() {
  els.input.value = "";
  els.output.textContent = "";
  setStatus("");
  els.input.focus();
}

els.renderBtn.addEventListener("click", renderRuby);
els.clearBtn.addEventListener("click", clearAll);

els.input.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    renderRuby();
  }
});

// Demo mặc định
els.input.value = "明日は東京へ行きます。";
renderRuby();

