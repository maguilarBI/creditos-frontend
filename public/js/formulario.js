document.getElementById('formEvaluacion').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('http://tu-backend:5000/evaluar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        const resultado = await response.json();
        
        // Redirigir a página de resultado
        window.location.href = `resultado.html?aprobado=${resultado.aprobado}&score=${resultado.score}`;
    } catch (error) {
        alert('Error al procesar la evaluación. Intente nuevamente.');
        console.error(error);
    }
});