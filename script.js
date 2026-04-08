// ================= TABS =================
const tabs = document.querySelectorAll(".tabs button");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
  });
});


// ================= SCROLL ANIMATION =================
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll(".fade-in").forEach(el => {
  fadeObserver.observe(el);
});


// ================= COUNTER =================
const counters = document.querySelectorAll(".counter");
let counterStarted = false;

const animateCounters = () => {
  counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    let count = 0;

    const update = () => {
      const increment = target / 200;

      if (count < target) {
        count += increment;
        counter.innerText = Math.floor(count);
        requestAnimationFrame(update);
      } else {
        counter.innerText = target + (target === 99 ? "%" : "+");
      }
    };

    update();
  });
};


// ================= COUNTER OBSERVER =================
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !counterStarted) {
      animateCounters();
      counterStarted = true; // prevent repeat
    }
  });
}, { threshold: 0.3 });

const statsSection = document.querySelector(".stats");
if (statsSection) {
  counterObserver.observe(statsSection);
}
const input = document.getElementById("fileInput");
const preview = document.querySelector(".preview-box");

if (input && preview) {
  input.addEventListener("change", () => {
    const file = input.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      preview.innerHTML = `<video src="${url}" controls width="100%"></video>`;
    }
  });
}

const loginModal = document.getElementById("loginModal");

function openLoginModal() {
  loginModal.style.display = "flex";
}

function closeLoginModal() {
  loginModal.style.display = "none";
}

window.onclick = function (e) {
  if (e.target === loginModal) {
    closeLoginModal();
  }
};