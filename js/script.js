//1
const passwordGeneratorButton = document.querySelector("#open-generate-password");
const passwordGenerator = document.querySelector("#generated-password"); 
const createPasswordButton = document.querySelector("#create-password"); 
const generatePasswordContainer = document.querySelector("#password-generator"); 
const lengthInput = document.querySelector("#length");
const lettersInput = document.querySelector("#letters");
const numbersInput = document.querySelector("#numbers");
const symbolsInput = document.querySelector("#symbols");
const copyPasswordButton = document.querySelector("#copy-password");

const getLetterLowerCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getLetterUpperCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getNumber = () => {
  return Math.floor(Math.random() * 10).toString();
};

const getSymbol = () => {
  const symbols = "()[]{}=></,.!@#$%+-*";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

const generatePassword = (
  getLetterLowerCase,
  getLetterUpperCase,
  getNumber,
  getSymbol
) => {
  let password = "";

  const passwordLength = lengthInput.value;

  const geneators = [];

  if (lettersInput.checked) {
    geneators.push(getLetterLowerCase, getLetterUpperCase);
  }
  if (numbersInput.checked) {
    geneators.push(getNumber);
  }
  if (symbolsInput.checked) {
    geneators.push(getSymbol);
  }

  if (geneators.length === 0) {
    return;
  }

  for (i = 0; i < passwordLength; i = i + geneators.length) {
    geneators.forEach(() => {
      const randomValue =
        geneators[Math.floor(Math.random() * geneators.length)]();

      password += randomValue;
    });
  }

  password = password.slice(0, passwordLength);

  passwordGenerator.style.display = "block";
  passwordGenerator.querySelector("h4").innerText = password;
};

createPasswordButton.addEventListener("click", (event) => {
  event.preventDefault();
  generatePassword(
    getLetterLowerCase,
    getLetterUpperCase,
    getNumber,
    getSymbol
  );
});

passwordGeneratorButton.addEventListener("click", () => {
  generatePasswordContainer.classList.toggle("hide");
});

copyPasswordButton.addEventListener("click", (e) => {
  e.preventDefault();
  {
    const password = passwordGenerator.querySelector("h4").innerText;

    navigator.clipboard.writeText(password).then(() => {
      copyPasswordButton.innerText = "Senha copiada!";

      setTimeout(() => {
        copyPasswordButton.innerHTML = "copiar";
      }, 1000);
    });
  }
});
