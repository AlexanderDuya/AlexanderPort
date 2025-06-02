function showModal(title, description, link) {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.innerHTML = `
      <div class="modal-box">
        <span class="modal-close">&times;</span>
        <h3>${title}</h3>
        <p>${description}</p>
        <a href="${link}" target="_blank" class="btn small">View Full Project</a>
      </div>
    `;

  document.body.appendChild(modal);

  modal.querySelector(".modal-close").onclick = () => modal.remove();
  modal.onclick = (e) => {
    if (e.target === modal) modal.remove();
  };
}

document.querySelectorAll(".btn.small").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const title = button.dataset.title;
    const description = button.dataset.description;
    const link = button.dataset.link || "#";
    showModal(title, description, link);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const viewMoreBtn = document.getElementById("view-more-btn");
  const extraProjects = document.getElementById("extra-projects");

  viewMoreBtn.addEventListener("click", () => {
    const isHidden = extraProjects.classList.contains("hidden");

    if (isHidden) {
      extraProjects.classList.remove("hidden");
      viewMoreBtn.textContent = "View Less Projects";
    } else {
      extraProjects.classList.add("hidden");
      viewMoreBtn.textContent = "View More Projects";
    }
  });
});
