//recogiendo inputs
const name$$ = document.querySelector(".name");
const architect$$ = document.querySelector(".architect");
const img$$ = document.querySelector(".img");
const year$$ = document.querySelector(".year");
const location$$ = document.querySelector(".location");

// recojo el botón
const button$$ = document.querySelector(".enviar--form");

const añadir = async () => {
  const datosArquitectura = {
    name: name$$.value,
    architect: architect$$.value,
    img: img$$.value,
    year: year$$.value,
    location: location$$.value,

  };
  console.log(datosArquitectura);
  for (const key in datosArquitectura) {
    if(datosArquitectura[key] === ''){
      delete datosArquitectura[key]
    }
  }
  console.log(datosArquitectura);
    await fetch("http://localhost:3000/architectures/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosArquitectura)
    }).catch((error) => console.log('Error añadiendo '));
    window.location.replace('./architectures.html')

  
};

button$$.addEventListener("click", añadir);
