const tablaMeret = 8; // 8x8-as tábla
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
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (i == 0 || i == 1 ) {

                cella=document.getElementById(i+":"+j);
                var img = document.createElement("img");
                img.src = "feher.png";
                img.style.height= "50px";
                img.style.width="50px";
                cella.appendChild(img);
            }
            else if(i == 6 || i == 7 ) {
                cella=document.getElementById(i+":"+j);
                var img = document.createElement("img");
                img.src = "fekete.png";
                img.style.height= "50px";
                img.style.width="50px";
                cella.appendChild(img);
            } 
            
        }
    }
}

tablageneralas();
babukgeneralasa();
