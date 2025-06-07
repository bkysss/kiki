/**
 * 密码保护功能 - 页面加载时第一个执行
 * 只有验证通过后才会初始化其他功能
 */
document.addEventListener('DOMContentLoaded', function() {
    // 设置正确的密码（您可以修改这个密码）
    const correctPassword = "kiki";
    
    // 立即隐藏页面主要内容
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.display = 'none';
    }
    
    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.className = 'password-overlay';
    
    // 创建密码输入弹窗
    const passwordModal = document.createElement('div');
    passwordModal.className = 'password-modal';
    passwordModal.innerHTML = `
        <div class="modal-content">
            <h2>🔒 页面访问验证</h2>
            <p>请输入密码以查看页面内容</p>
            <input type="password" id="passwordInput" placeholder="请输入密码" />
            <div class="modal-buttons">
                <button id="submitPassword">确认</button>
                <button id="cancelAccess">取消</button>
            </div>
            <div id="errorMessage" class="error-message"></div>
        </div>
    `;
    
    // 将弹窗添加到页面
    overlay.appendChild(passwordModal);
    document.body.appendChild(overlay);
    
    // 获取页面元素
    const passwordInput = document.getElementById('passwordInput');
    const submitBtn = document.getElementById('submitPassword');
    const cancelBtn = document.getElementById('cancelAccess');
    const errorMsg = document.getElementById('errorMessage');
    
    // 聚焦到密码输入框
    passwordInput.focus();
    
    // 提交密码验证
    function verifyPassword() {
        const inputPassword = passwordInput.value.trim();
        
        if (inputPassword === correctPassword) {
            // 密码正确，移除弹窗并显示内容
            overlay.remove();
            if (mainContent) {
                mainContent.style.display = 'block';
            }
            
            // 密码验证成功后，初始化页面功能
            initializePageFeatures();
        } else {
            // 密码错误，显示错误信息
            errorMsg.textContent = '❌ 密码错误，请重试';
            passwordInput.value = '';
            passwordInput.focus();
            
            // 添加错误动画效果
            passwordModal.classList.add('shake');
            setTimeout(() => {
                passwordModal.classList.remove('shake');
            }, 500);
        }
    }
    
    // 取消访问
    function cancelAccess() {
        document.body.innerHTML = `
            <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
                <h2>🚫 访问被拒绝</h2>
                <p>您已取消访问此页面</p>
                <button onclick="location.reload()" style="padding: 10px 20px; margin-top: 20px;">重新尝试</button>
            </div>
        `;
    }
    
    // 事件监听器
    submitBtn.addEventListener('click', verifyPassword);
    cancelBtn.addEventListener('click', cancelAccess);
    
    // 支持回车键提交
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            verifyPassword();
        }
    });
    
    // 防止ESC键关闭弹窗
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            e.preventDefault();
        }
    });
});

/**
 * 页面功能初始化 - 只在密码验证通过后执行
 */
function initializePageFeatures() {
    // 图片点击切换功能
    const myImage = document.querySelector("img");
    if (myImage) {
        myImage.onclick = () => {
            const mySrc = myImage.getAttribute("src");
            if (mySrc === "images/cdl1.jpg") {
                myImage.setAttribute("src", "images/cdl3.jpg");
            } else {
                myImage.setAttribute("src", "images/cdl1.jpg");
            }
        };
    }

    // 用户名设置功能
    let myButton = document.querySelector("button");
    let myHeading = document.querySelector("h1");

    function setUserName() {
        const myName = prompt("输入新昵称");
        if (!myName) {
            const originName = localStorage.getItem("name");
            if (originName) {
                myHeading.textContent = `My Cute ${originName}`;
            } else {
                myHeading.textContent = `My Cute Kiki`;
            }
        } else {
            localStorage.setItem("name", myName);
            myHeading.textContent = `My Cute ${myName}`;
        }
    }

    // 初始化用户名显示
    if (!localStorage.getItem("name")) {
        setUserName();
    } else {
        const storedName = localStorage.getItem("name");
        myHeading.textContent = `My Cute ${storedName}`;
    }

    // 绑定按钮点击事件
    if (myButton) {
        myButton.onclick = function () {
            setUserName();
        };
    }
    
    // 设置特定元素的文本内容
    const kikiHeading = document.getElementById("kiki likes");
    if (kikiHeading) {
        kikiHeading.textContent = "Kiki最喜欢";
    }
}


