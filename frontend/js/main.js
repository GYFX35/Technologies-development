document.addEventListener('DOMContentLoaded', () => {
    const statusElement = document.getElementById('backend-status');
    const tfVersionElement = document.getElementById('tf-version');
    const predictBtn = document.getElementById('predict-btn');
    const userInput = document.getElementById('user-input');
    const predictionResult = document.getElementById('prediction-result');
    const predictionContainer = document.getElementById('prediction-container');

    // Fetch backend info
    if (statusElement) {
        fetch('http://localhost:8000/info')
            .then(response => response.json())
        .then(data => {
            statusElement.textContent = `Status: ${data.status}`;
            statusElement.className = 'status-badge status-online';
            if (tfVersionElement) {
                tfVersionElement.textContent = `TensorFlow: ${data.tensorflow_version}`;
            }
        })
            .catch(err => {
                console.error('Error fetching backend info:', err);
                statusElement.textContent = 'Status: Offline';
                statusElement.className = 'status-badge status-offline';
            });
    }

    // Handle prediction
    if (predictBtn) {
        predictBtn.addEventListener('click', () => {
            const input = userInput.value;
            if (!input) return;

            predictBtn.disabled = true;
            predictBtn.textContent = 'Processing...';

            fetch('http://localhost:8000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ input })
            })
            .then(response => response.json())
            .then(data => {
                predictionContainer.style.display = 'block';
                predictionResult.textContent = data.prediction;
                predictBtn.disabled = false;
                predictBtn.textContent = 'Process with AI';
            })
            .catch(err => {
                console.error('Error during prediction:', err);
                predictionContainer.style.display = 'block';
                predictionResult.textContent = 'Error: Could not connect to backend.';
                predictBtn.disabled = false;
                predictBtn.textContent = 'Process with AI';
            });
        });
    }
});
