// Global variables
let diaryPageCount = 1;
let currentStep = 0;
let score = 0;
let currentQuestionIndex = 0;

// Quiz questions data
const quizQuestions = [
    {
        question: "Git就像什么？",
        options: [
            { text: "🍎 苹果", correct: false },
            { text: "📚 魔法日记本", correct: true },
            { text: "🚗 汽车", correct: false }
        ]
    },
    {
        question: "GitHub就像什么？",
        options: [
            { text: "🏫 学校", correct: false },
            { text: "📚 巨大的图书馆", correct: true },
            { text: "🎮 游戏", correct: false }
        ]
    },
    {
        question: "Git的仓库(Repository)像什么？",
        options: [
            { text: "🏰 玩具城堡", correct: true },
            { text: "🍕 披萨", correct: false },
            { text: "🎵 音乐", correct: false }
        ]
    },
    {
        question: "Git提交(Commit)像什么？",
        options: [
            { text: "🏃 跑步", correct: false },
            { text: "📸 给作品拍照片", correct: true },
            { text: "🎨 画画", correct: false }
        ]
    },
    {
        question: "Git分支(Branch)像什么？",
        options: [
            { text: "🌳 大树的树枝", correct: true },
            { text: "🚗 汽车", correct: false },
            { text: "📱 手机", correct: false }
        ]
    }
];

// DOM loaded event listener
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    setupSmoothScrolling();
    setupIntersectionObserver();
    loadQuiz();
});

