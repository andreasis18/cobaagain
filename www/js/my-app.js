var $$ = Dom7;
var lokasifoto = "http://192.168.137.1/PMN/mob/barcode/";
var database_connect = "http://192.168.137.1/PMN/mob/";
var app = new Framework7({
root: '#app',
name: 'MOB-FT',
theme:'ios',
id: 'com.ubaya.mobft',
panel: { swipe: 'left' },
touch: { fastClicks: true,},
view: { iosDynamicNavbar: false, },
routes: [
	{
		path: '/index/',
		url: 'index.html',
		on:
		{
			pageInit:function(e,page)
			{
				app.panel.enableSwipe();
			},
		},
	},

	///////////////////////////////////////// AUTH ///////////////////////////////////////////

	// login
	{
		path: '/login/',
		url: 'pages/auth/login.html',
		on:
		{
			pageInit:function(e,page)
			{
				app.panel.disableSwipe();
				$$('#btnsignin').on('click', function() {
					var snrp = $$('#snrp').val();
					var passwordd = $$('#password').val();
					var snrpfix = snrp.substring(1);
					
					  page.router.navigate('/violation/');
					  localStorage.nrp = snrpfix;
					  localStorage.name = 'dhiemas';
					  localStorage.role = 'sfd';
					  localStorage.photo = snrpfix;
					  localStorage.jurusan = 'infor';
				  });  
			},
			pageAfterIn: function (event, page) { 
		      if(!localStorage.nrp) {       
		        page.router.navigate('/login/',{ animate:false, reloadAll:true });
		      } else {
		        page.router.navigate('/violation/',{ animate:false, reloadAll:true });
		      }
		    } 
		},
	},

	///////////////////////////////////////// HOME ///////////////////////////////////////////
	// home
	{
		path: '/home/',
		url: 'pages/home.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				$$('#logout').on('click', function(e) {
					localStorage.removeItem('nrp');
					localStorage.removeItem('name');
					localStorage.removeItem('role');
					localStorage.removeItem('photo');
					localStorage.removeItem('jurusan');
					localStorage.removeItem('token');
					page.router.navigate('/login/');
				});
				////////////////////////////// PENGATURAN ROLE //////////////////////////
				////////////////////////////// ADMIN //////////////////////////
				localStorage.role = "sfd";
				console.log(localStorage.role);

				////////////////////////////// SFD //////////////////////////
				if (localStorage.role == "sfd") {
					console.log('here');
					  page.router.navigate('/violation/');
				}

				////////////////////////////// MAPING //////////////////////////
			},
			pageAfterIn: function (event, page) 
			{	
			   if(!localStorage.nrp) {       
					page.router.navigate('/login/',{ animate:false, reloadAll:true });
				} else {
					page.router.navigate('/violation/',{ animate:false, reloadAll:true });
				}
			}	
		},
	},

	///////////////////////////////////////// MENU ///////////////////////////////////////////

	// violation
	{
		path: '/violation/',
		url: 'pages/menu/violation.html',
		on:
		{
			pageInit:function(e,page)
			{
				console.log('here');
				app.panel.disableSwipe();
				screen.orientation.lock('portrait');
				$$('#btn-scan-violation').on('click', function(e) {
					cordova.plugins.barcodeScanner.scan(
				      function (result) {
				          alert("We got a barcode\n" +
				                "Result: " + result.text + "\n" +
				                "Format: " + result.format + "\n" +
				                "Cancelled: " + result.	cancelled);
				      },
				      function (error) {
				          alert("Scanning failed: " + error);
				      },
				      {
				          preferFrontCamera : false, // iOS and Android
				          showFlipCameraButton : true, // iOS and Android
				          showTorchButton : true, // iOS and Android
				          torchOn: false, // Android, launch with the torch switched on (if available)
				          saveHistory: true, // Android, save scan history (default false)
				          prompt : "Place a barcode inside the scan area", // Android
				          resultDisplayDuration: 10, // Android, display scanned text for X ms. 0 suppresses it entirely, default 110
				          formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
				          orientation : "portrait", // Android only (portrait|portrait), default unset so it rotates with the device
				          disableAnimations : true, // iOS
				          disableSuccessBeep: false // iOS and Android
				      }
				   );
				});
				window.addEventListener("error", handleError,true);
			},
		},
	},
]});
var mainView = app.views.create('.view-main',{ url: '/home/'});
function handleError(evt){
 if(evt.message){
  alert("error:"+ evt.message + " line :"+ evt.lineno+" file "+ evt.filename);
 }else{
  alert("error:"+ evt.type + " element :"+ (evt.srcElement || evt.target));
 }
}
function onBackKeyDown() {
	if(app.views.main.history.length == 1 || app.views.main.router.url == '/home/')
	{
		navigator.app.exitApp();
	} 
	else 
	{
		if(app.views.main.router.url == '/login/') {  
			navigator.app.exitApp();
		}
		else
		{
			app.panel.enableSwipe();
			app.dialog.close();
			app.views.main.router.back();
			return false;
		}
	}
}


// set to either portrait
// screen.orientation.lock('portrait');
// allow user rotate
// screen.orientation.unlock();
// access current orientation
// console.log('Orientation is ' + screen.orientation.type);

document.addEventListener("backbutton", onBackKeyDown, false);