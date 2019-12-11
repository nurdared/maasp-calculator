function calculate() {
    // //innerHTML
    // document.getElementById('n30').innerHTML = calculate;
    idThick();
}

function yp(){
    let grade1 = document.getElementById('n2').value;
    let grade2 = document.getElementById('n10').value;
    document.getElementById('n3').value = grade1;
    document.getElementById('n11').value = grade2;
}

function idThick(){
    let id1 = document.getElementById('n4').value;
    let id2 = document.getElementById('n12').value;
    let thick1 = document.getElementById('n5').value;
    let thick2 = document.getElementById('n13').value;
    let yp1 = document.getElementById('n3').value;
    let yp2 = document.getElementById('n11').value;

    document.getElementById('n7').value = id1/thick1;
    document.getElementById('n15').value = id2/thick2;
    function burst(){
        document.getElementById('n6').value = 0.875*(2*yp1*thick1/id1);
        document.getElementById('n14').value = 0.875*(2*yp2*thick2/id2);
        console.log(thick1);
    }
    burst();
}
