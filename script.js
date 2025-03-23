document.getElementById('price-filter').addEventListener('change', function() {
    let watchList = document.getElementById('watch-list');
    let watches = Array.from(watchList.getElementsByClassName('watch-card'));

    if (this.value === "low-to-high") {
        watches.sort((a, b) => a.dataset.price - b.dataset.price);
    } else {
        watches.sort((a, b) => b.dataset.price - a.dataset.price);
    }

    watches.forEach(watch => watchList.appendChild(watch));
});
