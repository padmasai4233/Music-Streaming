document.getElementById("logout").addEventListener("click", () => {
    window.location.href = "signin.html";
});
document.getElementById('discover').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default link behavior
    const data=document.getElementById('mid_main');
    data=window.location.href="index.html";
});
