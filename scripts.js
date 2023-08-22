   function saveData() {
    var lightingInput1 = document.getElementById("lighting1");
    var lightingInput2 = document.getElementById("lighting2");

    var nameError = document.getElementById("nameError");
    var emailError = document.getElementById("emailError");
    var phoneError = document.getElementById("phoneError");
    var countryError = document.getElementById("countryError");
    var zipError = document.getElementById("zipError");
    var locationError = document.getElementById("locationError");
    var sizeError = document.getElementById("sizeError");
    var depthError = document.getElementById("depthError");
    var lightingError = document.getElementById("lightingError");
    var termsError = document.getElementById("termsError");

    var product = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      country: document.getElementById("country").value,
      city: document.getElementById("city").value,
      zip: document.getElementById("zip").value,
      location: document.getElementById("location").value,
      size: document.getElementById("size").value,
      depth: document.getElementById("depth").value,
      lighting: document.querySelector('input[name="lighting"]:checked').value,
      features: Array.from(document.getElementById("features").selectedOptions).map(option => option.value),
      comments: document.getElementById("comments").value
    };

    if (validateData(product)) {
      var data = getDataFromLocalStorage();
      data.push(product);
      saveDataToLocalStorage(data);

      alert("Dane zapisane");

      resetForm();
    }
  }

  function displayData() {
    var data = getDataFromLocalStorage();
    var dataItems = document.getElementById("dataItems");
    dataItems.innerHTML = "";

    if (data.length === 0) {
      document.getElementById("emptyDataMessage").style.display = "block";
      document.getElementById("dataTable").style.display = "none";
    } else {
      document.getElementById("emptyDataMessage").style.display = "none";
      document.getElementById("dataTable").style.display = "table";

      for (var i = 0; i < data.length; i++) {
        var product = data[i];
        var row = document.createElement("tr");
        row.innerHTML = "<td>" + "Imię: " + product.name + "<\/td>" +
          "<td>" + "Email: " + product.email + "<\/td>" +
          "<td>" + "Nr telefonu:" + product.phone + "<\/td>" +
          "<td>" + "Kraj: " + product.country + "<\/td>" +
          "<td>" + "Miasto: " + product.city + "<\/td>" +
          "<td>" + "Kod pocztowy: " + product.zip + "<\/td>" +
          "<td>" + "Położenie: " + product.location + "<\/td>" +
          "<td>" + "Rozmiar w m2: " + product.size + "<\/td>" +
          "<td>" + "Głębokość w centymetrach: " + product.depth + "<\/td>" +
          "<td>" + "Oświetlenie: " + product.lighting + "<\/td>" +
          "<td>" + "Dodatkowe cechy: " + product.features + "<\/td>" +
          "<td>" + "Dodatkowe uwagi: " + product.comments + "<\/td>" +
          "<td><button onclick='editProduct(" + i + ")'>Edytuj<\/button>" +
          "<button onclick='deleteProduct(" + i + ")'>Usuń<\/button><\/td>";
        dataItems.appendChild(row);
      }
    }
  }

  function editProduct(index) {
    var data = getDataFromLocalStorage();
    var product = data[index];

    var productName = prompt("Podaj nowe imię: ", product.name);
    var productEmail = prompt("Podaj nowy email: ", product.email);
    var productPhone = prompt("Podaj nowy numer telefonu: ", product.phone);
    var productCountry = prompt("Podaj nowy kraj: ", product.country);
    var productCity = prompt("Podaj nowe miasto: ", product.city);
    var productZip = prompt("Podaj nowy kod pocztowy: ", product.zip);
    var productLocation = prompt("Podaj nowe położenie: ", product.location);
    var productSize = prompt("Podaj nowy rozmiar w m2: ", product.size);
    var productLighting = prompt("Czy chcesz, aby Twoje oczko miało oświetlenie", product.lighting);
    var productFeatures = prompt("Podaj dodatkowe cechy (max 4): ", product.features);
    var productComments = prompt("Podaj nowe dodatkowe informacje: ", product.comments);

    product.name = productName;
    product.email = productEmail;
    product.phone = productPhone;
    product.country = productCountry;
    product.city = productCity;
    product.zip = productZip;
    product.location = productLocation;
    product.size = productSize;
    product.lighting = productLighting;
    product.features = productFeatures;
    product.comments = productComments;

    if (validateData(product)) {
      saveDataToLocalStorage(data);
      displayData();
      alert("Edycja przebiegła poprawnie");
    } else {
      alert("Wprowadzono niepoprawne dane, spróbuj ponownie");
    }
  }

  function clearData() {
    localStorage.removeItem("data");
    alert("Zapisane dane zostały usunięte.");
    displayData();
  }

  function getDataFromLocalStorage() {
    var data = localStorage.getItem("data");
    if (data) {
      return JSON.parse(data);
    }
    return [];
  }

  function saveDataToLocalStorage(data) {
    localStorage.setItem("data", JSON.stringify(data));
  }

  function resetForm() {
    document.getElementById("dataForm").reset();
  }

  function validateData(product) {
    var regImie = /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s]{2,}$/;
    var regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    var regPhone = /[0-9]{9}/;
    var regZip = /[0-9]{2}-[0-9]{3}/;

    var isValid = true;

    if (!regImie.test(product.name)) {
      alert("Wprowadź poprawne imię, składające się tylko z liter!");
      isValid = false;
    }

    if (!regEmail.test(product.email)) {
      alert("Wprowadź poprawny email w formacie abc@abc.abc, niezawierający polskich znaków!");
      isValid = false;
    }

    if (!regPhone.test(product.phone)) {
      alert("Wprowadź poprawny numer telefonu, składający się z 9 cyfr, bez numeru kierunkowego!");
      isValid = false;
    }

    if (product.country === "") {
      alert("Wybierz państwo!");
      isValid = false;
    }

    if (!regZip.test(product.zip)) {
      alert("Wprowadź poprawny kod pocztowy (np. 00-000)!");
      isValid = false;
    }

    if (product.location === "") {
      alert("Wprowadź położenie oczka wodnego!");
      isValid = false;
    }

    if (product.size < 1) {
      alert("Wprowadź poprawny rozmiar wymarzonego oczka wodnego (większy lub równy 1)!");
      isValid = false;
    }

    if (product.depth < 1) {
      alert("Wprowadź poprawną głębokość wymarzonego oczka wodnego (większą lub równą 1)!");
      isValid = false;
    }

    return isValid;
  }

  function deleteProduct(index) {
    var data = getDataFromLocalStorage();
    data.splice(index, 1);
    saveDataToLocalStorage(data);
    displayData();
  }

  function searchData() {
    var input = document.getElementById("searchInput").value.toLowerCase();
    var data = getDataFromLocalStorage();
    var filteredData = [];

    for (var i = 0; i < data.length; i++) {
      var product = data[i];
      var productName = product.name.toLowerCase();

      if (productName.includes(input)) {
        filteredData.push(product);
      }
    }

    displayFilteredData(filteredData);
  }

  function displayFilteredData(filteredData) {
    var dataItems = document.getElementById("dataItems");
    dataItems.innerHTML = "";

    if (filteredData.length === 0) {
      document.getElementById("emptyDataMessage").style.display = "block";
      document.getElementById("dataTable").style.display = "none";
    } else {
      document.getElementById("emptyDataMessage").style.display = "none";
      document.getElementById("dataTable").style.display = "table";

      for (var i = 0; i < filteredData.length; i++) {
        var product = filteredData[i];
        var row = document.createElement("tr");
        row.innerHTML =
          "<td>Imię: " +
          product.name +
          "</td>" +
          "<td>Email: " +
          product.email +
          "</td>" +
          "<td>Nr telefonu: " +
          product.phone +
          "</td>" +
          "<td>Kraj: " +
          product.country +
          "</td>" +
          "<td>Miasto: " +
          product.city +
          "</td>" +
          "<td>Kod pocztowy: " +
          product.zip +
          "</td>" +
          "<td>Położenie: " +
          product.location +
          "</td>" +
          "<td>Rozmiar w m2: " +
          product.size +
          "</td>" +
          "<td>Głębokość w centymetrach: " +
          product.depth +
          "</td>" +
          "<td>Oświetlenie: " +
          product.lighting +
          "</td>" +
          "<td>Dodatkowe cechy: " +
          product.features +
          "</td>" +
          "<td>Dodatkowe uwagi: " +
          product.comments +
          "</td>" +
          "<td><button onclick='editProduct(" +
          i +
          ")'>Edytuj</button>" +
          "<button onclick='deleteProduct(" +
          i +
          ")'>Usuń</button></td>";
        dataItems.appendChild(row);
      }
    }
  }
  
  var wprowadzoneDaneList = [];

