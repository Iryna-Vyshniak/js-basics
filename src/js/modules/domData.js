
import trackLedZeppelin from '/src/assets/audio/Led_Zeppelin-Stairway_To_Heaven-spaces.im.mp3';
import trackQueen1 from '/src/assets/audio/bohemian_rhapsody_Queen-Bohemian-Rhapsody.mp3';
import trackLynyrd from '/src/assets/audio/Lynyrd-Skynyrd-FreeBird.mp3';
import trackDeepPurple from '/src/assets/audio/Deep_Purple-Smoke_On_The_Water_(1971)-spaces.im.mp3';
import trackHendrix from '/src/assets/audio/Jimi-Hendrix-All-Along-The-Watchtower.mp3';
import trackACDC from '/src/assets/audio/ACDC-Back_In_Black-spaces.im.mp3';
import trackQueen2 from '/src/assets/audio/We-Will-Rock-You-By-Queen-.mp3';
import trackMetallica from '/src/assets/audio/Metallica-Enter_Sandman-spaces.im.mp3';

export const initDomData = () => {
  // ==========================================
  // ЗАВДАННЯ 1: Плейлист
  // ==========================================
  const playList = [
    { author: "LED ZEPPELIN", song: "STAIRWAY TO HEAVEN", isPlaying: false, file: trackLedZeppelin },
    { author: "QUEEN", song: "BOHEMIAN RHAPSODY", isPlaying: false, file: trackQueen1 },
    { author: "LYNYRD SKYNYRD", song: "FREE BIRD", isPlaying: false, file: trackLynyrd },
    { author: "DEEP PURPLE", song: "SMOKE ON THE WATER", isPlaying: false, file: trackDeepPurple },
    { author: "JIMI HENDRIX", song: "ALL ALONG THE WATCHTOWER", isPlaying: false, file: trackHendrix },
    { author: "AC/DC", song: "BACK IN BLACK", isPlaying: false, file: trackACDC },
    { author: "QUEEN", song: "WE WILL ROCK YOU", isPlaying: false, file: trackQueen2 },
    { author: "METALLICA", song: "ENTER SANDMAN", isPlaying: false, file: trackMetallica }
  ];

  const playlistContainer = document.getElementById('playlist-container');
  
  const elAuthor = document.getElementById('player-author');
  const elSong = document.getElementById('player-song');
  const elStatus = document.getElementById('player-status');
  const elTime = document.getElementById('player-time');
  const btnPlayerPlay = document.getElementById('btn-player-play');
  const btnPlayerPrev = document.getElementById('btn-player-prev');
  const btnPlayerNext = document.getElementById('btn-player-next');
  const iconPlay = document.getElementById('icon-play');
  const iconPause = document.getElementById('icon-pause');
  
  const volumeKnob = document.getElementById('volume-knob');
  const volumeIndicator = document.getElementById('volume-indicator');

  if (playlistContainer) {
    const audioPlayer = new Audio();
    let currentTrackIndex = -1; 
    audioPlayer.volume = 0.5;

    // --- ОНОВЛЕННЯ UI ПЛЕЄРА ---
    
    const updatePlayerScreen = () => {
      if (currentTrackIndex === -1) return;
      
      const track = playList[currentTrackIndex];
      elAuthor.textContent = track.author;
      elSong.textContent = track.song;
      
      if (track.isPlaying) {
        elStatus.textContent = "PLAYING";
        iconPlay.classList.add('hidden');
        iconPause.classList.remove('hidden');
        btnPlayerPlay.setAttribute('aria-pressed', 'true');
      } else {
        elStatus.textContent = "PAUSED";
        iconPlay.classList.remove('hidden');
        iconPause.classList.add('hidden');
        btnPlayerPlay.setAttribute('aria-pressed', 'false');
      }
    };

const renderPlaylist = () => {
  playlistContainer.innerHTML = playList.map((item, index) => {
    const activeContainer = item.isPlaying ? 'shadow-neo-concave bg-neo-bg' : 'shadow-none hover:bg-white/30';
    const activeIcon = item.isPlaying ? 'text-[#334155]' : 'text-gray-400';
    
    return `
    <li class="w-full">
      <button 
        type="button"
        class="w-full flex items-center gap-4 text-left p-2 rounded-2xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-neo-accent ${activeContainer}" 
        data-index="${index}"
        aria-pressed="${item.isPlaying}"
      >
        <div class="w-10 h-10 shrink-0 rounded-full bg-neo-bg shadow-neo-concave flex items-center justify-center ${activeIcon}" aria-hidden="true">
          ${item.isPlaying 
            ? `<svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`
            : `<svg class="w-4 h-4 ml-0.5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`}
        </div>
        <div class="flex flex-col overflow-hidden">
          <span class="text-sm font-bold text-[#2C3E50] truncate">${item.author}</span>
          <span class="text-xs text-gray-500 uppercase truncate mt-0.5">${item.song}</span>
        </div>
      </button>
    </li>
  `}).join('');
};

    const playTrack = (index) => {
      playList.forEach(item => item.isPlaying = false);
      
      currentTrackIndex = index;
      const track = playList[index];
      track.isPlaying = true;

      // Перевіряємо чи файл уже завантажено, щоб не збивати час
      if (audioPlayer.src.indexOf(track.file.replace(/^\//, '')) === -1) {
        audioPlayer.src = track.file;
      }
      
      audioPlayer.play().catch(e => console.error(e));

      updatePlayerScreen();
      renderPlaylist();
    };

    const togglePlay = () => {
      if (currentTrackIndex === -1) {
        playTrack(0);
        return;
      }

      const track = playList[currentTrackIndex];
      track.isPlaying = !track.isPlaying;

      if (track.isPlaying) {
        audioPlayer.play().catch(e => console.error(e));
      } else {
        audioPlayer.pause();
      }

      updatePlayerScreen();
      renderPlaylist();
    };

    const playNext = () => {
      if (currentTrackIndex === -1) return;
      const nextIndex = (currentTrackIndex + 1) % playList.length;
      playTrack(nextIndex);
    };

    const playPrev = () => {
      if (currentTrackIndex === -1) return;
      const prevIndex = (currentTrackIndex - 1 + playList.length) % playList.length;
      playTrack(prevIndex);
    };

    // --- ГУЧНІСТЬ ---
    
    if (volumeKnob && volumeIndicator) {
      let isDraggingVol = false;

      const setVolume = (newVolume) => {
        let vol = Math.max(0, Math.min(1, newVolume));
        audioPlayer.volume = vol;
        
        // Математика кута: 0 гучність = -135 градусів, 1 гучність = 135 градусів
        const angle = (vol * 270) - 135;
        volumeIndicator.style.transform = `rotate(${angle}deg)`;
        volumeKnob.setAttribute('aria-valuenow', Math.round(vol * 100));
      };

      // Ініціалізація стартового кута
      setVolume(0.5);

      const updateVolumeFromMouse = (e) => {
        const rect = volumeKnob.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        
        let angle = Math.atan2(dy, dx) * (180 / Math.PI);
        angle += 90; 
        
        if (angle > 180) angle -= 360;
        if (angle < -135) angle = -135;
        if (angle > 135) angle = 135;

        const volumeValue = (angle + 135) / 270;
        setVolume(volumeValue);
      };

      volumeKnob.addEventListener('pointerdown', (e) => {
        isDraggingVol = true;
        volumeKnob.setPointerCapture(e.pointerId);
        updateVolumeFromMouse(e);
      });

      volumeKnob.addEventListener('pointermove', (e) => {
        if (isDraggingVol) updateVolumeFromMouse(e);
      });

      volumeKnob.addEventListener('pointerup', (e) => {
        isDraggingVol = false;
        volumeKnob.releasePointerCapture(e.pointerId);
      });

      volumeKnob.addEventListener('keydown', (e) => {
        const STEP = 0.1;
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
          e.preventDefault();
          setVolume(audioPlayer.volume + STEP);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
          e.preventDefault();
          setVolume(audioPlayer.volume - STEP);
        }
      });
    }

    // --- СЛУХАЧІ ТА ТАЙМЕР ---

    const formatTime = (seconds) => {
      if (isNaN(seconds)) return "0:00";
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60);
      return `${m}:${s.toString().padStart(2, '0')}`;
    };

    audioPlayer.addEventListener('timeupdate', () => {
      if (currentTrackIndex !== -1) {
        elTime.textContent = formatTime(audioPlayer.currentTime);
      }
    });

    audioPlayer.addEventListener('ended', playNext);

    if (btnPlayerPlay) btnPlayerPlay.addEventListener('click', togglePlay);
    if (btnPlayerNext) btnPlayerNext.addEventListener('click', playNext);
    if (btnPlayerPrev) btnPlayerPrev.addEventListener('click', playPrev);

   playlistContainer.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-index]');
  if (!btn) return;

  const index = parseInt(btn.dataset.index, 10);
  if (currentTrackIndex === index) {
    togglePlay(); 
  } else {
    playTrack(index); 
  }
});
    renderPlaylist();
  }

  // ==========================================
  // ЗАВДАННЯ 2 & 3: Модальне вікно та Світлофор
  // ==========================================
  const modal = document.getElementById('traffic-light-modal');
  const btnOpen = document.getElementById('btn-open-traffic-modal');
  const btnClose = document.getElementById('btn-close-traffic-modal');
  
  const lights = [
    { element: document.getElementById('light-red'), name: 'Червоний' },
    { element: document.getElementById('light-yellow'), name: 'Жовтий' },
    { element: document.getElementById('light-green'), name: 'Зелений' }
  ];
  const btnNext = document.getElementById('btn-next-color');
  const statusAnnouncer = document.getElementById('traffic-light-status');
  
  let currentLightIndex = -1;

  const setLight = (targetIndex) => {
    currentLightIndex = targetIndex;

    lights.forEach((lightObj, index) => {
      if (!lightObj.element) return;
      
      const isActive = index === currentLightIndex;
      
      lightObj.element.dataset.active = isActive;
      lightObj.element.setAttribute('aria-pressed', isActive.toString());
      
      if (isActive) {
        statusAnnouncer.textContent = `Світлофор перемикнуто на: ${lightObj.name} сигнал`;
      }
    });
  };

  const setNextLight = () => {
    const nextIndex = (currentLightIndex + 1) % lights.length;
    setLight(nextIndex);
  };

  lights.forEach((lightObj, index) => {
    if (lightObj.element) {
      lightObj.element.addEventListener('click', () => setLight(index));
    }
  });


  if (btnOpen && modal && btnClose) {
    const focusableElementsString = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    btnOpen.addEventListener('click', () => {
      modal.showModal();
      if (currentLightIndex === -1) setNextLight();
      btnClose.focus();
    });

    btnClose.addEventListener('click', () => {
      modal.close();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        const dialogDimensions = modal.getBoundingClientRect();
        if (
          e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right ||
          e.clientY < dialogDimensions.top ||
          e.clientY > dialogDimensions.bottom
        ) {
          modal.close();
        }
      }
    });

    modal.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;

      const focusableElements = modal.querySelectorAll(focusableElementsString);
      if (focusableElements.length === 0) return;

      const firstTabStop = focusableElements[0];
      const lastTabStop = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstTabStop) {
          e.preventDefault();
          lastTabStop.focus();
        }
      } else {
        if (document.activeElement === lastTabStop) {
          e.preventDefault();
          firstTabStop.focus();
        }
      }
    });

    modal.addEventListener('close', () => {
      btnOpen.focus();
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', setNextLight);
  }
};