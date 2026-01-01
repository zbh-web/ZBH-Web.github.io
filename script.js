// 赛博朋克特效脚本
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有特效
    initTypingEffect();
    initStatsCounter();
    initSkillBars();
    initTerminal();
    initGlitchEffects();
    initAudioControl();
});

// 打字机效果
function initTypingEffect() {
    const texts = [
        "hack the system...",
        "decrypting data...",
        "access granted...",
        "system online...",
        "ready for input...",
        "neural link established..."
    ];
    
    const typingElement = document.getElementById('typing');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }
    
    setTimeout(type, 1000);
}

// 数字计数器效果
function initStatsCounter() {
    const counters = {
        'code-lines': 12547,
        'projects': 12,
        'contributions': 348,
        'uptime': 99.8
    };
    
    Object.keys(counters).forEach(id => {
        const element = document.getElementById(id);
        const target = counters[id];
        const isPercent = id === 'uptime';
        
        let count = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                count = target;
                clearInterval(timer);
            }
            element.textContent = isPercent ? 
                count.toFixed(1) + '%' : 
                Math.floor(count).toLocaleString();
        }, 20);
    });
}

// 技能条动画
function initSkillBars() {
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// 终端效果
function initTerminal() {
    const terminal = document.getElementById('terminal');
    
    // 模拟终端输出
    const messages = [
        "Initializing cyber protocols...",
        "Loading neural interface...",
        "Connecting to mainframe...",
        "Encryption enabled...",
        "Access level: MAXIMUM",
        "All systems operational"
    ];
    
    let messageIndex = 0;
    
    function addTerminalLine(message) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = `<span class="prompt">$</span> ${message}`;
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
    }
    
    // 初始消息
    setTimeout(() => {
        const interval = setInterval(() => {
            if (messageIndex < messages.length) {
                addTerminalLine(messages[messageIndex]);
                messageIndex++;
            } else {
                clearInterval(interval);
            }
        }, 800);
    }, 2000);
}

// 控制台命令
function runCommand(command) {
    const output = document.getElementById('console-output');
    const originalText = output.textContent;
    
    switch(command) {
        case 'scan':
            output.textContent = "Scanning network... Found 47 active nodes. Threat level: LOW";
            break;
        case 'encrypt':
            output.textContent = "Encryption protocol activated. All connections secured.";
            break;
        case 'hack':
            output.textContent = "Hack sequence initiated... Bypassing firewalls... Access achieved.";
            break;
        default:
            output.textContent = "Command not recognized. Type 'help' for available commands.";
    }
    
    // 恢复原始文本
    setTimeout(() => {
        output.textContent = originalText;
    }, 3000);
}

// 故障效果
function initGlitchEffects() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    setInterval(() => {
        glitchElements.forEach(element => {
            element.style.textShadow = `0 0 10px ${getRandomColor()}, 0 0 20px ${getRandomColor()}`;
        });
    }, 3000);
    
    function getRandomColor() {
        const colors = ['#00f3ff', '#ff00ff', '#00ff9d', '#9d00ff', '#ff9d00'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // 随机背景闪烁
    setInterval(() => {
        document.body.style.backgroundColor = `rgba(10, 10, 20, ${0.95 + Math.random() * 0.05})`;
    }, 5000);
}

// 音频控制
function initAudioControl() {
    const musicToggle = document.getElementById('music-toggle');
    const ambientMusic = document.getElementById('ambient-music');
    let isPlaying = false;
    
    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            ambientMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i> AMBIENT_SOUND';
        } else {
            ambientMusic.play().catch(e => {
                console.log("Audio play failed:", e);
                musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i> CLICK_TO_ENABLE';
            });
            musicToggle.innerHTML = '<i class="fas fa-volume-up"></i> AMBIENT_ON';
        }
        isPlaying = !isPlaying;
    });
    
    // 添加点击音效
    document.querySelectorAll('button, .contact-btn, .project-link').forEach(button => {
        button.addEventListener('click', function() {
            playClickSound();
        });
    });
}

function playClickSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800 + Math.random() * 400;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// 鼠标跟随效果
document.addEventListener('mousemove', function(e) {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    document.querySelector('.cyber-bg').style.transform = `translate(${x * 10}px, ${y * 10}px)`;
});

// 键盘快捷键
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'h') {
        alert('[SYSTEM] Hack mode activated!');
    }
    if (e.ctrlKey && e.key === 'm') {
        document.getElementById('music-toggle').click();
    }
});

// 加载动画
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // 模拟系统启动
    setTimeout(() => {
        console.log('%c[SYSTEM] Cyberpunk interface fully loaded', 
            'color: #00f3ff; font-size: 14px; font-weight: bold;');
        console.log('%c>> Welcome to the neon grid <<', 
            'color: #ff00ff; font-size: 16px;');
    }, 1000);
});
