document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const themeSelect = document.getElementById('theme');
    const speedSelect = document.getElementById('animation-speed');
    const saveBtn = document.getElementById('save-btn');
    const animateBtn = document.getElementById('animate-btn');
    const resetBtn = document.getElementById('reset-btn');
    const targetElement = document.getElementById('target-element');
    
    // Load saved preferences
    loadPreferences();
    
    // Event Listeners
    saveBtn.addEventListener('click', savePreferences);
    animateBtn.addEventListener('click', triggerAnimation);
    resetBtn.addEventListener('click', resetAnimation);
    targetElement.addEventListener('click', elementClickAnimation);
    
    // Save preferences to localStorage
    function savePreferences() {
        const preferences = {
            theme: themeSelect.value,
            animationSpeed: speedSelect.value
        };
        
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        
        // Apply immediately
        applyPreferences(preferences);
        
        // Show feedback
        animateBtn.classList.add('pulse');
        setTimeout(() => {
            animateBtn.classList.remove('pulse');
        }, 1000);
    }
    
    // Load preferences from localStorage
    function loadPreferences() {
        const savedPreferences = localStorage.getItem('userPreferences');
        
        if (savedPreferences) {
            const preferences = JSON.parse(savedPreferences);
            
            // Set select values
            themeSelect.value = preferences.theme;
            speedSelect.value = preferences.animationSpeed;
            
            // Apply preferences
            applyPreferences(preferences);
        }
    }
    
    // Apply preferences to the page
    function applyPreferences(preferences) {
        // Apply theme
        document.body.className = `${preferences.theme}-theme`;
        
        // Apply animation speed
        const speedClass = `${preferences.animationSpeed}-speed`;
        document.querySelectorAll('.btn').forEach(btn => {
            // Remove any existing speed classes
            btn.classList.remove('slow-speed', 'normal-speed', 'fast-speed');
            // Add current speed class
            btn.classList.add(speedClass);
        });
    }
    
    // Trigger random animation
    function triggerAnimation() {
        const animations = ['spin', 'slide', 'grow'];
        const randomAnim = animations[Math.floor(Math.random() * animations.length)];
        
        // Reset any existing animation
        targetElement.classList.remove('spin', 'slide', 'grow');
        
        // Force reflow to restart animation
        void targetElement.offsetWidth;
        
        // Apply new animation
        targetElement.classList.add(randomAnim);
        
        // Remove after animation completes
        setTimeout(() => {
            targetElement.classList.remove(randomAnim);
        }, 1000);
    }
    
    // Element click animation
    function elementClickAnimation() {
        this.classList.add('spin');
        
        setTimeout(() => {
            this.classList.remove('spin');
        }, 1000);
    }
    
    // Reset all animations
    function resetAnimation() {
        targetElement.classList.remove('spin', 'slide', 'grow');
        
        // Add visual feedback
        resetBtn.classList.add('pulse');
        setTimeout(() => {
            resetBtn.classList.remove('pulse');
        }, 1000);
    }
});
