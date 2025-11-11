// Tạo hiệu ứng tuyết rơi vĩnh viễn - chạy ngay khi load
function createSnowflakes() {
    const snowContainer = document.getElementById('snow-container');
    if (!snowContainer) return;

    // Bật hiệu ứng tuyết ngay lập tức (không chờ click)
    snowContainer.classList.add('enabled');

    // Số lượng bông tuyết
    const snowflakeCount = 120;

    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');

        // Tạo mix tuyết: 70% lớn, 30% nhỏ
        const isSmall = Math.random() < 0.3;

        if (isSmall) {
            // Tuyết nhỏ
            snowflake.innerHTML = '❄';
            snowflake.style.fontSize = Math.random() * 8 + 5 + 'px'; // 5-13px
            snowflake.style.opacity = Math.random() * 0.4 + 0.3; // 0.3-0.7 (mờ hơn)
        } else {
            // Tuyết lớn
            snowflake.innerHTML = '❄';
            snowflake.style.fontSize = Math.random() * 15 + 15 + 'px'; // 15-30px
            snowflake.style.opacity = Math.random() * 0.3 + 0.7; // 0.7-1.0 (đậm hơn)
        }

        // Vị trí bắt đầu ngẫu nhiên
        snowflake.style.left = Math.random() * 100 + '%';

        // Thời gian rơi ngẫu nhiên
        const duration = Math.random() * 10 + 10; // 10-20 giây
        snowflake.style.animationDuration = duration + 's';

        // Độ trễ ngẫu nhiên
        snowflake.style.animationDelay = Math.random() * 5 + 's';

        snowContainer.appendChild(snowflake);

        // Xóa tuyết cũ sau khi rơi xong
        setTimeout(() => snowflake.remove(), (duration + 5) * 1000);
    }

    // Tạo tuyết ban đầu
    for (let i = 0; i < snowflakeCount; i++) {
        createSnowflake();
    }

    // Tạo tuyết mới liên tục (vĩnh viễn)
    setInterval(() => {
        createSnowflake();
    }, 200); // Tạo tuyết mới mỗi 0.2 giây
}

// Gọi hàm khi DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createSnowflakes);
} else {
    createSnowflakes();
}