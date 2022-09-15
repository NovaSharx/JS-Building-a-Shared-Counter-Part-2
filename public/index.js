async function main() {
    const countContainer = document.querySelector('#count-container');
    const incrementButton = document.querySelector('#increment-button');
    const decrementButton = document.querySelector('#decrement-button');
    const resetButton = document.querySelector('#reset-button');

    const response = await fetch('http://localhost:9001/counter');

    const result = await response.json();

    let countValue = result.value;

    let resetValue = countValue;


    async function updateCounter(value) {
        await fetch('http://127.0.0.1:9001/counter', { 
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                "value": value
            }) 
        })
    }
    
    async function increment() {
        countValue++
        await updateCounter(countValue);
        countContainer.textContent = countValue;
    }

    async function decrement() {
        countValue--
        await updateCounter(countValue);
        countContainer.textContent = countValue;
    }

    async function reset() {
        countValue = resetValue
        await updateCounter(countValue);
        countContainer.textContent = countValue;
    }

    incrementButton.addEventListener('click', increment);
    decrementButton.addEventListener('click', decrement);
    resetButton.addEventListener('click', reset);
    countContainer.textContent = countValue;
}
main()