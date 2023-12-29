
class Stack {
    constructor() {
        this.stack = [];
    }

    push(item) {
        this.stack.push(item);
    }

    peek() {
        return this.stack[this.stack.length - 1];
    }
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.toCartesian();
    }

    toCartesian() {
        this.y = -this.y;
    }
}

class Vector {
    constructor(point1, point2) {
        this.point1 = point1;
        this.point2 = point2;
    }

    /** 
     * @param {number} angle - Angle in degrees
     * @param {number} length - Length of the vector
    */
    moveToAngle(angle, length) {
        const rad = angle * Math.PI / 180;

        if(Math.abs(this.point1.x + length * Math.cos(rad)) < canvas.width / 2) {
            this.point2.x = this.point1.x + length * Math.cos(rad);
        }
                
        if(Math.abs(this.point1.y + length * -Math.sin(rad)) < canvas.height / 2) {
            this.point2.y = this.point1.y + length * -Math.sin(rad);
        }
    }

    getLastPosition() {
        return new Point(this.point2.x, this.point2.y);
    }

    draw(ctx, color = 'black', width = 1) {
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.lineTo(this.point1.x, this.point1.y);
        ctx.lineTo(this.point2.x, this.point2.y);
        ctx.closePath();
        ctx.stroke();
    }
}

function sabDrawLine(ctx, x1, y1, x2, y2, color = 'black', width = '1') {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.stroke();
}

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

ctx.lineWidth = 1;
ctx.strokeStyle = 'black';
ctx.translate(canvas.width / 2, canvas.height / 2);

const stack = new Stack();
stack.push(new Point(0, 0));

let counter = 0;

function animate() {
    counter = counter + 1;
    ctx.clearRect(-canvas.width, -canvas.height, canvas.width * 2, canvas.height * 2);

    stack.stack.forEach((item, index) => {
        if(index !== stack.stack.length - 1) {
            const v = new Vector(new Point(item.x, item.y), new Point(stack.stack[index + 1].x, stack.stack[index + 1].y));
            v.draw(ctx);
        }
    });

    // you can slow down speed the animation by changing the value of the modulus operator
    if(counter % 1 === 0) {
        lp = stack.peek();
        const v = new Vector(new Point(lp.x, lp.y), new Point(lp.x, lp.y));
        v.moveToAngle(Math.random() * 360, Math.random() * 120);
        stack.push(v.getLastPosition());
        v.draw(ctx);
    }

    requestAnimationFrame(animate);
}

animate();