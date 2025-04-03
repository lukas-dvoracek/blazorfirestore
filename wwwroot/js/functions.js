console.log("soubor functions.js načten: funkce stripHtml")

window.stripHtml = (html) => {
    let div = document.createElement("div");
    div.innerHTML = html;
    let text = div.innerText || div.textContent;
    //return text.replace(/\n+/g, '\n').trim(); // Zachováme zalomení řádků
    return text.replace(/\n/g, '<br/>').replace(/\s{2,}/g, ' ').trim(); // Zachováme zalomení řádků
};