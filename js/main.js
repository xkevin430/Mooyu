// 滚动时改变头部样式
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 添加动画效果
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.feature').forEach(feature => {
    observer.observe(feature);
});

// 页面切换逻辑
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'block';
}

// 首页 -> MooFlow页
const gotoMooflow = document.getElementById('goto-mooflow');
if (gotoMooflow) {
    gotoMooflow.addEventListener('click', () => showPage('page-mooflow'));
}

// 首页Download Moo按钮 -> 下载页
const homeDownloadLink = document.getElementById('home-download-link');
if (homeDownloadLink) {
    homeDownloadLink.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('page-download');
    });
}

// MooFlow页 -> 下载页
const gotoDownload = document.getElementById('goto-download');
if (gotoDownload) {
    gotoDownload.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('page-download');
    });
}

// MooFlow页logo -> 首页
const logoToHome = document.getElementById('logo-to-home');
if (logoToHome) {
    logoToHome.addEventListener('click', () => showPage('page-home'));
}

// 下载页logo -> 首页
const logoToHome2 = document.getElementById('logo-to-home2');
if (logoToHome2) {
    logoToHome2.addEventListener('click', () => showPage('page-home'));
}

// 下载页iconWooFlow.png -> MooFlow介绍页
const gotoMooflowFromDownload = document.getElementById('goto-mooflow-from-download');
if (gotoMooflowFromDownload) {
    gotoMooflowFromDownload.addEventListener('click', () => showPage('page-mooflow'));
}

// 默认显示首页
showPage('page-home');

// 图片预览功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取模态框元素
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.modal-close');

    // 获取所有功能卡片中的图片
    const featureImages = document.querySelectorAll('.feature-image img');

    // 为每个图片添加点击事件
    featureImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            // 禁用滚动
            document.body.style.overflow = 'hidden';
        });
    });

    // 点击关闭按钮关闭模态框
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        // 恢复滚动
        document.body.style.overflow = 'auto';
    });

    // 点击模态框背景关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // 按ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// 轮播功能
document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.querySelector('.carousel-container');
    if (!carouselContainer) return;

    const slides = carouselContainer.querySelectorAll('.carousel-slide');
    const prevBtn = carouselContainer.querySelector('.carousel-prev');
    const nextBtn = carouselContainer.querySelector('.carousel-next');
    let currentSlide = 0;
    let autoPlayInterval;
    let isTransitioning = false;

    function showSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });

        // 等待过渡动画完成
        setTimeout(() => {
            isTransitioning = false;
        }, 2000); // 与CSS中的过渡时间保持一致
    }

    function nextSlide() {
        if (isTransitioning) return;
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        if (isTransitioning) return;
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            if (!isTransitioning) {
                nextSlide();
            }
        }, 7000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // 鼠标悬停时暂停自动轮播
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);

    prevBtn.addEventListener('click', () => {
        if (!isTransitioning) {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (!isTransitioning) {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        }
    });

    // 保持原有的图片点击放大功能
    carouselContainer.addEventListener('click', function(e) {
        // 如果点击的是控制按钮，不触发放大预览
        if (e.target.classList.contains('carousel-prev') || 
            e.target.classList.contains('carousel-next')) {
            return;
        }
        
        // 获取当前显示的图片
        const activeSlide = carouselContainer.querySelector('.carousel-slide.active');
        if (activeSlide) {
            const modal = document.getElementById('image-modal');
            const modalImg = document.getElementById('modal-image');
            modal.style.display = 'block';
            modalImg.src = activeSlide.src;
        }
    });

    // 开始自动轮播
    startAutoPlay();
}); 

// 登录页面相关功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有登录按钮
    const loginButtons = document.querySelectorAll('.login-btn');
    
    // 为每个登录按钮添加点击事件
    loginButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // 隐藏所有页面
            document.querySelectorAll('.page').forEach(page => {
                page.style.display = 'none';
            });
            // 显示登录页面
            document.getElementById('page-login').style.display = 'block';
        });
    });

    // 返回首页的logo点击事件
    const logoToHome3 = document.getElementById('logo-to-home3');
    if (logoToHome3) {
        logoToHome3.addEventListener('click', function(e) {
            e.preventDefault();
            // 隐藏所有页面
            document.querySelectorAll('.page').forEach(page => {
                page.style.display = 'none';
            });
            // 显示首页
            document.getElementById('page-home').style.display = 'block';
        });
    }

    // 登录表单提交
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // 这里添加实际的登录逻辑
            console.log('登录尝试:', { email, password });
            
            // 模拟登录成功
            // 在实际应用中，这里应该调用后端API
            setTimeout(() => {
                alert('登录成功！');
                // 登录成功后可以跳转到其他页面
                // window.location.href = '/dashboard';
            }, 1000);
        });
    }
}); 