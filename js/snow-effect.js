// Hiệu ứng tuyết rơi dày đặc và chậm rãi
function createSnowflakes() {
    const snowContainer = document.getElementById('snow-container');
    if (!snowContainer) return;

    // Bật hiệu ứng tuyết ngay lập tức
    snowContainer.classList.add('enabled');

    // Tăng số lượng tuyết lên đáng kể
    const snowflakeCount = window.innerWidth < 768 ? 150 : 250;

    // Mảng lưu trữ các bông tuyết để quản lý
    const activeSnowflakes = [];

    function createSnowflake() {
        // Cho phép nhiều tuyết hơn
        if (activeSnowflakes.length >= snowflakeCount * 1.2) {
            return;
        }

        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');

        // Tạo các loại tuyết đa dạng với tốc độ chậm hơn
        const snowType = Math.random();
        let snowflakeChar, fontSize, opacity, animationDuration, fontWeight;

        if (snowType < 0.3) {
            // Tuyết nhỏ dày đặc - 30%
            snowflakeChar = '•';
            fontSize = Math.random() * 5 + 4; // 4-9px
            opacity = Math.random() * 0.5 + 0.5; // 0.5-1.0
            animationDuration = Math.random() * 15 + 25; // 25-40s (chậm hơn)
            fontWeight = 'bold';
        } else if (snowType < 0.6) {
            // Tuyết trung bình - 30%
            snowflakeChar = '❄';
            fontSize = Math.random() * 8 + 10; // 10-18px
            opacity = Math.random() * 0.5 + 0.6; // 0.6-1.1
            animationDuration = Math.random() * 18 + 30; // 30-48s (chậm hơn)
            fontWeight = 'normal';
        } else if (snowType < 0.85) {
            // Tuyết lớn - 25%
            snowflakeChar = '❅';
            fontSize = Math.random() * 10 + 15; // 15-25px
            opacity = Math.random() * 0.4 + 0.7; // 0.7-1.1
            animationDuration = Math.random() * 20 + 35; // 35-55s (chậm hơn)
            fontWeight = 'normal';
        } else {
            // Tuyết cực lớn - 15%
            snowflakeChar = '❆';
            fontSize = Math.random() * 12 + 20; // 20-32px
            opacity = Math.random() * 0.3 + 0.8; // 0.8-1.1
            animationDuration = Math.random() * 25 + 40; // 40-65s (rất chậm)
            fontWeight = 'bold';
        }

        snowflake.innerHTML = snowflakeChar;
        snowflake.style.fontSize = fontSize + 'px';
        snowflake.style.opacity = Math.min(opacity, 1.0);
        snowflake.style.fontWeight = fontWeight;

        // Vị trí bắt đầu ngẫu nhiên rộng hơn
        const startPosition = Math.random() * 120 - 10; // -10% đến 110%
        snowflake.style.left = startPosition + '%';

        // Thời gian rơi chậm hơn và độ trễ
        snowflake.style.animationDuration = animationDuration + 's';
        snowflake.style.animationDelay = Math.random() * 5 + 's'; // Tăng delay để trải đều

        // Hiệu ứng lắc lư nhẹ nhàng hơn
        const swingAmount = Math.random() * 40 + 15; // 15-55px (giảm lắc lư)
        snowflake.style.setProperty('--swing-amount', swingAmount + 'px');

        // Z-index và hiệu ứng bóng đổ
        snowflake.style.zIndex = Math.floor(Math.random() * 5) + 1;
        snowflake.style.textShadow = `0 0 8px rgba(255, 255, 255, 0.9), 0 0 15px rgba(255, 255, 255, 0.6)`;

        // Thêm hiệu ứng tỏa sáng nhẹ cho tuyết lớn
        if (snowType > 0.7) {
            snowflake.style.filter = `blur(${Math.random() * 0.3}px) brightness(${Math.random() * 0.2 + 1})`;
        }

        snowContainer.appendChild(snowflake);
        activeSnowflakes.push(snowflake);

        // Tăng thời gian chờ xóa do animation chậm hơn
        const removeTime = (animationDuration + 5) * 1000;
        setTimeout(() => {
            if (snowflake.parentNode) {
                snowflake.remove();
            }
            const index = activeSnowflakes.indexOf(snowflake);
            if (index > -1) {
                activeSnowflakes.splice(index, 1);
            }
        }, removeTime);
    }

    // Tạo tuyết ban đầu với số lượng lớn
    for (let i = 0; i < snowflakeCount; i++) {
        setTimeout(() => createSnowflake(), i * 80); // Tạo chậm hơn để tránh dồn
    }

    // Tạo tuyết mới liên tục với tốc độ chậm hơn
    let createInterval = setInterval(() => {
        if (activeSnowflakes.length < snowflakeCount) {
            createSnowflake();
        }
    }, 150); // Giảm tốc độ tạo xuống 150ms

    // Tự động điều chỉnh theo kích thước màn hình
    function adjustSnowDensity() {
        const newCount = window.innerWidth < 768 ? 150 : 250;
    }

    window.addEventListener('resize', adjustSnowDensity);

    // Dọn dẹp khi trang bị đóng
    window.addEventListener('beforeunload', () => {
        clearInterval(createInterval);
        activeSnowflakes.forEach(snowflake => {
            if (snowflake.parentNode) {
                snowflake.remove();
            }
        });
    });

    // Tối ưu hiệu suất khi tab không active
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(createInterval);
            snowContainer.style.opacity = '0.3';
        } else {
            createInterval = setInterval(() => {
                if (activeSnowflakes.length < snowflakeCount) {
                    createSnowflake();
                }
            }, 150);
            snowContainer.style.opacity = '1';
        }
    });
}

