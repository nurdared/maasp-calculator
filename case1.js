// //innerHTML
// document.getElementById('n30').innerHTML = calculate;
function calculate() {
    let yp1 = document.getElementById('n3').value;
    let yp2 = document.getElementById('n11').value;

    let diameter1 = document.getElementById('n4').value;
    let diameter2 = document.getElementById('n12').value;

    let thick1 = document.getElementById('n5').value;
    let thick2 = document.getElementById('n13').value;

    let acr1 = document.getElementById('new5').value;
    let acr2 = document.getElementById('new8').value;

    let noYears1 = document.getElementById('new6').value;
    let noYears2 = document.getElementById('new9').value;

    //New Thickness
    let newThick1 = (thick1 - acr1 * noYears1).toFixed(5); 
    let newThick2 = (thick2 - acr2 * noYears2).toFixed(5); 
    document.getElementById('new7').value = newThick1;
    document.getElementById('new10').value = newThick2;
    
    //d/t
    let dt1 = (diameter1 / newThick1).toFixed(2);
    let dt2 = (diameter2 / newThick2).toFixed(2);
    document.getElementById('n7').value = dt1;
    document.getElementById('n15').value = dt2;

    //burst
    let burst1 = (0.875 * (2 * yp1 * newThick1 / diameter1)).toFixed(2);
    let burst2 = (0.875 * (2 * yp2 * newThick2 / diameter2)).toFixed(2);
    document.getElementById('n6').value = burst1;
    document.getElementById('n14').value = burst2;

    //collapse
    let collapse1 = collapse(yp1, dt1);
    let collapse2 = collapse(yp2, dt2);
    document.getElementById('n8').value = collapse1.toFixed(2);
    document.getElementById('n16').value = collapse2.toFixed(2);

    //depth
    let point1 = document.getElementById('n17').value;
    let point2 = document.getElementById('n18').value;
    let point3 = document.getElementById('n19').value;
    let point5 = document.getElementById('n20').value;
    let point7a = document.getElementById('n21').value;
    let point8 = document.getElementById('n22').value;

    //fluids
    let fg = document.getElementById('n23').value;
    let fda = document.getElementById('n24').value;
    let fdTubing = document.getElementById('n25').value;
    let bf = document.getElementById('n26').value;

    //SF and equipments
    let sffBurst = document.getElementById('n27').value;
    let sffAcc = document.getElementById('n28').value;
    let packerPr = document.getElementById('n29').value;
    let wellHeadPr = document.getElementById('new27').value;

    //MAASP Result
    let maasp1 = (collapse2 / sffAcc) - point1 * (fda - fdTubing) * 0.052;
    document.getElementById('n30').innerHTML = maasp1.toFixed(3);

    let maasp2 = (collapse2 / sffAcc) - point2 * (fda - fdTubing) * 0.052;
    document.getElementById('n31').innerHTML = maasp2.toFixed(3);

    let maasp3 = (collapse2 / sffAcc) - point3 * (fda - fdTubing) * 0.052;
    document.getElementById('n32').innerHTML = maasp3.toFixed(3);

    let maasp4 = (point3 * fg * 0.052) + packerPr - (point3 * fda * 0.052);
    document.getElementById('n33').innerHTML = maasp4.toFixed(3);

    let maasp5 = (collapse2 / sffAcc) - point5 * (fda - fdTubing) * 0.052;
    document.getElementById('n34').innerHTML = maasp5.toFixed(3);

    let maasp6 = (burst1 / sffBurst) - point7a * (fda - bf) * 0.052;
    document.getElementById('n35').innerHTML = maasp6.toFixed(3);

    let maasp7 = document.getElementById('new27').value;
    document.getElementById('n36').innerHTML = maasp7;


}

function yp() {
    let grade1 = document.getElementById('n2').value;
    let grade2 = document.getElementById('n10').value;
    document.getElementById('n3').value = grade1;
    document.getElementById('n11').value = grade2;
}



function collapse(yp, dt) {
    debugger;
    let a = 2.8762 + 0.10679 * (10 ** (-5)) * yp + 0.21301 * (10 ** (-10)) * (yp ** 2) - 0.53132 * (10 ** (-16)) * yp ** 3;
    let b = 0.026233 + 0.50609 * (10 ** (-6)) * yp;
    let c = -465.93 + 0.030867 * yp - 0.10483 * (10 ** (-7)) * (yp ** 2) + 0.36989 * (10 ** (-13)) * yp ** 3;
    let f = (46.95 * (10 ** 6) * ((3 * b / a) / (2 + b / a)) ** 3) / (yp * (((3 * b / a) / (2 + b / a)) - b / a) * (1 - ((3 * b / a) / (2 + b / a))) ** 2);
    let g = (f * b) / a;


    let pressure;
    if (dt >= ((2 + b / a) / (3 * b / a))) {
        pressure = (46.95 * (10 ** 6)) / (dt * ((dt - 1) ** 2))
    }

    else if (dt >= ((yp * (a - f)) / (c + yp * (b - g))) &&
        dt <= ((2 + b / a) / (3 * b / a))) {
        pressure = (f / dt - g) * yp;
    }

    else if (dt >= (((a - 2) ** 2 + 8 * (b + c / yp)) ** 0.5 + (a - 2)) / (2 * (b + c / yp)) &&
        dt <= ((yp * (a - f)) / (c + yp * (b - g)))) {
        pressure = yp * (a / dt - b) - c;
    }
    else if (dt <= (((a - 2) ** 2 + 8 * (b + c / yp)) ** 0.5 + (a - 2)) / (2 * (b + c / yp))) {
        pressure = 2 * yp * ((dt - 1) / (dt ** 2));
    }
    return pressure;

}
