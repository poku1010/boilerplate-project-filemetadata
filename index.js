var express = require('express');
var cors = require('cors');
var multer  = require('multer');
require('dotenv').config();

var app = express();

// 設定 CORS
app.use(cors());

// 設定靜態資源路徑
app.use('/public', express.static(process.cwd() + '/public'));

// 使用 multer 來處理檔案上傳
var storage = multer.memoryStorage(); // 你也可以使用 diskStorage 來保存到硬碟
var upload = multer({ storage: storage });

// 路由處理
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// 處理檔案上傳並回傳 JSON
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // 回傳檔案資訊
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

// 啟動伺服器
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
