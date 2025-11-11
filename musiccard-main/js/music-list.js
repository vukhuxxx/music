// Template

/*      {
        name: "",
        artist: "",
        img: "music-",
        id: "music-",
        src: "https://files.catbox.moe/",
        },
 */

let allGenres = [{
        genre: "Vinahouse",
        songs: [{
                name: "LamSung SCL NST #1",
                artist: "Lamsung026",
                img: "https://i.ibb.co/dwBvK94K/music-1.gif",
                id: "music-2",
                src: "https://files.catbox.moe/9fy2ex.mp3",
            },
            {
                name: "Chú Hề Chơi Đồ",
                artist: "Chill",
                img: "https://i.ibb.co/9HBN0M7V/music-3.gif",
                id: "music-3",
                src: "https://files.catbox.moe/gwxkal.mp3",
            },
            {
                name: "LamSung SCL NST #2",
                artist: "Lamsung026",
                img: "https://i.ibb.co/1fhTvqKC/music-4.gif",
                id: "music-4",
                src: "https://files.catbox.moe/2a0dun.mp3",
            },
            {
                name: "Gõ Gãy Người",
                artist: "CDAN",
                img: "https://i.ibb.co/67SRsvvW/music-5.gif",
                id: "music-5",
                src: "https://files.catbox.moe/qml7rz.mp3",
            }
        ]
    },
    {
        genre: "Vietmix",
        songs: [{
            name: "Infinity Music Vol 6",
            artist: "Ferrari",
            img: "https://i.ibb.co/hx7KZhcD/music-6.gif",
            id: "music-6",
            src: "https://files.catbox.moe/2a0dun.mp3",
        }, ]
    },
    {
        genre: "Track Lẻ",
        songs: [{
            name: "Đừng Ai Nhắc Về Cô Ấy",
            artist: "Future Mix",
            img: "https://i.ibb.co/KcYnNHth/music-2.gif",
            id: "music-7",
            src: "https://files.catbox.moe/xyx091.mp3",
        }, ]
    },
];

// Biến allMusic hiện tại sẽ được khởi tạo (tải) bằng thể loại đầu tiên
let allMusic = allGenres[0].songs;