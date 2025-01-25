//Carrusel en contenedor de contenido//
document.addEventListener("DOMContentLoaded", function () {
  const seguimientoCarrusel = document.querySelector(".carousel-track");
  const imagenes = Array.from(document.querySelectorAll(".carousel-track img"));
  const totalImagenes = imagenes.length;
  const imagenesPorVista = 6;
  const velocidadTransicion = 500;
  let indiceActual = imagenesPorVista;

  imagenes.slice(0, imagenesPorVista).forEach(img => {
    const clonar = img.cloneNode(true);
    seguimientoCarrusel.appendChild(clonar);
  });
  imagenes.slice(-imagenesPorVista).forEach(img => {
    const clonar = img.cloneNode(true);
    seguimientoCarrusel.insertBefore(clonar, seguimientoCarrusel.firstChild);
  });

  function actualizarCarrusel() {
    const imageHeight = imagenes[0].clientHeight;
    seguimientoCarrusel.style.transicion = "transform 0.5s ease-in-out";
    seguimientoCarrusel.style.transform = `translateY(-${indiceActual * imageHeight}px)`;
  }

  function moveNext() {
    indiceActual++;
    actualizarCarrusel();

    if (indiceActual >= totalImagenes + imagenesPorVista) {
      setTimeout(() => {
        seguimientoCarrusel.style.transicion = "none";
        indiceActual = imagenesPorVista;
        actualizarCarrusel();
      }, velocidadTransicion);
    }
  }

  function movePrev() {
    indiceActual--;
    actualizarCarrusel();

    if (indiceActual <= 0) {
      setTimeout(() => {
        seguimientoCarrusel.style.transicion = "none";
        indiceActual = totalImagenes;
        actualizarCarrusel();
      }, velocidadTransicion);
    }
  }

  document.querySelector(".next").addEventListener("click", moveNext);
  document.querySelector(".prev").addEventListener("click", movePrev);

  window.addEventListener("resize", actualizarCarrusel);

  setTimeout(() => {
    seguimientoCarrusel.style.transicion = "none";
    actualizarCarrusel();
  }, 50);
});

