// PanterSoft - Circuit & Code Background Animation
// Alternative to particles.js with electrical and software themes

class CircuitCodeAnimation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        // PanterSoft Colors
        this.colors = {
            cyan: '#00E5FF',
            green: '#39FF14',
            purple: '#BC13FE',
            dark: '#050A14'
        };

        // Circuit nodes (connection points)
        this.nodes = [];
        this.connections = [];
        this.codeElements = [];
        this.electricPulses = [];

        this.init();
        this.animate();
        this.setupEventListeners();
    }

    init() {
        this.resize();
        this.createNodes();
        this.createCodeElements();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    createNodes() {
        // Create circuit board nodes in a grid pattern
        const gridX = 15;
        const gridY = 10;
        const spacingX = this.width / gridX;
        const spacingY = this.height / gridY;

        this.nodes = [];
        for (let x = 0; x < gridX; x++) {
            for (let y = 0; y < gridY; y++) {
                // Add some randomness to make it look more organic
                const nodeX = x * spacingX + (Math.random() - 0.5) * spacingX * 0.3;
                const nodeY = y * spacingY + (Math.random() - 0.5) * spacingY * 0.3;

                this.nodes.push({
                    x: nodeX,
                    y: nodeY,
                    active: Math.random() > 0.7, // Some nodes are active
                    pulsePhase: Math.random() * Math.PI * 2,
                    connections: []
                });
            }
        }

        // Create connections between nearby nodes (circuit traces)
        this.connections = [];
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dx = this.nodes[i].x - this.nodes[j].x;
                const dy = this.nodes[i].y - this.nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Connect nodes that are close together
                if (distance < Math.min(spacingX, spacingY) * 1.5 && Math.random() > 0.7) {
                    this.connections.push({
                        from: i,
                        to: j,
                        active: false,
                        pulseProgress: 0,
                        pulseSpeed: 0.02 + Math.random() * 0.03
                    });
                }
            }
        }
    }

    createCodeElements() {
        // Create falling code elements (like Matrix-style but with code)
        this.codeElements = [];
        const codeSnippets = [
            'def', 'class', 'import', 'function', 'const', 'let', 'var',
            'if', 'else', 'for', 'while', 'return', 'async', 'await',
            '()', '{}', '[]', '=>', '==', '!=', '&&', '||',
            '0x', '0b', '0o', 'true', 'false', 'null', 'undefined'
        ];

        for (let i = 0; i < 30; i++) {
            this.codeElements.push({
                text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                speed: 0.5 + Math.random() * 1.5,
                opacity: 0.1 + Math.random() * 0.2,
                fontSize: 10 + Math.random() * 8,
                color: Math.random() > 0.5 ? this.colors.cyan : this.colors.green
            });
        }
    }

    drawCircuit() {
        // Draw circuit connections (traces)
        this.ctx.strokeStyle = this.colors.cyan;
        this.ctx.lineWidth = 1;

        this.connections.forEach(conn => {
            const fromNode = this.nodes[conn.from];
            const toNode = this.nodes[conn.to];

            // Animate pulse along connection
            if (Math.random() < 0.001) {
                conn.active = true;
                conn.pulseProgress = 0;
            }

            if (conn.active) {
                conn.pulseProgress += conn.pulseSpeed;

                if (conn.pulseProgress > 1) {
                    conn.active = false;
                    conn.pulseProgress = 0;
                }

                // Draw pulse
                const pulseX = fromNode.x + (toNode.x - fromNode.x) * conn.pulseProgress;
                const pulseY = fromNode.y + (toNode.y - fromNode.y) * conn.pulseProgress;

                // Draw connection line with gradient
                const gradient = this.ctx.createLinearGradient(
                    fromNode.x, fromNode.y,
                    toNode.x, toNode.y
                );
                gradient.addColorStop(0, 'rgba(0, 229, 255, 0.1)');
                gradient.addColorStop(conn.pulseProgress - 0.1, 'rgba(0, 229, 255, 0.1)');
                gradient.addColorStop(conn.pulseProgress, 'rgba(0, 229, 255, 0.8)');
                gradient.addColorStop(conn.pulseProgress + 0.1, 'rgba(57, 255, 20, 0.8)');
                gradient.addColorStop(1, 'rgba(0, 229, 255, 0.1)');

                this.ctx.strokeStyle = gradient;
                this.ctx.beginPath();
                this.ctx.moveTo(fromNode.x, fromNode.y);
                this.ctx.lineTo(toNode.x, toNode.y);
                this.ctx.stroke();

                // Draw electric pulse
                this.ctx.fillStyle = this.colors.green;
                this.ctx.shadowBlur = 15;
                this.ctx.shadowColor = this.colors.green;
                this.ctx.beginPath();
                this.ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.shadowBlur = 0;
            } else {
                // Draw inactive connection
                this.ctx.strokeStyle = 'rgba(0, 229, 255, 0.15)';
                this.ctx.beginPath();
                this.ctx.moveTo(fromNode.x, fromNode.y);
                this.ctx.lineTo(toNode.x, toNode.y);
                this.ctx.stroke();
            }
        });

        // Draw circuit nodes
        this.nodes.forEach((node, index) => {
            node.pulsePhase += 0.05;

            const pulse = Math.sin(node.pulsePhase) * 0.5 + 0.5;
            const size = node.active ? 4 + pulse * 2 : 2;
            const opacity = node.active ? 0.8 + pulse * 0.2 : 0.3;

            // Draw node with glow
            this.ctx.fillStyle = this.colors.cyan;
            this.ctx.globalAlpha = opacity;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = this.colors.cyan;
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
            this.ctx.globalAlpha = 1;

            // Occasionally activate/deactivate nodes
            if (Math.random() < 0.002) {
                node.active = !node.active;
            }
        });
    }

    drawCode() {
        // Draw falling code elements
        this.codeElements.forEach(element => {
            element.y += element.speed;

            // Reset when off screen
            if (element.y > this.height) {
                element.y = -20;
                element.x = Math.random() * this.width;
            }

            // Draw code text
            this.ctx.fillStyle = element.color;
            this.ctx.globalAlpha = element.opacity;
            this.ctx.font = `${element.fontSize}px 'Courier New', monospace`;
            this.ctx.fillText(element.text, element.x, element.y);
            this.ctx.globalAlpha = 1;
        });
    }

    drawElectricSparks() {
        // Create occasional electric sparks between nodes
        if (Math.random() < 0.01 && this.connections.length > 0) {
            const conn = this.connections[Math.floor(Math.random() * this.connections.length)];
            if (conn.active) {
                const fromNode = this.nodes[conn.from];
                const toNode = this.nodes[conn.to];
                const sparkX = fromNode.x + (toNode.x - fromNode.x) * conn.pulseProgress;
                const sparkY = fromNode.y + (toNode.y - fromNode.y) * conn.pulseProgress;

                // Draw electric spark
                this.ctx.strokeStyle = this.colors.green;
                this.ctx.lineWidth = 2;
                this.ctx.shadowBlur = 20;
                this.ctx.shadowColor = this.colors.green;

                for (let i = 0; i < 5; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const length = 5 + Math.random() * 10;
                    this.ctx.beginPath();
                    this.ctx.moveTo(sparkX, sparkY);
                    this.ctx.lineTo(
                        sparkX + Math.cos(angle) * length,
                        sparkY + Math.sin(angle) * length
                    );
                    this.ctx.stroke();
                }

                this.ctx.shadowBlur = 0;
            }
        }
    }

    drawBinaryStream() {
        // Draw binary code stream on the sides
        const binaryChars = ['0', '1'];
        const streamCount = 8;

        for (let i = 0; i < streamCount; i++) {
            const x = (this.width / (streamCount + 1)) * (i + 1);
            const y = (Date.now() * 0.5 + i * 50) % this.height;

            for (let j = 0; j < 20; j++) {
                const charY = (y + j * 20) % this.height;
                const char = binaryChars[Math.floor(Math.random() * 2)];
                const opacity = j === 0 ? 1 : Math.max(0, 1 - j * 0.1);

                this.ctx.fillStyle = this.colors.cyan;
                this.ctx.globalAlpha = opacity * 0.3;
                this.ctx.font = '12px monospace';
                this.ctx.fillText(char, x, charY);
            }
        }
        this.ctx.globalAlpha = 1;
    }

    animate() {
        // Clear canvas with slight fade for trail effect
        this.ctx.fillStyle = 'rgba(5, 10, 20, 0.1)';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Draw all elements
        this.drawBinaryStream();
        this.drawCircuit();
        this.drawCode();
        this.drawElectricSparks();

        requestAnimationFrame(() => this.animate());
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createNodes();
        });

        // Add interactivity - create pulse on mouse move
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Activate nearest node
            this.nodes.forEach(node => {
                const dx = node.x - mouseX;
                const dy = node.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    node.active = true;
                    node.pulsePhase = 0;
                }
            });
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new CircuitCodeAnimation('circuitCanvas');
    });
} else {
    new CircuitCodeAnimation('circuitCanvas');
}

