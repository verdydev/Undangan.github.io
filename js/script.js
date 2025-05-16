document.addEventListener('DOMContentLoaded', function() {
    // Ambil parameter nama dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const namaTamu = urlParams.get('nama');

    // Tampilkan nama tamu di cover dan bagian tamu
    const namaTamuCover = document.getElementById('nama-tamu');
    const namaTamuSection = document.getElementById('nama-tamu-section');

    if (namaTamu) {
        namaTamuCover.textContent = `Yth. Bapak/Ibu/Saudara/i ${namaTamu.replace(/\+/g, ' ')}`;
        if (namaTamuSection) {
            namaTamuSection.textContent = `Bapak/Ibu/Saudara/i ${namaTamu.replace(/\+/g, ' ')}`;
        }
    }

    // Efek Scroll Reveal (membutuhkan library seperti ScrollReveal jika ingin lebih kompleks)
    // Contoh sederhana menambahkan class 'revealed' saat discroll ke elemen
    const sections = document.querySelectorAll('.section');
    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollPosition = window.scrollY;

            if (scrollPosition > sectionTop - windowHeight + sectionHeight / 4) {
                section.classList.add('revealed');
            }
        });
    }
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Panggil saat load untuk elemen yang terlihat di awal

    // Animasi sederhana untuk transisi antar section dan memutar musik
    const lihatUndanganButton = document.getElementById('lihat-undangan');
    const backgroundAudio = document.getElementById('background-audio');
    let isPlaying = false; // Tambahkan status pemutaran

    if (lihatUndanganButton && backgroundAudio) {
        lihatUndanganButton.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('mempelai').scrollIntoView({ behavior: 'smooth' });
            // Putar musik saat tombol diklik jika belum diputar
            if (!isPlaying) {
                backgroundAudio.play().catch(error => {
                    console.error("Gagal memutar audio:", error);
                    // Mungkin perlu menampilkan pesan ke pengguna jika autoplay gagal
                });
                isPlaying = true;
                const playPauseButton = document.getElementById('play-pause-button');
                if (playPauseButton) {
                    playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
                }
            }
        });
    }

    // RSVP Form Submission (simulasi mengirim data ke Google Sheets - perlu implementasi backend/API nyata)
    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpMessage = document.getElementById('rsvp-message');

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Ini hanya simulasi. Untuk menyimpan ke Google Sheets, Anda memerlukan Google Apps Script
            // dan mengirim data ke URL publik dari script tersebut (melalui fetch API).
            console.log('Data RSVP yang dikirim:', data);
            rsvpForm.classList.add('d-none');
            rsvpMessage.classList.remove('d-none');
            rsvpForm.reset();
        });
    }

    // Countdown Timer
    const weddingDate = new Date('2025-10-02T08:00:00'); // Ganti dengan tanggal pernikahan Anda
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date();
        const difference = weddingDate.getTime() - now.getTime();

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            daysElement.textContent = String(days).padStart(2, '0');
            hoursElement.textContent = String(hours).padStart(2, '0');
            minutesElement.textContent = String(minutes).padStart(2, '0');
            secondsElement.textContent = String(seconds).padStart(2, '0');
        } else {
            clearInterval(countdownInterval);
            document.getElementById('timer').textContent = 'Hari Bahagia Telah Tiba!';
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Panggil pertama kali agar tidak ada delay

    // Kontrol Background Musik (Play/Pause Button)
    const audio = document.getElementById('background-audio');
    const playPauseButton = document.getElementById('play-pause-button');

    if (audio && playPauseButton) {
        playPauseButton.addEventListener('click', function() {
            if (isPlaying) {
                audio.pause();
                playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
            } else {
                audio.play().catch(error => {
                    console.error("Gagal memutar audio:", error);
                    // Mungkin perlu menampilkan pesan ke pengguna jika autoplay gagal
                });
                playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
            }
            isPlaying = !isPlaying;
        });
    }
});