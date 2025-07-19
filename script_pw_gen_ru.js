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
    print("Добро пожаловать в генератор паролей PassQuick!");
    print("Введите длину, выберите параметры и нажмите кнопку «Сгенерировать пароль».");
};

const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        print("> 📋 Пароль скопирован в буфер обмена.");
    }).catch(() => {
        print("> ❌ Не удалось скопировать пароль в буфер обмена.");
    });
};

const copyLastPassword = () => {
    if (lastPassword) copyToClipboard(lastPassword);
    else print("> ❗ Пароль ещё не сгенерирован.");
};

const randomLength = () => {
    const random = Math.floor(Math.random() * (24 - 8 + 1)) + 8;
    document.getElementById("length").value = random;
    print("> 🎲 Случайная длина выбрана: " + random);
};

const generatePassword = () => {
    const length = parseInt(document.getElementById("length").value);
    const useUpper = document.getElementById("include-uppercase").checked;
    const useLower = document.getElementById("include-lowercase").checked;
    const useNumbers = document.getElementById("include-numbers").checked;
    const useSymbols = document.getElementById("include-symbols").checked;

    if (isNaN(length) || length < 4 || length > 128) {
        print("> ❌ Неверная длина. Введите число от 4 до 128.");
        return;
    }

    let charset = "";
    if (useUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useLower) charset += "abcdefghijklmnopqrstuvwxyz";
    if (useNumbers) charset += "0123456789";
    if (useSymbols) charset += "!@#$%^&*()-_+=<>?";

    if (!charset) {
        print("> ❌ Выберите хотя бы один тип символов.");
        return;
    }

    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset[array[i] % charset.length];
    }

    lastPassword = password;
    print("> Сгенерированный пароль:");
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

print("Добро пожаловать в генератор паролей PassQuick!");
print("Введите длину, выберите параметры и нажмите кнопку «Сгенерировать пароль».");
