function getData() {
    // 抓到目標網頁
    fetch("https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json")
    .then((response)=>{
        return response.json();
    }).then((jsonItem)=>{
        // 抓到網頁文檔中欲讀取的資料
        let profile = jsonItem.result.results;
        // 抓到要把資料放入的元素節點
        let promotion = document.querySelectorAll(".promotion > div");
        // 遍歷目標資料
        for(let i = 0;i<3;i++){
            // 取出目標圖片網址
            let img = document.createElement('img')
            let file = profile[i].file;
            let pictures = file.split('http');
            pictures.splice(0,1)
            let newPicture = 'http'+pictures[i];
            // 將圖片網址放到目標節點中
            newImage = promotion[i].appendChild(img)
            newImage.src = newPicture;

            // 取出風景區名稱
            let text = profile[i].stitle;
            // 建立放名稱的元素標籤，並加入文字，然後加到目標元素節點中
            let newPara = document.createElement('p');
            let newTextNode = document.createTextNode(text);
            let newText = newPara.appendChild(newTextNode);
            promotion[i].appendChild(newText);
        }

        // 抓到要貼圖片的位置
        let titleClass = document.querySelectorAll(".title");
        for(let j = 3;j<profile.length;j++){
            // // 建立放置圖片的位置
            let titleDiv = document.createElement('div');
            titleClass[0].appendChild(titleDiv);
            let subimg = document.createElement('img')
            newImage = titleDiv.appendChild(subimg);
            // // 放入圖片
            let file = profile[j].file;
            let pictures = file.split('http');
            pictures.splice(0,1);
            let newSubPicture = 'http'+pictures[0];
            newImage.src = newSubPicture;

            // // 取出風景區名稱
            let text = profile[j].stitle;
            // // 建立放名稱的元素標籤，並加入文字，然後加到目標元素節點中
            let newPara = document.createElement('div');
            titleDiv.appendChild(newPara);
            let newTextNode = document.createTextNode(text);
            let newText = newPara.appendChild(newTextNode);
            console.log(newText);

            // 將圖片隱藏
            if (j > 14){
                titleDiv.style.display = "none";
            }
        }
        
    })
}
getData();