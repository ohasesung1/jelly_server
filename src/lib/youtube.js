const Youtube = require('youtube-node');
const youtube = new Youtube();

exports.youtubeSearch = () => {
  const word = '애완동물';
  const limit = 20;

  let result;
  youtube.search(word, limit, function (err, body) { // 검색 실행
    if (err) { console.log(err); return; } // 에러일 경우 에러공지하고 빠져나감
  
    // console.log(JSON.stringify(result, null, 2)); // 받아온 전체 리스트 출력

    // var items = body["items"]; // 결과 중 items 항목만 가져옴
    // JSON.parse(items);

    items = JSON.parse(body);
    return items;
    
  });
}
