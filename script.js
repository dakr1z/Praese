document.addEventListener('DOMContentLoaded', function() {
    const headlines = document.querySelectorAll('.headline');
    const animatedTexts = document.querySelectorAll('.animated-text');
    const lines = document.querySelectorAll('hr');

    headlines.forEach(headline => {
        headline.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);

            // Toggle visibility
            if (targetElement.classList.contains('active')) {
                targetElement.classList.remove('active');
                targetElement.classList.add('hidden');
            } else {
                document.querySelectorAll('.content-body').forEach(body => {
                    body.classList.remove('active');
                    body.classList.add('hidden');
                });
                targetElement.classList.remove('hidden');

                // Animate lines
                lines.forEach(line => {
                    line.classList.remove('line-move');
                    void line.offsetWidth; // Trigger reflow to restart animation
                    line.classList.add('line-move');
                });

                // Animate headline
                setTimeout(() => {
                    headline.classList.add('fade-in');
                }, 1000);

                // Animate content
                setTimeout(() => {
                    targetElement.classList.add('active');
                    const texts = targetElement.querySelectorAll('.animated-text');
                    texts.forEach((text, index) => {
                        text.style.animationDelay = `${index * 0.1}s`;
                        text.classList.add('fade-in');
                    });
                }, 1500);
            }
        });
    });
});

// Dynamische Animation für Text und Linien
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeIn {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
    }
    .fade-in {
        animation: fadeIn 1s forwards;
    }
    @keyframes lineMove {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(0); }
    }
    .line-move {
        animation: lineMove 1s forwards;
    }
    hr {
        overflow: hidden;
    }
`;
document.head.appendChild(style);