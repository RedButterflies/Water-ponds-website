// Dane dotyczące dekoracji oczek wodnych
const decorationData = [
    { name: "Fontanna", description: "Piękna fontanna wodna, idealna do ozdobienia oczka wodnego.", image:"assets/d6coy0b-b943f811-c8f4-46c7-9c8d-2876d26e71ab.gif" },
    { name: "Kamienie ozdobne", description: "Niezwykłe kamienie ozdobne, które nadadzą oczku wodnemu naturalny wygląd." },
    { name: "Rzeźba wodna", description: "Elegancka rzeźba wodna, która stworzy unikalny punkt centralny w oczku wodnym." },
    { name: "Lotos wodny", description: "Delikatne kwiaty lotosu, które dodadzą uroku i koloru do oczka wodnego.",image:"assets/1361520_2069c.gif"},
    { name: "Oświetlenie wodne", description: "Efektowne oświetlenie wodne, które podkreśli piękno oczka wodnego w nocy." },
    { name: "Palmy wodne", description: "Egzotyczne palmy wodne, które nadadzą tropikalny klimat oczku wodnemu.", image:"assets/2165014_26b27.gif" },
    { name: "Mostek ogrodowy", description: "Uroczy mostek ogrodowy, który umożliwi przejście nad oczkiem wodnym." },
    { name: "Ptaki wodne", description: "Urocze ptaki wodne, które dodadzą życia i naturalności do oczka wodnego.",image:"assets/200w.gif" }
];

// Funkcja tworząca guziki z nazwami dekoracji
function createDecorationButtons() {
    const decorationButtonsContainer = document.getElementById("decoration-buttons");

    decorationData.forEach(decoration => {
        const decorationButton = document.createElement("button");
        decorationButton.classList.add("decoration-button");
        decorationButton.textContent = decoration.name;

        decorationButton.addEventListener("click", function() {
            showDecorationDescription(decoration.description);
            showDecorationImage(decoration.image);
        });

        decorationButtonsContainer.appendChild(decorationButton);
    });
}

// Funkcja wyświetlająca opis wybranej dekoracji
function showDecorationDescription(description) {
    const decorationDescriptionContainer = document.getElementById("decoration-description");
    decorationDescriptionContainer.textContent = description;
}

// Funkcja wyświetlająca obraz wybranej dekoracji (jeśli dostępny)
function showDecorationImage(imagePath) {
    const decorationImageContainer = document.getElementById("decoration-image");
    
    // Sprawdź, czy dekoracja ma przypisane zdjęcie
    if (imagePath) {
        decorationImageContainer.innerHTML = `<img src="${imagePath}" alt="Dekoracja oczka wodnego">`;
    } else {
        decorationImageContainer.innerHTML = ""; // Wyczyść kontener, jeśli brak zdjęcia
    }
}

// Inicjalizacja aplikacji po załadowaniu strony
document.addEventListener("DOMContentLoaded", function() {
    createDecorationButtons();
});