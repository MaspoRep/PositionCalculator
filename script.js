document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('position-size-form');
    const capitalInput = document.getElementById('capital');
    const riskInput = document.getElementById('risk-per-position');
    const entryPriceInput = document.getElementById('entry-price');
    const stopLossInput = document.getElementById('stop-loss');
    const calculateButton = document.getElementById('calculate-button');
    const lotsToBuySpan = document.getElementById('lots-value');
    const positionSizeSpan = document.getElementById('position-size-value');
    const rValueSpan = document.getElementById('r-value');

    // Theme toggle functionality
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Load default values from local storage if available
    if (localStorage.capital) {
        capitalInput.value = localStorage.capital;
    }
    if (localStorage.risk) {
        riskInput.value = localStorage.risk;
    }
    if (localStorage.entryPrice) {
        entryPriceInput.value = localStorage.entryPrice;
    }
    if (localStorage.stopLoss) {
        stopLossInput.value = localStorage.stopLoss;
    }

    calculateButton.addEventListener('click', calculatePositionSize);

    function calculatePositionSize() {
        const capital = parseFloat(capitalInput.value);
        const riskPercentage = parseFloat(riskInput.value) / 100;
        const entryPrice = parseFloat(entryPriceInput.value);
        const stopLoss = parseFloat(stopLossInput.value);

        // Calculate the amount we're willing to risk (R-value)
        const riskAmount = capital * riskPercentage;

        // Calculate the difference between entry and stop loss (absolute value)
        const riskPerShare = Math.abs(entryPrice - stopLoss);

        // Calculate lots to buy (shares/contracts)
        const lotsToBuy = riskAmount / riskPerShare;

        // Calculate position size (total value of the position)
        const positionSize = lotsToBuy * entryPrice;

        // Display results
        rValueSpan.textContent = riskAmount.toFixed(2);
        lotsToBuySpan.textContent = lotsToBuy.toFixed(2);
        positionSizeSpan.textContent = positionSize.toFixed(2);

        // Save values to local storage
        localStorage.capital = capitalInput.value;
        localStorage.risk = riskInput.value;
        localStorage.entryPrice = entryPriceInput.value;
        localStorage.stopLoss = stopLossInput.value;
    }
});