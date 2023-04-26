const tablaMeret = 8; // 8x8-as sakktábla
const tabla = document.getElementById('tabla');

// Loop az oszlopok és sorok létrehozásához
for (let sor = 0; sor < tablaMeret; sor++) {
  for (let oszlop = 0; oszlop < tablaMeret; oszlop++) {
    const cella = document.createElement('div');
    tabla.appendChild(cella);

    // Paritás ellenőrzése az oszlop és sor alapján
    if ((sor + oszlop) % 2 === 0) {
      cella.classList.add('paros');
    } else {
      cella.classList.add('paratlan');
    }

    // Cella tartalmának beállítása (pl. koordináták, bábuk)
    // Ezt a részt még ki kell egészíteni a konkrét sakktábla logikával
  }
}
