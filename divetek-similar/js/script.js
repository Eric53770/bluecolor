// ========== 行動導航切換 ==========
(function() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
    });
    
    // 點擊導航連結後，僅在行動版（切換按鈕可見）時關閉菜單
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.getComputedStyle(toggle).display !== 'none') {
          nav.style.display = 'none';
        }
      });
    });
  }
})();

// ========== 表單送出処理 ==========
(function() {
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      
      const name = form.querySelector('input[name="name"]').value;
      const email = form.querySelector('input[name="email"]').value;
      const message = form.querySelector('textarea[name="message"]').value;
      
      if (name && email && message) {
        alert(`感謝 ${name} 的訊息！我們會盡快回覆您的郵件：${email}`);
        form.reset();
      } else {
        alert('請填寫所有欄位');
      }
    });
  }
})();

// ========== 入場動畫 - IntersectionObserver + requestAnimationFrame ==========
(function() {
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            entry.target.classList.add('animated');
          });
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.paneleffect, .paneleffect_v1').forEach(el => {
      io.observe(el);
    });
  } else {
    // Fallback：立即顯示
    document.querySelectorAll('.paneleffect, .paneleffect_v1').forEach(el => {
      el.classList.add('animated');
    });
  }
})();

// ========== 平滑滾動至錨點 ==========
(function() {
  // 防止只使用 '#' 的連結跳回頁首（例如卡片的「了解更多」）
  document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', e => e.preventDefault());
  });
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }
    });
  });
})();

// ========== 服務卡片 Modal ==========
(function() {
  const modal = document.querySelector('#info-modal');
  const title = document.querySelector('#modal-title');
  const body = document.querySelector('#modal-body');
  const list = document.querySelector('#modal-list');
  const triggers = document.querySelectorAll('[data-modal]');

  if (!modal || !title || !body || !list || !triggers.length) {
    return;
  }

  const modalData = {
    consulting: {
      title: '配方諮詢',
      body: '從日常保健需求到配方搭配，我們協助你評估益生菌與酵素的選擇、補充時機與使用方式。',
      items: ['益生菌搭配建議', '酵素補充時機', '客製化保健規劃']
    },
    supply: {
      title: '產品供應',
      body: '提供益生菌、酵素與機能保健產品的規劃與供應，協助你快速取得合適的補充方案。',
      items: ['配方選型與成分比對', '原料與包材支援', '交期與採購協調']
    },
    support: {
      title: '售後與支援',
      body: '針對保存方式、食用建議與常見問題提供快速支援，幫助你更安心地持續補充。',
      items: ['食用說明與注意事項', '保存與運送建議', '常見問題與後續追蹤']
    }
  };

  const openModal = key => {
    const data = modalData[key];
    if (!data) {
      return;
    }

    title.textContent = data.title;
    body.textContent = data.body;
    list.innerHTML = data.items.map(item => `<li>${item}</li>`).join('');
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  triggers.forEach(trigger => {
    trigger.addEventListener('click', e => {
      const modalKey = trigger.getAttribute('data-modal');
      if (modalKey) {
        e.preventDefault();
        openModal(modalKey);
      }
    });
  });

  modal.addEventListener('click', e => {
    if (e.target.matches('[data-modal-close]')) {
      closeModal();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
})();
