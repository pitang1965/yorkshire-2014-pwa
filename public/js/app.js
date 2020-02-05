const container = document.querySelector(".container")
const pictures = [
  { name: "親愛なるKeithさんと", image: "images/with-keith.jpg", details: "この夏の終わりに私は仕事のしすぎで血栓症を患った。激務が終わり癌末期の友人が待つ英国へ。1996年の思い出の地を二人で尋ねるのであった。" },
  { name: "Hawesの羊と", image: "images/hawes.jpg", details: "思い出のHaws(ホウズ）の羊に癒やされる49歳" },
  { name: "Skipton", image: "images/skipton.jpg", details: "Keithさんの弟の相方の同僚であるJoanneも友人。彼女とその相方と1日観光。" },
  { name: "Camden", image: "images/camden.jpg", details: "未だにパンクな人達が目立つカムデン。長旅の疲れを私もPunk IPAで流すのであった。" },
  { name: "Malhamの羊", image: "images/sheep.jpg", details: "この日は血栓症で痛む足を引き釣り、ものすごい距離を歩き倒し、最高の一日！" },
  { name: "Gordale Scar", image: "images/gordale-scar.jpg", details: "まだ歩ける。もっと歩きたい。ということでここまで来て、更に奥地を目指す3人。" },
  { name: "Malham Cove", image: "images/malham-cove.jpg", details: "Malham(マラム）のこの場所は映画ハリーポッターでも使われたらしいです。観てないけど。ずっと向こうから歩いてきた。" },
  { name: "Malham Cove", image: "images/malham-cove2.jpg", details: "Malham(マラム）の崖に登る手前。" },
  { name: "Bolton Abbey", image: "images/bolton-abbey.jpg", details: "Joanneの相方と川を渡る。泳げるけど、水に落ちるかもしれず恐怖でした。iPhoneも死ぬし。" },
];

const showPictures = () => {
  let output = ""
  pictures.forEach(
    ({ name, image, details }, index) =>
      (output += `
              <div class="card">
                <img class="card--avatar" src=${image} />
                <h1 class="card--title">${name}</h1>
                <a class="card--button popup__button" href="#popup-${index}">詳細</a>

                <div id="popup-${index}" class="overlay">
                  <div class="popup">
                    <h2>詳細</h2>
                    <a class="close" href="#">&times;</a>
                    <div class="content">${details}</div>
                  </div>
                </div>
              </div>
              `)
  );
  container.innerHTML = output;
}

document.addEventListener("DOMContentLoaded", showPictures);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', ()=>  {
    navigator.serviceWorker.register('sw.js')
      .then(reg => {
        console.log('サービスワーカーの登録が以下のスコープで完了! ', reg.scope)
      })
      .catch(err => {
        return console.log('サービスワーカーの登録が失敗: ', err)
      });
  });
}