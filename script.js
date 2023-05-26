const tablaMeret = 8; 
const tabla = document.getElementById('tabla');
var TablaMatrix = new Array();
var cella;
var Ertek =  Ertek = {szin: undefined, id: undefined};;
var JoLepesek = new Array();
var Atugrott = undefined;
var Rakattintva = new Array();

function tablageneralas(){
    for (let sor = 0; sor < tablaMeret; sor++){
        let SorDiv = document.createElement("div");
        SorDiv.id = "SorDiv"+sor;
        SorDiv.classList = "SorDiv";
        for (let oszlop = 0; oszlop < tablaMeret; oszlop++){
            let CellaDiv = document.createElement('div');
            CellaDiv.id=sor+":"+oszlop;
            CellaDiv.classList = "BelsoDivek";
            if ((sor + oszlop) % 2 == 0) {
                CellaDiv.classList += " paros";
            }
            else{
            CellaDiv.classList += " paratlan";
            }
            SorDiv.appendChild(CellaDiv);
        }
        tabla.appendChild(SorDiv);
    }
    let gomb = document.createElement("input");
    gomb.type = "button";
    gomb.value = "Indítás";
    gomb.id = "InditoGomb";
    gomb.setAttribute("onclick","babukgeneralasa()");
    document.body.appendChild(gomb);
    //babukgeneralasa();
}

function KepGen(div, szin, id){
    var img = document.createElement("img");
    img.src = szin+".png";
    img.classList.add(szin);
    img.dataset.id = id
    img.style.cursor = "pointer";
    img.style.width = "100%";
    img.setAttribute("onclick","ErtekEltarolas(this)");
    div.appendChild(img);
}

function babukgeneralasa(){
    let ParosClass = document.getElementsByClassName("paros");
    for(let i = 0; i < 12;i++){
        KepGen(ParosClass[i], "feher", ParosClass[i].id);
    }
    for(let i = ParosClass.length-1; i > ParosClass.length-13;i--){
        KepGen(ParosClass[i], "fekete", ParosClass[i].id);
    }
}

function ErtekEltarolas(div){
    if(JoLepesek.length != 0){
        for(let i = 0; i < JoLepesek.length;i++){
            let div = document.getElementById(JoLepesek[i]);
            div.removeAttribute("onclick"); 
            div.style.cursor = "default"
            div.removeChild(div.firstChild);
        }
        document.getElementById(Ertek.id).firstChild.classList = document.getElementById(Ertek.id).firstChild.classList.value.split(" ")[0];
    }
    for(let i = 0; i < Rakattintva.length;i++){
        if(Rakattintva[i].classList.value.split(" ")[1] == "BabuKivalasztva"){
            Rakattintva[i].classList = Rakattintva[i].classList.value.split(" ")[0];
            Rakattintva.splice(Rakattintva[i],1);
        }
    }
    Ertek = {szin: div.classList.value, id: div.dataset.id};
    Rakattintva.push(div);
    div.classList += " BabuKivalasztva";
    JoLepesek = new Array();
    lep(Number(div.dataset.id.split(":")[0]), Number(div.dataset.id.split(":")[1]), Ertek.szin);
    for(let i = 0; i < JoLepesek.length;i++){
        let div = document.getElementById(JoLepesek[i]);
        div.setAttribute("onclick","LepesKattintas(this)");
        div.style.cursor = "pointer";
        let BDiv = document.createElement("div");
        BDiv.classList = "JoLepes";
        div.appendChild(BDiv);
    }
}

function lep(sor, oszlop, szin) {
    //let korbejaras = [[-1,-1],[-1,+1],[+1,-1],[+1,+1]];
    if(szin == "feher"){
        let korbejaras = [[+1,-1],[+1,+1]];
        for(let i = 0; i < korbejaras.length;i++){
            let div = document.getElementById((sor+korbejaras[i][0])+":"+(oszlop+korbejaras[i][1]));
            KorbeJar(div,korbejaras[i], "fekete",0);
        }
    }
    else if(szin == "fekete"){
        let korbejaras = [[-1,-1],[-1,+1]];
        for(let i = 0; i < korbejaras.length;i++){
            let div = document.getElementById((sor+korbejaras[i][0])+":"+(oszlop+korbejaras[i][1]));
            KorbeJar(div,korbejaras[i], "feher",0);
        }
    }
}

function KorbeJar(div,index,ellenszin,db){
    let igaze = true;
    if(div != undefined){
        if(div.firstChild == undefined && !JoLepesek.includes(div.id)){
            JoLepesek.push(div.id);
        }
        else if(div.firstChild != undefined && div.firstChild.classList.value.split(" ")[0] == ellenszin && db == 0){
            let div2 = document.getElementById(String(Number(div.id.split(":")[0])+Number(index[0]))+":"+(Number(div.id.split(":")[1])+Number(index[1])));
            if(div2 != undefined){
                Atugrott = {elsoid: div.id, masodikid: div2.id};
                KorbeJar(div2,index,ellenszin.db+1);
            }
            else{
                igaze = false;
            }
        }
        else{
            igaze = false;
        }
    }
    return igaze;
}

/*
kelleni fog, ne legyen törölve
function KorbeJaras(sor,oszlop,index){
    let div = document.getElementById((sor+index[0])+":"+(oszlop+index[1]));
    if(div != undefined){
        if(div.firstChild == undefined && !JoLepesek.includes(div.id)){
            JoLepesek.push(div.id);
        }
        KorbeJaras((sor+index[0]),(oszlop+index[1]),index);
    }
    else{
        return "vége";
    }
}*/

function LepesKattintas(div){
    let Honnan = document.getElementById(Ertek.id);
    div.removeAttribute("onclick");
    Honnan.firstChild.dataset.id = div.id;
    div.removeChild(div.firstChild);
    div.appendChild(Honnan.firstChild);
    if(Atugrott != undefined && div.id == Atugrott.masodikid){
        document.getElementById(Atugrott.elsoid).removeChild(document.getElementById(Atugrott.elsoid).firstChild);
        Atugrott = undefined;
    }
    div.firstChild.classList = div.firstChild.classList.value.split(" ")[0];
    for(let i = 0; i < JoLepesek.length;i++){
        if(JoLepesek[i] != div.id){
            let div = document.getElementById(JoLepesek[i]);
            div.removeAttribute("onclick"); 
            div.style.cursor = "default"
            div.removeChild(div.firstChild);
        }
    }
    JoLepesek = new Array();
}

function Main(){
    tablageneralas();
}
Main();
