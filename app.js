const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');
const crypto = require('crypto');
const escapeHtml = require('escape-html');
const fs = require('fs');
const { parseString } = require('xml2js');
const { promisify } = require('util');
const { Readable } = require('stream');
const sanitizeHtml = require('sanitize-html');
require('date-utils');
const schedule = require("node-schedule");
var cheerio = require('cheerio');
var request = require('request-promise');
const puppeteer = require("puppeteer");
const ytdl = require("ytdl-core");
const moment = require('moment')

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ ▼ ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

console.log("천년퍼즐에 봉인됐던 어둠의 조영선의 영혼이 현세에 부활했다.")

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ ▲ ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ


const queue = new Map();

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ!가사 관련 전역ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
var lySW = 0;
var url = "";
var singer_id = [];
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ!가사 관련 전역ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ


//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ시간 관련 전역ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
var yy, mm, dd, hh, mi, ss
var cucuSW = 0;
var alSW = 0;

function delay( timeout )
{
  return new Promise(( resolve ) => {
    setTimeout( resolve, timeout );
  });
}

function timeup()
{
var newDate = new Date();
yy = parseInt(newDate.toFormat('YYYY'))
mm = parseInt(newDate.toFormat('MM'))
dd = parseInt(newDate.toFormat('DD'))
hh = parseInt(newDate.toFormat('HH24'))
mi = parseInt(newDate.toFormat('MI'))
ss = parseInt(newDate.toFormat('SS'))
}

function alerror(msg)
{
  msg.channel.send("```diff\n-형식 : !일정추가 YYYY년 MM월 DD일 hh시 mm분 ss초, [내용] \n```" +
 "\n▶과거의 시간을 입력할 수 없으며, 시간 옵션과 내용은 콤마(,)로 구별합니다. \n\n각 시간 옵션은 필수가 아니며, 적지 않으면 기본값으로 설정이 됩니다.\n[년월일]의 기본값은 올해(" + yy + "년), 이번달(" + mm + "월), 오늘("+ dd +"일)이고, \n[시분초]의 기본값은 00시 00분 00초 입니다. \n" +
 "\n\n 예) !일정추가 1월 1일, 새해 => "+ yy +"년 1월 1일 00시 00분 00초, 새해")
}
function timererror(msg)
{
if((mi+4)>60)
{
  mi = mi - 60
  hh = hh + 1
}
  msg.channel.send("```diff\n-형식 : !타이머 hh시 mm분 ss초 뒤, [내용] \n```" +
 "각 시간 옵션은 필수가 아니며, 적지 않으면 기본값으로 설정이 됩니다. \n각 시분초 단위의 한자리, 두자리 까지만 인식하므로 120초 같은 것은 오류입니다. \n\n[시분초]의 기본값은 현재 시간("+hh+"시 "+mi+"분 "+ss+"초) 입니다. \n\n 시간과 내용은 콤마(,)로 구별합니다." +
 "\n\n 예) !타이머 4분 뒤, 컵라면 => "+yy+"년 "+mm+"월 "+dd+"일 "+hh+"시 "+hh+"분 "+ss+"초, 컵라면")

}


function alOutput(msg)
{
  var outputtxt = ""
  for(var i=0; i<ScheduleCucu.length;i++)
{
outputtxt = outputtxt + ScheduleCucu[i].id + "번 : " + ScheduleCucu[i].finishdate_year + "년 " + ScheduleCucu[i].finishdate_month + "월 " + ScheduleCucu[i].finishdate_days + "일 " + ScheduleCucu[i].finishdate_hours + "시 " + ScheduleCucu[i].finishdate_minutes + "분, \"" + ScheduleCucu[i].contents + "\"\n"
}
  msg.channel.send(outputtxt)
}


var extimeSW = 0;
var extime=0;
async function theworld(msg,col,ntime,extimeSW,extime)
{
  timeup()
  var theyear = ScheduleCucu[col].finishdate_year
  var themonth = ScheduleCucu[col].finishdate_month
  var thedays = ScheduleCucu[col].finishdate_days
  var thehours = ScheduleCucu[col].finishdate_hours
  var themin = ScheduleCucu[col].finishdate_minutes
  var thesec = ScheduleCucu[col].finishdate_secondes
  var conten = ScheduleCucu[col].contents
await delay(ntime*1000)

if(extimeSW==0)
{
msg.channel.send("\"" + conten + "\" 까지 24시간 전을 알려드립니다!")
await delay(43200*1000)
}



if(extimeSW==1 && extime > 43200)
  {
    extimeSW = 0
    extime=extime-43200
  await delay(extime*1000)
  msg.channel.send("\"" + conten + "\" 까지 12시간 전을 알려드립니다!")
  await delay(21600*1000) // 12시간
}else if(extimeSW==0)
{
  msg.channel.send("\"" + conten + "\" 까지 12시간 전을 알려드립니다!")
  await delay(21600*1000)
}



  if(extimeSW==1 && extime > 21600)
    {
      extimeSW = 0
      extime=extime-21600
      await delay(extime*1000)
  msg.channel.send("\"" + conten + "\" 까지 6시간 전을 알려드립니다!")
  await delay(10800*1000) // 6시간
}else if (extimeSW==0)
{
  msg.channel.send("\"" + conten + "\" 까지 6시간 전을 알려드립니다!")
  await delay(10800*1000)
}



    if(extimeSW==1 && extime > 10800)
      {
        extimeSW = 0
        extime=extime-10800
        await delay(extime*1000)
  msg.channel.send("\"" + conten + "\" 까지 3시간 전을 알려드립니다!")
  await delay(7200*1000) // 3시간
}else if (extimeSW==0)
{
  msg.channel.send("\"" + conten + "\" 까지 3시간 전을 알려드립니다!")
  await delay(7200*1000)
}


if(extimeSW==1 && extime > 7200)
  {
    extimeSW = 0
    extime=extime-7200
    await delay(extime*1000)
  msg.channel.send("\"" + conten + "\" 까지 1시간 전을 알려드립니다!")
  await delay(1800*1000) // 1시간
}else if (extimeSW==0)
{
  msg.channel.send("\"" + conten + "\" 까지 1시간 전을 알려드립니다!")
  await delay(1800*1000)
}

  if(extimeSW==1 && extime > 1800)
    {
      extimeSW = 0
      extime=extime-1800
      await delay(extime*1000)
  msg.channel.send("\"" + conten + "\" 까지 30분 전을 알려드립니다!")
  await delay(1200*1000) // 30분
}else if (extimeSW==0)
{
  msg.channel.send("\"" + conten + "\" 까지 30분 전을 알려드립니다!")
  await delay(1200*1000)
}


if(extimeSW==1 && extime > 1200)
  {
    extimeSW = 0
    extime=extime-1200
    await delay(extime*1000)
  msg.channel.send("\"" + conten + "\" 까지 10분 전을 알려드립니다!")
  await delay(300*1000) // 10분
}else if (extimeSW==0)
{
  msg.channel.send("\"" + conten + "\" 까지 10분 전을 알려드립니다!")
  await delay(300*1000)
}

if(extimeSW==1 && extime > 300)
  {
    extimeSW = 0
    extime=extime-300
    await delay(extime*1000)
  msg.channel.send("\"" + conten + "\" 까지 5분 전을 알려드립니다!")
  await delay(270*1000) // 300초, 5분
}else if (extimeSW==0)
{
  msg.channel.send("\"" + conten + "\" 까지 5분 전을 알려드립니다!")
  await delay(270*1000)
}

if(extimeSW==1 && extime > 270)
  {
    extimeSW = 0
    extime=extime-270
    await delay(extime*1000)
msg.channel.send("\"" + conten + "\" 까지 30초 전을 알려드립니다!")
  msg.channel.send({files:['roadroller1.png']})
  await delay(29*1000) // 30초
}else if (extimeSW==0)
{
msg.channel.send("\"" + conten + "\" 까지 30초 전을 알려드립니다!")
msg.channel.send({files:['roadroller1.png']})
  await delay(29*1000)
}

if(extimeSW==1 && extime > 29)
  {
    extimeSW = 0
    extime=extime-29
    await delay(extime*1000)
  msg.channel.send({files:['roadroller2.png']})
  await delay(1*1000)
}else if (extimeSW==0) {
  msg.channel.send({files:['roadroller2.png']})
  await delay(1*1000)
}else if (true) {
  msg.channel.send({files:['roadroller2.png']})
  await delay(extime*1000)
}
  msg.channel.send(theyear + "년 " + themonth + "월 " + thedays + "일 " +
  thehours + "시 " + themin + "분, " + thesec + "초, \"" + conten + "\" 가 시간이 됐다고 어둠선이 알려드립니다!")
}



