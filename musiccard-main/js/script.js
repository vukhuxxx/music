const wrapper = document.querySelector(".wrapper"),
    musicImg = wrapper.querySelector(".img-area img"),
    musicName = wrapper.querySelector(".song-details .name"),
    musicArtist = wrapper.querySelector(".song-details .artist"),
    playPauseBtn = wrapper.querySelector(".play-pause"),
    prevBtn = wrapper.querySelector("#prev"),
    nextBtn = wrapper.querySelector("#next"),
    mainAudio = wrapper.querySelector("#main-audio"),
    progressArea = wrapper.querySelector(".progress-area"),
    progressBar = progressArea.querySelector(".progress-bar"),
    repeatBtn = wrapper.querySelector("#repeat-plist"),

    // ===================================================
    // TÙY CHỈNH: KHAI BÁO BIẾN CHO MUSIC/GENRE LIST MỚI
    // ===================================================
    musicListContainer = wrapper.querySelector(".music-list-container"), // Container chính bao gồm cả 2 list
    genreUlTag = wrapper.querySelector("#genre-ul"), // Thẻ UL cho Genre List
    musicUlTag = wrapper.querySelector(".music-list ul"), // Thẻ UL cho Music List
    moreMusicBtn = wrapper.querySelector("#more-music"), // Nút mở list (icon nốt nhạc)
    closeGenreList = wrapper.querySelector("#close-genre"), // Nút đóng trên Genre List
    closeMusicList = wrapper.querySelector("#close-music-list"), // Nút đóng trên Music List
    backToGenre = wrapper.querySelector("#back-to-genre"), // Nút quay lại trên Music List
    currentGenreName = wrapper.querySelector("#current-genre-name"), // Tên thể loại hiện tại

    // Thêm biến cho các tùy chỉnh mới
    avatarIcon = wrapper.querySelector(".avatar-icon");
const themeToggle = document.getElementById('checkbox');
const body = document.querySelector('body');


// ===================================================
// KHỞI TẠO VÀ TẢI DỮ LIỆU BAN ĐẦU
// ===================================================

let musicIndex; // Khai báo musicIndex không cần gán giá trị ban đầu

window.addEventListener("load", () => {
    // KHỞI TẠO ALLMUSIC TỪ GENRE ĐẦU TIÊN
    const initialGenreIndex = 0;
    allMusic = allGenres[initialGenreIndex].songs; // Lấy danh sách bài hát của thể loại đầu tiên

    // KHỞI TẠO BÀI HÁT NGẪU NHIÊN TRONG DANH SÁCH ĐÓ
    musicIndex = Math.floor(Math.random() * allMusic.length);

    loadMusic(musicIndex);
    updatePlayingSong();

    loadGenreList(); // Tải danh sách thể loại
    loadSongList(); // Tải danh sách bài hát ban đầu

    // Khởi tạo Giờ VN và Dark Mode
    updateVietnamTime();
    setInterval(updateVietnamTime, 1000);
    initTheme();
});

// File: script.js (Tìm và thay thế hàm loadMusic)

function loadMusic(indexNumb) {
    // ... (các dòng khai báo biến)
    musicName.innerText = allMusic[indexNumb].name;
    musicArtist.innerText = allMusic[indexNumb].artist;

    // DÒNG CODE CẦN SỬA: Chỉ gán trực tiếp URL vào src
    // Đã xóa phần: `images/${...}.jpg`
    musicImg.src = allMusic[indexNumb].img;

    mainAudio.src = allMusic[indexNumb].src;
    // ...
}

// Play music
function playMusic() {
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}

// Pause music
function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}

// File: script.js (Logic này đã đúng, chỉ cần kiểm tra lại)

function nextMusic() {
    musicIndex = (musicIndex + 1) % allMusic.length;
    // DÒNG NÀY ĐÃ GỌI HÀM SỬA LỖI
    loadMusic(musicIndex);
    playMusic();
    updatePlayingSong();
}

