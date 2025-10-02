
const input = document.getElementById("qr-input");
const bouton = document.getElementById("generate-btn");
const image = document.getElementById("canvas");
const qr_box = document.getElementById("qr-box");
const copyBtn = document.getElementById("copy-btn");
const downloadBtn = document.getElementById("download-btn");


bouton.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;

  QRCode.toDataURL(text, {
    width: 300, 
    margin: 2,
    color: {
      dark: "#00ffff",
      light: "#000000"
    }
  }).then(dataURL => {
    image.src = dataURL;
    qr_box.style.display = "block";
  }).catch(err => console.error(err));
});

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "toast show";

  // Disparison du message de copie
  setTimeout(() => {
    toast.className = "toast";
  }, 3000);
}

// Copier
copyBtn.addEventListener("click", async () => {
  try {
    const response = await fetch(image.src);
    const blob = await response.blob();
    await navigator.clipboard.write([
      new ClipboardItem({ [blob.type]: blob })
    ]);
    showToast(" Copié avec succès !");
  } catch (err) {
    console.error(err);
    showToast(" Impossible de copier le QR code.");
  }
});

// Telecharger 
downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = image.src;
  link.download = "qrcode.png";
  link.click();
});
