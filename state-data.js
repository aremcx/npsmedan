    // Populate state options
    const stateSelect = document.getElementById('state');
    for (const state in lgaData) {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    }
    
    // Update LGA options based on selected state
    function updateLGAOptions() {
        const lgaSelect = document.getElementById('lga');
        const selectedState = stateSelect.value;
        lgaSelect.innerHTML = '<option value="">Select LGA</option>'; // Reset LGA options
    
        if (selectedState && lgaData[selectedState]) {
            lgaData[selectedState].forEach(lga => {
                const option = document.createElement('option');
                option.value = lga;
                option.textContent = lga;
                lgaSelect.appendChild(option);
            });
        }
    }