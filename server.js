const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; //3000번 사용


const validateInputs = require('./validators'); //데이터 입력값 유효성 검사 인자 ->(helmet, temperature, sound, gas)

var ghelmet, gtemperature, gsound, ggas;

ghelmet = 1;
gtemperature = 10;
gsound = 200;
ggas = 100;

// JSON 요청 본문을 파싱
app.use(bodyParser.json());

// POST 요청 처리
app.post('/phw', (req, res) => {
  const { helmet, temperature, sound, gas } = req.body;

  console.log('Helmet:', helmet);
  console.log('Temperature:', temperature);
  console.log('Sound:', sound);
  console.log('Gas:', gas);

  ghelmet = helmet;
  gtemperature = temperature;
  gsound = sound;
  ggas = gas;

  // HW단으로 응답
  res.send('to HW : Data received successfully');
});

app.get('/pget', (req, res)=>{
  var tmpwarn, soundwarn, gaswarn, helmetwarn;

  if(gtemperature > 40 || gtemperature < -10){
    tmpwarn = 1;
  }else{
    tmpwarn = 0;
  }

  if(gsound > 200) {
    soundwarn = 1;
  }else{
    soundwarn = 0;
  }

  if(ggas > 200){
    gaswarn = 1;
  }else{
    gaswarn = 0;
  }

  helmetwarn = ghelmet;
  console.log('Helmet:', ghelmet);
  console.log('Temperature:', gtemperature);
  console.log('Sound:', gsound);
  console.log('Gas:', ggas);

  res.json({tmp : gtemperature, noise : soundwarn, gas : gaswarn, helmet : helmetwarn});
})

// 서버 시작
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