//Modales para las temporadas//
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const closeModal = document.querySelector(".close");

  const temporadasInfo = {
    "2009": "La primera temporada de Guerrero Ninja Americano se llevó a cabo en Los Ángeles, donde cientos de competidores llegaron a ponerse a prueba en la pista de obstáculos para así calificar y poder obtener una oportunidad de competir en Sasuke 23 en Japón a finales de ese año. El especial se estrenó el 12 de diciembre de 2009 en el canal G4 y fue organizada por G4, Blair Herter y Alison Haislip.",
    "2010": "La segunda temporada se estrenó el 8 de diciembre de 2010 en G4 y concluyó el 2 de enero de 2011. Inicio en Venice Beach donde 300 competidores participaron en la competencia. Los 15 semifinalistas pasaron al Ninja Warrior Boot Camp en las remotas montañas de California, donde compitieron en una serie de desafíos de equipo. En el final de temporada de American Ninja Warrior 2 la final se trasladó y formó parte de Sasuke 26 en el Monte Midoriyama en Japón. Ningún competidor llegó más allá de la etapa 3. Esta temporada fue nuevamente conducida por Matt Iseman y Jimmy Smith, con Alison Haislip como reportero de campo.",
    "2011": "La tercera temporada comenzó a transmitirse el 31 de julio de 2011 en G4 y concluyó el 22 de agosto de 2011 con una emisión especial de dos horas en horario estelar a través de NBC. Las pruebas tuvieron lugar en mayo de 2011 en Venice Beach. Después de las pruebas, los 15 mejores competidores compitieron en Ninja Warrior Boot Camp, de los cuales solo los 10 mejores pasaron a competir en Japón para la fase final de la competición como parte de Sasuke 27 y así tener la oportunidad de convertirse en el primer estadounidense en conquistar el concurso y ganar un contrato de patrocinio de US$500 000 con K-Swiss. No hubo competidores que llegaran más allá de la etapa 3.",
    "2012": "La cuarta temporada de Guerrero Ninja Americano comenzó a transmitirse el 20 de mayo de 2012 en G4 y NBC. Había seis competiciones regionales celebradas en tres lugares: Venice Beach (suroeste y noroeste), Dallas (oeste y sur), y Miami (noreste y sureste) que determinaban los 100 competidores que participarían en las rondas de clasificación. El ganador de esta temporada recibiría US$500 000 y el codiciado título de Guerrero Ninja Americano. La final de temporada, celebrada en Las Vegas, fue la primera vez en que la etapa final del Monte Midoriyama se llevó a cabo en suelo estadounidense. Los vídeos de presentación para la cuarta temporada de Guerrero Ninja Americano se habían recopilado desde el 25 de enero de 2012.",
    "2013": "La quinta temporada de Guerrero Ninja Americano se estrenó el 30 de junio de 2013 en G4 con posteriores transmisiones a través de la cadena NBC y G4. Las competiciones regionales se realizaron en Venice Beach, Baltimore, Miami y Denver. Las pruebas para la temporada comenzaron en febrero de 2013 y concluyeron con las rondas regionales que tuvieron lugar en mayo de ese año. La final se llevó a cabo una vez más en Las Vegas. La temporada fue nuevamente conducida por Matt Iseman, mientras que dos recién llegados se unían al panel; Akbar Gbaja-Biamila como coanfitrión y Jenn Brown como reportera de campo. Nadie fue capaz de completar la etapa 3, pero Brian Arnold cayó en el último obstáculo, la Barra Voladora, convirtiéndose en el concursante estadounidense que más lejos había llegado en el Monte Midoriyama desde que Kane Kosugi llegó a la etapa final en Sasuke 8.",
    "2014": "La sexta temporada de American Ninja Warrior se estrenó en NBC el 26 de mayo de 2014. Matt Iseman regresó para su sexta temporada como presentador, mientras que Akbar Gbaja-Biamila y Jenn Brown regresaron para su segunda temporada. Al igual que en temporadas anteriores, el ganador recibe $500,000 y el codiciado título de American Ninja Warrior.",
    "2015": "La séptima temporada de Guerrero Ninja Americano se estrenó el 25 de mayo de 2015 por NBC. Los anfitriones Matt Iseman y Akbar Gbaja-Biamila volvieron a sus respectivos puestos, mientras que la recién llegada Kristine Leahy se unía como reportera de campo, en sustitución de Jenn Brown. Además, el gran premio de esta temporada aumentó de US$500 000 a US$1 000 000. La temporada concluyó el 14 de septiembre de 2015, con una victoria total: Geoff Britten fue el primero en llegar y superar la etapa 4, sin embargo, Isaac Caldiero logró completar el ascenso con cuerda de la etapa 4 en un tiempo más rápido y fue galardonado con el gran premio de US$1 000 000 y el título de «Primer Guerrero Ninja Americano».",
    "2016": "Guerrero Ninja Americano se ha renovado para una octava temporada consecutiva que se estrenó en 2016. El productor ejecutivo Kent Weed ha declarado que se añadieron nuevos obstáculos y que también hubo algunos cambios en el concurso. La temporada 8 de American Ninja Warrior comenzó el 1 de junio de 2016, en la NBC, con episodios bis que se emitieron al día siguiente en Esquire Network. Las competiciones regionales se celebraron en Los Ángeles, Atlanta, Indianápolis, Oklahoma City, y Filadelfia, con 28 nuevos obstáculos. Más del 40 por ciento más de mujeres se registraron para la temporada 8 en comparación con la temporada anterior. Además, el premio en metálico para los posibles ganadores de la Etapa 4 ahora se dividió por igual entre los competidores que completan la subida de la cuerda en menos de 30 segundos.",
    "2017": "La temporada 9 de American Ninja Warrior se programó para comenzar el 12 de junio de 2017, en NBC. El estreno fue precedido con un episodio especial, Celebrity Ninja Warrior el 25 de mayo de 2017, el Día de la Nariz Roja de los Estados Unidos, que será seguido por un especial USA vs. the World el 4 de junio. Un récord de 41 competidores completaron con éxito la Etapa 1 durante las Finales Nacionales, incluidos David Campbell, Ryan Stratis, Drew Drechsel y Allyssa Beird, quien se convirtió en la segunda mujer en completarla. La etapa 2 vio a todos los competidores eliminar menos a Joe Moravsky, Sean Bryan y Najee Richardson. Sin embargo, ninguno pasaría a completar la Etapa 3. Bryan y Richardson cayeron en el Ultimate Cliffhanger, mientras que Moravsky cayó sobre el penúltimo obstáculo y se convirtió en el Último Ninja en pie.",
    "2018": "La décima temporada de serie de competición deportiva American Ninja Warrior estrenada el 30 de mayo de 2018 por NBC. Los anfitriones Matt Iseman y Akbar Gbaja-Biamila vuelven para su octava y sexta temporada, respectivamente, junto a la periodista desde el terreno Kristine Leahy que regresa para su cuarta temporada. Antes de la temporada de estreno, NBC emitió dos episodios especiales. El 17 de mayo de 2018, se emitió un especial de All Stars de dos horas, mientras que el 24 de mayo de 2018, la segunda edición anual de Celebrity Ninja Warrior: Red Nose Day donde celebridades destacados recaudan dinero para la caridad, bajo cortesía de Comcast.",
    "2019": "La undécima temporada de American Ninja Warrior se estrenó el 29 de mayo de 2019 en NBC . Las competencias de clasificación y finales de la ciudad se llevaron a cabo en Los Ángeles , Atlanta , Oklahoma City , Seattle/Tacoma , lo que marcó la primera vez que se llevó a cabo un curso en el noroeste del Pacífico , Baltimore y Cincinnati . El circuito vuelve con nuevos giros en las rondas clasificatorias, incluidos cambios en el Mega Wall y una nueva competencia de recompensa, la Power Tower. Matt Iseman y Akbar Gbaja-Biamila regresaron para sus respectivas décimas y séptimas temporadas, mientras que la recién llegada Zuri Hall se unió al dúo como reportera secundaria, reemplazando a Kristine Leahy . El finalista del circuito de la temporada 7 y ganador de la Victoria total Geoff Britten participó, lo que marcó su regreso a la competencia en la serie, pero cayó en la clasificación de Seattle/Tacoma, lo que marcó el final de su temporada.",
    "2020": "El 22 de enero de 2020, la serie se renovó por una duodécima temporada, que se estrenó el 7 de septiembre de 2020. Las ciudades calificadas originalmente incluían regresos a Los Ángeles y St. Louis con una nueva ubicación, Washington D. C., con las Finales Nacionales inicialmente establecidas. que se celebrará de nuevo en Las Vegas. La producción de la temporada se pospuso debido a la Pandemia de COVID-19, y el rodaje se interrumpió en medio de la producción del programa, justo un día antes de que comenzara. El 12 de agosto de 2020, se anunció que la temporada se estrenaría el 7 de septiembre del 2020. La temporada, que consta de ocho episodios, se filmó en el estadio The Dome at America's Center en St. Louis, Misuri; ANW fue la primera serie de NBC en completar una temporada completa de episodios durante la pandemia actual.",
    "2021": "En noviembre del 2020, se anunció que la serie se había renovado para una decimotercera temporada, la cual fue estrenada el 31 de mayo del 2021. La temporada constó de 12 episodios, y fue conducida, como la temporada anterior, por Matt Iseman, Akbar Gbajabiamila y Zuri Hall. Las similitudes entre esta temporada y la anterior, incluyen el hecho de que la filmación se llevó a cabo en lugares limitados y no hubo público durante la grabación. La serie también fue una temporada completa, a diferencia de la temporada abreviada de 8 episodios vista en 2020 debido a la pandemia de COVID-19. El casting para esta temporada comenzó en noviembre y diciembre del 2020, y el rodaje se llevó a cabo a partir de marzo del 2021, íntegramente en Tacoma, Washington y en Los Ángeles, California, y las finales nacionales se filmaron de vuelta en Las Vegas, tras 1 año. Los premios se vuelven a restaurar con respecto a las temporadas normales, donde el ganador se lleva US$1 000 000, y el Último ninja en pie, US$100 000.",
    "2022": "A finales de 2021, se anunció la renovación a una decimocuarta temporada, la cual se estrenó el 6 de junio del 2022 en NBC. Al igual que la temporada pasada, constó de 12 episodios, y fue conducida por Matt Iseman, Akbar Gbajabiamila y Zuri Hall. El rodaje de la temporada es idéntica, ya que contó con menos ciudades visitadas y redujo la mayor parte de la audiencia durante la grabación en vivo debido a la pandemia de COVID-19. El casting para esta temporada se publicó el 6 de febrero de 2022, y la filmación se llevó a cabo a partir del 20 de marzo de 2022 y el 17 de mayo de 2022, íntegramente en las ciudades de San Antonio, Texas; con las semifinales de vuelta en Los Ángeles, California; y las finales nacionales de vuelta en Las Vegas. Contrariamente, el requisito oficial de edad es de 19 años, aunque los concursantes de 15 a 19 años fueron invitados como invitados especiales.",
    "2023": "La decimoquinta temporada de American Ninja Warrior se estrenó el 5 de junio de 2023 en NBC . Es un spin-off de la serie de telerrealidad japonesa Sasuke y está presentado por Matt Iseman , Akbar Gbaja-Biamila y Zuri Hall . Esta temporada, tanto la clasificación como las semifinales se llevaron a cabo íntegramente en Universal City en Los Ángeles , mientras que las finales nacionales regresaron a su lugar habitual en Las Vegas . Esta temporada estableció un nuevo récord con 8 competidores que avanzaron a la Etapa 4, y también coronó al segundo (tercer registrado) ganador del gran premio, Vance Walker, quien no solo se convirtió en el cuarto (quinto registrado) ninja en lograr la Victoria total, sino que anteriormente había ganado American Ninja Warrior Junior dos veces. En la misma temporada, Daniel Gil se convirtió en el tercer (cuarto registrado) ninja en lograr la victoria total, pero completó la escalada de la cuerda más lento que Walker.",
    "2024": "La decimosexta temporada de American Ninja Warrior se estrenó el 3 de junio de 2024 en NBC . Es un spin-off de la serie de telerrealidad japonesa Sasuke y está presentado por Matt Iseman , Akbar Gbaja-Biamila y Zuri Hall . Por primera vez en la historia, un competidor se convirtió en el primer ganador del gran premio en dos ocasiones consecutivas: Vance Walker, quien se convirtió en el primer ninja en lograr la Victoria total dos veces. En la misma temporada, Caleb Bergstrom se convirtió en el quinto ninja (sexto registrado) en lograr la victoria total, pero completó la escalada de cuerda un poco más de un segundo más lento que Walker."
  };

  document.querySelectorAll(".lista-temporadas li").forEach((item) => {
    item.addEventListener("click", () => {
      const year = item.getAttribute("data-year");
      if (year && temporadasInfo[year]) {
        modalTitle.textContent = `Temporada ${year}`;
        modalDescription.textContent = temporadasInfo[year];
        modal.style.display = "block";
      }
    });
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});