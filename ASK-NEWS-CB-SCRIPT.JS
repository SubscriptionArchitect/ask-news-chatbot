(function () {
  setTimeout(() => {
    const target = document.getElementById('askAchrNewsPlaceholder');
    if (!target) return;

    // Inject CSS
    const style = document.createElement('style');
    style.textContent = `
      .chat-wrapper {
        max-width: 770px !important;
        margin: 0 auto !important;
        background-color: #f9f9f9 !important;
        border: 3px solid #C52A21 !important;
        border-radius: 12px !important;
        box-shadow: 0 12px 28px rgba(0,0,0,.18) !important;
        display: flex !important;
        flex-direction: column !important;
        overflow: hidden !important;
        font-family: Arial, Helvetica, sans-serif !important;
        padding: 15px !important;
      }
      .chat-header {
        display: flex !important;
        align-items: center !important;
        gap: 12px !important;
        padding: 10px 18px 20px 18px !important;
        background: #f7f9fc !important;
        border-bottom: 1px solid #e1e1e1 !important;
        flex-wrap: wrap;
      }
      .ask-icon {
        position: relative !important;
        display: inline-block !important;
        padding: 2px 18px 4px !important;
        font: 700 28px/1 Arial, Helvetica, sans-serif !important;
        color: #004A81 !important;
        border: 3px solid #C52A21 !important;
        border-radius: 8px !important;
        background: #fff !important;
      }
      .ask-icon::after {
        content: '' !important;
        position: absolute !important;
        top: 100% !important;
        left: 50% !important;
        width: 38px !important;
        height: 14px !important;
        background: #C52A21 !important;
        border-bottom-left-radius: 7px !important;
        border-bottom-right-radius: 7px !important;
        transform: translate(-50%, 0) !important;
        clip-path: polygon(0 0, 50% 100%, 100% 0) !important;
        padding-bottom: 8px !important;
      }
      .header-brand img {
        height: 50px !important;
        width: auto !important;
      }
      .header-sp {
        margin-left: auto !important;
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
        font: 11px/1 Arial, Helvetica, sans-serif !important;
        color: #000 !important;
        margin-top: 5px !important;
      }
      .header-sp img {
        height: 14px !important;
        width: auto !important;
      }
      .chat-body {
        flex: 1 1 auto !important;
        padding: 20px 18px 80px !important;
        background: #ffffff !important;
        overflow-y: auto !important;
      }
      .message {
        max-width: 85% !important;
        margin-bottom: 14px !important;
        padding: 12px 16px !important;
        border-radius: 12px !important;
        font-size: 15px !important;
        line-height: 1.4 !important;
      }
      .ai {
        background: #f0f6ff !important;
        color: #114b8c !important;
        border: 1px solid #c6dcff !important;
      }
      .user {
        background: #C52A21 !important;
        color: #ffffff !important;
        margin-left: auto !important;
        border: 1px solid #a21d19 !important;
      }
      .input-bar {
        display: flex !important;
        gap: 8px !important;
        align-items: center !important;
        padding: 12px 18px !important;
        background: #f7f9fc !important;
        border-top: 1px solid #e1e1e1 !important;
      }
      #questionBox {
        flex: 1 1 auto !important;
        border: 1px solid #d9d9d9 !important;
        border-radius: 18px !important;
        padding: 10px 14px !important;
        font: 15px/1.4 Arial, Helvetica, sans-serif !important;
        outline: none !important;
      }
      #sendBtn {
        background: #C52A21 !important;
        color: #ffffff !important;
        border: none !important;
        border-radius: 18px !important;
        font: 700 16px/1 Arial, Helvetica, sans-serif !important;
        padding: 10px 24px !important;
        cursor: pointer !important;
      }
      .chat-body::-webkit-scrollbar {
        width: 6px !important;
      }
      .chat-body::-webkit-scrollbar-thumb {
        background: rgba(0,0,0,.2) !important;
        border-radius: 4px !important;
      }
      @media (max-width: 768px) {
        .chat-header {
          justify-content: center !important;
          padding: 10px !important;
        }
        .ask-icon {
          padding: 2px 12px 4px !important;
          font-size: 20px !important;
        }
        .ask-icon::after {
          width: 26px !important;
          height: 10px !important;
        }
        .header-sp {
          flex-basis: 100% !important;
          justify-content: center !important;
          margin-top: 6px !important;
          font-size: 10px !important;
        }
        .header-sp img {
          height: 12px !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Inject HTML
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div class="chat-wrapper">
        <div class="chat-header">
          <div class="ask-icon">Ask</div>
          <div class="header-brand">
            <img src="https://cdn.omeda.com/hosted/images/CLIENT_BNP/BNPCD/NEWS-FB.png" alt="ACHR News Logo">
          </div>
          <div class="header-sp">
            SPONSORED BY <img src="https://www.myclearopinioninsightshub.com/logo/My-Clear-Opinion-Logo-H.svg" alt="Sponsor Logo">
          </div>
        </div>
        <div id="chatBody" class="chat-body">
          <div class="message ai" id="aiGreet">
            Hi there. I'm Ask ACHR NEWS. You can ask me anything about HVACR trends, news, and insights. Go ahead, type something below, and let's get started!
          </div>
        </div>
        <div class="input-bar">
          <input id="questionBox" type="text" placeholder="Type your question…" aria-label="Your question">
          <button id="sendBtn" type="button">Send</button>
        </div>
      </div>
    `;
    target.appendChild(wrapper);

    // Behavior
    const chatBody = document.getElementById('chatBody');
    const box = document.getElementById('questionBox');
    const sendBtn = document.getElementById('sendBtn');
    const greet = document.getElementById('aiGreet');

    function addMessage(text, cls) {
      const wrap = document.createElement('div');
      wrap.className = 'message ' + cls;
      wrap.textContent = text;
      chatBody.appendChild(wrap);
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    function send() {
      const q = box.value.trim();
      if (!q) { box.focus(); return; }
      addMessage(q, 'user');
      setTimeout(() => {
        window.location.href = 'https://www.achrnews.com/ask-ACHR-NEWS?ask=' + encodeURIComponent(q).replace(/%20/g, '+');
      }, 300);
    }

    sendBtn.addEventListener('click', send);
    box.addEventListener('keydown', e => { if (e.key === 'Enter') send(); });

    if (greet) {
      const greetTxt = greet.textContent;
      greet.textContent = '';
      let i = 0;
      (function typeLoop() {
        if (i < greetTxt.length) {
          greet.textContent += greetTxt[i++];
          setTimeout(typeLoop, 35);
        }
      })();
    }
  }, 4000);
})();
