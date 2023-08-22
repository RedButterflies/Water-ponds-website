// Definicja klasy DekoracjaOczka
class DekoracjaOczka {
    constructor(nazwa, kolor, opis) {
        this.nazwa = nazwa;
        this.kolor = kolor;
        this.opis = opis;
    }
}

// Funkcja do walidacji formularza
function walidujFormularz() {
    const nazwa = document.getElementById('nazwa').value;
    const kolor = document.getElementById('kolor').value;
    const opis = document.getElementById('opis').value;

    // Walidacja pól formularza
    if (nazwa === '' || kolor === '' || opis === '') {
        alert('Wszystkie pola formularza są wymagane.');
        return false;
    }

    return true;
}

// Funkcja do zapisywania danych do sessionStorage
function zapiszDane() {
    if (walidujFormularz()) {
        const nazwa = document.getElementById('nazwa').value;
        const kolor = document.getElementById('kolor').value;
        const opis = document.getElementById('opis').value;

        const dekoracjaOczka = new DekoracjaOczka(nazwa, kolor, opis);

        let dekoracje = sessionStorage.getItem('dekoracje');
        if (dekoracje) {
            dekoracje = JSON.parse(dekoracje);
        } else {
            dekoracje = [];
        }

        dekoracje.push(dekoracjaOczka);
        sessionStorage.setItem('dekoracje', JSON.stringify(dekoracje));

        alert('Dane zostały zapisane.');
        resetujFormularz();
        wyswietlWszystkieDane();
    }
}

// Funkcja do resetowania formularza
function resetujFormularz() {
    document.getElementById('nazwa').value = '';
    document.getElementById('kolor').value = '';
    document.getElementById('opis').value = '';
}

// Funkcja do usuwania wszystkich danych z sessionStorage
function usunWszystkieDane() {
    if (confirm('Czy na pewno chcesz usunąć wszystkie dane?')) {
        sessionStorage.removeItem('dekoracje');
        alert('Wszystkie dane zostały usunięte.');
        wyswietlWszystkieDane();
    }
}

// Funkcja do usuwania pojedynczych danych z sessionStorage
function usunDane(index) {
    if (confirm('Czy na pewno chcesz usunąć te dane?')) {
        let dekoracje = sessionStorage.getItem('dekoracje');
        if (dekoracje) {
            dekoracje = JSON.parse(dekoracje);
            dekoracje.splice(index, 1);
            sessionStorage.setItem('dekoracje', JSON.stringify(dekoracje));
        }

        alert('Dane zostały usunięte.');
        wyswietlWszystkieDane();
    }
}

// Funkcja do edycji danych
function edytujDane(index) {
    let dekoracje = sessionStorage.getItem('dekoracje');
    if (dekoracje) {
        dekoracje = JSON.parse(dekoracje);
        const dekoracja = dekoracje[index];

        document.getElementById('nazwa').value = dekoracja.nazwa;
        document.getElementById('kolor').value = dekoracja.kolor;
        document.getElementById('opis').value = dekoracja.opis;

        // Usunięcie edytowanej dekoracji
        dekoracje.splice(index, 1);
        sessionStorage.setItem('dekoracje', JSON.stringify(dekoracje));
    }
}

// Funkcja do wyświetlania wszystkich danych z sessionStorage
function wyswietlWszystkieDane() {
    const dekoracje = sessionStorage.getItem('dekoracje');
    const wynikContainer = document.getElementById('wynik-container');

    if (dekoracje) {
        const dekoracjeJSON = JSON.parse(dekoracje);
        let wynikHTML = '';

        dekoracjeJSON.forEach((dekoracja, index) => {
            wynikHTML += `<div class="dekoracja">
                            <p><strong>Nazwa:</strong> ${dekoracja.nazwa}</p>
                            <p><strong>Kolor:</strong> ${dekoracja.kolor}</p>
                            <p><strong>Opis:</strong> ${dekoracja.opis}</p>
                            <button onclick="usunDane(${index})">Usuń</button>
                            <button onclick="edytujDane(${index})">Edytuj</button>
                        </div>`;
        });

        wynikContainer.innerHTML = wynikHTML;
    } else {
        wynikContainer.innerHTML = '<p>Brak danych.</p>';
    }
}