function cucu(msg)
{
schedule.scheduleJob('0 0 0/1 * * *', function() {
timeup()
/*
msg.channel.send("딩동~! 어둠선이 " + hh + "시 " + mi + "분 " + ss + "초를 알려드립니다!").then(msg => msg.delete({timeout:3600*1000}))


*/
var datetxt = yy + "." + mm +"." + dd
var nowtime = moment(datetxt, "YYYY-MM-DD")

if(hh==0)
{

  var outputtxt = "D-DAY!\n```diff\n"
  //d-day
  for(var i=0; i<ScheduleCucu.length; i++)
  {
    if(ScheduleCucu[i].finishdate_days == dd && ScheduleCucu[i].finishdate_month == mm && ScheduleCucu[i].finishdate_year == yy)
    {
      outputtxt = outputtxt + "-" + ScheduleCucu[i].finishdate_hours + "시 " + ScheduleCucu[i].finishdate_minutes + "분, \"" + ScheduleCucu[i].contents + "\"\n"
    }
  }
  outputtxt = outputtxt + "\n```"
  if(outputtxt.indexOf("분")!=-1)
  {
  msg.channel.send(outputtxt)
  }

  var outputtxt = "```"


  for(var i=0; i<ScheduleCucu.length; i++)
  {
    var ddaytxt = ScheduleCucu[i].finishdate_year +"."+ ScheduleCucu[i].finishdate_month +"."+ ScheduleCucu[i].finishdate_days
    var aldate = moment(ddaytxt, "YYYY-MM-DD")
    var datecounter = aldate.diff(nowtime, 'days')
    if(datecounter > 0)
    {outputtxt = outputtxt + "DAY-" + datecounter + "일, \"" + ScheduleCucu[i].contents +"\"\n"}
  }
  outputtxt = outputtxt + "\n```"
if(outputtxt.indexOf("일, ")!=-1)
{
  msg.channel.send(outputtxt)
}

}

var ntime=0
for(var i=0; i<ScheduleCucu.length; i++)
{
  var ddaytxt = ScheduleCucu[i].finishdate_year +"."+ ScheduleCucu[i].finishdate_month +"."+ ScheduleCucu[i].finishdate_days
  var aldate = moment(ddaytxt, "YYYY-MM-DD")
  var tw = aldate.diff(nowtime, 'days')
  if(tw==1 && hh==ScheduleCucu[i].finishdate_hours)
  {
    ntime=(ScheduleCucu[i].finishdate_minutes*60) + ScheduleCucu[i].finishdate_secondes
    theworld(msg,i,ntime,0,0)
  }
}

/*
if((hh > 9 && hh < 24) || hh == 0 )
{realtime(msg)}
*/



});

/*schedule.scheduleJob('* 0 9-16 * * MON-FRI', function() {
kospi(msg)
});*/

}

var ScheduleCucu
fs.readFile('ScheduleCucu.json', 'utf8', function (err, data) {
  if (err) throw err;
  ScheduleCucu = JSON.parse(data);
});
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ시간 관련 전역ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ음식추천ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
var MenuList
fs.readFile('recommand.json', 'utf8', function (err, data) {
  if (err) throw err;
  MenuList = JSON.parse(data);
});
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ음식추천ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ계좌ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
var account
fs.readFile('account.json', 'utf8', function (err, data) {
  if (err) throw err;
  account = JSON.parse(data);
});
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ계좌ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ


//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ코스피 파싱ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
/*function kospi(msg)
{
var url = 'https://finance.naver.com/sise/sise_index.nhn?code=KOSPI';
    request(url).then(function(body){
      var $ = cheerio.load(body);
      var kospi1 = $('em#now_value');
    msg.channel.send("현재 코스피 지수 : " + kospi1.text());
  });
}*/
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ코스피 파싱ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ





//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ코로나 파싱ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
var yday =""
var tday =""
async function realtime(msg)
{

  msg.channel.send("확진자 수 불러오는 중 ...")
  puppeteer.launch({
  	  headless : true
  	, devtools : false
  	, args: ['--no-sandbox']
  }).then(async browser => {
  const page = await browser.newPage();
  await page.goto( "https://corona-live.com/" );
await delay(1000)
  //const yestDay = await page.waitForSelector( "#root > div > div.sc-AxjAm.bRuiNy.sc-AxirZ.fZVwIW.sc-AxiKw.eSbheu > div:nth-child(1) > div.sc-AxjAm.fiWmrI.sc-AxirZ.heBhHx.sc-AxiKw.eSbheu" );
      //  const txtyestDay = await page.evaluate( yestDay => yestDay.textContent, yestDay );
  const ToDay = await page.waitForSelector("#__next > div > div.Layout__SBox-c6bc3z-0.bqXfda.Layout__SFlex-c6bc3z-1.bvrJQG.Layout__SRow-c6bc3z-2.Maibk" );
        const txtToDay = await page.evaluate( ToDay => ToDay.textContent, ToDay );
  var todaycutter = txtToDay.split("0시 기준 신규 확진자수실시간 확진자수")

  var ydaytemp = todaycutter[0].split("명")
  var tdaytemp = todaycutter[1].split("명")

  yday = ydaytemp[1]
  tday = tdaytemp[0]
msg.channel.send("어제자 확진자 수 : " + yday + "명" +
	       "\n실시간 확진자 수 : " + tday + "명")
  await browser.close();
  });
}

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ코로나 파싱ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ







//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ메세지 삭제 전역ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
var delmsgid = new Array();
var delchannelid = new Array();
var delcounter = 0;

function dlt(msg)
{
delcounter = delcounter + 1
delmsgid[delcounter]=msg.id
delchannelid[delcounter]=msg.channel.id
}
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ메세지 삭제 전역ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ


//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ뽐빠이 계산기 전역ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  var chongSW = 0;
	var Counter = 0;
	var OutCounter = 0;
	var namearray1 = 0; // N명의 N값 전역변수
	var namearray2NUM = 0; // 이름입력개수의 전역변수
	var namearray2 = new Array(); // 이름 저장 전역변수
	var TextSaver = new Array(16);
	var InbidiAmount; // 개인별 금액
	var DoubleAmount = 0;
	var namearrayTemp = null;
	var InbidiAmountOutNumber = new Array(16);
	var OuterNumber = new Array(16);
	var InbidiAmountOutName = new Array(16);
	var OuterName = new Array(16);
	var Outernamearray2 = new Array(16);

  var Para_CalcPhase = 0;

  function HotSan(msg) {
    var outputtxt = "```diff\n"
         if (msg.content.indexOf(" ")>=0) // 띄어쓰기로 구별, 철수 유리 명박 각각 array[0~2]에 들어감
  			{
  				namearrayTemp = msg.content.split(" "); // 띄어쓰기에서 자르기


  				namearray2NUM = namearrayTemp.length; // 전역변수에 이름 개수인 3 넣기 (var값)
  				namearray2 = new Array(namearray2NUM);

  				for (var i = 0; i < namearrayTemp.length; i++) // 전역변수에 지역변수 넣기와 개인별 출력
  				{
  					namearray2[i] = namearrayTemp[i]; // 전역변수에 이름 넣기
            outputtxt = outputtxt + namearrayTemp[i] + " : 0원\n"
  				}
          outputtxt = outputtxt + "```"
          msg.channel.send(outputtxt)
  			}

     else  // 이름 하나 적었을 때
  	{

  				msg.channel.send("1명 인식했습니다! 근데 한명인데 뽐빠이 계산기 왜 쓰냐?");

  				namearray2NUM = 1; // 전역변수에 이름 개수인 1 넣기 (var값)
  				namearray2 = new Array(namearray2NUM);

  				for (var i = 0; i < namearray2NUM; i++) // 전역변수에 지역변수 넣기와 개인별 출력
  				{
  					namearray2[i] = msg.content; // 전역변수에 이름 넣기
  					outputtxt = outputtxt + namearray2[i] + " : " + "0원\n"
  				}
          outputtxt = outputtxt + "```"
          msg.channel.send(outputtxt)

  			}
  }

  	//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

   //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  	function DistributionName(msg) {
      var outputtxt = "```diff\n"
  		if(OutCounter==0)
  		{
  			DoubleAmount = DoubleAmount / namearray2NUM;
  		for (var i = 0; i < namearray2NUM; i++)
  			{
  			InbidiAmount[i] = InbidiAmount[i] + DoubleAmount;
  			outputtxt = outputtxt + namearray2[i] + " : " + Math.round(InbidiAmount[i]) + "원\n"
  			}
        outputtxt = outputtxt + "```"
        msg.channel.send(outputtxt)
  		}
  		else
  		{
  			DoubleAmount = DoubleAmount / (namearray2NUM-OutCounter);
  			for (var i = 1; i < namearray2NUM+1; i++)
  				{
  				var k = OuterName[i-1];
  				if(i==k)
  				{
  					outputtxt = outputtxt + Outernamearray2[i-1] + " : " + Math.round(InbidiAmountOutName[i-1]) + "원 (제외)\n"
  					continue;
  				}
  				InbidiAmount[i-1] = InbidiAmount[i-1] + DoubleAmount;
  				outputtxt = outputtxt + namearray2[i-1] + " : " + Math.round(InbidiAmount[i-1]) + "원\n"
  				}
          outputtxt = outputtxt + "```"
          msg.channel.send(outputtxt)
  		}
  	}

   //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  	function SubtractionName(msg) {
