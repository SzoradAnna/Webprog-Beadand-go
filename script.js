const tablaMeret = 10; // 8x8-as tábla
const tabla = document.getElementById('tabla');
var cella;


function tablageneralas(){
    for (let sor = 0; sor < tablaMeret; sor++) {
        for (let oszlop = 0; oszlop < tablaMeret; oszlop++) {
            cella = document.createElement('div');
            tabla.appendChild(cella);
            cella.id=sor+":"+oszlop;
            if ((sor + oszlop) % 2 == 0) {
                cella.classList.add('paros');
                
              } else {
                cella.classList.add('paratlan');
                
              }
        }

    }
}

function babukgeneralasa(){
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            cella=document.getElementById(i+":"+j);
            if ((i == 0 || i == 1  || i == 2) && cella.classList.contains("paros")) {

                
                var img = document.createElement("img");
                img.src = "feher.png";
                img.style.height= "50px";
                img.style.width="50px";
                cella.appendChild(img);
                img.classList.add("feher");
            }
            else if((i == 7 || i == 8 || i == 9) && cella.classList.contains("paros")) {
                
                var img = document.createElement("img");
                img.src = "fekete.png";
                img.style.height= "50px";
                img.style.width="50px";
                cella.appendChild(img);
                img.classList.add("fekete");
            } 
            
        }
    }
}


// Ellenőrzi, hogy a mezőn van-e bábu
function vanBabu(sor, oszlop) {
    var cella = document.getElementById(sor + ":" + oszlop);
    return cella.childElementCount > 0;
    }
    
    // Lépés végrehajtása
    function lep(sorKezdo, oszlopKezdo, sorVeg, oszlopVeg) {
        var kezdoCella = document.getElementById(sorKezdo + ":" + oszlopKezdo);
        var vegCella = document.getElementById(sorVeg + ":" + oszlopVeg);
        var babu = kezdoCella.firstChild;
        
    // Ellenőrzi, hogy a lépés érvényes-e (kint van-e a tábláról?)
        var sorKulonbseg = Math.abs(sorVeg - sorKezdo);
        var oszlopKulonbseg = Math.abs(oszlopVeg - oszlopKezdo);
        if (sorKulonbseg !== oszlopKulonbseg || sorKulonbseg === 0) {
        console.log("Érvénytelen lépés!");
        return;
    }
    
    var maxLepesek = sorKulonbseg;
    
    // Ellenőrzi, hogy a bábu lépése szabályos-e (sorban vagy oszlopban akar lépni?)
    for (var i = 1; i <= maxLepesek; i++) {
    var sor = sorKezdo + i * Math.sign(sorVeg - sorKezdo);
    var oszlop = oszlopKezdo + i * Math.sign(oszlopVeg - oszlopKezdo);

    if (vanBabu(sor, oszlop)) {
      console.log("Érvénytelen lépés!");
      return;
        }
    }
    
    // Bábuk mozgatása
    vegCella.appendChild(babu);
    //kezdoCella.removeChild(babu);
    }
    
    // Lépésre kattintás eseménykezelő
    function kezelLepesKattintas(sor, oszlop) {
        var kivalasztottCella = document.querySelector(".kivalasztott");
        if (kivalasztottCella) {
            var kivalasztottSor = parseInt(kivalasztottCella.id.split(":")[0]);
            var kivalasztottOszlop = parseInt(kivalasztottCella.id.split(":")[1]);
            lep(kivalasztottSor, kivalasztottOszlop, sor, oszlop);
            kivalasztottCella.classList.remove("kivalasztott");
        } else {
            var cella = document.getElementById(sor + ":" + oszlop);
            if (cella.childElementCount > 0) {
            cella.classList.add("kivalasztott");
            }
        }
    }
    
    // Eseménykezelők hozzáadása a cellákhoz
    function esemenyKezeloHozzaadasa() {
        var cellak = document.querySelectorAll("#tabla > div");
        cellak.forEach(function(cella) {
            var sor = parseInt(cella.id.split(":")[0]);
            var oszlop = parseInt(cella.id.split(":")[1]);
            cella.addEventListener("click", function() {
                kezelLepesKattintas(sor, oszlop);
            });
        });
    }
      
  // Az összes függvény meghívása a tábla és bábuk generálása után
  tablageneralas();
  babukgeneralasa();
  esemenyKezeloHozzaadasa();