// Initialize website
function initializeWebsite() {
    // Add welcome animation
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
    
    // Setup book interaction
    setupBookInteraction();
    
    // Setup interactive elements
    setupInteractiveElements();
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Intersection Observer for animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

// Diary demo functionality
function addDiaryPage() {
    diaryPageCount++;
    const demoContainer = document.getElementById('diary-demo');
    const existingPages = demoContainer.querySelectorAll('.diary-page');
    
    // Remove old pages if more than 3
    if (existingPages.length >= 3) {
        existingPages[0].remove();
    }
    
    const newPage = document.createElement('div');
    newPage.className = 'diary-page';
    newPage.innerHTML = `
        <div class="page-content">今天学了${getRandomSubject()}</div>
        <div class="page-date">第${diaryPageCount}页</div>
    `;
    
    // Add animation
    newPage.style.transform = 'translateX(100px)';
    newPage.style.opacity = '0';
    
    const button = demoContainer.querySelector('.demo-btn');
    demoContainer.insertBefore(newPage, button);
    
    // Animate in
    setTimeout(() => {
        newPage.style.transition = 'all 0.5s ease';
        newPage.style.transform = 'translateX(0)';
        newPage.style.opacity = '1';
    }, 100);
    
    // Add celebration effect
    createCelebrationEffect(newPage);
}

// Get random subject for diary
function getRandomSubject() {
    const subjects = ['编程', '数学', '英语', '科学', '音乐', '美术', '体育'];
    return subjects[Math.floor(Math.random() * subjects.length)];
}

// Take snapshot functionality
function takeSnapshot() {
    const album = document.querySelector('.photo-album');
    const photos = album.querySelectorAll('.photo');
    
    if (photos.length >= 5) {
        photos[0].remove();
    }
    
    const newPhoto = document.createElement('div');
    newPhoto.className = 'photo';
    newPhoto.textContent = `作品v${photos.length + 1}.0`;
    
    // Add animation
    newPhoto.style.transform = 'scale(0)';
    newPhoto.style.opacity = '0';
    album.appendChild(newPhoto);
    
    setTimeout(() => {
        newPhoto.style.transition = 'all 0.5s ease';
        newPhoto.style.transform = 'scale(1)';
        newPhoto.style.opacity = '1';
    }, 100);
    
    // Flash effect
    const flashOverlay = document.createElement('div');
    flashOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        opacity: 0.8;
        z-index: 1000;
        pointer-events: none;
    `;
    document.body.appendChild(flashOverlay);
    
    setTimeout(() => {
        flashOverlay.remove();
    }, 200);
}

// Grow branch functionality
function growBranch() {
    const tree = document.querySelector('.tree');
    const branchCount = tree.querySelectorAll('.branch').length;
    
    if (branchCount >= 4) {
        return;
    }
    
    const branchNames = ['实验分支', '测试分支', '功能分支', '修复分支'];
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#6c5ce7'];
    
    const newBranch = document.createElement('div');
    newBranch.className = 'branch';
    newBranch.textContent = branchNames[branchCount - 1];
    newBranch.style.cssText = `
        top: ${30 + (branchCount * 25)}px;
        ${branchCount % 2 === 0 ? 'left: 30%' : 'right: 30%'};
        background: ${colors[branchCount - 1]};
        opacity: 0;
        transform: scale(0);
    `;
    
    tree.appendChild(newBranch);
    
    setTimeout(() => {
        newBranch.style.transition = 'all 0.5s ease';
        newBranch.style.opacity = '1';
        newBranch.style.transform = 'scale(1)';
    }, 100);
}

// Setup book interaction
function setupBookInteraction() {
    const books = document.querySelectorAll('.book');
    const bookDetails = document.getElementById('book-details');
    
    const bookInfo = {
        'game': {
            title: '🎮 游戏开发世界',
            content: '在这里你可以学习如何制作有趣的游戏！从简单的贪吃蛇到复杂的冒险游戏，所有的代码都在这里等着你探索。'
        },
        'website': {
            title: '🌐 网站建设天地',
            content: '想要建造自己的网站吗？这里有各种网站的代码模板，从个人博客到在线商店，应有尽有！'
        },
        'app': {
            title: '📱 手机应用乐园',
            content: '手机应用的代码世界！学习如何制作好用的手机应用，让你的创意变成现实。'
        }
    };
    
    books.forEach(book => {
        book.addEventListener('click', function() {
            const bookType = this.getAttribute('data-book');
            const info = bookInfo[bookType];
            
            if (info) {
                bookDetails.innerHTML = `
                    <h4>${info.title}</h4>
                    <p>${info.content}</p>
                `;
                
                // Add animation
                bookDetails.style.transform = 'scale(0.8)';
                bookDetails.style.opacity = '0';
                
                setTimeout(() => {
                    bookDetails.style.transition = 'all 0.3s ease';
                    bookDetails.style.transform = 'scale(1)';
                    bookDetails.style.opacity = '1';
                }, 50);
            }
            
            // Add book selection effect
            books.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
}

// Workflow game functionality
function startWorkflow() {
    currentStep = 0;
    const steps = document.querySelectorAll('.step');
    
    steps.forEach(step => {
        step.classList.remove('active');
    });
    
    animateWorkflowStep();
}

function animateWorkflowStep() {
    const steps = document.querySelectorAll('.step');
    
    if (currentStep < steps.length) {
        steps[currentStep].classList.add('active');
        
        // Add sound effect simulation
        playStepSound();
        
        currentStep++;
        setTimeout(animateWorkflowStep, 1000);
    } else {
        // Workflow complete
        setTimeout(() => {
            showWorkflowComplete();
        }, 500);
    }
}

function resetWorkflow() {
    currentStep = 0;
    const steps = document.querySelectorAll('.step');
    
    steps.forEach(step => {
        step.classList.remove('active');
    });
}

function showWorkflowComplete() {
    const gameArea = document.querySelector('.game-area');
    const celebration = document.createElement('div');
    celebration.className = 'workflow-celebration';
    celebration.innerHTML = `
        <div style="text-align: center; font-size: 2rem; color: #ff6b6b; margin: 20px 0;">
            🎉 恭喜！你完成了Git工作流程！ 🎉
        </div>
    `;
    
    gameArea.appendChild(celebration);
    
    setTimeout(() => {
        celebration.remove();
    }, 3000);
}

// Play step sound effect (visual feedback)
function playStepSound() {
    const activeStep = document.querySelector('.step.active');
    if (activeStep) {
        activeStep.style.transform = 'scale(1.1)';
        setTimeout(() => {
            activeStep.style.transform = 'scale(1.05)';
        }, 150);
    }
}

// Quiz functionality
function loadQuiz() {
    displayQuestion();
}

function displayQuestion() {
    const quizContainer = document.querySelector('.quiz-question');
    const question = quizQuestions[currentQuestionIndex];
    
    quizContainer.innerHTML = `
        <h3>${question.question}</h3>
        <div class="quiz-options">
            ${question.options.map((option, index) => 
                `<button class="quiz-option" onclick="selectAnswer(this, ${option.correct})">${option.text}</button>`
            ).join('')}
        </div>
    `;
}

function selectAnswer(element, isCorrect) {
    const options = document.querySelectorAll('.quiz-option');
    const resultDiv = document.getElementById('quiz-result');
    
    // Disable all options
    options.forEach(option => {
        option.disabled = true;
        option.style.opacity = '0.6';
    });
    
    // Show result
    if (isCorrect) {
        element.classList.add('correct');
        resultDiv.innerHTML = '🎉 答对了！太棒了！';
        resultDiv.style.color = '#48dbfb';
        score++;
        createCelebrationEffect(element);
    } else {
        element.classList.add('wrong');
        resultDiv.innerHTML = '😊 不对哦，再想想看！';
        resultDiv.style.color = '#ff6b6b';
        
        // Show correct answer
        options.forEach(option => {
            if (option.onclick.toString().includes('true')) {
                option.classList.add('correct');
            }
        });
    }
    
    // Update score
    document.getElementById('score').textContent = score;
    
    // Next question after delay
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            displayQuestion();
            resultDiv.innerHTML = '';
        } else {
            showQuizComplete();
        }
    }, 2000);
}

function showQuizComplete() {
    const quizContainer = document.querySelector('.quiz-container');
    const percentage = Math.round((score / quizQuestions.length) * 100);
    
    let message = '';
    let emoji = '';
    
    if (percentage >= 80) {
        message = '你真是一个Git小专家！';
        emoji = '🏆';
    } else if (percentage >= 60) {
        message = '不错！继续学习会更棒！';
        emoji = '👍';
    } else {
        message = '加油！多练习就会进步的！';
        emoji = '💪';
    }
    
    quizContainer.innerHTML = `
        <div class="quiz-complete">
            <h3>测验完成！</h3>
            <div style="font-size: 4rem; margin: 20px 0;">${emoji}</div>
            <p style="font-size: 1.5rem; color: #6c5ce7;">${message}</p>
            <div class="final-score">
                最终得分: ${score}/${quizQuestions.length} (${percentage}%)
            </div>
            <button class="demo-btn" onclick="restartQuiz()">再玩一次</button>
        </div>
    `;
}

function restartQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    document.getElementById('score').textContent = score;
    loadQuiz();
}

// Setup interactive elements
function setupInteractiveElements() {
    // Add hover effects to concept cards
    const conceptCards = document.querySelectorAll('.concept-card');
    conceptCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to toys
    const toys = document.querySelectorAll('.toy');
    toys.forEach(toy => {
        toy.addEventListener('click', function() {
            this.style.transform = 'scale(1.2) rotate(360deg)';
            setTimeout(() => {
                this.style.transform = this.classList.contains('selected') ? 'scale(1.2)' : 'scale(1)';
            }, 300);
        });
    });
}

// Create celebration effect
function createCelebrationEffect(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#6c5ce7'];
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${rect.left + rect.width/2}px;
            top: ${rect.top + rect.height/2}px;
        `;
        
        document.body.appendChild(particle);
        
        // Animate particle
        const angle = (Math.PI * 2 * i) / 10;
        const velocity = 100 + Math.random() * 50;
        
        particle.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => {
            particle.remove();
        };
    }
}

