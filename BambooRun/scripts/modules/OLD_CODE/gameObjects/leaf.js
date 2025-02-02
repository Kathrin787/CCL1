
class Leaf {
    // Function to generate leaves
    constructor() {
        const leaf = document.createElement('div');
        leaf.classList.add('leaf');
        leaf.style.position = 'absolute';
        leaf.style.width = '30px';
        leaf.style.height = '30px';
        leaf.style.backgroundColor = 'green';
        leaf.style.left = `${Math.random() * (this.game.offsetWidth - 30)}px`;
        leaf.style.top = `${Math.random() * (this.game.offsetHeight - 30)}px`;

        this.game.appendChild(leaf);

        // Remove leaf after timeout
        setTimeout(() => {
            if (leaf.parentElement) {
                this.game.removeChild(leaf);
            }
        }, 5000); // Removes the leaf after 5 seconds
    }
}

export {Leaf}
