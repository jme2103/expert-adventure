function TowersOfHanoi() {
    this.pegs = [[], [], []];
    this.numDisks = 3; // Change this to increase or decrease the number of disks
    this.init();
}

TowersOfHanoi.prototype.init = function() {
    for (let i = this.numDisks; i > 0; i--) {
        this.pegs[0].push(i);
    }
    this.render();
};

TowersOfHanoi.prototype.render = function() {
    const pegsContainer = document.getElementById('pegs');
    pegsContainer.innerHTML = '';
    this.pegs.forEach((peg, index) => {
        const pegDiv = document.createElement('div');
        pegDiv.className = 'peg';
        pegDiv.id = `peg-${index}`;
        peg.forEach(disk => {
            const diskDiv = document.createElement('div');
            diskDiv.className = 'disk';
            diskDiv.style.width = `${disk * 20}px`;
            diskDiv.innerText = disk;
            pegDiv.appendChild(diskDiv);
        });
        pegsContainer.appendChild(pegDiv);
    });
};

TowersOfHanoi.prototype.moveDisk = function(fromPeg, toPeg) {
    if (this.pegs[fromPeg].length === 0) return;
    const disk = this.pegs[fromPeg].pop();
    if (this.pegs[toPeg].length === 0 || disk < this.pegs[toPeg][this.pegs[toPeg].length - 1]) {
        this.pegs[toPeg].push(disk);
        this.render();
        if (this.checkWin()) {
            alert('You win!');
        }
    } else {
        this.pegs[fromPeg].push(disk); // Invalid move, put it back
    }
};

TowersOfHanoi.prototype.checkWin = function() {
    return this.pegs[2].length === this.numDisks;
};

const game = new TowersOfHanoi();

document.addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('disk')) {
        const fromPeg = parseInt(target.parentElement.id.split('-')[1]);
        const toPeg = (fromPeg + 1) % 3; // Simple logic to move to the next peg
        game.moveDisk(fromPeg, toPeg);
    }
});