<style>
    #mobile-placeholder {
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: #000;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 999999;
        font-family: 'Inter', sans-serif;
        color: white;
        text-align: center;
    }

    .m-logo {
        font-weight: 900;
        font-size: 28px;
        letter-spacing: -1px;
        margin-bottom: 8px;
    }

    .m-status {
        color: #00ff88;
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
        text-shadow: 0 0 15px rgba(0, 255, 136, 0.4);
        margin-bottom: 20px;
    }

    /* Timer Styles */
    #timer-container {
        display: none; /* Hidden by default, toggled by JS */
        gap: 15px;
        margin: 20px 0;
    }

    .timer-block {
        display: flex;
        flex-direction: column;
    }

    .timer-val {
        font-size: 32px;
        font-weight: 900;
        color: #fff;
    }

    .timer-label {
        font-size: 10px;
        color: #666;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    /* Button Style */
    .back-button {
        margin-top: 30px;
        padding: 12px 24px;
        background: transparent;
        border: 1px solid #333;
        color: #fff;
        border-radius: 30px;
        text-decoration: none;
        font-size: 13px;
        font-weight: 600;
        transition: 0.3s;
    }

    .back-button:hover {
        border-color: #00ff88;
        color: #00ff88;
    }
</style>

<div id="mobile-placeholder">
    <div class="m-logo">TRM RECORDS</div>
    
    <div id="status-msg" class="m-status">Currently unavailable... soon 👀</div>

    <div id="timer-container">
        <div class="timer-block"><span id="days" class="timer-val">00</span><span class="timer-label">Days</span></div>
        <div class="timer-block"><span id="hours" class="timer-val">00</span><span class="timer-label">Hrs</span></div>
        <div class="timer-block"><span id="mins" class="timer-val">00</span><span class="timer-label">Min</span></div>
        <div class="timer-block"><span id="secs" class="timer-val">00</span><span class="timer-label">Sec</span></div>
    </div>

    <a href="https://trm-brand-shop.fourthwall.com" class="back-button">Back to Shop</a>
</div>

<script>
    (function() {
        // --- CONFIGURATION ---
        const SHOW_TIMER = true; // Change to false to hide the timer
        const LAUNCH_DATE = "March 1, 2026 12:00:00"; // Set your date here
        // ---------------------

        if (SHOW_TIMER) {
            document.getElementById('timer-container').style.display = 'flex';
            document.getElementById('status-msg').innerText = "Launching In:";
            
            const target = new Date(LAUNCH_DATE).getTime();

            const updateTimer = () => {
                const now = new Date().getTime();
                const diff = target - now;

                if (diff <= 0) {
                    document.getElementById('status-msg').innerText = "We are live!";
                    document.getElementById('timer-container').style.display = 'none';
                    return;
                }

                const d = Math.floor(diff / (1000 * 60 * 60 * 24));
                const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const s = Math.floor((diff % (1000 * 60)) / 1000);

                document.getElementById('days').innerText = d.toString().padStart(2, '0');
                document.getElementById('hours').innerText = h.toString().padStart(2, '0');
                document.getElementById('mins').innerText = m.toString().padStart(2, '0');
                document.getElementById('secs').innerText = s.toString().padStart(2, '0');
            };

            setInterval(updateTimer, 1000);
            updateTimer();
        }
    })();
</script>