// CSS cần thêm vào file style.css với tốc độ chậm hơn
const snowStyles = `
.snowflake {
    position: absolute;
    top: -30px;
    color: white;
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.9), 0 0 15px rgba(255, 255, 255, 0.6);
    user-select: none;
    pointer-events: none;
    animation-name: snowFall, snowSwing;
    animation-timing-function: linear, ease-in-out;
    animation-iteration-count: infinite;
    will-change: transform, opacity;
}

@keyframes snowFall {
    0% {
        transform: translateY(-30px) rotate(0deg);
        opacity: 0;
    }
    5% {
        opacity: var(--opacity, 1);
    }
    95% {
        opacity: var(--opacity, 1);
    }
    100% {
        transform: translateY(110vh) rotate(360deg); /* Giảm xoay xuống 360 độ */
        opacity: 0;
    }
}

@keyframes snowSwing {
    0%, 100% {
        transform: translateX(calc(var(--swing-amount, 15px) * -0.3));
    }
    25% {
        transform: translateX(calc(var(--swing-amount, 15px) * 0.2));
    }
    50% {
        transform: translateX(calc(var(--swing-amount, 15px) * 0.5));
    }
    75% {
        transform: translateX(calc(var(--swing-amount, 15px) * -0.2));
    }
}

.snow-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9999;
    opacity: 0;
    transition: opacity 1.5s ease-in-out; /* Chậm hơn */
    overflow: hidden;
}

.snow-container.enabled {
    opacity: 1;
}

/* Tối ưu cho mobile - chậm hơn */
@media (max-width: 768px) {
    .snowflake {
        animation-duration: 20s !important; /* Chậm hơn trên mobile */
    }
    
    .snow-container {
        opacity: 0.9;
    }
    
    /* Giảm bớt filter trên mobile để tối ưu hiệu suất */
    .snowflake {
        filter: none !important;
    }
}

/* Hiệu ứng cho màn hình rất nhỏ */
@media (max-width: 320px) {
    .snowflake {
        animation-duration: 15s !important;
    }
}
`;

// Thêm CSS vào document
const styleSheet = document.createElement('style');
styleSheet.textContent = snowStyles;
document.head.appendChild(styleSheet);

// Gọi hàm khi DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createSnowflakes);
} else {
    createSnowflakes();
}
