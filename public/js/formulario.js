// /var/www/html/creditos/js/formulario.js

document.getElementById('formEvaluacion').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Mostrar indicador de carga
    const submitBtn = document.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Procesando...';
    
    try {
        const formData = {
            dni: document.getElementById('dni').value,
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            ingresos_mensuales: parseFloat(document.getElementById('ingresos').value),
            deuda_actual: parseFloat(document.getElementById('deuda').value) || 0,
            historial_crediticio: document.getElementById('historial').value
        };

        const response = await fetch('http://44.203.216.239:5000/evaluar', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error en la evaluación');
        }
        
        const resultado = await response.json();
        
        // Convertir score a porcentaje (0.8 -> 80)
        const scorePorcentaje = Math.round(resultado.score * 100);
        
        // Redirigir a página de resultado
        window.location.href = `resultado.html?aprobado=${resultado.aprobado}&score=${scorePorcentaje}`;
        
    } catch (error) {
        console.error('Error en la evaluación:', error);
        alert(error.message || 'Error al procesar la evaluación. Por favor intente nuevamente.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Evaluar Crédito';
    }
});