function prevMusic() {
    musicIndex = (musicIndex - 1 + allMusic.length) % allMusic.length;
    // DÒNG NÀY ĐÃ GỌI HÀM SỬA LỖI
    loadMusic(musicIndex);
    playMusic();
    updatePlayingSong();
}
// Select a song from the list
function selectSong(element) {
    const selectedIndex = element.getAttribute("li-index");
    musicIndex = selectedIndex - 1;
    loadMusic(musicIndex);
    playMusic();
    updatePlayingSong();
}

// Play or pause event
playPauseBtn.addEventListener("click", () => {
    const isPlaying = wrapper.classList.contains("paused");
    isPlaying ? pauseMusic() : playMusic();
    updatePlayingSong();
});

// Previous and next button events

nextBtn.addEventListener("click", nextMusic);
prevBtn.addEventListener("click", prevMusic);

// TRONG PHẦN XỬ LÝ SỰ KIỆN MAIN AUDIO

// Cập nhật thanh tiến trình (Progress Bar) khi nhạc đang chạy
mainAudio.addEventListener("timeupdate", (e) => {
    // ... (Giữ nguyên logic tính toán width)
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector(".current-time"),
        musicDuration = wrapper.querySelector(".max-duration");

    // Lấy thời gian hiện tại
    musicCurrentTime.innerText = formatTime(currentTime);

    // Xử lý khi loadeddata (Khi bài hát tải xong)
    mainAudio.addEventListener("loadeddata", () => {
        let mainAudioDuration = mainAudio.duration;
        // Lấy tổng thời gian bài hát
        musicDuration.innerText = formatTime(mainAudioDuration);
    });
});

// THÊM HÀM FORMAT THỜI GIAN CHUNG (HOẶC CHỈNH SỬA HÀM HIỆN CÓ)
function formatTime(timeInSeconds) {
    let totalMinutes = Math.floor(timeInSeconds / 60);
    let totalSeconds = Math.floor(timeInSeconds % 60);

    // TÍNH TOÁN GIỜ
    let totalHours = Math.floor(totalMinutes / 60);

    // TÍNH TOÁN PHÚT CÒN LẠI SAU KHI ĐÃ TÍNH GIỜ
    totalMinutes = totalMinutes % 60;

    // Định dạng: thêm số 0 nếu < 10
    let formattedSeconds = totalSeconds < 10 ? `0${totalSeconds}` : `${totalSeconds}`;
    let formattedMinutes = totalMinutes < 10 ? `0${totalMinutes}` : `${totalMinutes}`;

    // NẾU TỔNG THỜI GIAN >= 1 GIỜ, THÌ HIỂN THỊ H:MM:SS
    if (totalHours > 0) {
        let formattedHours = totalHours < 10 ? `${totalHours}` : `${totalHours}`; // Giữ nguyên số giờ
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    } else {
        // NẾU < 1 GIỜ, CHỈ HIỂN THỊ MM:SS (Giữ nguyên như cũ)
        return `${formattedMinutes}:${formattedSeconds}`;
    }
}
// Seek through the progress bar
progressArea.addEventListener("click", (e) => {
    const progressWidth = progressArea.clientWidth;
    const clickedOffsetX = e.offsetX;
    mainAudio.currentTime = (clickedOffsetX / progressWidth) * mainAudio.duration;
    playMusic();
    updatePlayingSong();


});

// Repeat/shuffle button event
repeatBtn.addEventListener("click", () => {
    switch (repeatBtn.innerText) {
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped");
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playback shuffled");
            break;
        case "shuffle":
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playlist looped");
            break;
    }
});

// Handle song end event
mainAudio.addEventListener("ended", () => {
    switch (repeatBtn.innerText) {
        case "repeat":
            nextMusic();
            break;
        case "repeat_one":
            mainAudio.currentTime = 0;
            playMusic();
            break;
        case "shuffle":
            shuffleMusic();
            break;
    }
});

// Shuffle music
function shuffleMusic() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * allMusic.length);
    } while (randomIndex === musicIndex);
    musicIndex = randomIndex;
    loadMusic(musicIndex);
    playMusic();
    updatePlayingSong();
}

// ===================================================
// LOGIC MUSIC LIST MỚI (GENRE/SONG SLIDE)
// ===================================================

