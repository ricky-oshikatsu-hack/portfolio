document.addEventListener('DOMContentLoaded', () => {
    // データオブジェクト (data.js から読み込み)
    const data = portfolioData;

    // --- テーマ設定 ---
    const htmlEl = document.documentElement;
    const themeToggleBtn = document.getElementById('theme-toggle');
    const iconSun = document.getElementById('icon-sun');
    const iconMoon = document.getElementById('icon-moon');

    // 初期テーマの適用
    htmlEl.setAttribute('data-theme', data.theme || 'dark');
    updateThemeIcon(data.theme || 'dark');

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlEl.setAttribute('data-theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            iconSun.style.display = 'block';
            iconMoon.style.display = 'none';
        } else {
            iconSun.style.display = 'none';
            iconMoon.style.display = 'block';
        }
    }

    // --- データのバインディング ---
    document.getElementById('nav-name').textContent = data.profile.name;
    document.getElementById('hero-name').textContent = data.profile.name;
    document.getElementById('hero-role').textContent = data.profile.role;
    document.getElementById('hero-section').style.backgroundImage = `url('${data.profile.heroImage}')`;
    
    document.getElementById('about-title').textContent = data.profile.aboutTitle;
    document.getElementById('profile-img').src = data.profile.profileImage;
    document.getElementById('about-text').textContent = data.profile.aboutText;
    document.getElementById('twitter-link').href = data.profile.twitterLink;
    document.getElementById('instagram-link').href = data.profile.instagramLink;
    document.getElementById('contact-btn').href = data.profile.contactLink;
    document.getElementById('footer-name').textContent = data.profile.name;
    document.getElementById('year').textContent = new Date().getFullYear();

    // --- ギャラリーの構築 ---
    const filterContainer = document.getElementById('gallery-filters');
    const gridContainer = document.getElementById('gallery-grid');

    // フィルタボタンの生成
    data.categories.forEach((cat, index) => {
        const btn = document.createElement('button');
        btn.classList.add('filter-btn');
        if (index === 0) btn.classList.add('active'); // 最初のカテゴリ(All)をアクティブに
        btn.textContent = cat;
        btn.setAttribute('data-filter', cat === 'All' ? 'all' : cat);
        
        btn.addEventListener('click', (e) => {
            // アクティブクラスの切り替え
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            // フィルタリング処理
            const filterValue = e.target.getAttribute('data-filter');
            renderGallery(filterValue);
        });
        filterContainer.appendChild(btn);
    });

    // ギャラリー画像の描画関数
    function renderGallery(filter = 'all') {
        gridContainer.innerHTML = ''; // クリア
        
        const filteredData = filter === 'all' 
            ? data.gallery 
            : data.gallery.filter(item => item.category === filter);

        filteredData.forEach(item => {
            const el = document.createElement('div');
            el.classList.add('gallery-item', 'fade-in');
            
            el.innerHTML = `
                <img src="${item.url}" alt="${item.title}" loading="lazy">
                <div class="gallery-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.category}</p>
                </div>
            `;
            
            // 画像クリックでライトボックス表示
            el.addEventListener('click', () => openLightbox(item.url));
            gridContainer.appendChild(el);
        });
    }

    // 初期描画
    renderGallery('all');

    // --- 料金プランの構築 ---
    // ライブ撮影
    const liveContainer = document.getElementById('pricing-live');
    data.pricing.live.forEach(plan => {
        const card = document.createElement('div');
        card.classList.add('card');
        let featuresHtml = '';
        plan.features.forEach(f => featuresHtml += `<li>${f}</li>`);
        card.innerHTML = `
            <h4>${plan.plan}</h4>
            <div class="price">${plan.price}</div>
            <p>${plan.description}</p>
            <ul>${featuresHtml}</ul>
        `;
        liveContainer.appendChild(card);
    });

    // 宣材・アー写撮影
    const artistContainer = document.getElementById('pricing-artist');
    data.pricing.artist.forEach(plan => {
        const card = document.createElement('div');
        card.classList.add('card');
        let featuresHtml = '';
        plan.features.forEach(f => featuresHtml += `<li>${f}</li>`);
        card.innerHTML = `
            <h4>${plan.plan}</h4>
            <div class="price">${plan.price}</div>
            <p>${plan.description}</p>
            <ul>${featuresHtml}</ul>
        `;
        artistContainer.appendChild(card);
    });

    // 専属カメラマン（月額顧問）契約
    const monthlyContainer = document.getElementById('pricing-monthly');
    data.pricing.monthly.forEach(plan => {
        const card = document.createElement('div');
        card.classList.add('card');
        let featuresHtml = '';
        plan.features.forEach(f => featuresHtml += `<li>${f}</li>`);
        card.innerHTML = `
            <h4>${plan.plan}</h4>
            <div class="price">${plan.price}</div>
            <p>${plan.description}</p>
            <ul>${featuresHtml}</ul>
        `;
        monthlyContainer.appendChild(card);
    });

    // オプション
    const optionsContainer = document.getElementById('pricing-options');
    data.pricing.options.forEach(opt => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${opt.name}</span> <span>${opt.price}</span>`;
        optionsContainer.appendChild(li);
    });

    // その他条件
    const conditionsContainer = document.getElementById('pricing-conditions');
    data.pricing.conditions.forEach(cond => {
        const li = document.createElement('li');
        li.textContent = cond;
        conditionsContainer.appendChild(li);
    });

    // --- ライトボックス機能 ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');

    function openLightbox(url) {
        lightboxImg.src = url;
        lightbox.classList.add('active');
    }

    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.classList.remove('active');
        }
    });
});