var outputtxt = "```diff\n"
  		if(OutCounter==0)
  		{
  			DoubleAmount = DoubleAmount / namearray2NUM;
  		for (var i = 0; i < namearray2NUM; i++)
  			{
  			InbidiAmount[i] = InbidiAmount[i] - DoubleAmount;
        outputtxt = outputtxt + namearray2[i] + " : " + Math.round(InbidiAmount[i]) + "원\n"
  			}
        outputtxt = outputtxt + "```"
        msg.channel.send(outputtxt)
  		}
  		else
  		{
  			DoubleAmount = DoubleAmount / (namearray2NUM-OutCounter);
  			for (var i = 1; i < namearray2NUM+1; i++)
  				{
  				var k = OuterName[i-1];
  				if(i==k)
  				{
  				outputtxt = outputtxt + Outernamearray2[i-1] + " : " + Math.round(InbidiAmountOutName[i-1]) + "원 (제외)\n"
  					continue;
  				}
  				InbidiAmount[i-1] = InbidiAmount[i-1] - DoubleAmount;
  				outputtxt = outputtxt + namearray2[i-1] + " : " + Math.round(InbidiAmount[i-1]) + "원\n"
  				}
          outputtxt = outputtxt + "```"
          msg.channel.send(outputtxt)
  		}
  	}
   //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
   //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  	function NameOutput(msg,chongSW)
  	{
      var outputtxt = "```diff\n"
if(chongSW == 0)
{
  		if(OutCounter==0)
  		{
  		for (var i = 0; i < namearray2NUM; i++)
  			{
  			outputtxt = outputtxt + namearray2[i] + " : " + Math.round(InbidiAmount[i]) + "원\n"
  			}
        outputtxt = outputtxt + "```"
        msg.channel.send(outputtxt)
  		}
  		else
  		{
  			for (var i = 1; i < namearray2NUM+1; i++)
  				{
  				var k = OuterName[i-1];
  				if(i==k)
  				{
  					outputtxt = outputtxt + Outernamearray2[i-1] + " : " + Math.round(InbidiAmountOutName[i-1]) + "원 (제외)\n"
  					continue;
  				}
  				outputtxt = outputtxt + namearray2[i-1] + " : " + Math.round(InbidiAmount[i-1]) + "원\n"
  				}
          outputtxt = outputtxt + "```"
          msg.channel.send(outputtxt)
  		}
}
else
{
  timeup()
  if(OutCounter==0)
  {
    var outputtxt="영수증 발급! ```diff\nㅡㅡㅡ내역ㅡㅡㅡ\n"
    for (var i = 0; i < Counter; i++) {

      outputtxt = outputtxt + TextSaver[i] + "\n"
    }
    outputtxt = outputtxt + "ㅡㅡㅡㅡㅡㅡㅡㅡ\n"
  for (var i = 0; i < namearray2NUM; i++)
    {
    outputtxt = outputtxt + namearray2[i] + " : " + Math.round(InbidiAmount[i]) + "원\n"
    }
    outputtxt = outputtxt + "ㅡㅡㅡㅡㅡㅡㅡㅡ\n현재 시간 : " + yy +"년 " + mm + "월 " + dd + "일 " + hh +"시 " + mi + "분```"
    msg.channel.send(outputtxt)
  }
  else
  {
    var outputtxt="영수증 발급! \n```diff\n"
    for (var i = 0; i < Counter; i++) {

      outputtxt = outputtxt + TextSaver[i] + "\n"
    }
    outputtxt = outputtxt + "내역으로부터,\n"
    for (var i = 1; i < namearray2NUM+1; i++)
      {
      var k = OuterName[i-1];
      if(i==k)
      {
        outputtxt = outputtxt + Outernamearray2[i-1] + " : " + Math.round(InbidiAmountOutName[i-1]) + "원 (제외)\n"
        continue;
      }
      outputtxt = outputtxt + namearray2[i-1] + " : " + Math.round(InbidiAmount[i-1]) + "원\n"
      }
      outputtxt = outputtxt + "```"
      msg.channel.send(outputtxt)
  }
}
  	}
  	//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
   //옵션 함수들
   //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
   function CommaWon(msg) {
  		var AmountArray1 = msg.content.split("만"); // 배열에 5.7 잘라넣기
  		DoubleAmount = parseFloat(AmountArray1[0]); // 5.7 실수값으로 변환
  		DoubleAmount = DoubleAmount * 10000; // 5.7 -> 57000 변환
  		if (msg.content.indexOf("빼기")==-1) {DistributionName(msg);} // 5.7만 입력했을 때 종료

  		// 5.7만 빼기일 때
  		else if (msg.content.indexOf("빼기")>=0) {SubtractionName(msg);}
  	}
   //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
   function Won(msg) {
  		var AmountArray1 = msg.content.split(" "); // 배열에 15700 잘라넣기
  		DoubleAmount = parseFloat(AmountArray1[0]); // 15700 실수값으로 변환
  		if (msg.content.indexOf("빼기")==-1) {DistributionName(msg);} // 이름을 적었을 때 끝


  		else if (msg.content.indexOf("빼기")>=0) {SubtractionName(msg);}
  	}
  	//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  	function Add(msg) {
  			if(OutCounter==0)
  			{
  			var Cutter = msg.content.split(" "); // 이름 이름 참가, 즉 총 값에서 -1 해야됨
  			var BackUp = InbidiAmount.length;
  			namearray2NUM = namearray2NUM + (Cutter.length - 1); // 철수 유리 명박 (3명) + 훈이 맹구 (2명)
  			msg.channel.send(Math.round(Cutter.length)-1 + "명이 추가되어 " + namearray2NUM + "명으로 계산을 이어합니다");

  			var NameUperTemp_NameList = new Array(namearray2NUM);
  			var NameUperTemp_Amount = new Array(namearray2NUM);
     for(var i = 0; i < namearray2NUM; i++)
     {
       NameUperTemp_NameList[i]=0;
       NameUperTemp_Amount[i]=0;
       }
  			for(var i=0;i<InbidiAmount.length;i++)
  			{
  				NameUperTemp_NameList[i] = namearray2[i];
  				NameUperTemp_Amount[i] = InbidiAmount[i];
  			}

  			namearray2=NameUperTemp_NameList;
  			InbidiAmount=NameUperTemp_Amount;

  			for(var i=BackUp;i<namearray2NUM;i++)
  			{
  				namearray2[i]=Cutter[i-BackUp];
  			}

  			NameOutput(msg,0);
  			}

  			else
  			{
  				var Cutter = msg.content.split(" "); // 철수 유리 적었을 때 [0]에 "철수" [1]에 "유리" [2]에 "참가"
  				var CTemp = null;
  				var NTemp = null;
  				for(var i=0;i<Cutter.length-1;i++) // 2번 반복
  				{
  					CTemp=Cutter[i]; // 초회 기준으로, "철수"
  					for(var k=0; k<Outernamearray2.length; k++) // 아우터 이름 배열에서 "철수" 검색
  					{
  						NTemp = Outernamearray2[k];
  						if(CTemp==NTemp) // 철수가 일치했을 때
  							{
  							OutCounter--;
  							OuterName[k]=0;// 아우터네임 초기화
  							namearray2[k] = Outernamearray2[k];
  							InbidiAmount[k] = InbidiAmountOutName[k]; // [0]에 들어있는 철수의 누적액을 [0]에 넣음
  							}
  					}

  				}
  				msg.channel.send("제외되었던 " + (Cutter.length-1) + "명이 재참가합니다" );
  				NameOutput(msg,0);
  			}

  	}

   	//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

    function Sub(msg) {
  			 var Cutter = msg.content.split(" "); // 철수 유리 적었을 때 [0]에 "철수" [1]에 "유리" [2]에 "빠짐"
  				var CTemp = null;
  				var NTemp = null;
  				for(var i=0;i<Cutter.length-1;i++) // 2번 반복
  				{
  					CTemp=Cutter[i]; // 초회 기준으로, "철수"
  					for(var k=0; k<namearray2NUM; k++) // 기존의 이름 배열에서 "철수" 검색
  					{
  						NTemp = namearray2[k];
  						if(NTemp==CTemp) // 철수가 일치했을 때
  							{
  							OutCounter++;
  							OuterName[k]=k+1; // 아우터네임[0]에 1들어감
  							Outernamearray2[k] = namearray2[k];
  							InbidiAmountOutName[k] = InbidiAmount[k]; // [0]에 들어있는 철수의 누적액을 [0]에 넣음
  							}
  					}
  				}
  				NameOutput(msg,0)
  	}

   	//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  	function To(msg) {

  		  // 호준 윤호 투 동주 동욱 5.7만
  			  var Cutter = msg.content.split(" "); // // [0]"명박" ,  [1]"투" , [2]"유리" , [3]"5.7만"
  				var ToPosition = 0;
  				for(var i=0;i<Cutter.length;i++) // 4번 반복
  				{
  					if(Cutter[i].indexOf("투")>=0 || Cutter[i].indexOf("이동")>=0) // 투 위치 검색 [1]라면 1저장
  					{
  						ToPosition = i;
  					}
  				}

  				var CutterBeforeTo = new Array(ToPosition); // 1칸의 배열 생성
  				var CTemp = null;
  				var NTemp = null;

  				for(var i=0;i<ToPosition;i++) // i = 0
  				{
  					CTemp = Cutter[i]; //  "명박"
  					for(var k=0; k<namearray2NUM; k++) //명박 찾기
  					{
  						NTemp=namearray2[k]; // 철수 유리 명박 일때, [2]가 "명박"
  						if(NTemp == CTemp) // i0 "명박" = k2 "명박
  						{
  							CutterBeforeTo[i] = k+1; // to전 [0]에 3 저장
  						}
  					}

  				}
          var CutterAfterTo = new Array(Cutter.length-ToPosition-2); // 4 - 1 - 2 = 1칸 배열
  				for(var i=ToPosition+1;i<Cutter.length-1;i++) // i = 1+1 = 2, 3
  				{
  					CTemp = Cutter[i]; //"유리"
  					for(var k=0; k<namearray2NUM; k++) //철수 유리 명박
  					{
  						NTemp=namearray2[k]; // k1일 때 "유리"
  						if(NTemp==CTemp) // i2 k1 유리유리
  						{
  							CutterAfterTo[i-ToPosition-1] = k+1; // to후 [0]에 2
  						}
  					}

  				}


  				var MoneyDefault = Cutter[Cutter.length-1]; // 마지막 배열, [5] 5.7만이 들어감
  				if(MoneyDefault.indexOf("만")>=0)
  				{
  					var AmountArray1 = MoneyDefault.split("만"); // 배열에 5.7 잘라넣기
  					DoubleAmount = parseFloat(AmountArray1[0]); // 5.7 실수값으로 변환
  					DoubleAmount = DoubleAmount * 10000; // 5.7 -> 57000 변환
  				}
  				else
  				{
  					var AmountArray1 = MoneyDefault.split("원"); // 배열에 15700 잘라넣기
  					DoubleAmount = parseFloat(AmountArray1[0]); // 15700 실수값으로 변환
  				}

  				if(OutCounter==0)
  				{
  					for(var i=0; i<CutterBeforeTo.length; i++)
  					{
  						InbidiAmount[CutterBeforeTo[i]-1] = InbidiAmount[CutterBeforeTo[i]-1] - DoubleAmount;
  					}

  					DoubleAmount = (DoubleAmount*CutterBeforeTo.length) / CutterAfterTo.length; // (5.7만 * 2명 ) 만큼의 돈을 2명에게 나눠줌. 만약 3명에게 나눠줬을 때의 계산식.

  					for(var i=0; i<CutterAfterTo.length; i++)
  					{
  						InbidiAmount[CutterAfterTo[i]-1] = InbidiAmount[CutterAfterTo[i]-1] + DoubleAmount;
  					}
  				}
          else
  				{
  					for (var i = 0; i <CutterBeforeTo.length; i++) //2반복
  					{
  						var A = CutterBeforeTo[i];

  						for(var j=0; j<namearray2NUM; j++) // 5반복
  						{
  							var B = OuterName[j];
  							if(A==B)
  							{
  								InbidiAmountOutName[j] = InbidiAmountOutName[j] - DoubleAmount;
  								continue;
  							}
  						}
  						InbidiAmount[CutterBeforeTo[i]-1] = InbidiAmount[CutterBeforeTo[i]-1] - DoubleAmount;
  					}

  					DoubleAmount = (DoubleAmount*CutterBeforeTo.length) / CutterAfterTo.length;

  					for (var i = 0; i <CutterAfterTo.length; i++) //2반복
  					{
  						var A = CutterAfterTo[i];

  						for(var j=0; j<namearray2NUM; j++) // 5반복
  						{

  							var B = OuterName[j];

  							if(A==B)
  							{
  								InbidiAmountOutName[j] = InbidiAmountOutName[j] + DoubleAmount;
  								continue;
  							}
  						}
  						InbidiAmount[CutterAfterTo[i]-1] = InbidiAmount[CutterAfterTo[i]-1] + DoubleAmount;
  					}
  				}

  				NameOutput(msg,0);
  		  }

      //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  	function UpMan(msg) {
  			  var Cutter = msg.content.split(" "); // // [0]"호준" ,  [1]"윤호" , [2]"증가" , [3]"5.7만"
  				var ToPosition = 0;
  				for(var i=0;i<Cutter.length-1;i++) // 4-1 = 3번 반복
  				{
  					if(Cutter[i].indexOf("증가")>=0 || Cutter[i].indexOf("업")>=0) // 증가 위치 검색 [2]라면 2저장
  					{
  						ToPosition = i;
  					}
  				}

  				var CutterBeforeUp = new Array(ToPosition); // 2칸의 배열 생성
  				var CTemp = null;
  				var NTemp = null;

  				for(var i=0;i<ToPosition;i++) // i = 0~1
  				{
  					CTemp = Cutter[i]; //  "호준"
  					for(var k=0; k<namearray2NUM; k++) //호준 찾기
  					{
  						NTemp=namearray2[k]; // 참가인이 "철수 유리 호준 윤호" 라면 [k=2] 일 때 "호준"
  						if(NTemp==CTemp) // i0 "명박" = k2 "호준"
  						{
  							CutterBeforeUp[i] = k+1; // to전 [0]에 K2 + 1 = 3 저장
  						}
  					}

  				}

  				var MoneyDefault = Cutter[Cutter.length-1]; // 마지막 배열, [3] 5.7만이 들어감

  				if(MoneyDefault.indexOf("만")>=0)
  				{
  					var AmountArray1 = MoneyDefault.split("만"); // 배열에 5.7 잘라넣기
  					DoubleAmount = parseFloat(AmountArray1[0]); // 5.7 실수값으로 변환
  					DoubleAmount = DoubleAmount * 10000; // 5.7 -> 57000 변환
  				}
  				else
  				{
  					var AmountArray1 = MoneyDefault.split("원"); // 배열에 15700 잘라넣기
  					DoubleAmount = parseFloat(AmountArray1[0]); // 15700 실수값으로 변환
  				}

  				if(OutCounter==0)
  				{
  					for(var i=0; i<CutterBeforeUp.length; i++)
  					{
  						InbidiAmount[CutterBeforeUp[i]-1] = InbidiAmount[CutterBeforeUp[i]-1] + DoubleAmount;
  					}

  				}
          else
  				{
  					for (var i = 0; i <CutterBeforeUp.length; i++) //2반복
  					{
  						var A = CutterBeforeUp[i];

  						for(var j=0; j<namearray2NUM; j++) // 5반복
  						{
  							var B = OuterName[j];
  							if(A==B)
  							{
  								InbidiAmountOutName[j] = InbidiAmountOutName[j] + DoubleAmount;
  								continue;
  							}
  						}
  						InbidiAmount[CutterBeforeUp[i]-1] = InbidiAmount[CutterBeforeUp[i]-1] + DoubleAmount;
  					}

  				}

  				NameOutput(msg,0);

  	}
   //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  	function DownMan(msg)
    {
  			  var Cutter = msg.content.split(" "); // // [0]"호준" ,  [1]"윤호" , [2]"증가" , [3]"5.7만"
  				var ToPosition = 0;
  				for(var i=0;i<Cutter.length-1;i++) // 4-1 = 3번 반복
  				{
  					if(Cutter[i].indexOf("감소")>=0 || Cutter[i].indexOf("다운")>=0) // 증가 위치 검색 [2]라면 2저장
  					{
  						ToPosition = i;
  					}
  				}

  				var CutterBeforeUp = new Array(ToPosition); // 2칸의 배열 생성
  				var CTemp = null;
  				var NTemp = null;

  				for(var i=0;i<ToPosition;i++) // i = 0~1
  				{
  					CTemp = Cutter[i]; //  "호준"
  					for(var k=0; k<namearray2NUM; k++) //호준 찾기
  					{
  						NTemp=namearray2[k]; // 참가인이 "철수 유리 호준 윤호" 라면 [k=2] 일 때 "호준"
  						if(NTemp==CTemp) // i0 "명박" = k2 "호준"
  						{
  							CutterBeforeUp[i] = k+1; // to전 [0]에 K2 + 1 = 3 저장
  						}
  					}

  				}

  				var MoneyDefault = Cutter[Cutter.length-1]; // 마지막 배열, [3] 5.7만이 들어감

  				if(MoneyDefault.indexOf("만")>=0)
  				{
  					var AmountArray1 = MoneyDefault.split("만"); // 배열에 5.7 잘라넣기
  					DoubleAmount = parseFloat(AmountArray1[0]); // 5.7 실수값으로 변환
  					DoubleAmount = DoubleAmount * 10000; // 5.7 -> 57000 변환
  				}
  				else
  				{
  					var AmountArray1 = MoneyDefault.split("원"); // 배열에 15700 잘라넣기
  					DoubleAmount = parseFloat(AmountArray1[0]); // 15700 실수값으로 변환
  				}

  				if(OutCounter==0)
  				{
  					for(var i=0; i<CutterBeforeUp.length; i++)
  					{
  						InbidiAmount[CutterBeforeUp[i]-1] = InbidiAmount[CutterBeforeUp[i]-1] - DoubleAmount;
  					}

  				}
          else
  				{
  					for (var i = 0; i <CutterBeforeUp.length; i++) //2반복
  					{
  						var A = CutterBeforeUp[i];

  						for(var j=0; j<namearray2NUM; j++) // 5반복
  						{
  							var B = OuterName[j];
  							if(A==B)
  							{
  								InbidiAmountOutName[j] = InbidiAmountOutName[j] - DoubleAmount;
  								continue;
  							}
  						}
  						InbidiAmount[CutterBeforeUp[i]-1] = InbidiAmount[CutterBeforeUp[i]-1] - DoubleAmount;
  					}

  				}

  				NameOutput(msg,0);

  	  }

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ뽐빠이 계산기 전역ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ


