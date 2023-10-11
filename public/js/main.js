"use strict";

//質問クリックでアンサー表示
const accordions = document.querySelectorAll("dt");

accordions.forEach((accordion) => {
  accordion.addEventListener("click", () => {
    accordion.parentNode.classList.toggle("appear");
  });
});

//アンダーバーアニメーション
const animatedBorders = document.querySelectorAll("[data-animate]");
const animatedImages = document.querySelectorAll(".animated-img");

window.addEventListener("scroll", () => {
  const windowBottom = window.pageYOffset + window.innerHeight;

  animatedBorders.forEach((el) => {
    const elBottom = el.offsetTop + el.offsetHeight;

    if (windowBottom > elBottom) {
      el.classList.add("animate");
    }
  });

  animatedImages.forEach((el) => {
    const elBottom = el.offsetTop + el.offsetHeight;

    if (windowBottom > elBottom) {
      el.classList.add("animate");
    }
  });
});

window.onload = function () {
  // アニメーション終了を検知するためのフラグを設定
  var animationEndFlag1 = false;

  // mv-bg-img-1要素を取得します
  var bgImage1 = document.querySelector(".mv-bg-img-1");

  // mv-bg-img-1のアニメーション終了を検知するイベントリスナーを設定
  bgImage1.addEventListener("animationend", function () {
    animationEndFlag1 = true;
    showMainImage();
  });

  function showMainImage() {
    if (animationEndFlag1) {
      // アニメーションが終了したら、.MV_image-main要素を取得して表示
      var mainImage = document.querySelector(".MV_image-main");
      mainImage.style.opacity = "1";
    }
  }
};

const fadeElementOnScroll = () => {
  const elements = document.querySelectorAll(
    ".advantages .advantages_image-area"
  );

  const fadeInElement = (element) => {
    element.style.opacity = 1;
  };

  const isElementInView = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight)
    );
  };

  const handleScroll = () => {
    elements.forEach((element) => {
      if (isElementInView(element)) {
        fadeInElement(element);
      }
    });
  };

  // スクロール時に要素をフェードインさせる
  window.addEventListener("scroll", handleScroll);
};

fadeElementOnScroll();