function sprawdzPole(pole_id, obiektRegex) {
  var obiektPole = document.getElementById(pole_id);
  if (!obiektRegex.test(obiektPole.value)) return false;
  else {
    var wprowadzoneDane = obiektPole.value;
    wprowadzoneDaneList.push(wprowadzoneDane);
    return true;
  }
}



function validateForm() {
  var ok = true;
  var regImie = /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s]{2,}$/;
  var regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  var lightingInput1 = document.getElementById("lighting1");
  var lightingInput2 = document.getElementById("lighting2");

  var nameError = document.getElementById("nameError");
  var emailError = document.getElementById("emailError");
  var phoneError = document.getElementById("phoneError");
  var countryError = document.getElementById("countryError");
  var zipError = document.getElementById("zipError");
  var locationError = document.getElementById("locationError");
  var sizeError = document.getElementById("sizeError");
  var depthError = document.getElementById("depthError");
  var lightingError = document.getElementById("lightingError");
  var termsError = document.getElementById("termsError");

  // Walidacja pola Imię
  if (!sprawdzPole("name", regImie)) {
    nameError.textContent = "Wprowadź poprawne imię, składające się tylko z liter!";
    ok = false;
  } else {
    nameError.textContent = "";
  }

  // Walidacja pola Email
  if (!sprawdzPole("email", regEmail)) {
    emailError.textContent = "Wprowadź poprawny email w formacie abc@abc.abc, niezawierający polskich znaków!";
    ok = false;
  } else {
    emailError.textContent = "";
  }

  // Walidacja pola Telefon
  if (!sprawdzPole("phone", /[0-9]{9}/)) {
    phoneError.textContent = "Wprowadź poprawny numer telefonu, składający się z 9 cyfr, bez numeru kierunkowego!";
    ok = false;
  } else {
    phoneError.textContent = "";
  }

  // Walidacja pola Państwo
  var countryInput = document.getElementById("country");
  if (countryInput.value === "") {
    countryError.textContent = "Wybierz państwo!";
    ok = false;
  } else {
    countryError.textContent = "";
  }

  // Walidacja pola Kod pocztowy
  if (!sprawdzPole("zip", /[0-9]{2}-[0-9]{3}/)) {
    zipError.textContent = "Wprowadź poprawny kod pocztowy (np. 00-000)!";
    ok = false;
  } else {
    zipError.textContent = "";
  }

  // Walidacja pola Położenie
  if (!sprawdzPole("location", /.+/)) {
    locationError.textContent = "Wprowadź położenie oczka wodnego!";
    ok = false;
  } else {
    locationError.textContent = "";
  }

  // Walidacja pola Rozmiar
  var sizeInput = document.getElementById("size");
  if (sizeInput.value < 1) {
    sizeError.textContent = "Wprowadź poprawny rozmiar wymarzonego oczka wodnego (większy lub równy 1)!";
    ok = false;
  } else {
    sizeError.textContent = "";
  }

  // Walidacja pola Głębokość
  var depthInput = document.getElementById("depth");
  if (depthInput.value < 1) {
    depthError.textContent = "Wprowadź poprawną głębokość wymarzonego oczka wodnego (większą lub równą 1)!";
    ok = false;
  } else {
    depthError.textContent = "";
  }

  // Walidacja pola Oświetlenie
  var lightingInput1 = document.getElementById("lighting1");
  var lightingInput2 = document.getElementById("lighting2");
  if (!lightingInput1.checked && !lightingInput2.checked) {
    lightingError.textContent = "Wybierz opcję oświetlenia!";
    ok = false;
  } else {
    lightingError.textContent = "";
  }

  // Walidacja pola Akceptuję regulamin
  var termsInput = document.getElementById("terms");
  if (!termsInput.checked) {
    termsError.textContent = "Musisz zaakceptować regulamin!";
    ok = false;
  } else {
    termsError.textContent = "";
  }

  if (!ok) {
    alert("Formularz zawiera niepoprawne dane. Proszę poprawić błędy.");
  }else{
  var lightingInput1 = document.getElementById("lighting1");
  var lightingInput2 = document.getElementById("lighting2");
   var podsumowanie = "Wprowadzone dane:\n\n";
  podsumowanie += "- Imię: " + document.getElementById("name").value + "\n";
  podsumowanie += "- Email: " + document.getElementById("email").value + "\n";
  podsumowanie += "- Telefon: " + document.getElementById("phone").value + "\n";
  podsumowanie += "- Państwo: " + document.getElementById("country").value + "\n";
  podsumowanie += "- Miasto: " + document.getElementById("city").value + "\n";
  podsumowanie += "- Kod pocztowy: " + document.getElementById("zip").value + "\n";
  podsumowanie += "- Położenie: " + document.getElementById("location").value + "\n";
  podsumowanie += "- Rozmiar: " + document.getElementById("size").value + "\n";
  podsumowanie += "- Głębokość: " + document.getElementById("depth").value + "\n";
  podsumowanie += "- Oświetlenie: ";
  if (lightingInput1.checked) {
     podsumowanie+= lightingInput1.value+"\n";
  }  else{
    podsumowanie += lightingInput2.value +"\n";
  }
   podsumowanie += "-Dodatkowe cechy: ";
 var selectMultiple = document.getElementById("features");
  var selectedOptions = selectMultiple.selectedOptions;
  if (selectedOptions.length > 0) {
    for (var i = 0; i < selectedOptions.length; i++) {
      podsumowanie += selectedOptions[i].value + ", ";
    }
	}
  podsumowanie += "\n";
  podsumowanie += "- Dodatkowe uwagi: " + document.getElementById("comments").value + "\n";
  alert(podsumowanie);
}
  return ok;
}

$(document).ready(function() {
  $('.carousel').click({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true
  });
});

$(document).ready(function() {
  $('.dropdown-toggle').click(function() {
    $('.dropdown-menu').slideToggle();
  });
});

function openPage() {
      window.location.href = 'http://localhost/testajax/';
    }