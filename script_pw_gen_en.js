const terminal = document.getElementById("terminal");
let lastPassword = "";

const print = (text) => {
    const lines = text.split("\n");
    lines.forEach(line => {
        const lineElement = document.createElement("div");
        lineElement.textContent = line;
        terminal.appendChild(lineElement);
    });
    terminal.scrollTop = terminal.scrollHeight;
};

const clearTerminal = () => {
    terminal.innerHTML = "";
    print("Welcome to PassQuick password generator!");
    print("Enter length, select options and click 'Generate password' button.");
};

const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        print("> 📋 Password copied to clipboard.");
    }).catch(() => {
        print("> ❌ Couldn't copy the password to the clipboard.");
    });
};

const copyLastPassword = () => {
    if (lastPassword) copyToClipboard(lastPassword);
    else print("> ❗ Password not generated yet.");
};

const randomLength = () => {
    const random = Math.floor(Math.random() * (24 - 8 + 1)) + 8;
    document.getElementById("length").value = random;
    print("> 🎲 Random length selected: " + random);
};

const generatePassword = () => {
    const length = parseInt(document.getElementById("length").value);
    const useUpper = document.getElementById("include-uppercase").checked;
    const useLower = document.getElementById("include-lowercase").checked;
    const useNumbers = document.getElementById("include-numbers").checked;
    const useSymbols = document.getElementById("include-symbols").checked;

    if (isNaN(length) || length < 4 || length > 128) {
        print("> ❌ Invalid length. Enter a number from 4 to 128.");
        return;
    }

    let charset = "";
    if (useUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useLower) charset += "abcdefghijklmnopqrstuvwxyz";
    if (useNumbers) charset += "0123456789";
    if (useSymbols) charset += "!@#$%^&*()-_+=<>?";

    if (!charset) {
        print("> ❌ Select at least one character type.");
        return;
    }

    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset[array[i] % charset.length];
    }

    lastPassword = password;
    print("> Generated password:");
    print(password);
};

const toggleTheme = () => document.body.classList.toggle("light");

document.getElementById('helpBtn').addEventListener('click', () => {
    const modal = document.getElementById('helpModal');
    modal.classList.add('show');
    modal.style.display = 'block';
});

document.querySelector('#helpModal .close').addEventListener('click', () => {
    const modal = document.getElementById('helpModal');
    modal.classList.remove('show');
    modal.style.display = 'none';
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.getElementById('helpModal').classList.remove('show');
        document.getElementById('helpModal').style.display = 'none';
    }
});

print("Welcome to PassQuick password generator!");
print("Enter length, select options and click 'Generate password' button.");
