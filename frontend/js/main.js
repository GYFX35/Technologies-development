document.addEventListener('DOMContentLoaded', () => {
    const statusElement = document.getElementById('backend-status');
    const tfVersionElement = document.getElementById('tf-version');
    const predictBtn = document.getElementById('predict-btn');
    const userInput = document.getElementById('user-input');
    const predictionResult = document.getElementById('prediction-result');

    // Fetch backend info
    fetch('http://localhost:8000/info')
        .then(response => response.json())
        .then(data => {
            statusElement.textContent = `Status: ${data.status}`;
            tfVersionElement.textContent = `TensorFlow: ${data.tensorflow_version}`;
        })
        .catch(err => {
            console.error('Error fetching backend info:', err);
            statusElement.textContent = 'Status: Offline (Backend not running)';
        });

    // Handle prediction
    predictBtn.addEventListener('click', () => {
        const input = userInput.value;
        if (!input) return;

        fetch('http://localhost:8000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ input })
        })
        .then(response => response.json())
        .then(data => {
            predictionResult.textContent = data.prediction;
        })
        .catch(err => {
            console.error('Error during prediction:', err);
            predictionResult.textContent = 'Error: Could not connect to backend.';
        });
    });
});
