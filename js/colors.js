/* draw pixels */

// calculate dec or hex value of rgb
const decToHex = (val) => val.toString(16).padStart(2, '0');
const pixelVal = (div, num) => div === 'rgb' ? (num+1)*64 : decToHex(num*51);
const pixelFunc = (div, r, g, b) => div === 'rgb' ? `rgb(${pixelVal(div,r)},${pixelVal(div,g)},${pixelVal(div,b)})` : `#${pixelVal(div,r)}${pixelVal(div,g)}${pixelVal(div,b)}`;

const pixel = (div, max) => {
    let html = `<div>`;
    for(let r=0 ; r<=max-1 ; r++){
        for(let g=0 ; g<=max/2-1 ; g++){
            for(let b=0 ; b<=max-1 ; b++){
                html += `<abbr title="${pixelFunc(div,r,g,b)}" style="background-color: ${pixelFunc(div,r,g,b)};">&nbsp; &nbsp;</abbr>`;
            }
        }
        html += `</div><div>`;
    }
    for(let r=0 ; r<=max-1 ; r++){
        for(let g=max/2 ; g<=max-1 ; g++){
            for(let b=0 ; b<=max-1 ; b++){
                html += `<abbr title="${pixelFunc(div,r,g,b)}" style="background-color: ${pixelFunc(div,r,g,b)};">&nbsp; &nbsp;</abbr>`;
            }
        }
        html += `</div><div>`;
    }
    html += `</div>`;
    return html;
}
document.getElementById("rgb").innerHTML = pixel('rgb', 4);
document.getElementById("hex").innerHTML = pixel('hex', 6);

const hsl = () => {
    let hslHtml = `<div>`;

    // white ~ black
    for(let i=0 ; i<8 ; i++){
        hslHtml += `<abbr title="hsl(0,0%,${100-i*14}%)" style="background-color: hsl(0,0%,${100-i*14}%);">&nbsp; &nbsp;</abbr>`;
    }
    hslHtml += `</div><div>`;

    // other colors
    for(let h=0 ; h<12 ; h++){
        for(let j=1 ; j<=5 ; j++){
            hslHtml += `<abbr title="hsl(${h*30},${j*10+50}%,${100-j*10}%)" style="background-color: hsl(${h*30},${j*10+50}%,${100-j*10}%);">&nbsp; &nbsp;</abbr>`;
        }
        for(let j=5 ; j<8 ; j++){
            hslHtml += `<abbr title="hsl(${h*30},${140-j*10}%,${70-j*5}%)" style="background-color: hsl(${h*30},${140-j*10}%,${70-j*5}%);">&nbsp; &nbsp;</abbr>`;
        }
        hslHtml += `</div><div>`;
    }
    hslHtml += `</div>`;
    return hslHtml;
}
document.getElementById("hsl").innerHTML = hsl();

/* draw by range */
const range = (type) => {
    const r = type === 'hex' ? decToHex(parseInt(document.getElementById(`hex_r`).value)) : document.getElementById(`${type}_r`).value;
    const g = type === 'hex' ? decToHex(parseInt(document.getElementById(`hex_g`).value)) : document.getElementById(`${type}_g`).value;
    const b = type === 'hex' ? decToHex(parseInt(document.getElementById(`hex_b`).value)) : document.getElementById(`${type}_b`).value;
    const a = type === 'hex' ? decToHex(parseInt(document.getElementById(`hex_a`).value)) : parseInt(document.getElementById(`${type}_a`).value)/100;

    let val = '';
    switch(type){
        case 'rgb':
            val = `rgba(${r}, ${g}, ${b}, ${a})`;
            break;
        case 'hex':
            val = `#${r}${g}${b}${a}`;
            break;
        case 'hsl':
            val = `hsla(${r}, ${g}%, ${b}%, ${a})`;
            break;
        default:
            break;
    }
    document.getElementById(`${type}a`).innerHTML = val;
    document.getElementById(`${type}a`).style.backgroundColor = val;
}
range('rgb');
range('hex');
range('hsl');