// Show/hide music list (Khi click icon nốt nhạc)
moreMusicBtn.addEventListener("click", () => {
    musicListContainer.classList.add("show"); // Hiển thị container chính
    musicListContainer.classList.remove("slide-to-songs"); // Luôn mở về trang Genre đầu tiên
});

// Logic đóng Music List (Nút X trên Genre List)
closeGenreList.addEventListener("click", () => {
    musicListContainer.classList.remove("show");
});

// Logic đóng Music List (Nút X trên Song List)
closeMusicList.addEventListener("click", () => {
    musicListContainer.classList.remove("show");
});

// Logic Quay lại trang Genre (Nút Mũi tên)
backToGenre.addEventListener("click", () => {
    musicListContainer.classList.remove("slide-to-songs");
});

// --- LOGIC TẠO VÀ HIỂN THỊ CÁC MỤC BÀI HÁT (CẬP NHẬT) ---
function loadSongList() {
    musicUlTag.innerHTML = ""; // Xóa danh sách cũ

    allMusic.forEach((songs, index) => {
        // *** ĐÃ SỬA ĐỔI ***: Dùng song.id thay vì song.src cho ID và Class
        const trackId = songs.id || `music-${index + 1}`;

        const liTag = `
            <li li-index="${index + 1}">
              <div class="row">
                <span>${songs.name || "Unknown Track"}</span>
                <p>${songs.artist || "Unknown Artist"}</p>
              </div>
              <span id="${trackId}-duration" class="audio-duration">00:00</span>
              <audio class="${trackId}-audio" src="${songs.src}"></audio> 
            </li>`;
        musicUlTag.insertAdjacentHTML("beforeend", liTag);


        // Xử lý duration 
        const liAudioTag = musicUlTag.querySelector(`.${trackId}-audio`);
        if (liAudioTag && songs.src) {
            liAudioTag.addEventListener("loadeddata", () => {
                const duration = liAudioTag.duration;
                const totalMin = Math.floor(duration / 60);
                const totalSec = Math.floor(duration % 60)
                    .toString()
                    .padStart(2, "0");

                const durationTag = musicUlTag.querySelector(`#${trackId}-duration`);
                if (durationTag) {
                    durationTag.innerText = `${totalMin}:${totalSec}`;
                    durationTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
                }
            });
        }

        // >>> PHẦN ĐƯỢC BỔ SUNG: GÁN SỰ KIỆN CLICK <<<
        // Tìm lại thẻ LI vừa thêm vào DOM
        const liItem = musicUlTag.querySelector(`li[li-index="${index + 1}"]`);
        if (liItem) {
            // Gán sự kiện click để gọi hàm selectSong
            liItem.addEventListener("click", () => selectSong(liItem));
        }
        // >>> HẾT PHẦN BỔ SUNG <<<
    });
}

// Cập nhật bài hát đang phát trong danh sách
function updatePlayingSong() {
    const allLiTags = musicUlTag.querySelectorAll("li");

    // Remove 'playing' class from all list items
    allLiTags.forEach((li) => {
        li.classList.remove("playing");
        const audioTag = li.querySelector(".audio-duration");
        const songDuration = audioTag.getAttribute("t-duration");
        // Chỉ cập nhật lại nếu có t-duration
        if (songDuration) {
            audioTag.innerText = songDuration;
        } else {
            audioTag.innerText = "00:00";
        }
    });

    // Add 'playing' class to the current song
    const currentLi = musicUlTag.querySelector(`li[li-index="${musicIndex + 1}"]`);
    if (currentLi) {
        currentLi.classList.add("playing");
        // Update the duration text to "Playing"
        const currentAudioTag = currentLi.querySelector(".audio-duration");
        currentAudioTag.innerText = "Playing";
    }
}

// ===================================================
// LOGIC CHUYỂN ĐỔI GENRE VÀ SONG LIST
// ===================================================

