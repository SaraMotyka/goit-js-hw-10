const e=document.querySelector(".breed-select"),t=document.querySelector(".loader"),c=document.querySelector(".error"),n=document.querySelector(".cat-info");function r(e){return new Promise(((t,n)=>{fetch(e).then((e=>{if(e.ok)return e.json();n(c)})).then((e=>{t(e);document.querySelector(".visible").style.display="none"})).catch((e=>{error(e.toString())}))}))}function i(e){r(`https://api.thecatapi.com/v1/images/search?breed_ids=${e}`).then((e=>{const r=`<div><img src="${e[0].url}" class= "cat-pic"></div>`;n.insertAdjacentHTML("afterbegin",r),t.classList.add("visible"),c.classList.remove("visible")})).catch((e=>{s()}));r(`https://api.thecatapi.com/v1/breeds/${e}`).then((e=>{const c=`<div class= "cat-desc"><h1>${e.name}</h1><p>${e.description}</p><h2>Temperament</h2><p>${e.temperament}</p></div>`;n.insertAdjacentHTML("beforeend",c),t.classList.add("hidden")})).catch((e=>{s()}))}function s(){c.classList.add("visible"),t.classList.remove("visible")}fetch("https://api.thecatapi.com/v1/breeds").then((e=>e.json())).then((t=>{t.forEach((t=>{const c=document.createElement("option");c.value=t.id,c.textContent=t.name,e.appendChild(c)}))})).catch((e=>{console.error("Error:",e)})),e.addEventListener("change",(function(e){e.preventDefault(),s(),n.innerHTML="",i(e.target.value)}));
//# sourceMappingURL=index.3cbbdaa4.js.map