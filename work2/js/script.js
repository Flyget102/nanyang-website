// 导航栏滚动效果
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('py-2', 'shadow-lg');
    navbar.classList.remove('py-3');
  } else {
    navbar.classList.add('py-3');
    navbar.classList.remove('py-2', 'shadow-lg');
  }
});

// 移动端菜单切换
document.getElementById('menu-toggle').addEventListener('click', function() {
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenu.classList.toggle('hidden');
});

// 过滤按钮切换
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
  button.addEventListener('click', function() {
    filterButtons.forEach(btn => btn.classList.remove('active', 'bg-orange-500', 'text-white'));
    filterButtons.forEach(btn => btn.classList.add('bg-gray-200', 'text-gray-700'));
    this.classList.add('active', 'bg-orange-500', 'text-white');
    this.classList.remove('bg-gray-200', 'text-gray-700');
  });
});

// 计数器动画
function animateCounter(el, target, duration) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    el.textContent = Math.floor(start);
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    }
  }, 16);
}

// 监听元素是否进入视口
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = parseInt(counter.getAttribute('data-target'));
      animateCounter(counter, target, 2000);
      observer.unobserve(counter);
    }
  });
}, { threshold: 0.5 });

// 观察所有计数器元素
document.querySelectorAll('.counter').forEach(counter => {
  observer.observe(counter);
});

// 图片懒加载
document.addEventListener("DOMContentLoaded", function() {
  const lazyImages = document.querySelectorAll('img');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.classList.add("fade-in");
          imageObserver.unobserve(image);
        }
      });
    });
    
    lazyImages.forEach(image => {
      imageObserver.observe(image);
    });
  }
});

// 页面加载动画
window.addEventListener('load', function() {
  setTimeout(function() {
    document.querySelector('.page-loader').style.opacity = '0';
    setTimeout(function() {
      document.querySelector('.page-loader').style.display = 'none';
    }, 500);
  }, 800);
});

// 添加平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
      
      // 如果是在移动设备上，点击导航链接后关闭菜单
      const mobileMenu = document.getElementById('mobile-menu');
      if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
      }
    }
  });
});
    