// Tải danh sách các thể loại
function loadGenreList() {
    genreUlTag.innerHTML = "";

    allGenres.forEach((genre, index) => { // allGenres được lấy từ music-list.js
        const liTag = `
            <li data-genre-index="${index}">
              <div class="row">
                <span>${genre.genre}</span>
                <i class="material-icons">chevron_right</i>
              </div>
            </li>`;
        genreUlTag.insertAdjacentHTML("beforeend", liTag);
    });
    // Thêm event listener cho từng thể loại
    genreUlTag.querySelectorAll("li").forEach(li => {
        li.addEventListener("click", () => {
            const index = li.getAttribute("data-genre-index");
            loadMusicListForGenre(parseInt(index));
        });
    });
}
// File: script.js

// Hàm Tải danh sách Thể loại
function loadGenreList() {
    genreUlTag.innerHTML = ""; // Xóa các mục cũ

    // allGenres.forEach( (genre, i) => { ... } )
    // Hoặc dùng vòng lặp for thông thường
    for (let i = 0; i < allGenres.length; i++) {
        const genre = allGenres[i];

        // ĐÃ SỬA: Thêm `onclick="loadMusicListForGenre(${i})"` vào thẻ <li>
        const liTag = `
            <li data-genre="${genre.genre}" onclick="loadMusicListForGenre(${i})">
              <div class="row">
                <span>${genre.genre}</span>
                <p>(${genre.songs.length} bài)</p> 
              </div>
            </li>`;

        genreUlTag.insertAdjacentHTML("beforeend", liTag);
    }
}

// Chuyển sang Music List Panel và tải bài hát của thể loại được chọn
function loadMusicListForGenre(genreIndex) {
    const selectedGenre = allGenres[genreIndex];
    allMusic = selectedGenre.songs; // Cập nhật biến allMusic

    // 1. CHUYỂN MÀN HÌNH
    musicListContainer.classList.add("slide-to-songs");
    currentGenreName.innerText = selectedGenre.genre;

    // 2. TẢI LẠI DANH SÁCH BÀI HÁT MỚI
    loadSongList();
    // 3. CẬP NHẬT TRẠNG THÁI (Nếu bài hát hiện tại có trong list mới)
    updatePlayingSong();
}

// ===================================================
// TÙY CHỈNH (CUSTOM LOGIC)
// ===================================================

// --- LOGIC HIỂN THỊ GIỜ VIỆT NAM ---

const timeDisplay = document.getElementById("vietnam-time");

function updateVietnamTime() {
    const now = new Date();

    const formatter = new Intl.DateTimeFormat('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // Định dạng 24 giờ
    });

    const vietnamTime = formatter.format(now);

    if (timeDisplay) {
        timeDisplay.innerText = vietnamTime;
    }
}


// --- 3. LOGIC CLICK AVATAR (Hiệu ứng nảy) ---
avatarIcon.addEventListener('click', () => {
    avatarIcon.classList.toggle('active');

    if (avatarIcon.classList.contains('active')) {
        setTimeout(() => {
            avatarIcon.classList.remove('active');
        }, 300);
    }
});

// File: script.js (Thêm vào cuối file hoặc trong hàm khởi tạo)

// Tải bài hát mặc định khi trang tải xong (musicIndex thường là 0 hoặc ngẫu nhiên)
window.addEventListener("load", () => {
    // Khởi tạo các danh sách và tải nhạc
    loadGenreList(); // Đảm bảo list thể loại được load

    // Đảm bảo musicIndex đã được xác định trước đó (thường là 0 hoặc random)
    loadMusic(musicIndex);

    // Các hàm khác...
});


// Hàm này được gọi khi người dùng click vào một bài hát trong danh sách
function playSongFromList(index) {
    // 1. Cập nhật index bài hát đang phát
    musicIndex = index;

    // 2. Tải bài hát mới (Hàm này sẽ tự động cập nhật GIF)
    loadMusic(musicIndex);

    // 3. Bắt đầu phát nhạc
    playMusic();

    // 4. Cập nhật trạng thái 'đang phát' (để highlight bài hát)
    updatePlayingSong();

    // Tùy chọn: Tự động đóng Music List sau khi chọn
    // musicListContainer.classList.remove("show"); 
}