const exposicion$$ = document.querySelector('.exposicion');


const peticion = () => {
      fetch("http://localhost:3000/architectures")
      .then((res) => res.json())
      .then((architectures) => renderArchitectures(architectures));
};

const renderArchitectures = (architectures) => {

    for (const architecture of architectures) {

        const cuadro$$ = document.createElement('div');
        const name$$ = document.createElement('h3');
        const img$$ = document.createElement('img');
        const info$$ = document.createElement('div');
        const author$$ = document.createElement('span')
        const location$$ = document.createElement('span')
        const year$$ = document.createElement('span')

        cuadro$$.classList.add('cuadro');
        name$$.textContent = architecture.name;
        img$$.src = architecture.img;
        info$$.classList.add('info')
        author$$.textContent = architecture.architect;
        author$$.classList.add('architect')
        location$$.textContent = architecture.location;
        location$$.classList.add('location')
        year$$.textContent= architecture.year;
        year$$.classList.add('year')

        cuadro$$.appendChild(name$$);
        cuadro$$.appendChild(img$$)
        cuadro$$.appendChild(info$$)
        info$$.appendChild(author$$);
        info$$.appendChild(location$$);
        info$$.appendChild(year$$);
        exposicion$$.appendChild(cuadro$$)
        
    }
}

peticion();