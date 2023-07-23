async function getData() {
    // 抓到目標網頁
    let src = await fetch("https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json")
    // 將目標網頁解析成json檔
    let letJson = await src.json();
    // 抓到網頁文檔中欲讀取的資料
    let profile = letJson.result.results;
    // 抓到要把資料放入的元素節點
    let promotion = document.querySelectorAll(".promotion > div > img");
    // 遍歷目標資料
    for(let i = 0;i<3;i++){
      // 取出目標圖片網址
      let file = profile[i].file;
      let pictures = file.split('http');
      pictures.splice(0,1)
      let newPicture = "http"+pictures[i];
      // 將圖片網址放到目標節點中
      promotion[i].src = newPicture;
    }
      // 取出風景區名稱
      let text = profile[0].stitle;
      console.log(text);
      // 建立放名稱的元素標籤，並加入文字，然後加到目標元素節點中
      let newPara = document.createElement("p");
      let newTextNode = document.createTextNode(text);
      newPara.appendChild(newTextNode);
      promotion[0].appendChild(newPara);
      console.log(promotion[0]);
}
  getData();

