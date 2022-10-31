const select$$ = document.querySelector(".select");
const selectButton$$ = document.querySelector(".select--button");
const form$$ = document.querySelector(".form--box");
const sendButton$$ = document.querySelector(".enviar--form");

const peticion = () => {
  fetch("http://localhost:3000/architectures/getbyname/" + select$$.value)
    .then((res) => res.json())
    .then((architectures) => getArchitecture(architectures));
  form$$.classList.remove("hide");
};

const getArchitecture = (architecture) => {
  name$$.value = architecture.name;
  architect$$.value = architecture.architect;
  year$$.value = architecture.year;
  img$$.value = architecture.img;
  location$$.value = architecture.location;
  architectureInfo$$ = architecture;
};

const getAllArchitectures = () => {
  fetch("http://localhost:3000/architectures")
    .then((res) => res.json())
    .then((architectures) => fillSelect(architectures));
};
const fillSelect = (architectures) => {
  for (const architecture of architectures) {
    const option$$ = document.createElement("option");

    option$$.value = architecture.name;
    option$$.textContent = architecture.name;

    select$$.appendChild(option$$);
  }
};

let architectureInfo$$ = [];
const name$$ = document.querySelector(".name");
const architect$$ = document.querySelector(".architect");
const img$$ = document.querySelector(".img");
const year$$ = document.querySelector(".year");
const location$$ = document.querySelector(".location");

const edit = async () => {
  architectureInfo$$.name = name$$.value;
  architectureInfo$$.architect = architect$$.value;
  architectureInfo$$.img = img$$.value;
  architectureInfo$$.location = location$$.value;
  architectureInfo$$.year = year$$.value;

  const datosArquitectura = {
    name: name$$.value,
    architect: architect$$.value,
    img: img$$.value,
    year: year$$.value,
    location: location$$.value,
  };
  console.log(architectureInfo$$._id)
    await fetch("http://localhost:3000/architectures/edit/" + architectureInfo$$._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosArquitectura),
    }).catch((error) => console.log("Error"));
    window.location.replace('./architectures.html')
    console.log("Todo ha ido bien, arquitectura editada");

};

selectButton$$.addEventListener("click", peticion);

getAllArchitectures();

sendButton$$.addEventListener("click", edit);