// Add CSS for dynamic styles
const style = document.createElement('style');
style.textContent = `
    .book.selected {
        transform: translateY(-5px) scale(1.1);
        box-shadow: 0 15px 30px rgba(0,0,0,0.3);
    }
    
    .quiz-complete {
        text-align: center;
        padding: 40px;
    }
    
    .final-score {
        font-size: 1.5rem;
        color: #6c5ce7;
        font-weight: 600;
        margin: 20px 0;
    }
    
    .workflow-celebration {
        animation: celebration 0.5s ease-in-out;
    }
    
    @keyframes celebration {
        0% { transform: scale(0); opacity: 0; }
        50% { transform: scale(1.1); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
    }
    
    .animate-in {
        animation: slideInFromBottom 0.8s ease-out;
    }
    
    @keyframes slideInFromBottom {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        if (document.activeElement.classList.contains('quiz-option')) {
            document.activeElement.click();
        }
    }
});

// Performance optimization - lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add touch support for mobile devices
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swiped up - could trigger next section
            console.log('Swiped up');
        } else {
            // Swiped down - could trigger previous section
            console.log('Swiped down');
        }
    }
}

// Add error handling
window.addEventListener('error', function(e) {
    console.log('发生了一个小错误，但不用担心！', e.message);
});

// Copy command functionality
function copyCommand(command) {
    navigator.clipboard.writeText(command).then(function() {
        // Show copy success feedback
        const event = new CustomEvent('commandCopied', { detail: command });
        document.dispatchEvent(event);
        
        // Visual feedback
        showCopyFeedback();
    }, function(err) {
        console.log('复制失败:', err);
        // Fallback for older browsers
        fallbackCopyTextToClipboard(command);
    });
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopyFeedback();
        }
    } catch (err) {
        console.log('复制失败:', err);
    }
    
    document.body.removeChild(textArea);
}

function showCopyFeedback() {
    // Create floating feedback
    const feedback = document.createElement('div');
    feedback.className = 'copy-feedback';
    feedback.innerHTML = '✅ 命令已复制！';
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2ecc71;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 8px 25px rgba(46, 204, 113, 0.3);
    `;
    
    document.body.appendChild(feedback);
    
    // Remove after 3 seconds
    setTimeout(() => {
        feedback.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            feedback.remove();
        }, 300);
    }, 3000);
}

// Add CSS animations for copy feedback
const copyFeedbackStyles = document.createElement('style');
copyFeedbackStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(copyFeedbackStyles);

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Remove loading screen if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 300);
    }
});