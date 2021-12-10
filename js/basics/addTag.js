export function addTag(elem, parent, html) {
    const p = document.createElement(elem);
    parent.append(p);
    p.innerHTML = html;
}
