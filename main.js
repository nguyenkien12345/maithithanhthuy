const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const title = document.querySelector('title');

canvas.width = window.innerWidth;    // Full màn hình width máy tính
canvas.height = window.innerHeight;  // Full màn hình height máy tính

const colors = ["#ffa400", "#2cccff", "#ff6bcb", "#e74c3c", "#07a787"];

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

// Tọa độ của chuột luôn nằm giữa màn hình
const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
}

function Particle(x, y, radius, color, velocity) {
    // Khởi tạo constructor
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.ttl = 200;

    // arc: Nó sẽ tạo ra đường cong hình tròn (x, y là tọa độ, radius: độ to của hình tròn, startAngle là bắt đầu chạy từ toạ độ nào, endAngle là kết thúc tại tọa độ nào, counterclockwise nên đặt là false)
    // 1 đường tròn sẽ tương ứng là 2 PI 
    this.draw = () => {
        context.beginPath();                                                 // Bắt đầu vẽ
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);    // Quá trình vẽ diễn ra
        context.fillStyle = this.color;                                     // fill màu vào
        context.fill();
        context.closePath();                                                // Kết thúc vẽ
    };

    this.update = () => {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.ttl--;
    }
}

// 1 mảng chứa các hình tròn
let particles = [];
// Số hình tròn con
let particlesCount = 25;

function init() {
    for (let index = 0; index < particlesCount; index++) {
        const radians = (Math.PI * 2) / particlesCount;         // Tương ứng 1 hình tròn nhưng chia cho 25 điểm
        // Luôn nàm ở giữa màn hình
        const x = canvas.width / 2;
        const y = canvas.height / 2;
        const velocity = {
            x: Math.cos(radians * index),
            y: Math.sin(radians * index),
        };
        // Các hình tròn sẽ nằm trong màn hình và 50 hình tròn này sẽ nằm tại 1 điểm chỉ định và nằm đè lên nhau
        particles.push(new Particle(x, y, 5, randomColor(colors), velocity));
    }
}

function generateCircles() {
    setTimeout(generateCircles, 200)
    for (let index = 0; index < particlesCount; index++) {
        const radians = (Math.PI * 2) / particlesCount;         // Tương ứng 1 hình tròn nhưng chia cho 50 điểm
        // Luôn nàm theo tọa độ con chuột
        const x = mouse.x;
        const y = mouse.y;
        const velocity = {
            x: Math.cos(radians * index),
            y: Math.sin(radians * index),
        };
        // Các hình tròn sẽ nằm trong màn hình và 50 hình tròn này sẽ nằm tại 1 điểm chỉ định và nằm đè lên nhau
        particles.push(new Particle(x, y, 10, randomColor(colors), velocity));
    }
}

function animate() {
    // requestAnimationFrame chính là đệ quy (Nó sẽ gọi lại function animate liên tục)
    requestAnimationFrame(animate);
    context.fillStyle = 'rgba(0,0,0,0.05)';
    // Clear những lần chạy (frame cũ) trước đó đi
    context.fillRect(0, 0, canvas.width, canvas.height);
    // Nó sẽ chỉ chạy đến 1 ngưỡng nào đó rồi mất chứ không chạy full màn hình
    particles.forEach((item, index) => {
        if (item?.ttl === 0) {
            particles.splice(index, 1);
        }
        item.update();
    });
}

init();
animate();
generateCircles();

window.addEventListener('mousemove', function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

// Lý thuyết
// Trục ngang dùng cos (x)
// Trục dọc dùng sin   (y)
// Radian là 1 đơn vị đo góc phẳng và được dùng phổ biến trong toán học. Ví dụ sin(x), cos(x), v.v... thì góc x luôn luôn được dùng với đơn vị là radian

