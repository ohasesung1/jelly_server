// const youtube = require('../../lib/youtube');
const Youtube = require('youtube-node');
const youtube = new Youtube();

youtube.setKey('AIzaSyDIboVrzCPuQ2sln2roOkTfZSCokAnpSeo');

youtube.addParam('order', 'rating');
youtube.addParam('type', 'video');
youtube.addParam('videoLicense', 'creativeCommon');


exports.rcmndShow = async (req, res) => {
  console.log("rcmndShow API CALL");
  

  const word = "애완 동물";
  const limit = 50;
  
  let title =[];
  let url = [];
  let video_id = [];
  let thumbnails = [];

  try {
    // const  body  = await youtube.youtubeSearch();
    youtube.search(word, limit, function (err, body) { // 검색 실행
      if (err) { console.log(err); return; } // 에러일 경우 에러공지하고 빠져나감
        
          var items = body["items"]; // 결과 중 items 항목만 가져옴
      for (var i in items) { 
          var it = items[i];
           title[i] = it["snippet"]["title"];
           video_id[i] = it["id"]["videoId"];
           url[i] = "https://www.youtube.com/watch?v=" + video_id;
           thumbnails[i] = items[i].snippet.thumbnails;
          // console.log("제목 : " + title);
          // console.log("URL : " + url);
          // console.log("-----------");
          // console.log(items[i].snippet.thumbnails);
          }
          const result = {
            status: 200,
            message: "추천 페이지 로드 성공!",
            data: {
              url: url,
              title: title,
              video_id: video_id,
              thumbnails: thumbnails,
            }
          }

          res.status(200).json(result);
      });
    } catch(error) { 
    console.log(error);

    const result = {
      status: 500,
      message: "서버 에러!",
    }

    res.status(500).json(result);
  }
}