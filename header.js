const drop = document.getElementById("dropdown");

function dropDown() {
  const dropValue = window.getComputedStyle(drop).display;
  if (dropValue == "block") {
    drop.style.display = "none";
  } else if (dropValue == "none") {
    drop.style.display = "block";
  }
}

drop.addEventListener("click", (e) => {
  const clickedElem = e.target;
  const childs = drop.children;
  const target = clickedElem.parentElement;
  if (Array.from(childs).includes(target)) {
    if (target.classList.contains("ul-highlight")) {
      target.classList.remove("ul-highlight");
      Array.from(drop.querySelectorAll(".sub_dropdown_ul")).forEach((e) => {
        e.style.display = "none";
      });
    } else if (!target.classList.contains("ul-highlight")) {
      Array.from(childs).forEach((e) => {
        e.classList.remove("ul-highlight");
      });
      Array.from(drop.querySelectorAll(".sub_dropdown_ul")).forEach((e) => {
        e.style.display = "none";
      });
      target.classList.add("ul-highlight");
      const sub_drop = target.querySelector(".sub_dropdown_ul");
      sub_drop.style.display = "block";
    }
  }
});

function fitTextToWidth(el, min = 18, max = 20) {
  const parentWidth = el.parentElement.clientWidth;
  let low = min;
  let high = max;
  let bestSize = min;

  // Ensure text doesn't wrap during measurement
  el.style.whiteSpace = "nowrap";
  el.style.display = "inline-block";

  // Binary search for the perfect font size
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    el.style.fontSize = mid + "px";

    if (el.offsetWidth <= parentWidth) {
      bestSize = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  el.style.fontSize = bestSize + "px";
}

fitTextToWidth(document.querySelector("#h-left h1"));

window.addEventListener("resize", () => fitTextToWidth(myText));

const header = window.getComputedStyle(document.querySelector("header")).height;

document.getElementById("slide").style.marginTop = header;

let index = 0;

function moveNext() {
  const track = document.getElementById("track");
  const childs = document.querySelectorAll("#track img");
  if (childs.length === 0) return;

  const width = childs[0].offsetWidth;

  track.style.transition = "transform 0.8s ease-in-out";
  track.style.transform = `translateX(-${width}px)`;

  setTimeout(() => {
    const firstChild = track.firstElementChild;
    track.appendChild(firstChild);

    track.style.transition = "none";
    track.style.transform = `translateX(0)`;
  }, 800);

  setTimeout(moveNext, 2800);
}

setTimeout(moveNext, 2000);
