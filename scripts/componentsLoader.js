
function loadComponent(componentId) {
    const targetElement = document.getElementById(componentId);
    const componentPath = `components/${componentId}.html`;
    fetch(componentPath)
        .then(response => response.text())
        .then(html => targetElement.innerHTML = html);
}

loadComponent('navigation');
loadComponent('features');