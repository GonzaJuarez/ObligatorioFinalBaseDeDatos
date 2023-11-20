document.addEventListener('DOMContentLoaded', function () {
    var siRadio = document.getElementById('si');
    var noRadio = document.getElementById('no');
    var fechaVencimientoInput = document.getElementById('fch_vancimientoCarnetSalud');
    var comprobanteInput = document.getElementById('comprobante');

    // Agrega un evento de cambio al radio "Si"
    siRadio.addEventListener('change', function () {
        // Si se selecciona "Si", habilita los campos
        if (siRadio.checked) {
            fechaVencimientoInput.disabled = false;
            comprobanteInput.disabled = false;
        }
    });

    // Agrega un evento de cambio al radio "No"
    noRadio.addEventListener('change', function () {
        // Si se selecciona "No", deshabilita los campos
        if (noRadio.checked) {
            fechaVencimientoInput.disabled = true;
            comprobanteInput.disabled = true;
        }
    });
});