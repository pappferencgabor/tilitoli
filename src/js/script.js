let [emptyX, emptyY] = [4, 4];
let sorrend = [];
let helyes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '0'];
let lepesek = 0;
let lepeselem = document.getElementById("lepesszam");

function moveBlock(id) {
    let elem = document.getElementById(id);
    let style = window.getComputedStyle(elem);

    let col = parseInt(style.getPropertyValue("grid-column"));
    let row = parseInt(style.getPropertyValue("grid-row"));

    // console.log(col);
    // console.log(row);

    let lehetseges = [
        [col, row - 1],
        [col + 1, row],
        [col, row + 1],
        [col - 1, row]
    ]

    let szabad = `${emptyX}${emptyY}`.toString();
    let helyek = []

    lehetseges.forEach(element => {
        helyek.push(`${element[0]}${element[1]}`)
    });

    // console.log(szabad);
    // console.log(helyek);

    lepesek++;
    lepeselem.innerHTML = lepesek;
    if (helyek.includes(szabad)) {
        // console.log(true);
        // console.log(szabad);

        elem.style.gridColumn = `${emptyX} / span 1`;
        elem.style.gridRow = `${emptyY} / span 1`;
    
        [emptyX, emptyY] = [col, row];

        if (JSON.stringify(getFields(elem.innerHTML, [parseInt(col), parseInt(row)], [parseInt(szabad[0]), parseInt(szabad[1])])) == JSON.stringify(helyes)) {
            endGame();
        }
    }
    else {
        error(id);
    }
}

function error(id) {
    let elem = document.getElementById(id);
    let eredetiTulajdonsag = elem.style.backgroundColor;
    elem.style.backgroundColor = "salmon";

    let eredetiPozicio = elem.style.transform;

    setTimeout(function() {
        elem.style.transform = "translateX(-5px)";
        
        setTimeout(function() {
            elem.style.transform = "translateX(5px)";

            setTimeout(function() {
                elem.style.transform = eredetiPozicio;

                setTimeout(function() {
                    elem.style.backgroundColor = eredetiTulajdonsag;
                }, 25);
            }, 25);
        }, 25);
    }, 100);
}

function shuffleBlocks() {
    let list = ["b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "b10", "b11", "b12", "b13", "b14", "b15"];
    [emptyX, emptyY] = [4, 4];
    sorrend = [];
    lepeselem.innerHTML = 0;
    lepesek = 0;
    document.getElementById("keveres").innerHTML = "Keverés";
    
    document.getElementById("game").style.display = "grid";
    document.getElementById("end").style.display = "none";

    // console.log(list);
    list = list.sort( () => .5 - Math.random() )
    // console.log(list);

    let htmlstring = "";
    let counter = 1;
    list.forEach(element => {
        let current = element.substring(1, element.length);
        sorrend.push(current);

        htmlstring += `<div id="b${counter}" onclick="moveBlock('b${counter}')" class="${current}">${current}</div>`;
        
        counter++;
    });
    htmlstring += '<div id="b0"></div>';

    // console.log(htmlstring);

    document.getElementById("game").innerHTML = htmlstring;
    sorrend.push('0')
    // console.log(sorrend);
}

function getFields(id, posRegi, posUj) {
    // (Y - 1) * 4 + X
    let regiHely = (posRegi[1] - 1) * 4 + posRegi[0] - 1;
    let ujHely = (posUj[1] - 1) * 4 + posUj[0] - 1;
    swapElements(sorrend, regiHely, ujHely)
    return sorrend;
}

function swapElements(array, index1, index2) {
    let temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
}

function endGame() {
    document.getElementById("game").style.display = "none";
    document.getElementById("end").style.display = "block";
}