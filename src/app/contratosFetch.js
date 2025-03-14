export async function guardarContrato(contrato) {
    const response = await fetch('/api/contratos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contrato),
    });
    return response.json();
}