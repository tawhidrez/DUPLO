function genPass(len, upper, nums, special) {
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numChars = "0123456789";
  const specialChars = "!@#$%^&*()-_=+[]{}|;:,.<>?";
  let chars = lower;

  if (upper) chars += upperChars;
  if (nums) chars += numChars;
  if (special) chars += specialChars;

  let pass = "";
  for (let i = 0; i < len; i++) {
    const randIdx = Math.floor(Math.random() * chars.length);
    pass += chars[randIdx];
  }

  return pass;
}

function calculateStrength(password) {
  let strength = 0;
  if (password.length >= 12) strength += 1;
  if (password.length >= 16) strength += 1;
  if ((password.match(/[A-Z]/g) || []).length >= 2) strength += 1;
  if ((password.match(/[0-9]/g) || []).length >= 2) strength += 1;
  if ((password.match(/[^A-Za-z0-9]/g) || []).length >= 2) strength += 1;
  return strength;
}

function generate() {
  const len = parseInt(document.getElementById("len").value);
  const upper = document.getElementById("upper").checked;
  const nums = document.getElementById("nums").checked;
  const special = document.getElementById("special").checked;

  const pass = genPass(len, upper, nums, special);
  document.getElementById("passOut").textContent = pass;

  const strength = calculateStrength(pass);
  const strengthText = ["Erg zwak", "Zwak", "Gemiddeld", "Voldoende", "Sterk"];
  const cappedStrength = Math.min(strength, strengthText.length - 1);
  document.getElementById(
    "strengthOut"
  ).textContent = `Sterkte: ${strengthText[cappedStrength]}`;
}

function reset() {
  document.getElementById("len").value = 12;
  document.getElementById("upper").checked = true;
  document.getElementById("nums").checked = true;
  document.getElementById("special").checked = true;
  document.getElementById("passOut").textContent = " ";
  document.getElementById("strengthOut").textContent = "";
}

function copyToClipboard() {
  const passOut = document.getElementById("passOut").textContent;
  navigator.clipboard
    .writeText(passOut)
    .then(() => {
      alert("Wachtwoord gekopieerd naar klembord!");
    })
    .catch((err) => {
      console.error("Fout bij het kopiëren naar klembord: ", err);
    });
}
