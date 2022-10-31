const gallery$$ = document.querySelector(".gallery");

const peticion = () => {
  fetch("http://localhost:3000/gallery")
    .then((res) => res.json())
    .then((galleries) => renderGallery(galleries));
};

const renderGallery = (galleries) => {
  for (const gallery of galleries) {
    console.log(gallery);

    const title$$ = document.createElement("div");
    const name$$ = document.createElement("h3");
    const place$$ = document.createElement("h3");
    const paintingsBox$$ = document.createElement("div");
    const paintingBox$$ = document.createElement("div");
    const sectionPainting$$ = document.createElement("h3");
    const sculpturesBox$$ = document.createElement("div");
    const sculptureBox$$ = document.createElement("div");
    const sectionSculptures$$ = document.createElement("h3");
    const div$$ = document.createElement("div");

    name$$.textContent = gallery.name;
    place$$.textContent = gallery.location;
    title$$.classList.add("title");
    paintingsBox$$.textContent = gallery.paintings;
    sectionPainting$$.classList.add("sectionP");
    sectionPainting$$.textContent = "Pinturas";
    sculpturesBox$$.textContent = gallery.sculptures;
    sectionSculptures$$.classList.add("sectionS");
    sectionSculptures$$.textContent = "Esculturas";
    div$$.classList.add("container");

    title$$.appendChild(name$$);
    title$$.appendChild(place$$);
    document.body.insertBefore(title$$, gallery$$);
    document.body.insertBefore(div$$, gallery$$);
    div$$.appendChild(sectionPainting$$);
    gallery$$.appendChild(paintingBox$$);
    div$$.appendChild(sectionSculptures$$);
    gallery$$.appendChild(sculptureBox$$);

    const paintings = gallery.paintings;
    for (const painting of paintings) {
      console.log(painting);
      const cuadro$$ = document.createElement("div");
      const paintingName$$ = document.createElement("h4");
      const divImg$$ = document.createElement("div");
      const paintingImg$$ = document.createElement("img");
      const paintingInfo$$ = document.createElement("div");
      const paintingPainter$$ = document.createElement("span");
      const paintingLocation$$ = document.createElement("span");
      const paintingYear$$ = document.createElement("span");

      cuadro$$.classList.add("cuadro");
      paintingName$$.textContent = painting.name;
      paintingName$$.classList.add('workName')
      divImg$$.classList.add("imgContainer");
      paintingImg$$.src = painting.img;
      paintingPainter$$.textContent = painting.painter;
      paintingInfo$$.classList.add("info");
      paintingLocation$$.classList.add("location");
      paintingPainter$$.classList.add("painter");
      paintingYear$$.classList.add("year");
      paintingLocation$$.textContent = painting.location;
      paintingYear$$.textContent = painting.year;
      paintingBox$$.classList.add("paintingBox");

      cuadro$$.appendChild(paintingName$$);
      divImg$$.appendChild(paintingImg$$);
      cuadro$$.appendChild(divImg$$);
      cuadro$$.appendChild(paintingInfo$$);
      paintingInfo$$.appendChild(paintingPainter$$);
      paintingInfo$$.appendChild(paintingLocation$$);
      paintingInfo$$.appendChild(paintingYear$$);
      paintingBox$$.appendChild(cuadro$$);
    }
    let sculptures = gallery.sculptures;
    for (const sculpture of sculptures) {
      console.log(sculpture);
      const cuadro$$ = document.createElement("div");
      const sculptureName$$ = document.createElement("h4");
      const divImg$$ = document.createElement("div");
      const sculptureImg$$ = document.createElement("img");
      const sculptureInfo$$ = document.createElement("div");
      const sculptureSculptor$$ = document.createElement("span");
      const sculpturesLocation$$ = document.createElement("span");
      const sculpturesYear$$ = document.createElement("span");

      cuadro$$.classList.add("cuadro");
      sculptureName$$.textContent = sculpture.name;
      divImg$$.classList.add("imgContainer");
      sculptureImg$$.src = sculpture.img;
      sculptureSculptor$$.textContent = sculpture.sculptor;
      sculptureInfo$$.classList.add("info");
      sculpturesLocation$$.classList.add("location");
      sculptureSculptor$$.classList.add("painter");
      sculpturesYear$$.classList.add("year");
      sculpturesLocation$$.textContent = sculpture.location;
      sculpturesYear$$.textContent = sculpture.year;
      sculptureBox$$.classList.add("sculptureBox");

      cuadro$$.appendChild(sculptureName$$);
      divImg$$.appendChild(sculptureImg$$);
      cuadro$$.appendChild(divImg$$);
      cuadro$$.appendChild(sculptureInfo$$);
      sculptureInfo$$.appendChild(sculptureSculptor$$);
      sculptureInfo$$.appendChild(sculpturesLocation$$);
      sculptureInfo$$.appendChild(sculpturesYear$$);
      sculptureBox$$.appendChild(cuadro$$);
    }
  }
};

peticion();