async function execute(msg, serverQueue,link) {
  const voiceChannel = msg.member.voice.channel;
/*
  if (!voiceChannel)
    return msg.channel.send(
      "You need to be in a voice channel to play music!"
    );
  const permissions = voiceChannel.permissionsFor(msg.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return msg.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  }
*/

  const songInfo = await ytdl.getInfo(link);
  const song = {
        title: songInfo.videoDetails.title,
        url: link,
   };

  if (!serverQueue) {
    const queueContruct = {
      textChannel: msg.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };

    queue.set(msg.guild.id, queueContruct);

    queueContruct.songs.push(song);

      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(msg.guild, queueContruct.songs[0]);
  }

  else {
    serverQueue.songs.push(song);
    return // msg.channel.send(`${song.title} has been added to the queue!`);
  }

}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
  //  serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url,{quality:'highestaudio',highWaterMark: 1<<25}))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  //dispatcher.setVolumeLogarithmic(serverQueue.volume/5);
}

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ M A I N ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
client.on('message', async msg => {

if(msg.content.indexOf("[DSOJ]")!=-1)
{
const serverQueue = queue.get(msg.guild.id);
    var link='https://www.youtube.com/watch?v=FTTJKOjHgmw'
        execute(msg, serverQueue,link);
}

if(msg.content.indexOf("까지 30초 전을")!=-1)
{
const serverQueue = queue.get(msg.guild.id);
  var link='https://www.youtube.com/watch?v=aEiOyt-xlVs'
      execute(msg, serverQueue,link);
}

if (msg.author.id === client.user.id && msg.content.indexOf("개의 메세지 ") == -1 && msg.content.indexOf("영수증 발급!") == -1 && msg.content.indexOf("참가자 중 저장된 계좌 정보가 있습니다!") == -1
     && msg.content.indexOf("딩동~!") ==-1 && msg.content.indexOf("D-DAY!") == -1)
  {
	delcounter = delcounter + 1
	delmsgid[delcounter]=msg.id
  delchannelid[delcounter]=msg.channel.id
  // .then()을 써서 스스로 메세지를 삭제하는 경우, 이 조건식에 조건 추가.
        return;
  }

let content = msg.content;


if(msg.content == "테스트")
{

}

if(msg.content=="호바밧")
  {
msg.channel.send({files:['delete.jpg']}).then(msg => msg.delete({timeout:10000}))
msg.channel.send( delcounter + " 우효옷~ 개의 메세지 삭제중!").then(msg => msg.delete({timeout:10000}))
client.channels.cache.get(msg.channel.id).messages.fetch(msg.id).then(msg => msg.delete())
for(var i=delcounter; i > 0; i--)
  {
    try{
    var exist = await client.channels.cache.get(delchannelid[i]).messages.fetch(delmsgid[i])
    client.channels.cache.get(delchannelid[i]).messages.fetch(delmsgid[i]).then(msg => msg.delete())
  }catch(e){continue}

  }
delchannelid=[]
delmsgid=[]
delcounter=0
}

if(msg.content=="짤")
  {
var seletor = Math.floor(Math.random() * 3559) + 1
var name;
var format;
var combi;
if(seletor < 172)
{name = "jpeg ("
format = ").jpeg"
combi = "pic/" + name + (Math.floor(Math.random() * 170)+1) + format
}
if(seletor > 172 && seletor < (172+694) )
{name = "gif ("
format = ").gif"
combi = "pic/" + name + (Math.floor(Math.random() * 693)+1) + format
}
if(seletor > (172+694) && seletor < (172+694+2217) )
{name = "jpg ("
format = ").jpg"
combi = "pic/" + name + (Math.floor(Math.random() * 2216)+1) + format
}
if(seletor > (172+694+2217) && seletor < (192+694+2217+478))
{name = "png ("
format= ").png"
combi = "pic/" + name + (Math.floor(Math.random() * 477)+1) + format
}
msg.channel.send({files: [combi]})
dlt(msg)
}

if(msg.content.indexOf("!가사") !=-1)
  {
lySW = 1;

var cc = msg.content
var Src = cc.split("!가사 ");
var a = Src[1]

var head = "https://www.melon.com/search/lyric/index.htm?q="
var tail = "&section=&searchGnbYn=Y&kkoSpl=Y&kkoDpType=&ipath=srch_form"

url = head + encodeURIComponent(a) + tail;

request(url).then(function(body){
var $ = cheerio.load(body, {decodeEntities: true});

var singer1_name = sanitizeHtml($('#pageList > div > ul > li:nth-child(1) > dl > dt > a.btn.btn_icon_detail').text(),{
    parser: {
      decodeEntities: true
    }
  });
var singer1_artist = sanitizeHtml($('#pageList > div > ul > li:nth-child(1) > dl > dd.info > span.atist > a').text(),{
    parser: {
      decodeEntities: true
    }
  });
var singer1_info = sanitizeHtml($('#pageList > div > ul > li:nth-child(1) > dl > dd.info > span.album > a').text(),{
    parser: {
      decodeEntities: true
    }
  });
var singer1_sample = sanitizeHtml($('#pageList > div > ul > li:nth-child(1) > dl > dd.lyric > a').text(),{
    parser: {
      decodeEntities: true
    }
  });
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
var singer2_name = sanitizeHtml($('#pageList > div > ul > li:nth-child(2) > dl > dt > a.btn.btn_icon_detail').text(),{
    parser: {
      decodeEntities: true
    }
  });
var singer2_artist = sanitizeHtml($('#pageList > div > ul > li:nth-child(2) > dl > dd.info > span.atist > a').text(),{
    parser: {
      decodeEntities: true
    }
  });
var singer2_info = sanitizeHtml($('#pageList > div > ul > li:nth-child(2) > dl > dd.info > span.album > a').text(),{
    parser: {
      decodeEntities: true
    }
  });
var singer2_sample = sanitizeHtml($('#pageList > div > ul > li:nth-child(2) > dl > dd.lyric > a').text(),{
    parser: {
      decodeEntities: true
    }
  });
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
var singer3_name = sanitizeHtml($('#pageList > div > ul > li:nth-child(3) > dl > dt > a.btn.btn_icon_detail').text(),{
    parser: {
      decodeEntities: true
    }
  });
var singer3_artist = sanitizeHtml($('#pageList > div > ul > li:nth-child(3) > dl > dd.info > span.atist > a').text(),{
    parser: {
      decodeEntities: true
    }
  });
var singer3_info = sanitizeHtml($('#pageList > div > ul > li:nth-child(3) > dl > dd.info > span.album > a').text(),{
    parser: {
      decodeEntities: true
    }
  });
var singer3_sample = sanitizeHtml($('#pageList > div > ul > li:nth-child(3) > dl > dd.lyric > a').text(),{
    parser: {
      decodeEntities: true
    }
  });
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
var singer1_id_info = $('#pageList > div > ul > li:nth-child(1) > dl > dt > a.text')
var idid = singer1_id_info.toString()
var idcutter1 = idid.split("melon.play.playSong(&apos;&apos;,&apos;")
var idcutter2 = idcutter1[1].split("&apos;);\"\ title=")
singer_id[0] = idcutter2[0]

var singer2_id_info = $('#pageList > div > ul > li:nth-child(2) > dl > dt > a.text')
var idid = singer2_id_info.toString()
var idcutter1 = idid.split("melon.play.playSong(&apos;&apos;,&apos;")
var idcutter2 = idcutter1[1].split("&apos;);\"\ title=")
singer_id[1] = idcutter2[0]

var singer3_id_info = $('#pageList > div > ul > li:nth-child(3) > dl > dt > a.text')
var idid = singer3_id_info.toString()
var idcutter1 = idid.split("melon.play.playSong(&apos;&apos;,&apos;")
var idcutter2 = idcutter1[1].split("&apos;);\"\ title=")
singer_id[2] = idcutter2[0]
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
if(singer1_name != "Undefined")
{
  msg.channel.send("제목 : " + singer1_name + "\n\아티스트 : " + singer1_artist + "\n\미리보기 : " + singer1_sample + "\n\ ▲ㅡㅡㅡㅡㅡㅡ1번ㅡㅡㅡㅡㅡㅡ▲")
}
if(singer2_name != "Undefined")
{
  msg.channel.send("제목 : " + singer2_name + "\n\아티스트 : " + singer2_artist + "\n\미리보기 : " + singer2_sample + "\n\ ▲ㅡㅡㅡㅡㅡㅡ2번ㅡㅡㅡㅡㅡㅡ▲")
}
if(singer3_name != "Undefined")
{
  msg.channel.send("제목 : " + singer3_name + "\n\아티스트 : " + singer3_artist + "\n\미리보기 : " + singer3_sample + "\n\ ▲ㅡㅡㅡㅡㅡㅡ3번ㅡㅡㅡㅡㅡㅡ▲")
}
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
});
dlt(msg)
}


if(msg.content == "!계좌번호")
{dlt(msg)
  if(account.length > 0)
  {
  var outputtxt = ""
  for(var i=0; i<account.length;i++)
  {
    outputtxt = outputtxt + account[i].id + "번 \""+ account[i].infos + "\"\n"
  }
  msg.channel.send(outputtxt)
  }
}

if(msg.content.indexOf("!계좌번호추가 ")!=-1)
{dlt(msg)
var infocut = msg.content.split("!계좌번호추가 ")
var infos = infocut[1]
account.push({"id": account.length + 1, "infos": infos})
msg.channel.send(account[account.length-1].id + "번 \"" + account[account.length-1].infos + "\" 의 계좌정보가 저장되었습니다.")
fs.writeFile("account.json", JSON.stringify(account), function(err) {if (err) throw err;})
}

if(msg.content.indexOf("!계좌번호삭제 ") != -1)
{
  try{
  var cutter1 = msg.content.split("!계좌번호삭제 ")
  var cutter2 = cutter1[1]
  var cutter3 = cutter2.split("번")
  var number = cutter3[0]
  parseInt(number)
  number=number-1
msg.channel.send(account[number].id + "번 \"" + account[number].infos + "\"의 계좌정보가 제거되었습니다.")
account.splice(number, 1)
  for (var i = 0; i < account.length; i++) {
    account[i].id = i + 1
  }

fs.writeFile("account.json", JSON.stringify(account), function(err){if (err) throw err;})
dlt(msg)
}catch(Er){msg.channel.send("해당 번호가 없거나 틀린 형식입니다. ```diff\n-형식 : !계좌번호삭제 n번 \n```")}
}

if(lySW === 1 && msg.content.indexOf("번") != -1)
  {

var number = msg.content.split("번")
if(number[0] == 1 || number[0] == 2 || number[0] == 3)
{
var ly_head = "https://www.melon.com/song/detail.htm?songId="
url = ly_head + singer_id[number[0]-1]
request(url).then(function(body){
var $ = cheerio.load(body, {decodeEntities: true});
var ly = sanitizeHtml($('#d_video_summary'),{
    parser: {
      decodeEntities: true
    }
  });
var line=ly.split("<br />")
var linecutter = line[0].split("<div>")
line[0] = linecutter[1].trim()
var lycomb = "";

for(var i = 0; i<line.length-1; i++)
{
lycomb = lycomb + "\n" + line[i];
}
msg.channel.send(lycomb)
});

lySW = 0;
dlt(msg)
}
else
{
msg.channel.send("1~3번 사이의 번호를 입력하세요")
dlt(msg)
}

}


if(msg.content.indexOf("더하기 ")!=-1)
{dlt(msg)
  var calcon = msg.content.split(" ")
  var calconnum = 0
  for(var i=1; i<calcon.length; i++)
  {
    calconnum = calconnum + parseInt(calcon[i])
  }
  msg.channel.send(calconnum)
}

if(msg.content.indexOf("빼기 ")!=-1)
{dlt(msg)

  var calcon = msg.content.split(" ")
  var calconnum = 0
  for(var i=1; i<calcon.length; i++)
  {
    if(i==1)
    {calconnum = parseInt(calcon[i])}
    else
    {calconnum = calconnum - parseInt(calcon[i])}
  }
  msg.channel.send(calconnum)
}

if(msg.content.indexOf("곱하기 ")!=-1)
{dlt(msg)
  var calcon = msg.content.split(" ")
  var calconnum = 1
  for(var i=1; i<calcon.length; i++)
  {
    calconnum = calconnum * parseInt(calcon[i])
  }
  msg.channel.send(calconnum)
}

if(msg.content.indexOf("나누기 ")!=-1)
{dlt(msg)
  var calcon = msg.content.split(" ")
  var calconnum = 0
  for(var i=1; i<calcon.length; i++)
  {
    if(i==1)
    {calconnum = parseInt(calcon[i])}
    else
    {calconnum = calconnum / parseInt(calcon[i])}
  }
  msg.channel.send(calconnum)
}

if(msg.content.indexOf("!타이머 ") != -1)
{
  timeup()

  var al = msg.content.split("!타이머 ");
      var finishdate = new Array(6)
  finishdate[0] = yy
  finishdate[1] = mm
  finishdate[2] = dd
  finishdate[3] = hh
  finishdate[4] = mi
  finishdate[5] = ss

  var cutter = al[1].split("뒤, ") // 2020년 10월 31일 15시 30
  var aldata = cutter[0]
  var meet = "그냥 알람"
  meet = cutter[1]

  if(aldata.indexOf("시") != -1)
  {
    finishdate[3]= finishdate[3] + parseInt(aldata.substr((aldata.indexOf("시")-2), 2))
    if(isNaN(finishdate[3]))
    {finishdate[3] = hh + parseInt(aldata.substr((aldata.indexOf("시")-1), 1))}
  }

  if(aldata.indexOf("분") != -1)
  {
    finishdate[4]= finishdate[4] + parseInt(aldata.substr((aldata.indexOf("분")-2), 2))
    if(isNaN(finishdate[4]))
    {finishdate[4] = mi + parseInt(aldata.substr((aldata.indexOf("분")-1), 1))}
  }

  if(aldata.indexOf("초") != -1)
  {
    finishdate[5] = finishdate[5] + parseInt(aldata.substr((aldata.indexOf("초")-2), 2))
    if(isNaN(finishdate[5]))
    {finishdate[5] = ss + parseInt(aldata.substr((aldata.indexOf("초")-1), 1))}
  }

if(finishdate[5]>59)
{
  finishdate[5] = finishdate[5] - 60
  finishdate[4] = finishdate[4] + 1
}

if(finishdate[4]>59)
{
  finishdate[4] = finishdate[4] - 60
  finishdate[3] = finishdate[3] + 1
}

  if(!isNaN(finishdate[0]) && !isNaN(finishdate[1]) && !isNaN(finishdate[2]) && !isNaN(finishdate[3]) && !isNaN(finishdate[4]) && !isNaN(finishdate[5]) && meet != undefined && finishdate[3] < 24 && finishdate[4] < 60 && finishdate[5] < 60 )
  {
  if(finishdate[0] >= yy)
  {
    if(finishdate[0] > yy || finishdate[1] >= mm)
    {
      if((finishdate[0] > yy || finishdate[1] > mm) || finishdate[2] >= dd)
      {
        if((finishdate[0] > yy || finishdate[1] > mm || finishdate[2] > dd) || finishdate[3] >= hh)
        {
          if((finishdate[0] > yy || finishdate[1] > mm || finishdate[2] > dd || finishdate[3] > hh) || finishdate[4] >= mi)
          {
            if((finishdate[0] > yy || finishdate[1] > mm || finishdate[2] > dd || finishdate[3] > hh || finishdate[4] > mi) || finishdate[5] >= ss)
            {
            msg.channel.send(finishdate[0] +"년 " + finishdate[1] +"월 "+ finishdate[2] +"일 "+ finishdate[3] +"시 "+ finishdate[4] +"분 " + finishdate[5] +"초, \"" + meet + "\"에 대한 알람을 드리겠습니다!")

                      ScheduleCucu.push({"id": ScheduleCucu.length + 1, "finishdate_year": finishdate[0], "finishdate_month": finishdate[1], "finishdate_days": finishdate[2], "finishdate_hours": finishdate[3], "finishdate_minutes": finishdate[4], "finishdate_secondes": finishdate[5],
                                         "contents": meet});

                  fs.writeFile("ScheduleCucu.json", JSON.stringify(ScheduleCucu), function(err) {if (err) throw err;})
            }else{timererror(msg)}
          }else{timererror(msg)}
        }else{timererror(msg)}
      }else{timererror(msg)}
    }else{timererror(msg)}
  }else{timererror(msg)}

  var extime=0
  if(ScheduleCucu[ScheduleCucu.length-1].finishdate_year==yy && ScheduleCucu[ScheduleCucu.length-1].finishdate_month==mm && ScheduleCucu[ScheduleCucu.length-1].finishdate_days==dd)
  {
    extime = ((ScheduleCucu[ScheduleCucu.length-1].finishdate_hours-hh)*3600) + ((ScheduleCucu[ScheduleCucu.length-1].finishdate_minutes-mi)*60) + (ScheduleCucu[ScheduleCucu.length-1].finishdate_secondes-ss)
    theworld(msg,ScheduleCucu.length-1,0,1,extime)
  }

  }else{timererror(msg)}




        dlt(msg)
}

if(msg.content.indexOf("!일정추가 ") != -1)
  {
timeup()

var al = msg.content.split("!일정추가 ");
    var finishdate = new Array(6)
finishdate[0] = yy
finishdate[1] = mm
finishdate[2] = dd
finishdate[3] = 00
finishdate[4] = 00
finishdate[5] = 00

var cutter = al[1].split(", ") // 2020년 10월 31일 15시 30
var aldata = cutter[0]
var meet = "그냥 알람"
meet = cutter[1]

if(aldata.indexOf("년 ") != -1)
{
  finishdate[0]=parseInt(aldata.substr((aldata.indexOf("년")-4), 4))
}

if(aldata.indexOf("월") != -1)
{
  finishdate[1]=parseInt(aldata.substr((aldata.indexOf("월")-2), 2))
  if(isNaN(finishdate[1]))
  {finishdate[1] = parseInt(aldata.substr((aldata.indexOf("월")-1), 1))}
}

if(aldata.indexOf("일") != -1)
{
  finishdate[2]=parseInt(aldata.substr((aldata.indexOf("일")-2), 2))
  if(isNaN(finishdate[2]))
  {finishdate[2] = parseInt(aldata.substr((aldata.indexOf("일")-1), 1))}
}

if(aldata.indexOf("시") != -1)
{
  finishdate[3]=parseInt(aldata.substr((aldata.indexOf("시")-2), 2))
  if(isNaN(finishdate[3]))
  {finishdate[3] = parseInt(aldata.substr((aldata.indexOf("시")-1), 1))}
}

if(aldata.indexOf("분") != -1)
{
  finishdate[4]=parseInt(aldata.substr((aldata.indexOf("분")-2), 2))
  if(isNaN(finishdate[4]))
  {finishdate[4] = parseInt(aldata.substr((aldata.indexOf("분")-1), 1))}
}

if(aldata.indexOf("초") != -1)
{
  finishdate[5]=parseInt(aldata.substr((aldata.indexOf("초")-2), 2))
  if(isNaN(finishdate[5]))
  {finishdate[5] = parseInt(aldata.substr((aldata.indexOf("}")-1), 1))}
}

if(!isNaN(finishdate[0]) && !isNaN(finishdate[1]) && !isNaN(finishdate[2]) && !isNaN(finishdate[3]) && !isNaN(finishdate[4]) && !isNaN(finishdate[5]) && meet != undefined && finishdate[0] < 10000 && finishdate[1] < 13 && finishdate[2] < 32 && finishdate[3] < 24 && finishdate[5] < 60 && finishdate[5] < 60)
{

if(finishdate[0] >= yy)
{
  if(finishdate[0] > yy || finishdate[1] >= mm)
  {
    if((finishdate[0] > yy || finishdate[1] > mm) || finishdate[2] >= dd)
    {
      if((finishdate[0] > yy || finishdate[1] > mm || finishdate[2] > dd) || finishdate[3] >= hh)
      {
        if((finishdate[0] > yy || finishdate[1] > mm || finishdate[2] > dd || finishdate[3] > hh) || finishdate[4] >= mi)
        {
          if((finishdate[0] > yy || finishdate[1] > mm || finishdate[2] > dd || finishdate[3] > hh || finishdate[4] > mi) || finishdate[5] >= ss)
          {
          msg.channel.send(finishdate[0] +"년 " + finishdate[1] +"월 "+ finishdate[2] +"일 "+ finishdate[3] +"시 "+ finishdate[4] +"분, \"" + meet + "\"에 대한 알람을 드리겠습니다!")

                    ScheduleCucu.push({"id": ScheduleCucu.length + 1, "finishdate_year": finishdate[0], "finishdate_month": finishdate[1], "finishdate_days": finishdate[2], "finishdate_hours": finishdate[3], "finishdate_minutes": finishdate[4], "finishdate_secondes": finishdate[5],
                                       "contents": meet});

                fs.writeFile("ScheduleCucu.json", JSON.stringify(ScheduleCucu), function(err) {if (err) throw err;})
          }else{alerror(msg)}
        }else{alerror(msg)}
      }else{alerror(msg)}
    }else{alerror(msg)}
  }else{alerror(msg)}
}else{alerror(msg)}

var extime=0
if(ScheduleCucu[ScheduleCucu.length-1].finishdate_year==yy && ScheduleCucu[ScheduleCucu.length-1].finishdate_month==mm && ScheduleCucu[ScheduleCucu.length-1].finishdate_days==dd)
{
  extime = ((ScheduleCucu[ScheduleCucu.length-1].finishdate_hours-hh)*3600) + ((ScheduleCucu[ScheduleCucu.length-1].finishdate_minutes-mi)*60) + (ScheduleCucu[ScheduleCucu.length-1].finishdate_secondes-ss)
  theworld(msg,ScheduleCucu.length-1,0,1,extime)
}

}else{alerror(msg)}




      dlt(msg)
    }

if(msg.content.indexOf("!일정삭제 ") != -1)
{
  dlt(msg)
  try{
  var cutter1 = msg.content.split("!일정삭제 ")
  var cutter2 = cutter1[1]
  var cutter3 = cutter2.split("번")
  var number = cutter3[0]
  parseInt(number)
  number=number-1
msg.channel.send(ScheduleCucu[number].id + "번 : " + ScheduleCucu[number].finishdate_year + "년 " + ScheduleCucu[number].finishdate_month + "월 " + ScheduleCucu[number].finishdate_days + "일 " + ScheduleCucu[number].finishdate_hours + "시 " + ScheduleCucu[number].finishdate_minutes + "분, \"" + ScheduleCucu[number].contents + "\"의 일정이 삭제되었습니다.")
ScheduleCucu.splice(number, 1)
  for (var i = 0; i < ScheduleCucu.length; i++) {
    ScheduleCucu[i].id = i + 1
  }

fs.writeFile("ScheduleCucu.json", JSON.stringify(ScheduleCucu), function(err){if (err) throw err;})
}catch(Er){msg.channel.send("해당 번호가 없거나 틀린 형식입니다. ```diff\n-형식 : !일정삭제 n번 \n```")}
dlt(msg)
}

if(msg.content == ("!일정"))
{
  timeup()
  var datetxt = yy + "." + mm +"." + dd
  var nowdate = moment(datetxt, "YYYY-MM-DD")
  var datesaver = new Array();
  var dc = 0;

  for(var i=0; i<ScheduleCucu.length; i++)
  {
    var ddaytxt = ScheduleCucu[i].finishdate_year +"."+ ScheduleCucu[i].finishdate_month +"."+ ScheduleCucu[i].finishdate_days
    var aldate = moment(ddaytxt, "YYYY-MM-DD")

    var datecounter = nowdate.diff(aldate, 'days')
    if(datecounter > 1)
    {
      datesaver[dc] = i
      dc = dc + 1
    }
  }

  for(var i=0; i < datesaver.length; i++)
{
  ScheduleCucu.splice(datesaver[i], 1)
}

  for (var i = 0; i < ScheduleCucu.length; i++) {
    ScheduleCucu[i].id = i + 1
  }


  fs.writeFile("ScheduleCucu.json", JSON.stringify(ScheduleCucu), function(err){if (err) throw err;})

  if(ScheduleCucu.length>0)
  {alOutput(msg)}
  else
  {msg.channel.send("일정이 없다요")}
  dlt(msg)
}

if(msg.content.indexOf("추천") != -1 && msg.content.indexOf("받는다") == -1 && msg.content.indexOf("로또") == -1)
  {
      MS = msg.content;
      var Menu = MS.split("추천");
      const i = 0;

      do {
        const Avoid = Math.floor( Math.random() * (MenuList.length));
        if ( Menu[0] != MenuList[Avoid].menuname)
        {
          msg.channel.send("그럼 " + MenuList[Avoid].menuname + "먹어야겠다");
          MenuList.push({menuname: Menu[0]});
          break;
        }

      } while (1);

      fs.writeFile ("recommand.json", JSON.stringify(MenuList), function(err) {
      if (err) throw err;
    }
);
      dlt(msg)
    }

if(msg.content.indexOf("어둠의") != -1 && msg.content.indexOf("조영선") != -1)
  {

    msg.channel.send("```diff\n-▼[DSOJ] Relese.ver.20201206▼- \n```\n")
    msg.channel.send({files: ["darksideofjo.png"]})



    await delay(5000)
      msg.channel.send("*너의 국밥에는 믿음의 힘이 깃들어 있는가?\n" +
                       "동료를 믿는 뜨거운 마음을 가진 한국과학기술대학교의 대학원생이다!\n" +
                       "어떤 곤란한 상황에도 미래를 열어 나가지.\n" +
                       "고대의 기억을 되찾기 위해, 친구들과의 약속을 이루기 위해, 대학원생을 하고 있다.*")
       msg.channel.send("```diff\n-       『  !기능  』      -\n```")


                       dlt(msg)

    }

if(msg.content == "!기능")
  {
    msg.channel.send("음식 추천 ```[음식이름] 추천\n``` " +
                     "\n짤 랜덤 출력 ```짤\n```" +
                     "\n로또번호추천 ```로또번호추천\n``` " +
                     "\n가사 검색 및 출력 ```!가사 [검색어]\n1번~3번\n```"+
                     "\n코스피 지수 확인 ※곱버스 양전 전까지 기능 폐지※ ```코스피\n``` "  +
                     "\n코로나 확진자 수 확인 ```코로나\n``` "+
                     "\n메세지 삭제 ```호바밧\n```" +
                     "\n뽐빠이 계산기 ```핫산\n``` " +
                     "\n사칙연산 ```더하기 5 5 5 (결과 : 15)\n빼기 10 3 2 (결과 : 5)\n곱하기 10 5 2 (결과 : 100)\n나누기 100 5 2 (결과 : 10)\n```" +
                     "\n일정 및 알람 ```!일정 \n!일정추가 YYYY년 MM월 DD일 hh시 mm분 ss초, [내용] \n!일정삭제 n번\n```" +
                     "\n타이머 ```!타이머 hh시 mm분 ss초 뒤, [내용]\n```" +
                     "\n계좌번호저장 ```!계좌번호\n!계좌번호추가 [내용]\n!계좌번호삭제 n번\n```")
                     dlt(msg)
  }

if(msg.content == "뻐꾸기")
  {
  dlt(msg)
  msg.channel.send("뻐꾹")

  if (cucuSW==0) {
    cucu(msg)
    cucuSW = 1
  }

  const voiceChannel = msg.member.voice.channel;
  const queueContruct = {
    textChannel: msg.channel,
    voiceChannel: voiceChannel,
    connection: null,
    songs: [],
    volume: 5,
    playing: true
  };
  var connection = await voiceChannel.join();
  queueContruct.connection = connection
  }

if(msg.content == "코스피")
  {dlt(msg)
    /*
  kospi(msg)
  dlt(msg)
  */
  msg.channel.send("※곱버스 양전 전까지 기능 폐지※")
    }

if(msg.content == "코로나")
  {
  realtime(msg)
  dlt(msg)
    }


/* //TRPG MODE 폐지
if(msg.content.indexOf("TRPG") !=-1 && msg.content.indexOf("ON") != -1)
{
  TrpgSW = 1;
  msg.channel.send("목숨을 건 게임이 시작되었습니다...");
}

if(msg.content.indexOf("TRPG") !=-1 && msg.content.indexOf("OFF") != -1)
{
  TrpgSW = 0;
  msg.channel.send("목숨을 건 게임이 종료되었습니다...");
}


if(msg.content.indexOf("d") != -1 && TrpgSW === 1 && msg.content.indexOf("!") != -1 ) // 2d6 ,2d8
{
//try{

    var Before = (msg.content.indexOf("d") - (msg.content.indexOf("!")+1)) // !2d20일 때 1
    var PoD = msg.content.indexOf("d") // !2d20일 때 2
    var After = msg.content.length - msg.content.indexOf("d") +1 // !2d20일 때 4

if (Before == 0)
{
  var Dice_value_MAX =  (parseInt(msg.content.substring((PoD+1), After)) + 1)
  msg.channel.send(Math.floor( Math.random() * (Dice_value_MAX)))
}

else
{
  var Dice_value_MAX =  (parseInt(msg.content.substring((PoD+1), (After+1))) + 1)
  for (var i = 0; i < parseInt(msg.content.substring(Before, PoD)); i++) // 앞의 수 만큼 반복
  {


    msg.channel.send(Math.floor( Math.random() * (Dice_value_MAX)))
  }
}
//}
  //catch(exception)
  //{
  //  msg.channel.send("틀린 주문입니다..");
//  }
}
*/

if (msg.content == "로또번호추천")
{
  var LoNum;
  var LoFinal =[0,0,0,0,0,0];
  for (var i = 0; i < 6; i++) {
    LoNum = Math.floor(Math.random() * 45) + 1;
    LoFinal[i]=LoNum;
    for (var j = 0; j < i ; j++)
    {
      if (LoFinal[i] == LoFinal[j])
      {
        LoFinal[i] = 0;
        i--
      }
    }

  }
  function compare ( a , b ) {   return a - b;   }
  LoFinal.sort(compare);
  msg.channel.send("신분 상승을 위한 번호 " + LoFinal[0] + ", " + LoFinal[1] + ", " + LoFinal[2] + ", " + LoFinal[3] + ", " + LoFinal[4] + ", " + LoFinal[5])
  dlt(msg)
}


  if (msg.content.indexOf("핫산")>=0 && Para_CalcPhase == 0) // 메세지에 핫산이 포함되어 있으며 계산 레벨이 초기값(0)일 때 실행
		{
	 msg.channel.send("뽐빠이 계산기 기동!\n" +
                    "먼저, 참가인들의 이름을 적으세요\n" +
                    "```철수 유리 명박\n```")
			Para_CalcPhase = 1;
      dlt(msg)
		}

  if(Para_CalcPhase == 1 && msg.content.indexOf("핫산")<0)
			{
        dlt(msg)
     try{
				HotSan(msg);

        msg.channel.send("금액을 입력해주세요. \n도움말이 필요하면 핫산을 불러주시기 바랍니다. ```핫산\n```")

Para_CalcPhase = 2;
InbidiAmount = new Array(namearray2NUM); // 철수 유리 명박을 입력했을 때, InbidiAomunt라는 배열을 3개 선언함

   for(var i = 0; i < InbidiAmount.length; i++)
      {
        InbidiAmount[i] = 0;
      }

     }catch(HotSanError)
     {
       msg.channel.send("핫산 에러");
       Para_CalcPhase = 1;}
			}

    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    if(Para_CalcPhase == 2 && msg.content == "핫산")
    {
      dlt(msg)
      msg.channel.send("1. 금액 전체 분배 : [금액] [사용처(옵션)] ```diff\n1.8만 노래방\n78530 꼬치집\n```" +
                       "2. 금액 전체 감소 : [금액] 빼기          ```diff\n0.5만 빼기\n 15000 빼기 \n``` " +
                       "3. 중간에 참가 시 : [이름1] [이름2] 참가or추가     ```diff\n맹구 훈이 참가\n무현 추가\n```" +
                       "4. 중간에 빠질 시 : [이름1] [이름2] 제외or빠짐     ```diff\n철수 유리 제외\n명박 빠짐\n```" +
                       "5. 특정 인원간 금액 이동 : [승리자] 이동or투 [패배자]     ```diff\n철수 투 명박\n철수 유리 이동 명박 무현\n```" +
                       "6. 특정 인원 금액 증가 : [이름1] [이름2] [금액] 증가or업   ```diff\n철수 증가 5.7만\n유리 명박 업 13500\n```" +
                       "7. 특정 인원 금액 감소 : [이름1] [이름2] [금액] 감소or다운   ```diff\n철수 감소 5.7만\n유리 명박 다운 13500\n```" +
                       "8. 계산 완료 시 : 총계 ```diff\n총계\n```" +
                       "9. 계산기 초기화 : 초기화 ```diff\n초기화\n``` ")

    }
   if (  // 5.7만 입력했을 때
         Para_CalcPhase == 2
						&&msg.content.indexOf("총계")==-1  &&msg.content.indexOf("우효옷")==-1
						&& msg.content.indexOf("참가")==-1 && msg.content.indexOf("추가")==-1 // 옵션1 제외
						&& msg.content.indexOf("빠짐")==-1 && msg.content.indexOf("제외")==-1 // 옵션2 제외
						&& msg.content.indexOf("이동")==-1 && msg.content.indexOf("투")==-1
						&& msg.content.indexOf("증가")==-1 && msg.content.indexOf("업")==-1 // 옵션4 제외
						&& msg.content.indexOf("감소")==-1 && msg.content.indexOf("다운")==-1
						&& msg.content.search(/[0-9]/g)==0 && msg.content.indexOf("만")>=0
			)
				{
           dlt(msg)
          try{
					CommaWon(msg);
          TextSaver[Counter] = msg.content;
  				Counter++;
        }catch(Er){msg.channel.send("5.7만 에러");}

        }

    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
if (  // 15700입력했을 때
      Para_CalcPhase == 2
         &&msg.content.indexOf("총계")==-1 &&msg.content.indexOf("우효옷")==-1
         && msg.content.indexOf("참가")==-1 && msg.content.indexOf("추가")==-1 // 옵션1 제외
         && msg.content.indexOf("빠짐")==-1 && msg.content.indexOf("제외")==-1 // 옵션2 제외
         && msg.content.indexOf("이동")==-1 && msg.content.indexOf("투")==-1
         && msg.content.indexOf("증가")==-1 && msg.content.indexOf("업")==-1 // 옵션4 제외
         && msg.content.indexOf("감소")==-1 && msg.content.indexOf("다운")==-1
         && msg.content.indexOf("만")==-1   && msg.content.search(/[0-9]/g)==0
         && msg.content.indexOf(":") ==-1 && msg.content.indexOf("명")==-1
   )
     {
        dlt(msg)
       try{
       Won(msg);
       TextSaver[Counter] = msg.content;
       Counter++;
     }catch(Er){msg.channel.send("15700 에러");}

     }

     //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
if (  // 중간에 참가할 경우
      Para_CalcPhase == 2
         &&msg.content.indexOf("총계")==-1 &&msg.content.indexOf("우효옷")==-1
         && msg.content.indexOf("빠짐")==-1 && msg.content.indexOf("제외")==-1 // 옵션2 제외
         && msg.content.indexOf("이동")==-1 && msg.content.indexOf("투")==-1
         && msg.content.indexOf("증가")==-1 && msg.content.indexOf("업")==-1 // 옵션4 제외
         && msg.content.indexOf("감소")==-1 && msg.content.indexOf("다운")==-1
         && msg.content.indexOf("만")==-1   && msg.content.search(/[0-9]/g)==-1
         && (msg.content.indexOf("참가")>=0 || msg.content.indexOf("추가")>=0)
   )
     {
        dlt(msg)
       try{
       Add(msg);
       TextSaver[Counter] = msg.content;
       Counter++;
     }catch(Er){msg.channel.send("추가 에러");}

     }

     //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
if (  // 중간에 빠질 경우
      Para_CalcPhase == 2
         &&msg.content.indexOf("총계")==-1 &&msg.content.indexOf("우효옷")==-1
          // 옵션2 제외
         && msg.content.indexOf("이동")==-1 && msg.content.indexOf("투")==-1
         && msg.content.indexOf("증가")==-1 && msg.content.indexOf("업")==-1 // 옵션4 제외
         && msg.content.indexOf("감소")==-1 && msg.content.indexOf("다운")==-1
         && msg.content.indexOf("만")==-1   && msg.content.search(/[0-9]/g)==-1
         && msg.content.indexOf("참가")==-1 && msg.content.indexOf("추가")==-1
         && (msg.content.indexOf("빠짐")>=0 || msg.content.indexOf("제외")>=0)
   )
        {
           dlt(msg)
       try{
       Sub(msg);
       TextSaver[Counter] = msg.content;
       Counter++;
     }catch(Er){msg.channel.send("제외 에러");}

     }
   //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
if (  // 금액 이동
      Para_CalcPhase == 2
         &&msg.content.indexOf("총계")==-1 &&msg.content.indexOf("우효옷")==-1
         && msg.content.indexOf("증가")==-1 && msg.content.indexOf("업")==-1 // 옵션4 제외
         && msg.content.indexOf("감소")==-1 && msg.content.indexOf("다운")==-1
         && msg.content.indexOf("참가")==-1 && msg.content.indexOf("추가")==-1
         && msg.content.indexOf("빠짐")==-1  && msg.content.indexOf("제외")==-1
         && (msg.content.indexOf("이동")>=0 || msg.content.indexOf("투")>=0)
   )
     { dlt(msg)
       try{
       To(msg);
       TextSaver[Counter] = msg.content;
       Counter++;
     }catch(Er){msg.channel.send("이동 에러");}

     }
    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
if (  // 금액 증가시
      Para_CalcPhase == 2
         &&msg.content.indexOf("총계")==-1 &&msg.content.indexOf("우효옷")==-1
         && msg.content.indexOf("감소")==-1 && msg.content.indexOf("다운")==-1
         && msg.content.indexOf("참가")==-1 && msg.content.indexOf("추가")==-1
         && msg.content.indexOf("빠짐")==-1  && msg.content.indexOf("제외")==-1
         && msg.content.indexOf("이동")==-1 && msg.content.indexOf("투")==-1
         && (msg.content.indexOf("증가")>=0 || msg.content.indexOf("업")>=0)
   )
     { dlt(msg)
       try{
       UpMan(msg);
       TextSaver[Counter] = msg.content;
       Counter++;
     }catch(Er){msg.channel.send("금액증가 에러");}

     }
    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
if (  // 금액 감소시
      Para_CalcPhase == 2
         &&msg.content.indexOf("총계")==-1 &&msg.content.indexOf("우효옷")==-1
         && msg.content.indexOf("참가")==-1 && msg.content.indexOf("추가")==-1
         && msg.content.indexOf("빠짐")==-1  && msg.content.indexOf("제외")==-1
         && msg.content.indexOf("이동")==-1 && msg.content.indexOf("투")==-1
         && msg.content.indexOf("증가")==-1 && msg.content.indexOf("업")==-1
         && (msg.content.indexOf("감소")>=0 || msg.content.indexOf("다운")>=0)
   )
     { dlt(msg)
       try{
       DownMan(msg);
       TextSaver[Counter] = msg.content;
       Counter++;
     }catch(Er){msg.channel.send("금액감소 에러");}

     }

     //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
if (msg.content.indexOf("총계")>=0 && Para_CalcPhase == 2) {
  Para_CalcPhase == 0;
dlt(msg)
    NameOutput(msg,1);
outputtxt = "참가자 중 저장된 계좌 정보가 있습니다! \n```diff\n"
var accounter = 0;
for(var i=0; i<namearray2.length;i++)
{
  for(var j=0; j<account.length;j++)
    {
      if (account[j].infos.indexOf(namearray2[i])!=-1)
      {
        outputtxt = outputtxt + account[j].infos + "\n"
        accounter = accounter + 1
      }
    }
}
outputtxt = outputtxt + "```"
if(accounter>0)
msg.channel.send(outputtxt)

Counter = 0;
OutCounter = 0;
namearray1 = 0; // N명의 N값 전역변수
namearray2NUM = 0; // 이름입력개수의 전역변수
namearray2 = null; // 이름 저장 전역변수
TextSaver = new Array(16);
InbidiAmount; // 개인별 금액
DoubleAmount = 0;
namearrayTemp = null;
InbidiAmountOutNumber = new Array(16);
OuterNumber = new Array(16);
InbidiAmountOutName = new Array(16);
OuterName = new Array(16);
Outernamearray2 = new Array(16);
Para_CalcPhase = 0;
}
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  if(msg.content == "초기화")
  {
    Para_CalcPhase=0;
Counter = 0;
OutCounter = 0;
namearray1 = 0; // N명의 N값 전역변수
namearray2NUM = 0; // 이름입력개수의 전역변수
namearray2 = null; // 이름 저장 전역변수
TextSaver = new Array(16);
InbidiAmount; // 개인별 금액
DoubleAmount = 0;
namearrayTemp = null;
InbidiAmountOutNumber = new Array(16);
OuterNumber = new Array(16);
InbidiAmountOutName = new Array(16);
OuterName = new Array(16);
Outernamearray2 = new Array(16);
Para_CalcPhase = 0;
    msg.channel.send("계산기 파라미터 초기화 완료");
  }


});

client.login('bot token');
