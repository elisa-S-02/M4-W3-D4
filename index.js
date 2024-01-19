const ogniUtente = (utente) => {
  main.innerHTML += `
        <div class="ms-3 card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Name: ${utente.name}</h5>
          <p class="card-text">Username: ${utente.username}</p>
          <p class="card-text">Email: ${utente.email.toLowerCase()}</p>
        </div>
      </div>`;
};
const valRicevuto = (val, data, ricerca) => {
  if (val === "username" && ricerca !== "") {
    main.innerHTML = "";
    data.map((user) => {
      if (user.username.toLowerCase().includes(ricerca.toLowerCase())) {
        ogniUtente(user);
      }
    });
  } else if (val === "email" && ricerca !== "") {
    main.innerHTML = "";
    data.map((user) => {
      if (user.email.toLowerCase().includes(ricerca.toLowerCase())) {
        ogniUtente(user);
      }
    });
  } else if (val === "name" && ricerca !== "") {
    console.log(data.name);
    main.innerHTML = "";
    data.map((user) => {
      if (user.name.toLowerCase().includes(ricerca.toLowerCase())) {
        ogniUtente(user);
      }
    });
  } else if (ricerca === "") {
    main.innerHTML += `<h1 class="w-100 m-3" >Cerca qualcuno!</h1>`;
  }
};

const url = "https://jsonplaceholder.typicode.com/users";
const main = document.getElementById("main");
const selectDropdown = document.getElementById("dropdown-select");
const input = document.getElementById("input");

const getData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    let valSelezionato = "username";
    let valCreato = "";
    selectDropdown.addEventListener("change", function () {
      valSelezionato = selectDropdown.value;
    });

    input.addEventListener("change", () => {
      valCreato = input.value;
      valRicevuto(valSelezionato, data, valCreato);

      if (input.value === "") {
        main.innerHTML = "";
        data.map((user) => {
          ogniUtente(user);
        });
      }
    });

    valRicevuto(valSelezionato, data, valCreato);

    data.map((user) => {
      ogniUtente(user);
    });
  } catch (err) {
    console.error(err);
  }
};

getData();
