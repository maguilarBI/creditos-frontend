// /var/www/html/creditos/public/js/formulario.js
console.log("Cargando formulario.js versión 2"); // Verifica que se cargue

document.getElementById('formEvaluacion').addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log("Formulario enviado - Iniciando procesamiento");
    
    const submitBtn = document.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Procesando...';

    try {
        // 1. Recopilar datos
        const formData = {
            dni: document.getElementById('dni').value,
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            ingresos_mensuales: document.getElementById('ingresos').value,
            deuda_actual: document.getElementById('deuda').value || '0',
            historial_crediticio: document.getElementById('historial').value
        };
        console.log("Datos del formulario:", JSON.stringify(formData, null, 2));

        // 2. Enviar a la API
        console.log("Enviando a API...");
        const apiUrl = 'http://44.203.216.239:5000/evaluar';
        console.log("URL de la API:", apiUrl);
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        console.log("Respuesta recibida. Status:", response.status);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            console.error("Error detallado:", {
                status: response.status,
                statusText: response.statusText,
                errorData: errorData
            });
            throw new Error(errorData?.error || `Error HTTP ${response.status}`);
        }
        
        const resultado = await response.json();
        console.log("Resultado exitoso:", resultado);
        
        // 3. Redireccionar
        const scorePorcentaje = Math.round(resultado.score * 100);
        console.log("Redirigiendo a resultado.html...");
        window.location.href = `resultado.html?aprobado=${resultado.aprobado}&score=${scorePorcentaje}`;
        
    } catch (error) {
        console.error("Error completo:", {
            name: error.name,
            message: error.message,
            stack: error.stack
        });
        alert(`Error: ${error.message}\nVer consola para detalles (F12 > Console)`);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Evaluar Crédito';
    }
});