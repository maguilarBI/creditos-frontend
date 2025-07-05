// /var/www/html/creditos/js/formulario.js

document.getElementById('formEvaluacion').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = document.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Procesando...';

    try {
        console.log("Recopilando datos del formulario...");
        const formData = {
            dni: document.getElementById('dni').value,
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            ingresos_mensuales: document.getElementById('ingresos').value,
            deuda_actual: document.getElementById('deuda').value || '0',
            historial_crediticio: document.getElementById('historial').value
        };
        console.log("Datos a enviar:", formData);

        console.log("Enviando solicitud a la API...");
        const response = await fetch('http://44.203.216.239:5000/evaluar', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        console.log("Respuesta recibida. Status:", response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Error en la respuesta:", errorText);
            throw new Error(errorText || 'Error en el servidor');
        }
        
        const resultado = await response.json();
        console.log("Resultado exitoso:", resultado);
        
        const scorePorcentaje = Math.round(resultado.score * 100);
        window.location.href = `resultado.html?aprobado=${resultado.aprobado}&score=${scorePorcentaje}`;
        
    } catch (error) {
        console.error("Error completo:", error);
        alert(`Error: ${error.message}. Por favor revise la consola (F12) para más detalles.`);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Evaluar Crédito';
    }
});