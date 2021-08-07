/*
PURPLE BAT GAME
VERSION 0.2.6
*/

	var canvas;
	var c;
	var midx;
	var midy;
	var pi = Math.PI;
	var start = 0;

	var openbuttonx=0;
	var openbuttony=0;
	var mouseX=0;
	var mouseY=0;
	var introfade=10;
	var rememberglobalalpha=1;
	var menuscreen=0;
	var screen = -60;

	var arrowtxt = "> ";
	var spacetxt = "  ";
	var opt1 = "Play Game";
	var opt2 = "Credits";
	var opt3 = "Error";
	var opt1txt = "Play Game";
	var opt2txt = "Credits";
	var opt3txt = "Error";
	var selectedopt = 0;
	var optsel = 0;
	var fadeOUTtime = 0;
	var fadeINtime = 0;
	var setfade = 0;
	var lock=0;
	var waitlock=10;
	var waittime=20;

	var slide=0; // <---- set this value to the slide you want to start at. 0 is the main menu at the start of the game. 97 is the very end of scene 2.
	var key=0;

	var score=0;
	var credits=0;
	var creditnames=["Original Script by Johnny Rockwell",
	"Project Development ........... Jake Brown",
	"Art Direction .................. Alex Cass",
	"Software Management ............ Alex Cass",
	"Ass. Software Manager ......... Jake Brown",
	"Music .............................. Haugr","Play Testers:","Gabriela Banaag","Audrey Brown","Cody Brown","Andre Clansy",
	"Shaylee Ford","Julia Maiolo","Joe McDonald","Robert O'Gara","Mike Scholgies","Jennifer Yuan",
	"Johnny,                                                ",
	"Thank you for being such a good friend for these years. We're",
	"both so thankful to a friend with such a wonderful imagination.",
	"We wish you the best in all that you do going forward.",
	"(Please hire us to shoot your movies when you're a big shot!)",
	"Talk to you soon!",
	"                                         -Alex and Jacob"];
	var creditcoords=[800,950,1000,1050,1100,1150,1300,1400,1450,1500,1550,1600,1650,1700,1750,1800,1850,2000,2050,2100,2150,2200,2300,2350];
	var creditcoord1 = 310;
	var creditcoord2 = 365;
	//music included!
	
	//for testing, playsongs=0 for no music, playsongs=1 for music.
	var playsongs = 1;
	var song1 = new Audio("Music/1. Opening Credits.mp3");
	var song2 = new Audio("Music/2. Bar Scene.mp3");
	var song3 = new Audio("Music/3. Peakster.mp3");
	var song4 = new Audio("Music/4. Lockup.mp3");
	var song5 = new Audio("Music/5. Your Incompetence.mp3");
	var song6 = new Audio("Music/6. Bar Scene Revisited.mp3");
	var song7 = new Audio("Music/7. Lev Kills Everyone.mp3");
	var song8 = new Audio("Music/8. The scene where alex gave up directing.mp3");
	var song9 = new Audio("Music/9. Such a Coward.mp3");
	var song10 = new Audio("Music/10. Is shot, forgets about it.mp3");
	var song11 = new Audio("Music/11. Back to Bar.mp3");
	var song12 = new Audio("Music/12. Alarm.mp3");
	var song13 = new Audio("Music/13. Credits.mp3");
	var deborah = new Audio("Music/Deborah.mp3");

    function initialize() {
    canvas = document.getElementById( "canvas" );
		companylogo = document.getElementById("filmfever");
		template = document.getElementById("template");
		bat = document.getElementById("bat");
		bat2 = document.getElementById("bat2");

        if ( canvas && canvas.getContext ) {
            c = canvas.getContext( "2d" );
			console.log("You've opened the Purple Bat Text Adventure Videogame.");

			// Center of screen

			midx = canvas.width/2;
			midy = canvas.height/2;

			openbuttonx=midx-230;
			openbuttony=midy-50;

			window.addEventListener("keydown",keystroke);
			canvas.addEventListener("mouseup", mouseUp);
			canvas.addEventListener("mousedown", mouseDown);
			canvas.addEventListener("mousemove", mouseMove);


			//draw this black background
			c.beginPath();
			c.fillStyle="white";
			c.fillRect(0,0,canvas.width,canvas.height);
			c.closePath();

			window.setInterval("drawScreen()",1000/60);  // call repeatedly

        } // end if
    } // initialize()

	function drawScreen(){																// --- drawscreen ---

	  //increment counters
	  if(start==1)
		  screen++;

	  //code for the intro, menu and tutorial screens

	  //draw backdrop
	  c.beginPath();
	  c.globalAlpha=1;
	  c.fillStyle = "white";
	  c.fillRect(0,0,canvas.width,canvas.height);
	  c.closePath();
	  c.globalAlpha=rememberglobalalpha;

	  //draw starting button
	  if(start==0)
	  {
		  c.beginPath();
		  c.font = "30pt Arial";
		  c.fillStyle = "black";
		  c.strokeStyle="#a331a3"; //purple color
		  c.lineWidth=10;
		  c.textAlign = "center";
		  c.textBaseline = "middle";
		  c.strokeRect(openbuttonx,openbuttony,460,100);
		  c.fillText("Click to Launch Game",midx,midy);
	  }

	  //timing things

	  if(screen<100 && screen>0)
		  intro(screen);

	  if(screen==150)
		  menuscreen=1;

	  if(screen>150 && menuscreen==1){
		  slides(slide);


		  start=2;
	  }

	} //end drawScreen

/**
intro(i)
introduction screen, fades text
in and back out upon programs initialization
**/
function intro(i)																									// --- intro ---
{
	if(i<11)
		c.globalAlpha=i/10;
	if(i==4)
	{
		if(playsongs==1)
		{
			song1.play();
		}
	}
	if(i==89)
		introfade=10;
	if(i>89){
		introfade=introfade-1;
		c.globalAlpha=introfade/10;
	}
	c.beginPath();
	c.font = "Bold Italic 48pt Arial";
	c.fillStyle = "black";
	c.textAlign = "center";
	c.textBaseline = "middle";
	c.fillText("FILM FEVER",midx,midy+240);
	c.font = "Italic 24pt Arial";
	c.fillText("PRESENTS...",midx,midy+280);
	c.save();
	c.scale(0.45,0.41);
	c.drawImage(companylogo, midx, 100);
	c.restore();
	c.closePath();

}

/**
menu()
function to draw the menu and
its buttons. Also draws the
credits if(credits==1)
**/
function menu()																									// --- menu ---
{
	  c.beginPath();
	  c.fillStyle="#6e6e6e"; //grey color
	  c.rect(0,0,canvas.width,canvas.height);
	  c.fill();
	  c.closePath();

	  //draw tool bar
	  c.beginPath();
	  c.fillStyle="black";
	  c.fillRect(0,200,canvas.width,200);
	  c.closePath();

	  c.beginPath();
	  c.fillStyle="black";
	  c.textAlign = "center";
	  c.fillText("(c)2020 JAJ Entertainment Inc.",midx,700);
		c.font = "Bold 22pt Arial";
	  c.closePath();

		c.beginPath();
		c.fillStyle="#a331a3"; //purple color
		c.font = "Bold 70pt Arial";
		c.fillText("THE PURPLE BAT",midx,300);
		c.font = "Bold 20pt Arial";
		c.fillText("A TEXT ADVENTURE GAME",midx,360);
		c.closePath();

	  opt(2);
	  if(optsel==1)
	  {
		  if(selectedopt==0)
		  {
			  waitlock=waittime;
			  slide=2; //go to slide 2
		  }
		  if(selectedopt==1)
		  {
			  waitlock=waittime;
			  slide=1; //go to slide 1
		  }
	  }
}

/**
slides function
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
given current slide number, displays slide.
**/
function slides(n)
{
	  console.log("Slide number: "+slide+" Score: "+score);//+" fadeINtime: "+fadeINtime+" fadeOUTtime: "+fadeOUTtime);
	  c.beginPath();
	  c.fillStyle="black";
	  c.rect(0,0,canvas.width,canvas.height);
	  c.fill();
	  c.closePath();
	  switch(n)
	  {
		default:
		c.beginPath();
	  c.fillStyle="blue";
	  c.rect(0,0,canvas.width,canvas.height);
	  c.fill();
	  c.closePath();
		c.beginPath();
	  c.fillStyle="white";
	  c.textAlign = "center";
	  c.font = "12pt Arial";
	  c.fillText("[End of Slideshow. This slide does not exist, please make one for slide "+slide+".]",midx,(2*midy)/3);
		c.closePath();
		opt();
		break

		case 0: //title screen
		menu();
		break

		case 1: //credits screen
		console.log("CREDITS FADE "+optsel);
		optsel=-1;
		song1.pause();
		song2.pause();
		song3.pause();
		song4.pause();
		song5.pause();
		song6.pause();
		song7.pause();
		song8.pause();
		song9.pause();
		song10.pause();
		song11.pause();
		song12.pause(); //pause everything to avoid problems
		//(i wish there was a more compact way to do that)
		if(playsongs==1)
		{
			song13.play();
		}
		if(optsel==-1)
		{
			fadeINtime=200;
			slide=1.1;
			optsel=400;
		}
		break

		case 1.1:
		c.beginPath();
		c.textAlign = "center";
		c.fillStyle="#a331a3"; //purple color
		c.font = "Bold 70pt Arial";
		c.fillText("THE PURPLE BAT",midx,310);
		c.font = "Bold 20pt Arial";
		c.fillText("A TEXT ADVENTURE GAME",midx,creditcoord2);
		c.closePath();
		transitionIn();
		console.log("bruh. optsel: "+optsel);
		optsel--;
		if(optsel==1)
		{
			slide=1.2;
			optsel=2200;
		}
		break

		case 1.2:
		c.textAlign = "center";
		c.fillStyle="#a331a3"; //purple color
		c.font = "Bold 70pt Arial";
		c.fillText("THE PURPLE BAT",midx,creditcoord1);
		c.font = "Bold 20pt Arial";
		c.fillText("A TEXT ADVENTURE GAME",midx,creditcoord2);
		c.fillStyle="white";
		c.font = "Bold 24pt Courier New";
		for(var i=0;i<creditnames.length;i++)
		{
			c.fillText(creditnames[i],midx,creditcoords[i]);
			creditcoords[i]--;
		}
		creditcoord1--;
		creditcoord2--;
		optsel--;
		console.log("optsel: "+optsel);
		if(optsel==3)
			fadeOUTtime=80;
		if(optsel==1)
		{
			transitionOut(1.3);
		}
		break

		case 1.3:
		console.log("CREDITS OVER! "+optsel);
		opt1 = "Play Game";
		opt2 = "Credits";
		opt3 = "Error";
		opt1txt = "Play Game";
		opt2txt = "Credits";
		opt3txt = "Error";
		creditcoords=[800,950,1000,1050,1100,1150,1300,1400,1450,1500,1550,1600,1650,1700,1750,1800,1850,2000,2050,2100,2150,2200,2300,2350];
		creditcoord1 = 310;
		creditcoord2 = 365;
		selectedopt = 0;
		optsel = 100;
		slide=1.4;
		song13.pause();
		break

		case 1.4:
		song13.pause();
		c.beginPath();
	  c.fillStyle="black";
	  c.rect(0,0,canvas.width,canvas.height);
	  c.fill();
	  c.closePath();
		optsel--;
		console.log("OPTSEL "+optsel);
		if(optsel==0)
		{
			song13.pause();
			deborah.play();
			optsel=100;
			slide=1.5;
		}
		break

		case 1.5:
		c.beginPath();
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Addeline: \"DEBORAH!\"",105,420);
		c.drawImage(image023, 105, 30);
		c.closePath();
		optsel--;
		if(optsel==0)
		{
			waitlock=waittime;
			slide=1.6;
			optsel=150;
		}
		break

		case 1.6:
		c.beginPath();
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Addeline: \"DEBORAH!\"",105,420);
		c.fillText("Addeline: \"MY PHONE'S DISCONNECTED!\"",105,480);
		c.drawImage(image023, 105, 30);
		c.closePath();
		optsel--;
		if(optsel==1)
		{
			waitlock=waittime;
			slide=1.7;
			optsel=100;
		}
		break

		case 1.7:
		c.beginPath();
	  c.fillStyle="black";
	  c.rect(0,0,canvas.width,canvas.height);
	  c.fill();
	  c.closePath();
		optsel--;
		if(optsel==0)
		{
			slide=0;
			if(playsongs==1)
			{
				song1.play();
			}
		}
		break

		case 2:
		console.log("2 "+optsel);
		optsel=-1;
		if(optsel==-1)
		{
			fadeINtime=200;
			slide=2.5;
			optsel=500;
		}
		break

		case 2.5: //begin game!
		c.beginPath();
		c.fillStyle="white";
		c.textAlign = "center";
		c.font = "17pt Arial";
		c.fillText("This is a story-based game that features choices made by the player. The consequences",midx,midy-15);
		c.fillText("of all your in game actions will impact the present and future. Choose wisely...",midx,midy+15);
		c.closePath();
		transitionIn();
		optsel--;
		if(optsel==3)
			fadeOUTtime=80;
		if(optsel==1)
		{
			transitionOut(3.1);
		}
		break

		case 3.1:
		console.log("3 "+optsel);
		optsel=-1;
		if(optsel==-1)
		{
			fadeINtime=80;
			slide=2.6;
			optsel=300;
		}
		break

		case 2.6:
		c.beginPath();
	  c.fillStyle="white";
	  c.textAlign = "center";
	  c.font = "Bold 22pt Arial";
	  c.fillText("Based on the script by Johnny Rockwell",midx,midy);
		c.closePath();
		transitionIn();
		optsel--;
		if(optsel==3)
			fadeOUTtime=80;
		if(optsel==1)
		{
			transitionOut(3);
		}
		break

		case 3:
		console.log("3 "+optsel);
		optsel=-1;
		if(optsel==-1)
		{
			fadeINtime=80;
			slide=3.5;
			optsel=300;
		}
		break

		case 3.5:
		c.beginPath();
	  c.fillStyle="white";
	  c.textAlign = "center";
	  c.font = "Bold 22pt Arial";
	  c.fillText("Directed by Jacob Brown",midx,midy);
		c.closePath();
		transitionIn();
		optsel--;
		//opt(0);
		if(optsel==3)
			fadeOUTtime=80;
		if(optsel==1)
		{
			transitionOut(4);
		}

		break

		case 4:
		console.log("4 "+optsel);
		optsel=-1;
		if(optsel==-1)
		{
			fadeINtime=80;
			slide=4.5;
			optsel=200;
		}
		break

		case 4.5:
		c.beginPath();
	  c.fillStyle="white";
	  c.textAlign = "center";
	  c.font = "Bold 22pt Arial";
	  c.fillText("Programmed by Alex Cass",midx,midy);
		c.closePath();
		transitionIn();
		optsel--;
		//opt(0);
		if(optsel==3)
			fadeOUTtime=80;
		if(optsel==1)
		{
			transitionOut(5);
		}
		break

		case 5:
		console.log("5 "+optsel);
		optsel=-1;
		if(optsel==-1)
		{
			fadeINtime=80;
			slide=5.5;
			optsel=500;
		}
		break

		case 5.5:
		c.beginPath();
	  c.fillStyle="#a331a3"; //purple color
	  c.textAlign = "center";
	  c.font = "Bold 70pt Arial";
	  c.fillText("THE PURPLE BAT",midx,midy-50);
		c.font = "Bold 20pt Arial";
	  c.fillText("A TEXT ADVENTURE GAME",midx,midy+5);
		c.closePath();
		transitionIn();
		//opt(0);
		optsel--;
		if(optsel==3)
			fadeOUTtime=80;
			score=0;
		if(optsel==1)
		{
			transitionOut(6);
		}
		break

		case 6:
		console.log("6 "+optsel);
		optsel=-1;
		if(optsel==-1)
		{
			fadeINtime=80;
			if(playsongs==1)
			{
				song1.pause();
				song2.play();
			}
			slide=6.5;
		}
		break

		case 6.5:
		c.beginPath();
	  c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Bold 18pt Courier New";
	  c.fillText("Guard: \"Leave your implements by the door! And no messes like last time!\"",105,420);
		c.drawImage(image001, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=6.6;
		}
		break

		case 6.6:
		c.beginPath();
	  c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Bold 18pt Courier New";
	  c.fillText("Guard: \"Leave your implements by the door! And no messes like last time!\"",105,420);
		c.drawImage(image001, 105, 30);
		c.closePath();

		opt1="Be Sarcastic.";
		opt2="Be Honest.";
		opt(2);
		if(optsel==1)
		{
			if(selectedopt==0)
			{
				slide=7.1;
			}
			if(selectedopt==1)
			{
				slide=7.2;
				score++;
			}
			selectedopt=0;
		}
		break

		case 7.1:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"I'm not being paid to make your job any harder.\"",105,420);
		c.drawImage(image001, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			slide=7;
		}
		break

		case 7.2:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"I'm just here to get a job.\"",105,420);
		c.drawImage(image001, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			slide=7;
		}
		break



		case 7:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Italic 18pt Courier New";
	  c.fillText("You look around a dreary bar, it's midday, so it's around half full.",105,420);
	  c.fillText("There's your standard drunks at the stools... A shady crowd at a booth",105,450);
		c.fillText("catches your eye. A man in a the corner is eyeing you from across the room.",105,480);
		c.drawImage(image002, 105, 30);
		c.closePath();

		opt1="Go to the bar and get a drink.";
		opt2="Go to the booth.";
		opt(2);
		if(optsel==1)
		{
			if(selectedopt==0)
			{
				slide=8;
			}
			if(selectedopt==1)
			{
				slide=16.5;
				score++;
			}
			selectedopt=0;
		}
		break

		case 8:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Italic 18pt Courier New";
	  c.fillText("You get to the bar. It's pretty full, and there's a man standing between ",105,420);
	  c.fillText("you and the only empty stool. There's a woman serving drinks.",105,450);
		c.drawImage(image003, 105, 30);
		c.closePath();

		opt1="Push the man.";
		opt2="Ask him to move.";
		opt(2);
		if(optsel==1)
		{
			if(selectedopt==0)
			{
				waitlock=waittime;
				slide=9;
			}
			if(selectedopt==1)
			{
				waitlock=waittime;
				slide=10;
				score++;
			}
			selectedopt=0;
		}
		break

		case 9:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Bold 18pt Courier New";
	  c.fillText("Man: \"WATCH IT HOTSHOT!\"",105,420);
		c.font = "Italic 18pt Courier New";
		c.fillText("The man moves out of the way.",105,480);
		c.drawImage(image003, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			slide=11;
		}
		break

		case 10:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Bold 18pt Courier New";
	  c.fillText("\"Excuse me sir.\"",105,420);
		c.font = "Italic 18pt Courier New";
		c.fillText("The man moves out of the way.",105,480);
		c.drawImage(image003, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=11;
		}
		break

		case 11:
		c.fillStyle="white";
	  c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
	  c.fillText("You get to the bar and order.",105,420);
		c.drawImage(image003, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=11.5;
		}
		break

		case 11.5:
		c.fillStyle="white";
	  c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
	  c.fillText("You get to the bar and order.",105,420);
		c.font = "Bold 18pt Courier New";
		c.fillText("\"Hateful Jade, on the rocks!\"",105,480);
		c.drawImage(image003, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=12;
		}
		break

		case 12:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Bold 18pt Courier New";
		c.font = "Italic 18pt Courier New";
	  c.fillText("You get to the bar and order.",105,420);
		c.font = "Bold 18pt Courier New";
		c.fillText("\"Hateful Jade, on the rocks!\"",105,480);
		c.font = "Bold 18pt Courier New";
	  c.fillText("Jezebel: \"There's only one man who can stomach that... Dale, I thought",105,540);
		c.fillText("you'd done enough damage around here for a while. I'm still waiting on",105,570);
		c.fillText("payment for those damages, you know.\"",105,600);
		c.drawImage(image003, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=13;
		}
		break

		case 13:
		c.fillStyle="white";
	  c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
	  c.fillText("You look Jezebel in her eyes.",105,420);
		c.drawImage(image003, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=13.1;
		}
		break

		case 13.1:
		c.fillStyle="white";
	  c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
	  c.fillText("You look Jezebel in her eyes.",105,420);
		c.font = "Bold 18pt Courier New";
		c.fillText("\"About that... Listen Jezebel, I'll tell you what I told everyone else.",105,480);
		c.fillText(" I'm just here to-\"",105,510);
		c.drawImage(image003, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=13.2;
		}
		break

		case 13.2:
		c.fillStyle="white";
	  c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
	  c.fillText("You look Jezebel in her eyes.",105,420);
		c.font = "Bold 18pt Courier New";
		c.fillText("\"About that... Listen Jezebel, I'll tell you what I told everyone else.",105,480);
		c.fillText(" I'm just here to-\"",105,510);
		c.font = "Italic 18pt Courier New";
	  c.fillText("A man grabs your shoulder",105,570);
		c.drawImage(image003, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=13.3;
		}
		break

		case 13.3:
		c.fillStyle="white";
	  c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
	  c.fillText("You look Jezebel in her eyes.",105,420);
		c.font = "Bold 18pt Courier New";
		c.fillText("\"About that... Listen Jezebel, I'll tell you what I told everyone else.",105,480);
		c.fillText(" I'm just here to-\"",105,510);
		c.font = "Italic 18pt Courier New";
	  c.fillText("A man grabs your shoulder",105,570);
		c.font = "Bold 18pt Courier New";
		c.fillText("Gaius: \"See me, fair lady.\"",105,630);
		c.drawImage(image003, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=15;
		}
		break

		case 15:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Bold 18pt Courier New";
	  c.fillText("Jezebel: \"Make sure not to let him off the leash, for my sake.\"",105,420);
		c.drawImage(image003, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=15.1;
		}
		break

		case 15.1:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Bold 18pt Courier New";
	  c.fillText("Jezebel: \"Make sure not to let him off the leash, for my sake.\"",105,420);
		c.fillText("Gaius: \"Of course. Now if you'll excuse us.\"",105,480);
		c.drawImage(image003, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=16;
		}
		break

		case 16:
		c.fillStyle="white";
	  c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
	  c.fillText("Jezebel: \"Make sure not to let him off the leash, for my sake.\"",105,420);
		c.fillText("Gaius: \"Of course. Now if you'll excuse us.\"",105,480);
	  c.font = "Italic 18pt Courier New";
	  c.fillText("Gaius slips a bill over the bar, paying for your drink. He motions for you",105,540);
		c.fillText("to follow him.",105,570);
		c.drawImage(image003, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=16.5;
		}
		break

		case 16.5:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Italic 18pt Courier New";
	  c.fillText("Heading over to the booth, you swipe a drink out of someones hand. The man",105,420);
		c.fillText("in the corner is obviously paying very close attention to you.",105,450);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=17;
		}
		break

		case 17:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Italic 18pt Courier New";
		c.fillText("Heading over to the booth, you swipe a drink out of someones hand. The man",105,420);
		c.fillText("in the corner is obviously paying very close attention to you.",105,450);
	  c.fillText("You approach the booth with caution. You can't make out if anyone at the",105,510);
		c.fillText("crowded booth is armed. You take a spot at the only open seat. Around you ",105,540);
		c.fillText("sits Gaius and a number of what you can only asssume to be his goons.",105,570);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=18;
		}
		break

		case 18:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Bold 18pt Courier New";
	  c.fillText("Gaius: \"Please sit.\"",105,420);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=18.1;
		}
		break

		case 18.1:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Bold 18pt Courier New";
	  c.fillText("Gaius: \"Please sit.\"",105,420);
		c.font = "Italic 18pt Courier New";
		c.fillText("You sit uneasily",105,480);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=19;
		}
		break

		case 19:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Bold 18pt Courier New";
	  c.fillText("Gaius: \"Now to business. My employer has been looking for an... ",105,420);
		c.fillText("informant. And having listened to the right people, in the right places,",105,450);
		c.fillText("I've heard that you're the man to contract. Is this true?\"",105,480);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=20;
		}
		break

		case 20:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Bold 18pt Courier New";
		c.fillText("Gaius: \"Now to business. My employer has been looking for an... ",105,420);
		c.fillText("informant. And having listened to the right people, in the right places,",105,450);
		c.fillText("I've heard that you're the man to contract. Is this true?\"",105,480);
	  c.fillText("\"It depends upon the offer.\"",105,540);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=21;
		}
		break

		case 21:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Bold 18pt Courier New";
		c.fillText("Gaius: \"Now to business. My employer has been looking for an... ",105,420);
		c.fillText("informant. And having listened to the right people, in the right places,",105,450);
		c.fillText("I've heard that you're the man to contract. Is this true?\"",105,480);
	  c.fillText("\"It depends upon the offer.\"",105,540);
	  c.fillText("Gaius: \"I believe this offer may be worth your time. 20,000 speks at the",105,600);
		c.fillText("time of delivery.\"",105,630);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=22;
		}
		break

		case 22:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Bold 18pt Courier New";
	  c.fillText("\"Delivery. There's the issue. Deliveries... always go sideways. And I know",105,420);
		c.fillText("that a middleman like you, sitting at your desk drinking your bathtub gin,",105,450);
		c.fillText("will never be part of such a delivery. But I assure you, it's no beauty.\"",105,480);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=23;
		}
		break

		case 23:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Bold 18pt Courier New";
		c.fillText("\"Delivery. There's the issue. Deliveries... always go sideways. And I know",105,420);
		c.fillText("that a middleman like you, sitting at your desk drinking your bathtub gin,",105,450);
		c.fillText("will never be part of such a delivery. But I assure you, it's no beauty.\"",105,480);
	  c.fillText("Gaius: \"I quite well understand the risks, and I admit I have never been",105,540);
		c.fillText("involved in such an assignment, but we are willing to supply you with",105,570);
		c.fillText("everything you need to succeed.\"",105,600);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=24;
		}
		break

		case 24:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Italic 18pt Courier New";
	  c.fillText("You stand up suddenly, a few at the table jump, and in the corner of your",105,420);
		c.fillText("eye you see a goon place a hand on his hip. Reaching for a gun,",105,450);
		c.fillText("before realizing there's no threat.",105,480);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=24.1;
		}
		break

		case 24.1:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Italic 18pt Courier New";
	  c.fillText("You stand up suddenly, a few at the table jump, and in the corner of your",105,420);
		c.fillText("eye you see a goon place a hand on his hip. Reaching for a gun,",105,450);
		c.fillText("before realizing there's no threat.",105,480);
		c.font = "Bold 18pt Courier New";
		c.fillText("\"I'd love to help, really, but I don't get mixed up in business like that",105,540);
		c.fillText("anymore. Let me know if you need me to run some narus sometime. Thanks for",105,570);
		c.fillText("the drink.\"",105,600);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=25;
		}
		break

			case 25:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Italic 18pt Courier New";
	  c.fillText("You head back to the bar to finish your drink. A few precious seconds go",105,420);
		c.fillText("by before you're interrupted again. This time it's by the man who stood in",105,450);
		c.fillText("the corner. He's wrappped his arm around you.",105,480);
		c.drawImage(image003, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=25.1;
		}
		break


		case 25.1:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("You head back to the bar to finish your drink. A few precious seconds go",105,420);
		c.fillText("by before you're interrupted again. This time it's by the man who stood in",105,450);
		c.fillText("the corner. He's wrappped his arm around you.",105,480);
		c.font = "Bold 18pt Courier New";
	  c.fillText("Lev: \"Get over there pal.\"",105,540);
		c.drawImage(image003, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=25.2;
		}
		break

		case 25.2:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("You head back to the bar to finish your drink. A few precious seconds go",105,420);
		c.fillText("by before you're interrupted again. This time it's by the man who stood in",105,450);
		c.fillText("the corner. He's wrappped his arm around you.",105,480);
		c.font = "Bold 18pt Courier New";
	  c.fillText("Lev: \"Get over there pal.\"",105,540);
		c.font = "Italic 18pt Courier New";
		c.fillText("He throws himself down into the stool next to you.",105,600);
		c.drawImage(image003, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=26;
		}
		break

			case 26:
		c.fillStyle="white";
	  c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
	  c.fillText("Lev: \"20,000 speks is no chump change, and with that butterball, a higher",105,420);
		c.fillText("rate is highly likely.\"",105,450);
		c.drawImage(image003, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=26.1;
		}
		break

		case 26.1:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
	  c.fillText("Lev: \"20,000 speks is no chump change, and with that butterball, a higher",105,420);
		c.fillText("rate is highly likely.\"",105,450);
		c.fillText("\"If it's such a good gig, you take it then.\"",105,510);
		c.drawImage(image003, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=27;
		}
		break

		case 27:
		c.fillStyle="white";
	  c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
	  c.fillText("Lev: \"20,000 speks is no chump change, and with that butterball, a higher",105,420);
		c.fillText("rate is highly likely.\"",105,450);
		c.fillText("\"If it's such a good gig, you take it then.\"",105,510);
		c.fillText("Lev: \"That's... not how I operate pal.\"",105,570);
		c.drawImage(image003, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=30;
		}
		break

		case 30:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Italic 18pt Courier New";
		c.fillText("Gaius is quickly heading towards the door. You run after him. The guard",105,420);
		c.fillText("sees this and points you out to him. He turns around.",105,450);
		c.drawImage(image002, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=31;
		}
		break

		case 31:
		c.fillStyle="white";
	  c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Gaius is quickly heading towards the door. You run after him. The guard",105,420);
		c.fillText("sees this and points you out to him. He turns around.",105,450);
	  c.font = "Bold 18pt Courier New";
	  c.fillText("Gaius: \"I see you're rethinking our offer.\"",105,510);
		c.drawImage(image002, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			slide=31.1;
		}
		break

		case 31.1:
		c.fillStyle="white";
	  c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Gaius is quickly heading towards the door. You run after him. The guard",105,420);
		c.fillText("sees this and points you out to him. He turns around.",105,450);
	  c.font = "Bold 18pt Courier New";
	  c.fillText("Gaius: \"I see you're rethinking our offer.\"",105,510);
		c.font = "Italic 18pt Courier New";
		c.fillText("You both sit back down in the booth, including his goons.",105,570);
		c.drawImage(image002, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			slide=32;
		}
		break

		case 32:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Bold 18pt Courier New";
		c.fillText("Gaius: \"Now down to business.\"",105,420);
		c.drawImage(image004, 105, 30);
		c.closePath();
		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=32.1;
		}
		break

		case 32.1:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Bold 18pt Courier New";
		c.fillText("Gaius: \"Now down to business.\"",105,420);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt1="Take 20,000.";
		opt2="Push for 35,000.";
		opt(2);
		if(optsel==1)
		{
			if(selectedopt==0)
			{
				waitlock=waittime;
				slide=49;
				score++;
			}
			if(selectedopt==1)
			{
				waitlock=waittime;
				slide=33;
			}
			selectedopt=0;
		}
		break

		case 33:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Bold 18pt Courier New";
	  c.fillText("\"35,000 is the lowest I'll go.\"",105,420);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=34;
		}
		break

		case 34:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Bold 18pt Courier New";
		c.fillText("\"35,000 is the lowest I'll go.\"",105,420);
	  c.fillText("Gaius: \"Slow down, hair trigger. We haven't even gotten to who the target",105,480);
		c.fillText("is yet.\"",105,510);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=35;
		}
		break

		case 35:
		c.fillStyle="white";
	  c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"35,000 is the lowest I'll go.\"",105,420);
	  c.fillText("Gaius: \"Slow down, hair trigger. We haven't even gotten to who the target",105,480);
		c.fillText("is yet.\"",105,510);
	  c.font = "Bold 18pt Courier New";
	  c.fillText("\"Just because I chose this line of work, that doesn't make me an idiot!\"",105,570);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=35.1;
		}
		break

		case 35.1:
		c.fillStyle="white";
	  c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"35,000 is the lowest I'll go.\"",105,420);
	  c.fillText("Gaius: \"Slow down, hair trigger. We haven't even gotten to who the target",105,480);
		c.fillText("is yet.\"",105,510);
	  c.font = "Bold 18pt Courier New";
	  c.fillText("\"Just because I chose this line of work, that doesn't make me an idiot!\"",105,570);
		c.font = "Italic 18pt Courier New";
		c.fillText("You see some of the goons lower their hands to their weapons. ",105,630);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=36;
		}
		break

		case 36:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Bold 18pt Courier New";
	  c.fillText("\"Your boss, whoever they are, wants the smuggler info I had, don't they?\"",105,420);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=37;
		}
		break

		case 37:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Bold 18pt Courier New";
		c.fillText("\"Your boss, whoever they are, wants the smuggler info I had, don't they?\"",105,420);
	  c.fillText("Gaius: \"Well, yes he-\"",105,480);
		c.font = "Italic 18pt Courier New";
		c.fillText("Gaius pounds the table.",105,540);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=37.1;
		}
		break

		case 37.1:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Bold 18pt Courier New";
		c.fillText("\"Your boss, whoever they are, wants the smuggler info I had, don't they?\"",105,420);
	  c.fillText("Gaius: \"Well, yes he-\"",105,480);
		c.font = "Italic 18pt Courier New";
		c.fillText("Gaius pounds the table.",105,540);
		c.font = "Bold 18pt Courier New";
		c.fillText("Gaius: \"THEY do!\"",105,600);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=38;
		}
		break

		case 38:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Bold 18pt Courier New";
	  c.fillText("\"Great! Then I'm sure he won't mind paying me a fair rate.\"",105,420);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=39;
		}
		break

		case 39:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Bold 18pt Courier New";
		c.fillText("\"Great! Then I'm sure he won't mind paying me a fair rate.\"",105,420);
	  c.fillText("Gaius: \"20,000 is more than fair! It's highway robbery for your kind of",105,480);
		c.fillText("work!\"",105,510);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=40;
		}
		break

		case 40:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Bold 18pt Courier New";
		c.fillText("\"Great! Then I'm sure he won't mind paying me a fair rate.\"",105,420);
	  c.fillText("Gaius: \"20,000 is more than fair! It's highway robbery for your kind of",105,480);
		c.fillText("work!\"",105,510);
	  c.fillText("\"If you want this done for 20,000 then find some rosey cheeked kid to get",105,570);
		c.fillText("themselves caught and killed, but not before blubbering all about the",105,600);
		c.fillText("ingrates who hired him. 35,000 or I walk!\"",105,630);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			slide=40.5;
		}
		break

		case 40.5:
		c.fillStyle="white";
	  c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Gaius gives a sly hand signal and his goons pull out their guns and point ",105,420);
		c.fillText("them staight at you!",105,450);
		c.drawImage(image005, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			slide=41;
		}
		break

		case 41:
		c.fillStyle="white";
	  c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Gaius gives a sly hand signal and his goons pull out their guns and point ",105,420);
		c.fillText("them staight at you!",105,450);
		c.drawImage(image005, 105, 30);
		c.closePath();

		opt1="Accept 20,000.";
		opt2="Keep Pushing";
		opt(2);
		if(optsel==1)
		{
			if(selectedopt==0)
			{
				waitlock=waittime;
				slide=49;
				score++;
			}
			if(selectedopt==1)
			{
				waitlock=waittime;
				slide=42;
			}
			selectedopt=0;
		}
		break

		case 42:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Bold 18pt Courier New";
	  c.fillText("\"Tell your friends to back off, or they'll find out why I owe Jezebel over ",105,420);
		c.fillText("there so much money.\"",105,450);
		c.drawImage(image010, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=43;
		}
		break

		case 43:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Bold 18pt Courier New";
		c.fillText("\"Tell your friends to back off, or they'll find out why I owe Jezebel over ",105,420);
		c.fillText("there so much money.\"",105,450);
	  c.fillText("Gaius: \"A little drinking tab?\"",105,510);
		c.drawImage(image005, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=44;
		}
		break

		case 44:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Bold 18pt Courier New";
	  c.fillText("\"No. See what actutally happened was some bastards tried to stiff me on ",105,420);
		c.fillText("my last job, so I blew a couple holes in a few choice areas, and... made ",105,450);
		c.fillText("quite the mess.\"",105,480);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=44.1;
		}
		break

		case 44.1:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Bold 18pt Courier New";
	  c.fillText("\"No. See what actutally happened was some bastards tried to stiff me on ",105,420);
		c.fillText("my last job, so I blew a couple holes in a few choice areas, and... made ",105,450);
		c.fillText("quite the mess.\"",105,480);
		c.font = "Italic 18pt Courier New";
		c.fillText("Gaius is silent and visibly uncomfortable.",105,540);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=45;
		}
		break

		case 45:
		c.fillStyle="white";
	  c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
	  c.fillText("\"No. See what actutally happened was some bastards tried to stiff me on ",105,420);
		c.fillText("my last job, so I blew a couple holes in a few choice areas, and... made ",105,450);
		c.fillText("quite the mess.\"",105,480);
		c.font = "Italic 18pt Courier New";
		c.fillText("Gaius is silent and visibly uncomfortable.",105,540);
	  c.font = "Bold 18pt Courier New";
	  c.fillText("\"So... 35,000?\"",105,600);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=46;
		}
		break

		case 46:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Bold 18pt Courier New";
	  c.fillText("Gaius: \"I think that could be arranged...\"",105,420);

		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=48;
		}
		break

		case 48:
		c.fillStyle="white";
    c.textAlign = "left";
    c.font = "Bold 18pt Courier New";
		c.fillText("Gaius: \"I think that could be arranged...\"",105,420);
    c.fillText("\"Fantastic! I'm so glad we could see eye to eye on this.\"",105,480);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
		waitlock=waittime;
		slide=51;
		}
		break

		case 49:
		c.fillStyle="white";
    c.textAlign = "left";
    c.font = "Bold 18pt Courier New";
    c.fillText("\"20,000 works for me.\"",105,420);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=50;
		}
		break

		case 50:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"20,000 works for me.\"",105,420);
		c.fillText("Gaius: \"Excellent! I'm so glad we could come to an arrangement!\"",105,480);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=51;
		}
		break

		case 51:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"So... What are the details?\"",105,420);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=52;
		}
		break

		case 52:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"So... What are the details?\"",105,420);
		c.fillText("Gaius: \"Well, my employer wants information concerning the syndicate's",105,480);
		c.fillText("supply shipments. From the information we've gathered it seems to be in a",105,510);
		c.fillText("particular lockup.\"",105,540);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=53;
		}
		break

		case 53:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"That's real helpful buddy!\"",105,420);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=54;
		}
		break

		case 54:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"That's real helpful buddy!\"",105,420);
		c.fillText("Gaius: \"As you said, I'm unfamiliar with this side of our industry.",105,480);
		c.fillText("However, my boss-\"",105,510);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=55;
		}
		break

		case 55:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"That's real helpful buddy!\"",105,420);
		c.fillText("Gaius: \"As you said, I'm unfamiliar with this side of our industry.",105,480);
		c.fillText("However, my boss-\"",105,510);
		c.fillText("\"Marvin Scintelly. Right?\"",105,570);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=56;
		}
		break

		case 56:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Gaius: \"Yes... he's sent along some things you'd find beneficial.\"",105,420);
		c.drawImage(image006, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=57;
		}
		break

		case 57:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Gaius: \"Yes... he's sent along some things you'd find beneficial.\"",105,420);
		c.font = "Italic 18pt Courier New";
		c.fillText("Gaius produces a small breifcase, he places it on the table and opens it",105,480);
		c.fillText("towards you. Inside is a revolver and a burner phone. After inspecting the",105,510);
		c.fillText("revolver, you come to find there are only six rounds inside.",105,540);
		c.drawImage(image006, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=58;
		}
		break

		case 58:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"Six rounds?!\"",105,420);
		c.drawImage(image006, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=59;
		}
		break

		case 59:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"Six rounds?!\"",105,420);
		c.fillText("Gaius: \"Unfortunately, that's all we could provide.\"",105,480);
		c.drawImage(image006, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=60;
		}
		break

		case 60:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"Six rounds?!\"",105,420);
		c.fillText("Gaius: \"Unfortunately, that's all we could provide.\"",105,480);
		c.fillText("\"That's bullshit and you know it! How am I supposed to clear a lockup",105,540);
		c.fillText("with six rounds?\"",105,570);
		c.drawImage(image006, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=62.1;
		}
		break

		case 62.1:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Bold 18pt Courier New";
	  c.fillText("Gaius: \"That's not my concern now is it?\"",105,420);
		c.drawImage(image006, 105, 30);
		c.closePath();
		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=62;
		}
		break

		case 62:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Bold 18pt Courier New";
	  c.fillText("Gaius: \"That's not my concern now is it?\"",105,420);
		c.drawImage(image006, 105, 30);
		c.closePath();
		opt1="Leave it be.";
		opt2="Retaliate.";
		opt(2);
		if(optsel==1)
		{
			if(selectedopt==0)
			{
				waitlock=waittime;
				slide=63;
				score++;
			}
			if(selectedopt==1)
			{
				waitlock=waittime;
				slide=66;
			}
			selectedopt=0;
		}
		break
		
		case 63:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"Fine then. I'll see you at the delivery.\"",105,420);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=64;
		}
		break

		case 64:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"Fine then. I'll see you at the delivery.\"",105,420);
		c.fillText("Gaius: \"Looking forward to it.\"",105,480);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=69;
		}
		break

		case 65:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"Fine then. I'll see you at the delivery.\"",105,420);
		c.fillText("Gaius: \"Looking forward to it.\"",105,480);
		c.font = "Italic 18pt Courier New";
		c.fillText("Gaius and his goons clear out of the bar.",105,540);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=70;
		}
		break

		case 66:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"Then nor is this, is it?\"",105,420);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=67;
		}
		break

		case 67:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"Then nor is this, is it?\"",105,420);
		c.font = "Italic 18pt Courier New";
		c.fillText("You pick up your drink and pour the rest of it into his lap. Gaius jumps",105,480);
		c.fillText("back in disgust.",105,510);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=68;
		}
		break

		case 68:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"Then nor is this, is it?\"",105,420);
		c.font = "Italic 18pt Courier New";
		c.fillText("You pick up your drink and pour the rest of it into his lap. Gaius jumps",105,480);
		c.fillText("back in disgust.",105,510);
		c.font = "Bold 18pt Courier New";
		c.fillText("Gaius: \"Come on boys! It's been a pleasure! And Dale? I hope I see you at",105,570);
		c.fillText("the delivery.\"",105,600);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=69;
		}
		break

		case 69:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Gaius and his goons clear out of the bar.",105,420);
		c.drawImage(image004, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==3)
		{
			fadeOUTtime=80;
		}
		if(optsel==1)
		{
			transitionOut(69.5);
		}
		break

		case 69.5:
		if(optsel==-1)
		{
			fadeINtime=80;
			if(playsongs==1)
			{
				song2.pause();
				song3.play();
			}
			slide=70;
		}
		break

		case 70:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Once you leave the bar, you decide that six rounds is nowhere near what ",105,420);
		c.fillText("you need in order to clear the entire high secutiry lockup, complete with ",105,450);
		c.fillText("all manor of guards, goons, and grunts. You decide to stop by and old",105,480);
		c.fillText("friend for help.",105,510);
		c.drawImage(image007, 105, 30);
		c.closePath();

		transitionIn();
		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=71;
		}
		break

		case 71:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Once you leave the bar, you decide that six rounds is nowhere near what ",105,420);
		c.fillText("you need in order to clear the entire high secutiry lockup, complete with ",105,450);
		c.fillText("all manor of guards, goons, and grunts. You decide to stop by and old",105,480);
		c.fillText("friend for help.",105,510);
		c.font = "Italic 18pt Courier New";
		c.fillText("\"I never thought I'd wind up here again.\" You think, approaching one of ",105,570);
		c.fillText("the most decrepit apartments you've ever seen. You knock on the door. It ",105,600);
		c.fillText("swings open violently, twin barrels of a shotgun are pointed right at your",105,630);
		c.fillText("head!",105,660);
		c.drawImage(image007, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=72;
		}
		break

		case 72:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"THAT'LL BE THE LAST TIME YOU- Dale? I thought Vitate had you?\"",105,420);
		c.drawImage(image007, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=73;
		}
		break

		case 73:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"THAT'LL BE THE LAST TIME YOU- Dale? I thought Vitate had you?\"",105,420);
		c.fillText("\"I managed to get out of his slimey grasp.\"",105,480);
		c.drawImage(image007, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=74;
		}
		break

		case 74:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"THAT'LL BE THE LAST TIME YOU- Dale? I thought Vitate had you?\"",105,420);
		c.fillText("\"I managed to get out of his slimey grasp.\"",105,480);
		c.fillText("Irwin: \"Well... That makes you one of the lucky ones. Come on in.\"",105,540);
		c.drawImage(image007, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=75;
		}
		break

		case 75:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("You enter his apartment. It's not that bad from the inside. A standard",105,420);
		c.fillText("apartment for an ex-criminal living on the margins of society, you'd say.",105,450,);
		c.fillText("He takes a seat in the kitchen and motions for you to do so as well.",105,480,);
		c.drawImage(image008, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=76;
		}
		break

		case 76:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Can I get you anything?\"",105,420);
		c.drawImage(image008, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			slide=77;
		}
		break

		case 77:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Bold 18pt Courier New";
	  c.fillText("Irwin: \"Can I get you anything?\"",105,420);
		c.drawImage(image008, 105, 30);
		c.closePath();
		opt1="Wait to tell him.";
		opt2="Guns.";
		opt(2);
		if(optsel==1)
		{
			if(selectedopt==0)
			{
				waitlock=waittime;
				slide=78;
			}
			if(selectedopt==1)
			{
				waitlock=waittime;
				slide=89;
			}
			selectedopt=0;
		}
		break

		case 78:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"No, I'm quite fine.\"",105,420);
		c.drawImage(image008, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=79;
		}
		break

		case 79:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"No, I'm quite fine.\"",105,420);
		c.fillText("\"So you got out?\"",105,480);
		c.drawImage(image008, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=80;
		}
		break

		case 80:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"No, I'm quite fine.\"",105,420);
		c.fillText("\"So you got out?\"",105,480);
		c.fillText("Irwin: \"Of course I did. You would too after what they did to us.\"",105,540);
		c.drawImage(image008, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=81;
		}
		break

		case 81:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"You always said you were the only one.\"",105,420);
		c.drawImage(image008, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=82;
		}
		break

		case 82:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"You always said you were the only one.\"",105,420);
		c.fillText("Irwin: \"The only one who got out. There were twelve of us.\"",105,480);
		c.drawImage(image008, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=83;
		}
		break

		case 83:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"You always said you were the only one.\"",105,420);
		c.fillText("Irwin: \"The only one who got out. There were twelve of us.\"",105,480);
		c.fillText("\"So many.\"",105,540);
		c.drawImage(image008, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=84;
		}
		break

		case 84:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"You always said you were the only one.\"",105,420);
		c.fillText("Irwin: \"The only one who got out. There were twelve of us.\"",105,480);
		c.fillText("\"So many.\"",105,540);
		c.fillText("Irwin: \"Vitate, though he was one of us, was a cunning bastard.\"",105,600);
		c.drawImage(image008, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=85;
		}
		break

		case 85:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"Is it true what they say?\"",105,420);
		c.drawImage(image008, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=86;
		}
		break

		case 86:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"Is it true what they say?\"",105,420);
		c.fillText("Irwin: \"It's not really something I want to reminisce about.\"",105,480);
		c.drawImage(image008, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=87;
		}
		break

		case 87:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"Is it true what they say?\"",105,420);
		c.fillText("Irwin: \"It's not really something I want to reminisce about.\"",105,480);
		c.font = "Italic 18pt Courier New";
		c.fillText("He stops for a moment, remembering the nature of this conversation.",105,540);
		c.drawImage(image008, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=88;
		}
		break

		case 88:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"Is it true what they say?\"",105,420);
		c.fillText("Irwin: \"It's not really something I want to reminisce about.\"",105,480);
		c.font = "Italic 18pt Courier New";
		c.fillText("He stops for a moment, remembering the nature of this conversation.",105,540);
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"What are you here for? Why did you come?\"",105,610);
		c.drawImage(image008, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=89;
		}
		break

		case 89:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"I need equipment.\"",105,420);
		c.drawImage(image008, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=90;
		}
		break

		case 90:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"I need equipment.\"",105,420);
		c.font = "Italic 18pt Courier New";
		c.fillText("Irwin looks dissapointed.",105,480);
		c.drawImage(image008, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=91;
		}
		break

		case 91:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"I need equipment.\"",105,420);
		c.font = "Italic 18pt Courier New";
		c.fillText("Irwin looks dissapointed.",105,480);
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"If you really need it, head downstairs. You know where it's at.",105,540);
		c.fillText("Close the door on your way out.\"",105,570);
		c.drawImage(image008, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=92;
		}
		break

		case 92:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Downstairs you find a small and inconspicuous basket. You remove the cover ",105,420);
		c.fillText("to find various weaponry. A pistol catches your eye. Upon cocking it, it ",105,450);
		c.fillText("snaps back and forth with a satisfying *click*",105,480);
		c.drawImage(image009, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=93;
		}
		break

		case 93:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Downstairs you find a small and inconspicuous basket. You remove the cover ",105,420);
		c.fillText("to find various weaponry. A pistol catches your eye. Upon cocking it, it ",105,450);
		c.fillText("snaps back and forth with a satisfying *click*",105,480);
		c.fillText("You head back upstairs, Irwin stands in his kitchenette by the door.",105,540);
		c.drawImage(image009, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=94;
		}
		break

		case 94:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Did you find what you need?\"",105,420);
		c.drawImage(image008, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=94.1;
		}
		break

		case 94.1:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Did you find what you need?\"",105,420);
		c.font = "Italic 18pt Courier New";
		c.fillText("You nod.",105,480);
		c.drawImage(image008, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=95;
		}
		break

		case 95:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Did you find what you need?\"",105,420);
		c.font = "Italic 18pt Courier New";
		c.fillText("You nod.",105,480);
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Good. Happy hunting.\"",105,540);
		c.drawImage(image008, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=96;
		}
		break

		case 96:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("You head for the door, Irwin lays a hand on your shoulder.",105,420);
		c.drawImage(image008, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=97;
		}
		break

		case 97:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Dale?\"",105,420);
		c.drawImage(image008, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=98;
		}
		break

		case 98:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"Yes?\"",105,420);
		c.drawImage(image008, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=99;
		}
		break

		case 99:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("He squeezes your shoulder.",105,420);
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Be careful pal.\"",105,480);
		c.drawImage(image008, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==1)
		{
			waitlock=waittime;
			slide=100;
		}
		break

		case 100:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		                                                                   v
		c.fillText("You leave without saying another word. You close the door gently.",105,420);
		c.fillText("It's time to go to work.",105,450);
		c.drawImage(image007, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==3)
			fadeOUTtime=80;
		if(optsel==1)
		{
			transitionOut(100.5);
		}
		break

		case 100.5:
		console.log("5 "+optsel);
		optsel=-1;
		if(optsel==-1)
		{
			fadeINtime=80;
			slide=101;
			if(playsongs==1)
			{
				song3.pause();
				song4.play();
			}
		}
		break

		case 101:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("You approach the lockup. Other than security cameras and a single guard at",105,420);
		c.fillText("the door, it's open. How should you get past the guard?",105,450);
		c.drawImage(image013, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=102;
		}
		break

		case 102:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Italic 18pt Courier New";
		c.fillText("You approach the lockup. Other than security cameras and a single guard at",105,420);
		c.fillText("the door, it's open. How should you get past the guard?",105,450);
		c.drawImage(image013, 105, 30);
		c.closePath();
		opt1="Wave hello.";
		opt2="Nod.";
		opt(2);
		if(optsel==1)
		{
			if(selectedopt==0)
			{
				waitlock=waittime;
				slide=103;
			}
			if(selectedopt==1)
			{
				waitlock=waittime;
				slide=109;
			}
			selectedopt=0;
		}
		break

		case 103:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("You wave awkwardly. His eyes narrow in on you. He stops you up before you",105,420);
		c.fillText("get inside.",105,450);
		c.drawImage(image013, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=104;
		}
		break

		case 104:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("You wave awkwardly. His eyes narrow in on you. He stops you up before you",105,420);
		c.fillText("get inside.",105,450);
		c.font = "Bold 18pt Courier New";
		c.fillText("Guard: \"You got a badge to get in here?\"",105,510);
		c.drawImage(image013, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=105;
		}
		break

		case 105:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("You don't. Instinctively, you reach for your gun. Upon pulling it out, you",105,420);
		c.fillText("bitterly realize that the guard is one step ahead of you. Before you can",105,450);
		c.fillText("say a word. He shoots you in the head.",105,480);
		c.drawImage(image013, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=106;
		}
		break

		case 106:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Game Over.",105,420);
		c.closePath();

		opt(0);
		if(optsel==3)
			fadeOUTtime=80;
		if(optsel==1)
		{
			transitionOut(106.5);
		}
		break

		case 106.5:
		console.log("5 "+optsel);
		optsel=-1;
		if(optsel==-1)
		{
			fadeINtime=80;
			slide=107;
		}
		break

		case 107:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("How do you proceed?",105,420);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=108;
		}
		break

		case 108:
		c.fillStyle="white";
	  c.textAlign = "left";
	  c.font = "Italic 18pt Courier New";
		c.fillText("How do you proceed?",105,420);
		c.closePath();
		opt1="Go back.";
		opt2="Proceed to credits.";
		opt(2);
		if(optsel==1)
		{
			if(selectedopt==0)
			{
				waitlock=waittime;
				slide=101;
			}
			if(selectedopt==1)
			{
				waitlock=waittime;
				slide=1;
			}
			selectedopt=0;
		}
		break

		case 109:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("You nod cooly to the guard. Without suspicion, he let's you by.",105,420);
		c.drawImage(image013, 105, 30);
		c.closePath();

		opt(0);
		if(optsel==3)
			fadeOUTtime=80;
		if(optsel==1)
		{
			transitionOut(109.5);
		}
		break

		case 109.5:
		console.log("5 "+optsel);
		optsel=-1;
		if(optsel==-1)
		{
			fadeINtime=80;
			slide=110;
		}
		break

		case 110:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Inside, you creep through the halls. You\'re suprised you've gotten this",105,420);
		c.fillText("far. There's almost no one inside. You hear occasional footsteps upstairs",105,450);
		c.fillText("but think nothing of it.",105,480);
		c.drawImage(image014, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=111;
		}
		break

		case 111:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("You reach a flight of stairs, heading down it you come face to face with",105,420);
		c.fillText("another guard. He stands in front of the door.",105,450);
		c.drawImage(image014, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=112;
		}
		break

		case 112:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("You reach a flight of stairs, heading down it you come face to face with",105,420);
		c.fillText("another guard. He stands in front of the door.",105,450);
		c.font = "Bold 18pt Courier New";
		c.fillText("Guard: \"Sir, you aren’t allowed in unless you have an access card.\"",105,510);
		c.drawImage(image014, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=113;
		}
		break

		case 113:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"My apologies, I think it’s right-\"",105,420);
		c.drawImage(image014, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=114;
		}
		break

		case 114:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("You reach into your pocket. Instead of producing an access card, you",105,420);
		c.fillText("produce the pistol and shoot the guard in the chest. He falls dead in the",105,450);
		c.fillText("doorway.",105,480);
		c.drawImage(image014, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=115;
		}
		break

		case 115:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("You reach into your pocket. Instead of producing an access card, you",105,420);
		c.fillText("produce the pistol and shoot the guard in the chest. He falls dead in the",105,450);
		c.fillText("doorway.",105,480);
		c.font = "Bold 18pt Courier New";
		c.fillText("\"New guys...Let’s see here.\"",105,540);
		c.drawImage(image014, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=116;
		}
		break

		case 116:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Inside one of the guard's pockets is a passkey. To be safe, it would be",105,420);
		c.fillText("best to hide his body and take his jacket. Just so you don't stand out",105,450);
		c.fillText("like a sore thumb much longer.",105,480);
		c.drawImage(image014, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=117;
		}
		break

		case 117:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Inside one of the guard's pockets is a passkey. To be safe, it would be",105,420);
		c.fillText("best to hide his body and take his jacket. Just so you don't stand out",105,450);
		c.fillText("like a sore thumb much longer.",105,480);
		c.fillText("After stowing the body in a nearby broom closet, you continue the search.",105,540);
		c.drawImage(image014, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=118;
		}
		break

		case 118:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Down one of the halls is another guard, but he hasn't seen you yet. How",105,420);
		c.fillText("should you get past him?",105,450);
		c.drawImage(image014, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=119;
		}
		break

		case 119:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Down one of the halls is another guard, but he hasn't seen you yet. How",105,420);
		c.fillText("should you get past him?",105,450);
		c.drawImage(image014, 105, 30);
		c.closePath();
		opt1="Walk past naturally.";
		opt2="Off him.";
		opt(2);
		if(optsel==1)
		{
			if(selectedopt==0)
			{
				waitlock=waittime;
				slide=120;
				score++;
			}
			if(selectedopt==1)
			{
				waitlock=waittime;
				slide=130;
			}
			selectedopt=0;
		}
		break

		case 120:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Suprisingly, the guard hardly notices you and you slip by without a",105,420);
		c.fillText("problem.",105,450);
		c.drawImage(image014, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=121;
		}
		break

		case 121:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Suprisingly, the guard hardly notices you and you slip by without a",105,420);
		c.fillText("problem.",105,450);
		c.fillText("Inside a room at the end of the hall, you spot a computer terminal.",105,510);
		c.drawImage(image014, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=122;
		}
		break

		case 122:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Once inside, you rummage around the computer terminal. After a moment,",105,420);
		c.fillText("you find a small package of disks.",105,450);
		c.drawImage(image016, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=123;
		}
		break

		case 123:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Once inside, you rummage around the computer terminal. After a moment,",105,420);
		c.fillText("you find a small package of disks.",105,450);
		c.fillText("\"Hello, payday.\" You think to yourself.",105,510);
		c.drawImage(image016, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=124;
		}
		break

		case 124:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("You take the small case and stuff it in your jacket. Upon exiting the room,",105,420);
		c.fillText("you immediately bump into a guard.",105,450);
		c.drawImage(image015, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=125;
		}
		break

		case 125:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("You take the small case and stuff it in your jacket. Upon exiting the room,",105,420);
		c.fillText("you immediately bump into a guard.",105,450);
		c.font = "Bold 18pt Courier New";
		c.fillText("\"My bad pal, my bad.\"",105,510);
		c.drawImage(image015, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=126;
		}
		break

		case 126:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("You take the small case and stuff it in your jacket. Upon exiting the room,",105,420);
		c.fillText("you immediately bump into a guard.",105,450);
		c.font = "Bold 18pt Courier New";
		c.fillText("\"My bad pal, my bad.\"",105,510);
		c.fillText("Guard: \"Do I know you?\"",105,570);
		c.drawImage(image015, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=127;
		}
		break

		case 127:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"Yeah, yeah. Usually they have me stationed in another lock-up, but the",105,420);
		c.fillText("boss sent me here to pick up some files for him.\"",105,450);
		c.drawImage(image015, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=128;
		}
		break

		case 128:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"Yeah, yeah. Usually they have me stationed in another lock-up, but the",105,420);
		c.fillText("boss sent me here to pick up some files for him.\"",105,450);
		c.fillText("\"Very well then. Who am I to second guess the boss? Sorry to bother you.\"",105,510);
		c.drawImage(image015, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=129;
		}
		break

		case 129:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Nonchalantly, you make your way out of the building.",105,420);
		c.drawImage(image015, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==3)
			fadeOUTtime=80;
		if(optsel==1)
		{
			transitionOut(154.5);
		}
		break

		case 130:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Sneaking up behind the guard, you're able to perform a quick and stealthy",105,420);
		c.fillText("takeout.",105,450);
		c.drawImage(image014, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=131;
		}
		break

		case 131:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Sneaking up behind the guard, you're able to perform a quick and stealthy",105,420);
		c.fillText("takeout.",105,450);
		c.fillText("After stuffing yet another body in the same broom closet, your search",105,510);
		c.fillText("continues...",105,540);
		c.drawImage(image014, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=132;
		}
		break

		case 132:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Inside a room at the end of the hall, you spot a computer...",105,420);
		c.drawImage(image016, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=133;
		}
		break

		case 133:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Once inside, you rummage around the computer terminal. After a moment,",105,420);
		c.fillText("you find a small package of disks.",105,450);
		c.drawImage(image016, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=134;
		}
		break

		case 134:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Once inside, you rummage around the computer terminal. After a moment,",105,420);
		c.fillText("you find a small package of disks.",105,450);
		c.fillText("\"Hello, payday.\" You think to yourself.",105,510);
		c.drawImage(image016, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=135;
		}
		break

		case 135:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("You take the small case and stuff it in your jacket. Upon exiting the room,",105,420);
		c.fillText("you immediately bump into a guard.",105,450);
		c.drawImage(image015, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=136;
		}
		break

		case 136:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("You take the small case and stuff it in your jacket. Upon exiting the room,",105,420);
		c.fillText("you immediately bump into a guard.",105,450);
		c.font = "Bold 18pt Courier New";
		c.fillText("\"My bad pal, my bad.\"",105,510);
		c.drawImage(image015, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=137;
		}
		break

		case 137:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("You take the small case and stuff it in your jacket. Upon exiting the room,",105,420);
		c.fillText("you immediately bump into yet another guard.",105,450);
		c.font = "Bold 18pt Courier New";
		c.fillText("\"My bad pal, my bad.\"",105,510);
		c.fillText("Guard: \"Do I know you?\"",105,570);
		c.drawImage(image015, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=138;
		}
		break

		case 138:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"Yeah, yeah. Usually they have me stationed in another lockup, but the",105,420);
		c.fillText("boss sent me here to pick up some files for him.\"",105,450);
		c.drawImage(image015, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=139;
		}
		break

		case 139:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"Yeah, yeah. Usually they have me stationed in another lockup, but the",105,420);
		c.fillText("boss sent me here to pick up some files for him.\"",105,450);
		c.font = "Italic 18pt Courier New";
		c.fillText("The guards eyes narrow at you.",105,510);
		c.drawImage(image015, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=140;
		}
		break

		case 140:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"Yeah, yeah. Usually they have me stationed in another lockup, but the",105,420);
		c.fillText("boss sent me here to pick up some files for him.\"",105,450);
		c.font = "Italic 18pt Courier New";
		c.fillText("The guards eyes narrow at you.",105,510);
		c.font = "Bold 18pt Courier New";
		c.fillText("\"Alright...\"",105,580);
		c.drawImage(image015, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=141;
		}
		break

		case 141:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("He lets you by. For a moment it seemed like you were off the hook until",105,420);
		c.fillText("you hear him speak into a walkie talkie.",105,450);
		c.drawImage(image015, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=142;
		}
		break

		case 142:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("He lets you by. For a moment it seemed like you were off the hook until",105,420);
		c.fillText("you hear him speak into a walkie talkie.",105,450);
		c.font = "Bold 18pt Courier New";
		c.fillText("Guard: \"There’s an intruder in the basement, leaving the data lockup.\"",105,510);
		c.drawImage(image020, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=143;
		}
		break

		case 143:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("He lets you by. For a moment it seemed like you were off the hook until",105,420);
		c.fillText("you hear him speak into a walkie talkie.",105,450);
		c.font = "Bold 18pt Courier New";
		c.fillText("Guard: \"There’s an intruder in the basement, leaving the data lockup.\"",105,510);
		c.fillText("Radio: \"Do you have a visual?\"",105,570);
		c.drawImage(image020, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=144;
		}
		break

		case 144:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Guard: \"He’s making for the staircase. Permission to engage?\"",105,420);
		c.drawImage(image020, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=145;
		}
		break

		case 145:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Guard: \"He’s making for the staircase. Permission to engage?\"",105,420);
		c.fillText("Radio: \"Permission granted. Raptors, time to earn your keep.\"",105,480);
		c.drawImage(image020, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			if(playsongs==1)
			{
				song12.play();
			}
			slide=146;
		}

		break

		case 146:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("\"You have got to be kidding me.\" You think.",105,420);
		c.drawImage(image014, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=147;
		}
		break

		case 147:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("\"You have got to be kidding me.\" You think.",105,420);
		c.fillText("You pull out your pistol, readying for the worst.",105,480);
		c.drawImage(image014, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=148;
		}
		break

		case 148:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("The first raptors come down the stairs.",105,420);
		c.drawImage(image014, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=149;
		}
		break

		case 149:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("The first raptors come down the stairs.",105,420);
		c.fillText("You take a few pot shots, but need to retreat. There's too many.",105,480);
		c.drawImage(image014, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=150;
		}
		break

		case 150:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("You head back to the data lockup and put your gun on the table.",105,420);
		c.drawImage(image021, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=151;
		}
		break

		case 151:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("You head back to the data lockup and put your gun on the table.",105,420);
		c.fillText("You take your gun off of the table and flip the table for more coverage.",105,480);
		c.drawImage(image022, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=152;
		}
		break

		case 152:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Raptors stream into the room and are taken out one by one as you fire.",105,420);
		c.drawImage(image022, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=154;
		}
		break

		case 154:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("After you shoot what you believe to be the last guard, you make a run",105,420);
		c.fillText("for it.",105,450);
		c.drawImage(image014, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==3)
			fadeOUTtime=80;
		if(optsel==1)
		{
			transitionOut(154.5);
		}
		break

		case 154.5:
		console.log("3 "+optsel);
		optsel=-1;
		if(optsel==-1)
		{
			fadeINtime=80;
			slide=155;
			if(playsongs==1)
			{
				song12.pause();
				song4.pause();
				song5.play();
			}
		}
		break

		case 155:
		c.fillStyle="white";
		c.textAlign = "center";
		c.font = "Bold 18pt Courier New";
		c.fillText("Meanwhile...",midx,420);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==3)
			fadeOUTtime=80;
		if(optsel==1)
		{
			transitionOut(155.5);
		}
		break

		case 155.5:
		console.log("3 "+optsel);
		optsel=-1;
		if(optsel==-1)
		{
			fadeINtime=80;
			slide=156;
		}
		break

		case 156:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Across town, in a conference room at an undiclosed location.",105,420);
		c.drawImage(image011, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=157;
		}
		break

		case 157:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Across town, in a conference room at an undiclosed location.",105,420);
		c.font = "Bold 18pt Courier New";
		c.fillText("Addeline: \"Replay it.\"",105,480);
		c.drawImage(image011, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=158;
		}
		break

		case 158:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Across town, in a conference room at an undiclosed location.",105,420);
		c.font = "Bold 18pt Courier New";
		c.fillText("Addeline: \"Replay it.\"",105,480);
		c.fillText("Yes Man: \"Yes Ma'am\"",105,540);
		c.drawImage(image011, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=159;
		}
		break

		case 159:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("After a moment, she breaks the silence.",105,420);
		c.drawImage(image011, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=160;
		}
		break

		case 160:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("After a moment, she breaks the silence.",105,420);
		c.font = "Bold 18pt Courier New";
		c.fillText("Addeline: \"What happened?\"",105,480);
		c.drawImage(image011, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=161;
		}
		break

		case 161:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("After a moment, she breaks the silence.",105,420);
		c.font = "Bold 18pt Courier New";
		c.fillText("Addeline: \"What happened?\"",105,480);
		c.fillText("Yes Man: \"It seems there was an intruder at one of the lock ups, ma’am.\"",105,540);
		c.drawImage(image011, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=162;
		}
		break

		case 162:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("After a moment, she breaks the silence.",105,420);
		c.font = "Bold 18pt Courier New";
		c.fillText("Addeline: \"What happened?\"",105,480);
		c.fillText("Yes Man: \"It seems there was an intruder at one of the lock ups, ma’am.\"",105,540);
		c.fillText("Addeline: \"I KNOW THAT YOU ASSHAT!\"",105,600);
		c.drawImage(image011, 105, 30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=163;
		}
		break

		case 163:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Addeline: \"Who did it, were they alone, and why. That’s what I want to",105,420);
		c.fillText("know.\"",105,450);
		c.drawImage(image011, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=164;
		}
		break

		case 164:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Addeline: \"Who did it, were they alone, and why. That’s what I want to",105,420);
		c.fillText("know.\"",105,450);
		c.fillText("Yes Man: \"It wasn't a professional, that's for sure.\"",105,510);
		c.drawImage(image011, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=165;
		}
		break

		case 165:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Addeline: \"Who did it, were they alone, and why. That’s what I want to",105,420);
		c.fillText("know.\"",105,450);
		c.fillText("Yes Man: \"It wasn't a professional, that's for sure.\"",105,510);
		c.fillText("Addeline: \"Stop this. If you want to be of any use, go get me Darren.\"",105,570);
		c.drawImage(image011, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=166;
		}
		break

		case 166:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("A moment passes.",105,420);
		c.drawImage(image011, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=167;
		}
		break

		case 167:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("A moment passes.",105,420);
		c.font = "Bold 18pt Courier New";
		c.fillText("Addeline: \"WHAT ARE YOU WAITING FOR?!\"",105,480);
		c.drawImage(image011, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=168;
		}
		break

		case 168:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("A moment passes.",105,420);
		c.font = "Bold 18pt Courier New";
		c.fillText("Addeline: \"WHAT ARE YOU WAITING FOR?!\"",105,480);
		c.font = "Italic 18pt Courier New";
		c.fillText("The Yes Man scrambles out of the room.",105,540);
		c.drawImage(image011, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==3)
			fadeOUTtime=80;
		if(optsel==1)
		{
			transitionOut(169.5);
		}
		break

		case 169.5:
		console.log("3 "+optsel);
		optsel=-1;
		if(optsel==-1)
		{
			fadeINtime=80;
			slide=170;
		}
		break

		case 170:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("A few minutes later, Darren enters.",105,420);
		c.drawImage(image012, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=171;
		}
		break

		case 171:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("A few minutes later, Darren enters.",105,420);
		c.font = "Bold 18pt Courier New";
		c.fillText("Darren: \"You asked to see me, ma’am?\"",105,480);
		c.drawImage(image012, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=172;
		}
		break

		case 172:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("A few minutes later, Darren enters.",105,420);
		c.font = "Bold 18pt Courier New";
		c.fillText("Darren: \"You asked to see me, ma’am?\"",105,480);
		c.font = "Italic 18pt Courier New";
		c.fillText("Addeline is unusually calm.",105,540);
		c.drawImage(image012, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=173;
		}
		break

		case 173:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Darren: \"What’s the matter?\"",105,420);
		c.drawImage(image012, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=174;
		}
		break

		case 174:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Darren: \"What’s the matter?\"",105,420);
		c.fillText("Addeline: \"As a matter of fact, your incompetence is today’s matter.\"",105,480); //my favorite line
		c.drawImage(image012, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=175;
		}
		break

		case 175:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Darren: \"What’s the matter?\"",105,420);
		c.fillText("Addeline: \"As a matter of fact, your incompetence is today’s matter.\"",105,480);
		c.font = "Italic 18pt Courier New";
		c.fillText("She rests her hands on the desk.",105,540);
		c.drawImage(image012, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=176;
		}
		break

		case 176:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Darren: \"What’s the matter?\"",105,420);
		c.fillText("Addeline: \"As a matter of fact, your incompetence is today’s matter.\"",105,480);
		c.font = "Italic 18pt Courier New";
		c.fillText("She rests her hands on the desk.",105,540);
		c.font = "Bold 18pt Courier New";
		c.fillText("Addeline: \"The lockup in Sector 14 was raided today, was it not?\"",105,600);
		c.drawImage(image012, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=177;
		}
		break

		case 177:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Darren: \"Yes ma’am, it was.\"",105,420);
		c.drawImage(image012, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=178;
		}
		break

		case 178:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Darren: \"Yes ma’am, it was.\"",105,420);
		c.fillText("Addeline: \"Stop it with the ‘ma’am’s.\"",105,480);
		c.drawImage(image012, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=179;
		}
		break

		case 179:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Darren: \"Yes ma’am, it was.\"",105,420);
		c.fillText("Addeline: \"Stop it with the ‘ma’am’s.\"",105,480);
		c.font = "Italic 18pt Courier New";
		c.fillText("Darren nods.",105,540);
		c.drawImage(image012, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=180;
		}
		break

		case 180:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Darren: \"Yes ma’am, it was.\"",105,420);
		c.fillText("Addeline: \"Stop it with the ‘ma’am’s.\"",105,480);
		c.font = "Italic 18pt Courier New";
		c.fillText("Darren nods.",105,540);
		c.font = "Bold 18pt Courier New";
		c.fillText("Darren: \"As I was saying, I activated the containment measures, all the",105,600);
		c.fillText("onsite raptors were sent to deal with it.\"",105,630);
		c.drawImage(image012, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=181;
		}
		break

		case 181:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Addeline spins her monitor to face Darren. The footage onscreen shows Dale",105,420);
		c.fillText("leaving the lockup alive.",105,450);
		c.drawImage(image012, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=182;
		}
		break

		case 182:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Addeline spins her monitor to face Darren. The footage onscreen shows Dale",105,420);
		c.fillText("leaving the lockup alive.",105,450);
		c.font = "Bold 18pt Courier New";
		c.fillText("Addeline: \"In case you were unaware, you failed.\"",105,510);
		c.drawImage(image012, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=183;
		}
		break

		case 183:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Addeline spins her monitor to face Darren. The footage onscreen shows Dale",105,420);
		c.fillText("leaving the lockup alive.",105,450);
		c.font = "Bold 18pt Courier New";
		c.fillText("Addeline: \"In case you were unaware, you failed.\"",105,510);
		c.font = "Italic 18pt Courier New";
		c.fillText("Darren hangs his head.",105,570);
		c.drawImage(image012, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=184;
		}
		break

		case 184:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Addeline spins her monitor to face Darren. The footage onscreen shows Dale",105,420);
		c.fillText("leaving the lockup alive.",105,450);
		c.font = "Bold 18pt Courier New";
		c.fillText("Addeline: \"In case you were unaware, you failed.\"",105,510);
		c.font = "Italic 18pt Courier New";
		c.fillText("Darren hangs his head.",105,570);
		c.font = "Bold 18pt Courier New";
		c.fillText("Darren: \"I did.\"",105,630);
		c.drawImage(image012, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=185;
		}
		break

		case 185:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Addeline: \"Luckily for you, I don’t subscribe to the more permanent",105,420);
		c.fillText("methods like my old man.\"",105,450);
		c.drawImage(image012, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=186;
		}
		break

		case 186:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Addeline: \"Luckily for you, I don’t subscribe to the more permanent",105,420);
		c.fillText("methods like my old man.\"",105,450);
		c.font = "Italic 18pt Courier New";
		c.fillText("Darren shudders involuntarily.",105,510);
		c.drawImage(image012, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=187;
		}
		break

		case 187:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Addeline: \"Luckily for you, I don’t subscribe to the more permanent",105,420);
		c.fillText("methods like my old man.\"",105,450);
		c.font = "Italic 18pt Courier New";
		c.fillText("Darren shudders involuntarily.",105,510);
		c.font = "Bold 18pt Courier New";
		c.fillText("Darren: \"Vitate.\"",105,570);
		c.drawImage(image012, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=188;
		}
		break

		case 188:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Addeline: \"Luckily for you, I don’t subscribe to the more permanent",105,420);
		c.fillText("methods like my old man.\"",105,450);
		c.font = "Italic 18pt Courier New";
		c.fillText("Darren shudders involuntarily.",105,510);
		c.font = "Bold 18pt Courier New";
		c.fillText("Darren: \"Vitate.\"",105,570);
		c.font = "Bold 18pt Courier New";
		c.fillText("Addeline: \"Since you prefer to hire freelancers, like the one that most",105,630);
		c.fillText("likely attacked the compound, you can hire the ones to hunt him down.\"",105,660);
		c.drawImage(image012, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=189;
		}
		break

		case 189:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Darren: \"How much do I have to work with?\"",105,420);
		c.drawImage(image012, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=189.1;
		}
		break

		case 189.1:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Darren: \"How much do I have to work with?\"",105,420);
		c.fillText("Addeline: \"Whatever you need. Ensure that this gets taken care of.\"",105,480);
		c.drawImage(image012, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=189.2;
		}
		break

		case 189.2:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Darren: \"How much do I have to work with?\"",105,420);
		c.fillText("Addeline: \"Whatever you need. Ensure that this gets taken care of.\"",105,480);
		c.font = "Italic 18pt Courier New";
		c.fillText("Darren stares in disbelief, and gratefully says:",105,540);
		c.font = "Bold 18pt Courier New";
		c.fillText("Darren: \"Thank you ma’am.\"",105,600);
		c.drawImage(image012, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=190;
		}
		break

		case 190:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Addeline briskly leaves the room. Leaving behind a shaken Darren.",105,420);
		c.drawImage(image017, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=191;
		}
		break

		case 191:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Addeline briskly leaves the room. Leaving behind a shaken Darren.",105,420);
		c.fillText("Out in the hall, she mistakenly bumps into one of the interns.",105,480);
		c.drawImage(image017, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=192;
		}
		break

		case 192:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Addeline briskly leaves the room. Leaving behind a shaken Darren.",105,420);
		c.fillText("Out in the hall, she mistakenly bumps into one of the interns.",105,480);
		c.font = "Bold 18pt Courier New";
		c.fillText("Debra: \"Ms. Galleos, I'm sorry! Are you alright?\"",105,540);
		c.drawImage(image017, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=193;
		}
		break

		case 193:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Addeline: \"Tell everyone in this organization. We will no longer be",105,420);
		c.fillText("employing backstabing freelancers! Understood?\"",105,450);
		c.drawImage(image017, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=194;
		}
		break

		case 194:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Addeline: \"Tell everyone in this organization. We will no longer be",105,420);
		c.fillText("employing backstabing freelancers! Understood?\"",105,450);
		c.fillText("Debra: \"Yes ma’am. Is that all?\"",105,510);
		c.drawImage(image017, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=195;
		}
		break

		case 195:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Addeline: \"Tell everyone in this organization. We will no longer be",105,420);
		c.fillText("employing backstabing freelancers! Understood?\"",105,450);
		c.fillText("Debra: \"Yes ma’am. Is that all?\"",105,510);
		c.fillText("Addeline: \"I’m not a ma’am.\"",105,570);
		c.drawImage(image017, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=196;
		}
		break

		case 196:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Addeline: \"Tell everyone in this organization. We will no longer be",105,420);
		c.fillText("employing backstabing freelancers! Understood?\"",105,450);
		c.fillText("Debra: \"Yes ma’am. Is that all?\"",105,510);
		c.fillText("Addeline: \"I’m not a ma’am.\"",105,570);
		c.font = "Italic 18pt Courier New";
		c.fillText("Back in the conference room. A shaken Darren makes a phone call.",105,630);
		c.drawImage(image017, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==3)
			fadeOUTtime=80;
		if(optsel==1)
		{
			transitionOut(196.5);
		}
		break

		case 196.5:
		console.log("3 "+optsel);
		optsel=-1;
		if(optsel==-1)
		{
			fadeINtime=80;
			slide=197;
			if(playsongs==1)
			{
				song5.pause();
				song6.play();
			}
		}
		break

		case 197:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Across town in a familiar bar, a phone rings.",105,420);
		c.drawImage(image018, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=198;
		}
		break

		case 198:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Across town in a familiar bar, a phone rings.",105,420);
		c.font = "Bold 18pt Courier New";
		c.fillText("Jezebel: \"Alright you drunks! Behave while I take this.\"",105,480);
		c.drawImage(image018, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=199;
		}
		break

		case 199:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Across town in a familiar bar, a phone rings.",105,420);
		c.font = "Bold 18pt Courier New";
		c.fillText("Jezebel: \"Alright you drunks! Behave while I take this.\"",105,480);
		c.font = "Italic 18pt Courier New";
		c.fillText("The bar quiets down, she picks up the phone.",105,540);
		c.drawImage(image018, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=200;
		}
		break

		case 200:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Across town in a familiar bar, a phone rings.",105,420);
		c.font = "Bold 18pt Courier New";
		c.fillText("Jezebel: \"Alright you drunks! Behave while I take this.\"",105,480);
		c.font = "Italic 18pt Courier New";
		c.fillText("The bar quiets down, she picks up the phone.",105,540);
		c.font = "Bold 18pt Courier New";
		c.fillText("Jezebel: \"Hello? Why, yes this is, what can I do you for?\"",105,600);
		c.drawImage(image018, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=201;
		}
		break

		case 201:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Her expression changes slightly before recovering.",105,420);
		c.drawImage(image018, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=202;
		}
		break

		case 202:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Her expression changes slightly before recovering.",105,420);
		c.font = "Bold 18pt Courier New";
		c.fillText("Jezebel: \"Another target! Dale Foster, 30 thousand!\"",105,480);
		c.drawImage(image018, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=203;
		}
		break

		case 203:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Her expression changes slightly before recovering.",105,420);
		c.font = "Bold 18pt Courier New";
		c.fillText("Jezebel: \"Another target! Dale Foster, 30 thousand!\"",105,480);
		c.fillText("Bradley: \"How’d they want him?\"",105,540);
		c.drawImage(image018, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=204;
		}
		break

		case 204:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Her expression changes slightly before recovering.",105,420);
		c.font = "Bold 18pt Courier New";
		c.fillText("Jezebel: \"Another target! Dale Foster, 30 thousand!\"",105,480);
		c.fillText("Bradley: \"How’d they want him?\"",105,540);
		c.fillText("Jezebel: \"Dead or alive.\"",105,600);
		c.drawImage(image018, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=205;
		}
		break

		case 205:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("After overhearing this, Lev turns to leave the bar.",105,420);
		c.drawImage(image018, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=205.1;
		}
		break

		case 205.1:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("After overhearing this, Lev turns to leave the bar.",105,420);
		c.font = "Bold 18pt Courier New";
		c.fillText("Lev: \"Well, well, well, it seems my payday has come to me.\"",105,480);
		c.drawImage(image018, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=205.2;
		}
		break

		case 205.2:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("After overhearing this, Lev turns to leave the bar.",105,420);
		c.font = "Bold 18pt Courier New";
		c.fillText("Lev: \"Well, well, well, it seems my payday has come to me.\"",105,480);
		c.font = "Italic 18pt Courier New";
		c.fillText("Lev walks out of the bar.",105,540);
		c.drawImage(image018, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=206;
		}
		break

		case 206:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Franco: \"Any idea where this ‘Dale’ will be?\"",105,420);
		c.drawImage(image018, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=207;
		}
		break

		case 207:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Franco: \"Any idea where this ‘Dale’ will be?\"",105,420);
		c.fillText("Bradley: \"No, but I’d wager he does.\"",105,480);
		c.drawImage(image018, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=208;
		}
		break

		case 208:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Franco: \"Any idea where this ‘Dale’ will be?\"",105,420);
		c.fillText("Bradley: \"No, but I’d wager he does.\"",105,480);
		c.font = "Italic 18pt Courier New";
		c.fillText("Bradley points to Lev, leaving the bar.",105,540);
		c.drawImage(image018, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=209;
		}
		break

		case 209:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Franco: \"Any idea where this ‘Dale’ will be?\"",105,420);
		c.fillText("Bradley: \"No, but I’d wager he does.\"",105,480);
		c.font = "Italic 18pt Courier New";
		c.fillText("Bradley points to Lev, leaving the bar.",105,540);
		c.font = "Bold 18pt Courier New";
		c.fillText("Marissa: \"I heard he eats whatever he kills.\"",105,600);
		c.drawImage(image018, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=210;
		}
		break

		case 210:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Franco: \"I heard that he takes jobs just to kill the employer. Then he",105,420);
		c.fillText("burns the money!\"",105,450);
		c.drawImage(image018, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=211;
		}
		break

		case 211:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Franco: \"I heard that he takes jobs just to kill the employer. Then he",105,420);
		c.fillText("burns the money!\"",105,450);
		c.fillText("Marissa: \"I’ve heard all sortsa bad stuff about the guy.\"",105,510);
		c.drawImage(image018, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=212;
		}
		break

		case 212:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Franco: \"I heard that he takes jobs just to kill the employer. Then he",105,420);
		c.fillText("burns the money!\"",105,450);
		c.fillText("Marissa: \"I’ve heard all sortsa bad stuff about the guy.\"",105,510);
		c.fillText("Bradley: \"Whatever he’s done, he probably isn’t worth anything.\"",105,570);
		c.drawImage(image018, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=213;
		}
		break

		case 213:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Franco: \"I heard that he takes jobs just to kill the employer. Then he",105,420);
		c.fillText("burns the money!\"",105,450);
		c.fillText("Marissa: \"I’ve heard all sortsa bad stuff about the guy.\"",105,510);
		c.fillText("Bradley: \"Whatever he’s done, he probably isn’t worth anything.\"",105,570);
		c.fillText("Marissa: \"I heard he's worth 15,000...\"",105,630);
		c.drawImage(image018, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=214;
		}
		break

		case 214:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Bradley: \"Really now? You think we could take him and this \'Dale\'?\"",105,420);
		c.drawImage(image018, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=215;
		}
		break

		case 215:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Bradley: \"Really now? You think we could take him and this \'Dale\'?\"",105,420);
		c.fillText("Franco: \"I think we got a shot.\"",105,480);
		c.drawImage(image018, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=216;
		}
		break

		case 216:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Bradley: \"Really now? You think we could take him and this \'Dale\'?\"",105,420);
		c.fillText("Franco: \"I think we got a shot.\"",105,480);
		c.fillText("Bradley: \"I wasn’t talking to you.\"",105,540);
		c.drawImage(image018, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=217;
		}
		break

		case 217:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Bradley: \"Really now? You think we could take him and this \'Dale\'?\"",105,420);
		c.fillText("Franco: \"I think we got a shot.\"",105,480);
		c.fillText("Bradley: \"I wasn’t talking to you.\"",105,540);
		c.fillText("Marissa: \"Three of us, one of him. We could do it, but it’d be a scrape.",105,600);
		c.fillText("Not to mention getting the other guy too.\"",105,630);
		c.drawImage(image018, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=218;
		}
		break

		case 218:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Bradley: \"Well, I’ve been itching for a fight! Franco?\"",105,420);
		c.drawImage(image018, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=219;
		}
		break

		case 219:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Bradley: \"Well, I’ve been itching for a fight! Franco?\"",105,420);
		c.font = "Italic 18pt Courier New";
		c.fillText("Franco rises abruptly",105,480);
		c.drawImage(image018, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=220;
		}
		break

		case 220:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Bradley: \"Well, I’ve been itching for a fight! Franco?\"",105,420);
		c.font = "Italic 18pt Courier New";
		c.fillText("Franco rises abruptly",105,480);
		c.font = "Bold 18pt Courier New";
		c.fillText("Franco: \"Grab our gear- We’ve got prey to catch.\"",105,540);
		c.drawImage(image018, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==3)
			fadeOUTtime=80;
		if(optsel==1)
		{
			transitionOut(220.5);
		}
		break

		case 220.5:
		console.log("3 "+optsel);
		optsel=-1;
		if(optsel==-1)
		{
			fadeINtime=80;
			slide=221.5;
			if(playsongs==1)
			{
				song6.pause();
				song7.play();
			}
		}
		break

		case 221.5:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Near a railroad, the trio follow Lev closely.",105,420);
		c.drawImage(image019, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=221;
		}
		break

		case 221:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Near a railroad, the trio follow Lev closely.",105,420);
		c.font = "Bold 18pt Courier New";
		c.fillText("Franco: \"That’s him, isn’t it.\"",105,480);
		c.drawImage(image019, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=222;
		}
		break

		case 222:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Near a railroad, the trio follow Lev closely.",105,420);
		c.font = "Bold 18pt Courier New";
		c.fillText("Franco: \"That’s him, isn’t it.\"",105,480);
		c.fillText("Marissa: \"Yep, time to earn our keep.\"",105,540);
		c.drawImage(image019, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=223;
		}
		break

		case 223:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Near a railroad, the trio follow Lev closely.",105,420);
		c.font = "Bold 18pt Courier New";
		c.fillText("Franco: \"That’s him, isn’t it.\"",105,480);
		c.fillText("Marissa: \"Yep, time to earn our keep.\"",105,540);
		c.fillText("Bradley: \"Who says that?\"",105,600);
		c.drawImage(image019, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=224;
		}
		break

		case 224:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Marissa: \"Money-makers say that. Now let’s move.\"",105,420);
		c.drawImage(image019, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=225;
		}
		break

		case 225:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Marissa: \"Money-makers say that. Now let’s move.\"",105,420);
		c.fillText("Bradley: \"They sure do.\"",105,480);
		c.drawImage(image019, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=226;
		}
		break

		case 226:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Marissa: \"Money-makers say that. Now let’s move.\"",105,420);
		c.fillText("Bradley: \"They sure do.\"",105,480);
		c.font = "Italic 18pt Courier New";
		c.fillText("In a sickly moment of dark suprise, they realize that during their",105,540);
		c.fillText("bickering, Lev slipped away.",105,570);
		c.drawImage(image019, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=227;
		}
		break

		case 227:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Marissa: \"Money-makers say that. Now let’s move.\"",105,420);
		c.fillText("Bradley: \"They sure do.\"",105,480);
		c.font = "Italic 18pt Courier New";
		c.fillText("In a sickly moment of dark suprise, they realize that during their",105,540);
		c.fillText("bickering, Lev slipped away.",105,570);
		c.font = "Bold 18pt Courier New";
		c.fillText("Bradley: \"Where'd that slimeball go?\"",105,630);
		c.drawImage(image019, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=228;
		}
		break

		case 228:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("From behind them, a familiar voice pipes up.",105,420);
		c.drawImage(image019, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=229;
		}
		break

		case 229:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("From behind them, a familiar voice pipes up.",105,420);
		c.font = "Bold 18pt Courier New";
		c.fillText("Lev: \"Now that’s no way to talk about a cohort now is it?\"",105,480);
		c.drawImage(image019, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=230;
		}
		break

		case 230:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("From behind them, a familiar voice pipes up.",105,420);
		c.font = "Bold 18pt Courier New";
		c.fillText("Lev: \"Now that’s no way to talk about a cohort now is it?\"",105,480);
		c.fillText("Franco: \"Oh you son of a-\"",105,540);
		c.drawImage(image019, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=231;
		}
		break

		case 231:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("From behind them, a familiar voice pipes up.",105,420);
		c.font = "Bold 18pt Courier New";
		c.fillText("Lev: \"Now that’s no way to talk about a cohort now is it?\"",105,480);
		c.fillText("Franco: \"Oh you son of a-\"",105,540);
		c.font = "Italic 18pt Courier New";
		c.fillText("Franco quickly draws his gun, but before it's cocked, Lev fires his right",105,600);
		c.fillText("between Franco's eyes.",105,630);
		c.drawImage(image019, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=232;
		}
		break

		case 232:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Lev: \"Poor boy. That didn’t need to happen now did it?\"",105,420);
		c.drawImage(image019, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=233;
		}
		break

		case 233:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Lev: \"Poor boy. That didn’t need to happen now did it?\"",105,420);
		c.font = "Italic 18pt Courier New";
		c.fillText("In the moments after Franco's death, Bradley and Marissa scramble to find",105,480);
		c.fillText("cover behind a dumpster. Lev yells from a distance.",105,510);
		c.drawImage(image019, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=234;
		}
		break

		case 234:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Lev: \"Poor boy. That didn’t need to happen now did it?\"",105,420);
		c.font = "Italic 18pt Courier New";
		c.fillText("In the moments after Franco's death, Bradley and Marissa scramble to find",105,480);
		c.fillText("cover behind a dumpster. Lev yells from a distance.",105,510);
		c.font = "Bold 18pt Courier New";
		c.fillText("Lev: \"Who’s it gonna be? Me or him? He’s worth more you know!\"",105,570);
		c.drawImage(image019, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=235;
		}
		break

		case 235:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Bradley turns to Marissa with a worried look on his face.",105,420);
		c.drawImage(image019, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=236;
		}
		break

		case 236:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Bradley turns to Marissa with a worried look on his face.",105,420);
		c.font = "Bold 18pt Courier New";
		c.fillText("Bradley: \"Listen, I don’t like him any more than you do. Probably less",105,480);
		c.fillText("even. But we need to keep our eyes on the prize.\"",105,510);
		c.drawImage(image019, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=237;
		}
		break

		case 237:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Bradley turns to Marissa with a worried look on his face.",105,420);
		c.font = "Bold 18pt Courier New";
		c.fillText("Bradley: \"Listen, I don’t like him any more than you do. Probably less",105,480);
		c.fillText("even. But we need to keep our eyes on the prize.\"",105,510);
		c.font = "Bold 18pt Courier New";
		c.fillText("Marissa: \"His body is the prize!\"",105,570);
		c.drawImage(image019, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=238;
		}
		break

		case 238:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Bradley turns to Marissa with a worried look on his face.",105,420);
		c.font = "Bold 18pt Courier New";
		c.fillText("Bradley: \"Listen, I don’t like him any more than you do. Probably less",105,480);
		c.fillText("even. But we need to keep our eyes on the prize.\"",105,510);
		c.font = "Bold 18pt Courier New";
		c.fillText("Marissa: \"His body is the prize!\"",105,570);
		c.font = "Italic 18pt Courier New";
		c.fillText("Lev makes a move, catching Marissa by suprise and shooting her in the head.",105,630);
		c.drawImage(image019, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=239;
		}
		break

		case 239:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Bradley, overcome with grief makes a dash for Lev who promptly shoots him",105,420);
		c.fillText("in the leg.",105,450);
		c.drawImage(image019, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=240;
		}
		break

		case 240:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Bradley, overcome with grief makes a dash for Lev who promptly shoots him",105,420);
		c.fillText("in the leg.",105,450);
		c.font = "Bold 18pt Courier New";
		c.fillText("Lev: \"All this. For what?\"",105,510);
		c.drawImage(image019, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=241;
		}
		break

		case 241:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Bradley, overcome with grief makes a dash for Lev who promptly shoots him",105,420);
		c.fillText("in the leg.",105,450);
		c.font = "Bold 18pt Courier New";
		c.fillText("Lev: \"All this. For what?\"",105,510);
		c.fillText("Bradley: \"Enjoy whatever you make out of me, Snake.\"",105,570);
		c.drawImage(image019, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=242;
		}
		break

		case 242:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Bradley, overcome with grief makes a dash for Lev who promptly shoots him",105,420);
		c.fillText("in the leg.",105,450);
		c.font = "Bold 18pt Courier New";
		c.fillText("Lev: \"All this. For what?\"",105,510);
		c.fillText("Bradley: \"Enjoy whatever you make out of me, Snake.\"",105,570);
		c.font = "Italic 18pt Courier New";
		c.fillText("He smiles dryly, before shooting himself in the head.",105,630);
		c.drawImage(image019, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=243;
		}
		break

		case 243:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Lev: \"Well. I was going to make a nice casserole, but that ruined it.\"",105,420);
		c.font = "Italic 18pt Courier New";
		c.fillText("Lev walks away from the scene, and unceremoniously spins and pockets his",105,480);
		c.fillText("gun.",105,510)
		c.drawImage(image019, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==3)
			fadeOUTtime=80;
		if(optsel==1)
		{
			transitionOut(243.5);
		}
		break

		case 243.5:
		console.log("3 "+optsel);
		optsel=-1;
		if(optsel==-1)
		{
			fadeINtime=80;
			slide=244;
			if(playsongs==1)
			{
				song7.pause();
				song8.play();
			}
		}
		break

		case 244:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Carefully, you make your way down a familiar street to find cover.",105,420);
		c.drawImage(image007, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=245;
		}
		break

		case 245:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Carefully, you make your way down a familiar street to find cover.",105,420);
		c.fillText("You approach Irwin's apartment with caution, worried about being gunned",105,480);
		c.fillText("down at any moment. You reach his door and knock. It swings open.",105,510);
		c.drawImage(image007, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=246;
		}
		break

		case 246:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("Carefully, you make your way down a familiar street to find cover.",105,420);
		c.fillText("You approach Irwin's apartment with caution, worried about being gunned",105,480);
		c.fillText("down at any moment. You reach his door and knock. It swings open.",105,510);
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Go. Get out of here, I know they’re tracking you.\"",105,570);
		c.drawImage(image007, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=247;
		}
		break

		case 247:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"I need a place to lay low.\"",105,420);
		c.drawImage(image007, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=248;
		}
		break

		case 248:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"I need a place to lay low.\"",105,420);
		c.fillText("Irwin: \"It’s not gonna be here. I’m not letting you ruin my new life.\"",105,480);
		c.drawImage(image007, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=248.1;
		}
		break

		case 248.1:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"I need a place to lay low.\"",105,420);
		c.fillText("Irwin: \"It’s not gonna be here. I’m not letting you ruin my new life.\"",105,480);
		c.drawImage(image007, 105,30);
		c.closePath();
		transitionIn();
		opt1="I swear, no one's following.";
		opt2="They won't find me here.";
		opt(2);
		if(optsel==1)
		{
			if(selectedopt==0)
			{
				waitlock=waittime;
				slide=249;
			}
			if(selectedopt==1)
			{
				waitlock=waittime;
				slide=249.1;
			}
		}
		break

		case 249:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"I need a place to lay low.\"",105,420);
		c.fillText("Irwin: \"It’s not gonna be here. I’m not letting you ruin my new life.\"",105,480);
		c.fillText("\"I swear, no one's following.\"",105,540);
		c.drawImage(image007, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=250.1;
		}
		break

		case 250.1:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"I need a place to lay low.\"",105,420);
		c.fillText("Irwin: \"It’s not gonna be here. I’m not letting you ruin my new life.\"",105,480);
		c.fillText("\"I swear, no one's following.\"",105,540);
		c.font = "Italic 18pt Courier New";
		c.fillText("You see him almost consider it for a moment before remaining resolute.",105,600);
		c.drawImage(image007, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=251;
		}
		break

		case 249.1:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"I need a place to lay low.\"",105,420);
		c.fillText("Irwin: \"It’s not gonna be here. I’m not letting you ruin my new life.\"",105,480);
		c.fillText("\"They won't find me here.\"",105,540);
		c.drawImage(image007, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=250;
		}
		break

		case 250:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"I need a place to lay low.\"",105,420);
		c.fillText("Irwin: \"It’s not gonna be here. I’m not letting you ruin my new life.\"",105,480);
		c.fillText("\"They won't find me here.\"",105,540);
		c.font = "Italic 18pt Courier New";
		c.fillText("You see him almost consider it for a moment before remaining resolute.",105,600);
		c.drawImage(image007, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=251;
		}
		break

		case 251:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Dale. Leave now.\"",105,420);
		c.drawImage(image007, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=252;
		}
		break

		case 252:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Dale. Leave now.\"",105,420);
		c.font = "Italic 18pt Courier New";
		c.fillText("You start walking away, brefore spouting off one final comment.",105,480);
		c.drawImage(image007, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=253;
		}
		break

		case 253:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Dale. Leave now.\"",105,420);
		c.font = "Italic 18pt Courier New";
		c.fillText("You start walking away, brefore spouting off one final comment.",105,480);
		c.font = "Bold 18pt Courier New";
		c.fillText("\"You really rolled over, didn’t you?\"",105,540);
		c.drawImage(image007, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=254;
		}
		break

		case 254:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Dale. Leave now.\"",105,420);
		c.font = "Italic 18pt Courier New";
		c.fillText("You start walking away, brefore spouting off one final comment.",105,480);
		c.font = "Bold 18pt Courier New";
		c.fillText("\"You really rolled over, didn’t you?\"",105,540);
		c.font = "Italic 18pt Courier New";
		c.fillText("He sighs.",105,600);
		c.drawImage(image007, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=255;
		}
		break


		case 255:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Way to go for the throat.\"",105,420);
		c.drawImage(image007, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=256;
		}
		break

		case 256:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Way to go for the throat.\"",105,420);
		c.font = "Italic 18pt Courier New";
		c.fillText("He says this below his breath before yelling:",105,480);
		c.drawImage(image007, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=257;
		}
		break

		case 257:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Way to go for the throat.\"",105,420);
		c.font = "Italic 18pt Courier New";
		c.fillText("He says this below his breath before yelling:",105,480);
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Hurry up and get over here.\"",105,540);
		c.drawImage(image007, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=258;
		}
		break

		case 258:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Way to go for the throat.\"",105,420);
		c.font = "Italic 18pt Courier New";
		c.fillText("He says this below his breath before yelling:",105,480);
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Hurry up and get over here.\"",105,540);
		c.fillText("\"Thanks Irwin, I knew I could count on you!\"",105,600);
		c.drawImage(image007, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=259;
		}
		break

		case 259:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Don’t thank me.\"",105,420);
		c.drawImage(image008, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=260;
		}
		break

		case 260:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Don’t thank me.\"",105,420);
		c.font = "Italic 18pt Courier New";
		c.fillText("He leads you into the kitchen inside his apartment.",105,480);
		c.drawImage(image008, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=261;
		}
		break

		case 261:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Don’t thank me.\"",105,420);
		c.font = "Italic 18pt Courier New";
		c.fillText("He leads you into the kitchen inside his apartment.",105,480);
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Clean yourself up too, you’re tracking blood everywhere.\"",105,540);
		c.drawImage(image008, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=262;
		}
		break

		case 262:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Don’t thank me.\"",105,420);
		c.font = "Italic 18pt Courier New";
		c.fillText("He leads you into the kitchen inside his apartment.",105,480);
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Clean yourself up too, you’re tracking blood everywhere.\"",105,540);
		c.font = "Italic 18pt Courier New";
		c.fillText("He pauses for a moment.",105,600);
		c.drawImage(image008, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=263;
		}
		break

		case 263:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Out of all the people I expected to see at my door, you were never",105,420);
		c.fillText("one of them.\"",105,450);
		c.drawImage(image008, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=264;
		}
		break

		case 264:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Out of all the people I expected to see at my door, you were never",105,420);
		c.fillText("one of them.\"",105,450);
		c.fillText("\"I have a knack for the unexpected.\"",105,510);
		c.drawImage(image008, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=265;
		}
		break

		case 265:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Out of all the people I expected to see at my door, you were never",105,420);
		c.fillText("one of them.\"",105,450);
		c.fillText("\"I have a knack for the unexpected.\"",105,510);
		c.fillText("Irwin: \"That, alongside many things.\"",105,570);
		c.drawImage(image008, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=266;
		}
		break

		case 266:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Out of all the people I expected to see at my door, you were never",105,420);
		c.fillText("one of them.\"",105,450);
		c.fillText("\"I have a knack for the unexpected.\"",105,510);
		c.fillText("Irwin: \"That, alongside many things.\"",105,570);
		c.font = "Italic 18pt Courier New";
		c.fillText("He pauses again.",105,630);
		c.drawImage(image008, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=267;
		}
		break

		case 267:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Dale? Have you ever thought this whole life through? You know, the",105,420);
		c.fillText("contracting?\"",105,450);
		c.drawImage(image008, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=268;
		}
		break

		case 268:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Dale? Have you ever thought this whole life through? You know, the",105,420);
		c.fillText("contracting?\"",105,450);
		c.fillText("\"You were in the game longer than I’ll ever be. You know the answer.\"",105,510);
		c.drawImage(image008, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=269;
		}
		break

		case 269:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Dale? Have you ever thought this whole life through? You know, the",105,420);
		c.fillText("contracting?\"",105,450);
		c.fillText("\"You were in the game longer than I’ll ever be. You know the answer.\"",105,510);
		c.fillText("Irwin: \"The game’s changed since I’ve been gone. Seems like most of you",105,570);
		c.fillText("have screws loose now. No honor, none of you.\"",105,600);
		c.drawImage(image008, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=270;
		}
		break

		case 270:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"You sound like you’re older than dirt. Last I remember it’s only",105,420);
		c.fillText("been a couple of years.\"",105,450);
		c.drawImage(image008, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=271;
		}
		break

		case 271:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"You sound like you’re older than dirt. Last I remember it’s only",105,420);
		c.fillText("been a couple of years.\"",105,450);
		c.fillText("Irwin: \"You're right.\"",105,510);
		c.drawImage(image008, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=272;
		}
		break

		case 272:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"You sound like you’re older than dirt. Last I remember it’s only",105,420);
		c.fillText("been a couple of years.\"",105,450);
		c.fillText("Irwin: \"You're right.\"",105,510);
		c.font = "Italic 18pt Courier New";
		c.fillText("He chuckles.",105,570);
		c.drawImage(image008, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=273;
		}
		break

		case 273:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("\"You sound like you’re older than dirt. Last I remember it’s only",105,420);
		c.fillText("been a couple of years.\"",105,450);
		c.fillText("Irwin: \"You're right.\"",105,510);
		c.font = "Italic 18pt Courier New";
		c.fillText("He chuckles.",105,570);
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"It must’ve been all that yelling I had to do.\"",105,630);
		c.drawImage(image008, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=274;
		}
		break

		case 274:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"So, did that truce ever happen?\"",105,420);
		c.drawImage(image008, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=275;
		}
		break

		case 275:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"So, did that truce ever happen?\"",105,420);
		c.fillText("\"Surprisingly, yes. They managed to stop shooting each other long",105,480);
		c.fillText("enough to hammer out an agreement.\"",105,510);
		c.drawImage(image008, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=276;
		}
		break

		case 276:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"So, did that truce ever happen?\"",105,420);
		c.fillText("\"Surprisingly, yes. They managed to stop shooting each other long",105,480);
		c.fillText("enough to hammer out an agreement.\"",105,510);
		c.fillText("Irwin: \"The Galleos and the Schintelly’s seeing eye to eye?\"",105,570);
		c.drawImage(image008, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=277;
		}
		break

		case 277:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"So, did that truce ever happen?\"",105,420);
		c.fillText("\"Surprisingly, yes. They managed to stop shooting each other long",105,480);
		c.fillText("enough to hammer out an agreement.\"",105,510);
		c.fillText("Irwin: \"The Galleos and the Schintelly’s seeing eye to eye?\"",105,570);
		c.fillText("\"More or less. They’ve been digging at each other since day one.\"",105,630);
		c.drawImage(image008, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=278;
		}
		break

		case 278:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Doesn’t surprise me one bit. Looks like you’ve had a long day.\"",105,420);
		c.drawImage(image008, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=279;
		}
		break

		case 279:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Doesn’t surprise me one bit. Looks like you’ve had a long day.\"",105,420);
		c.fillText("\"You have no idea.\"",105,480);
		c.drawImage(image008, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=280;
		}
		break

		case 280:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Doesn’t surprise me one bit. Looks like you’ve had a long day.\"",105,420);
		c.fillText("\"You have no idea.\"",105,480);
		c.fillText("Irwin: \"Well, the couch is yours, should you need.\"",105,540);
		c.drawImage(image008, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=281;
		}
		break

		case 281:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Bold 18pt Courier New";
		c.fillText("Irwin: \"Doesn’t surprise me one bit. Looks like you’ve had a long day.\"",105,420);
		c.fillText("\"You have no idea.\"",105,480);
		c.fillText("Irwin: \"Well, the couch is yours, should you need.\"",105,540);
		c.fillText("\"I never could say no to a good couch.\"",105,600);
		c.drawImage(image008, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=282.1;
		}
		break

		case 282.1:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("You head to the couch, before laying down you say.",105,420);
		c.drawImage(image008, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=282.2;
		}
		break

		case 282.2:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("You head to the couch, before laying down you say.",105,420);
		c.font = "Bold 18pt Courier New";
		c.fillText("\"Thanks Irwin.\"",105,480);
		c.drawImage(image008, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==1)
		{
			slide=282;
		}
		break



		case 282:
		c.fillStyle="white";
		c.textAlign = "left";
		c.font = "Italic 18pt Courier New";
		c.fillText("You head to the couch, before laying down you say.",105,420);
		c.font = "Bold 18pt Courier New";
		c.fillText("\"Thanks Irwin.\"",105,480);
		c.fillText("Irwin: \"Just like old times.\"",105,540);
		c.drawImage(image008, 105,30);
		c.closePath();
		transitionIn();
		opt(0);
		if(optsel==3)
			fadeOUTtime=80;
		if(optsel==1)
		{
			transitionOut(282.5);
		}
		break

		case 282.5:
		console.log("3 "+optsel);
		optsel=-1;
		if(optsel==-1)
		{
			fadeINtime=80;
			slide=283;
			if(playsongs==1)
			{
				song8.pause();
				song9.play();
			}
		}
		break

		case 283:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("The next morning, you wake up bright and early to find Irwin standing over",105,420);
c.fillText("you, nursing a coffee.",105,450,);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=284;
}
break

case 284:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("The next morning, you wake up bright and early to find Irwin standing over",105,420);
c.fillText("you, nursing a coffee.",105,450,);
c.font = "Bold 18pt Courier New";
c.fillText("Irwin: \"Mornin’ Sunshine. How was the couch?\"",105,510);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=285;
}
break

case 285:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("The next morning, you wake up bright and early to find Irwin standing over",105,420);
c.fillText("you, nursing a coffee.",105,450,);
c.font = "Bold 18pt Courier New";
c.fillText("Irwin: \"Mornin’ Sunshine. How was the couch?\"",105,510);
c.fillText("\"Like any other one.\"",105,570);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=286;
}
break

case 286:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("The next morning, you wake up bright and early to find Irwin standing over",105,420);
c.fillText("you, nursing a coffee.",105,450,);
c.font = "Bold 18pt Courier New";
c.fillText("Irwin: \"Mornin’ Sunshine. How was the couch?\"",105,510);
c.fillText("\"Like any other one.\"",105,570);
c.font = "Italic 18pt Courier New";
c.fillText("Irwin sips his coffee.",105,630);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=287;
}
break

case 287:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("Irwin: \"You didn’t tell me why you were bleeding all over my carpet",105,420);
c.fillText("yesterday.\"",105,450,);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=288;
}
break

case 288:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("Irwin: \"You didn’t tell me why you were bleeding all over my carpet",105,420);
c.fillText("yesterday.\"",105,450,);
c.fillText("\"There was a reason for that.\"",105,510);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=289;
}
break

case 289:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("Irwin: \"You didn’t tell me why you were bleeding all over my carpet",105,420);
c.fillText("yesterday.\"",105,450,);
c.fillText("\"There was a reason for that.\"",105,510);
c.fillText("Irwin: \"Well, we’re here now. Why are you being shot at now, my protege?\"",105,570);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=290;
}
break

case 290:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("Irwin: \"You didn’t tell me why you were bleeding all over my carpet",105,420);
c.fillText("yesterday.\"",105,450,);
c.fillText("\"There was a reason for that.\"",105,510);
c.fillText("Irwin: \"Well, we’re here now. Why are you being shot at now, my protege?\"",105,570);
c.fillText("\"The Syndicate likes their information secure. Let’s leave it at",105,630);
c.fillText("that.\"",105,660);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=291;
}
break

case 291:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("Irwin: \"Wait. Don’t tell me.\"",105,420);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=292;
}
break

case 292:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("Irwin: \"Wait. Don’t tell me.\"",105,420);
c.fillText("\"I was paid to retrieve a few things from a Syndicate lock-up.\"",105,480);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=293;
}
break

case 293:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("Irwin: \"Wait. Don’t tell me.\"",105,420);
c.fillText("\"I was paid to retrieve a few things from a Syndicate lock-up.\"",105,480);
c.font = "Italic 18pt Courier New";
c.fillText("Irwin stares in disbelief.",105,540);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=294;
}
break

case 294:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("Irwin: \"Wait. Don’t tell me.\"",105,420);
c.fillText("\"I was paid to retrieve a few things from a Syndicate lock-up.\"",105,480);
c.font = "Italic 18pt Courier New";
c.fillText("Irwin stares in disbelief.",105,540);
c.font = "Bold 18pt Courier New";
c.fillText("Irwin: \"You’re telling me that you knowingly violated the truce?\"",105,600);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=295;
}
break

case 295:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("\"It was alot of money.\"",105,420);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=296;
}
break

case 296:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("\"It was alot of money.\"",105,420);
c.fillText("Irwin: \"So someone told you to break this truce and you did it? Do know",105,480);
c.fillText("how dangerous this is?\"",105,510);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=297;
}
break

case 297:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("\"It was alot of money.\"",105,420);
c.fillText("Irwin: \"So someone told you to break this truce and you did it? Do know",105,480);
c.fillText("how dangerous this is?\"",105,510);
c.fillText("\"It’s not really a violation, per se.\"",105,570);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=298;
}
break

case 298:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("\"It was alot of money.\"",105,420);
c.fillText("Irwin: \"So someone told you to break this truce and you did it? Do know",105,480);
c.fillText("how dangerous this is?\"",105,510);
c.fillText("\"It’s not really a violation, per se.\"",105,570);
c.fillText("Irwin: \"You were never the sharpest in the shed.\"",105,630);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=299;
}
break

case 299:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("\"It’ll be worth it. Trust me.\"",105,420);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=300;
}
break

case 300:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("\"It’ll be worth it. Trust me.\"",105,420);
c.fillText("Irwin: \"It had better be. You know that a truce like this was never",105,480);
c.fillText("possible when I was in the game, right? To get rid of that thing! We had",105,510);
c.fillText("to risk everything! I was the only one of us to make it out!\"",105,540);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=301;
}
break

case 301:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("\"It’ll be worth it. Trust me.\"",105,420);
c.fillText("Irwin: \"It had better be. You know that a truce like this was never",105,480);
c.fillText("possible when I was in the game, right? To get rid of that thing! We had",105,510);
c.fillText("to risk everything! I was the only one of us to make it out!\"",105,540);
c.fillText("\"I know, but things can’t stay the same forever!\"",105,600);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=302;
}
break

case 302:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("Irwin: \"So restart a war! Tear everyone’s lives apart! I didn’t realize I",105,420);
c.fillText("taught you to be so selfish!\"",105,450);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=303;
}
break

case 303:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("Irwin: \"So restart a war! Tear everyone’s lives apart! I didn’t realize I",105,420);
c.fillText("taught you to be so selfish!\"",105,450);
c.drawImage(image008, 105,30);
c.closePath();
opt1="Leave.";
opt2="Call him out.";
opt(2);
if(optsel==1)
{
  if(selectedopt==0)
  {
    waitlock=waittime;
    slide=304;
    score++;
  }
  if(selectedopt==1)
  {
    waitlock=waittime;
    slide=308;
  }
  selectedopt=0;
}
break

case 304:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("\"I don't need to hear any of this.\"",105,420);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=305;
}
break

case 305:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("\"I don't need to hear any of this.\"",105,420);
c.font = "Italic 18pt Courier New";
c.fillText("You get up and make for the front door.",105,480);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=306;
}
break

case 306:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("\"I don't need to hear any of this.\"",105,420);
c.font = "Italic 18pt Courier New";
c.fillText("You get up and make for the front door.",105,480);
c.font = "Bold 18pt Courier New";
c.fillText("Irwin: \"Fine, get out of here! And don't come back!\"",105,540);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=307;
}
break

case 307:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("\"I don't need to hear any of this.\"",105,420);
c.font = "Italic 18pt Courier New";
c.fillText("You get up and make for the front door.",105,480);
c.font = "Bold 18pt Courier New";
c.fillText("Irwin: \"Fine, get out of here! But don't come back!\"",105,540);
c.font = "Italic 18pt Courier New";
c.fillText("You don't look back before you slam the door behind you. It's time for the",105,600);
c.fillText("delivery.",105,630);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==3)
  fadeOUTtime=80;
if(optsel==1)
{
  transitionOut(307.5);
}
break

case 307.5:
console.log("3 "+optsel);
optsel=-1;
if(optsel==-1)
{
  fadeINtime=80;
  slide=313;
  if(playsongs==1)
  {
    song9.pause();
    song10.play();
  }
}
break

case 308:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("\"And I didn't realize you were such a coward!\"",105,420);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=309;
}
break

case 309:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("\"And I didn't realize you were such a coward!\"",105,420);
c.font = "Italic 18pt Courier New";
c.fillText("Irwin's face goes cold.",105,480);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=310;
}
break

case 310:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("\"And I didn't realize you were such a coward!\"",105,420);
c.font = "Italic 18pt Courier New";
c.fillText("Irwin's face goes cold.",105,480);
c.font = "Bold 18pt Courier New";
c.fillText("Irwin: \"Go.\"",105,540);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=311;
}
break

case 311:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("\"And I didn't realize you were such a coward!\"",105,420);
c.font = "Italic 18pt Courier New";
c.fillText("Irwin's face goes cold.",105,480);
c.font = "Bold 18pt Courier New";
c.fillText("Irwin: \"Go.\"",105,540);
c.font = "Italic 18pt Courier New";
c.fillText("You don't look back before you slam the door behind you. It's time for the",105,600);
c.fillText("delivery.",105,630);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==3)
  fadeOUTtime=80;
if(optsel==1)
{
  transitionOut(307.5);
}
break

case 313:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("You approach the dropoff. The closer you get the more obvious it is that",105,420);
c.fillText("you're the first to arrive.",105,450);
c.drawImage(image025, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=314;
}
break

case 314:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("You approach the dropoff. The closer you get the more obvious it is that",105,420);
c.fillText("you're the first to arrive.",105,450);
c.font = "Bold 18pt Courier New";
c.fillText("\"And usually I'm the late one.\"",105,510);
c.drawImage(image025, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=315;
}
break

case 315:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("You approach the dropoff. The closer you get the more obvious it is that",105,420);
c.fillText("you're the first to arrive.",105,450);
c.font = "Bold 18pt Courier New";
c.fillText("\"And usually I'm the late one.\"",105,510);
c.font = "Italic 18pt Courier New";
c.fillText("From behind, a familiar voice pops up.",105,570);
c.drawImage(image025, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=316;
}
break

case 316:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("You approach the dropoff. The closer you get the more obvious it is that",105,420);
c.fillText("you're the first to arrive.",105,450);
c.font = "Bold 18pt Courier New";
c.fillText("\"And usually I'm the late one.\"",105,510);
c.font = "Italic 18pt Courier New";
c.fillText("From behind, a familiar voice pops up.",105,570);
c.font = "Bold 18pt Courier New";
c.fillText("Gaius: \"Well, well, well. I can’t believe you’re still on this side of the",105,630);
c.fillText("dirt. After all that happened to you.\"",105,660);
c.drawImage(image025, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=317;
}
break

case 317:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("His guards emerge as well. You're outnumbered 4 to 1.",105,420);
c.drawImage(image025, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=318;
}
break

case 318:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("His guards emerge as well. You're outnumbered 4 to 1.",105,420);
c.font = "Bold 18pt Courier New";
c.fillText("\"Oh yeah? I'm pretty survivable.\"",105,480);
c.drawImage(image025, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=319;
}
break

case 319:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("His guards emerge as well. You're outnumbered 4 to 1.",105,420);
c.font = "Bold 18pt Courier New";
c.fillText("\"Oh yeah? I'm pretty survivable.\"",105,480);
c.font = "Italic 18pt Courier New";
c.fillText("The guards ready themselves for a toustle.",105,540);
c.drawImage(image025, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=320;
}
break

case 320:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("His guards emerge as well. You're outnumbered 4 to 1.",105,420);
c.font = "Bold 18pt Courier New";
c.fillText("\"Oh yeah? I'm pretty survivable.\"",105,480);
c.font = "Italic 18pt Courier New";
c.fillText("The guards ready themselves for a toustle.",105,540);
c.font = "Bold 18pt Courier New";
c.fillText("\"Chill out will you guys? And you, middleman! You actually came to a",105,600);
c.fillText("meetup! Albeit guarded, but progress is progress.\"",105,630);
c.drawImage(image025, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=321;
}
break

case 321:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("Gaius: \"Very funny. Now, onto business. Where’re those CDs.\"",105,420);
c.drawImage(image025, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=322;
}
break

case 322:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("Gaius: \"Very funny. Now, onto business. Where’re those CDs.\"",105,420);
c.font = "Bold 18pt Courier New";
c.fillText("\"Amatuer mistake pal. See this is the part where you hand me my",105,480);
c.fillText("earnings. Then I give you what I have. So how about it?\"",105,510);
c.drawImage(image025, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=323;
}
break

case 323:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("Gaius: \"Very funny. Now, onto business. Where’re those CDs.\"",105,420);
c.fillText("\"Amatuer mistake pal. See this is the part where you hand me my",105,480);
c.fillText("earnings. Then I give you what I have. So how about it?\"",105,510);
c.fillText("Gaius: \"You know, I could just pry them off your corpse. If you’d like",105,570);
c.fillText("that option.\"",105,600);
c.drawImage(image025, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=324;
}
break

case 324:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("\"You can, but it’ll be tough to get anything out of them. Those",105,420);
c.fillText("things don’t look mighty accurate. Isn't that why you wanted this stuff?\"",105,450);
c.drawImage(image025, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=325;
}
break

case 325:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("\"You can, but it’ll be tough to get anything out of them. Those",105,420);
c.fillText("things don’t look mighty accurate. Isn't that why you wanted this stuff?\"",105,450);
c.font = "Italic 18pt Courier New";
c.fillText("You produce the CD's",105,510);
c.drawImage(image025, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=326;
}
break

case 326:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("\"You can, but it’ll be tough to get anything out of them. Those",105,420);
c.fillText("things don’t look mighty accurate. Isn't that why you wanted this stuff?\"",105,450);
c.font = "Italic 18pt Courier New";
c.fillText("You produce the CD's",105,510);
c.font = "Bold 18pt Courier New";
c.fillText("Gaius: \"Good, you weren’t bluffing.\"",105,570);
c.drawImage(image025, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=327;
}
break

case 327:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("\"You can, but it’ll be tough to get anything out of them. Those",105,420);
c.fillText("things don’t look mighty accurate. Isn't that why you wanted this stuff?\"",105,450);
c.font = "Italic 18pt Courier New";
c.fillText("You produce the CD's",105,510);
c.font = "Bold 18pt Courier New";
c.fillText("Gaius: \"Good, you weren’t bluffing.\"",105,570);
c.font = "Italic 18pt Courier New";
c.fillText("One of the guards steps up to drop a breifcase at your feet.",105,630);
c.drawImage(image025, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=328;
}
break

case 328:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("Before the guard has a chance to get back in formation. A shot is fired",105,420);
c.fillText("and he slumps dead at your feet.",105,450);
c.drawImage(image025, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=329;
}
break

case 329:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("Before the guard has a chance to get back in formation. A shot is fired",105,420);
c.fillText("and he slumps dead at your feet.",105,450);
c.fillText("\"Oh you got to be kidding me.\" You think.",105,510);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=330;
}
break

case 330:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("Before the guard has a chance to get back in formation. A shot is fired",105,420);
c.fillText("and he slumps dead at your feet.",105,450);
c.fillText("\"Oh you got to be kidding me.\" You think.",105,510);
c.fillText("More gunshots ring out as Gaius and his gang are gunned down one by one.",105,570);
c.fillText("Darren and several Raptors enter the scene.",105,600);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=331;
}
break

case 331:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("Darren: \"Clean-up time.\"",105,420);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=332;
}
break

case 332:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("Darren: \"Clean-up time.\"",105,420);
c.font = "Italic 18pt Courier New";
c.fillText("The team overwhelmes you and soon you find yourself surrounded.",105,480);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=333;
}
break

case 333:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("Darren: \"Clean-up time.\"",105,420);
c.font = "Italic 18pt Courier New";
c.fillText("The team overwhelmes you and soon you find yourself surrounded.",105,480);
c.font = "Bold 18pt Courier New";
c.fillText("Raptor: \"We have him surrounded. Push Forward.\"",105,540);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=334;
}
break

case 334:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("Darren: \"Clean-up time.\"",105,420);
c.font = "Italic 18pt Courier New";
c.fillText("The team overwhelmes you and soon you find yourself surrounded.",105,480);
c.font = "Bold 18pt Courier New";
c.fillText("Raptor: \"We have him surrounded. Push Forward.\"",105,540);
c.font = "Italic 18pt Courier New";
c.fillText("They get closer and closer, upon checking your gun, you find it's empty.",105,600);
c.fillText("There's no time for a reload. This is it. You close your eyes in defeat.",105,630);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==3)
  fadeOUTtime=80;
if(optsel==1)
{
  transitionOut(334.5);
}
break

case 334.5:
console.log("3 "+optsel);
optsel=-1;
if(optsel==-1)
{
  fadeINtime=80;
  slide=335;
}
break

case 335:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("Shots ring out. But you're unscathed.",105,420);
//no image here. His eyes are shut!
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=336;
}
break

case 336:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("Shots ring out. But you're unscathed.",105,420);
c.fillText("Upon opening your eyes. Gaius and Darren on the ground with a bullet in their",105,480);
c.fillText("backs, along with their Guards and raptors. Standing over the corpses, Lev.",105,510);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=337;
}
break

case 337:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("Shots ring out. But you're unscathed.",105,420);
c.fillText("Upon opening your eyes. Gaius and Darren on the ground with a bullet in their",105,480);
c.fillText("backs, along with their Guards and raptors. Standing over the corpses, Lev.",105,510);
c.font = "Bold 18pt Courier New";
c.fillText("Lev: \"I told you I'd be back.\"",105,570);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=338;
}
break

case 338:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("Shots ring out. But you're unscathed.",105,420);
c.fillText("Upon opening your eyes. Gaius and Darren on the ground with a bullet in their",105,480);
c.fillText("backs, along with their Guards and raptors. Standing over the corpses, Lev.",105,510);
c.font = "Bold 18pt Courier New";
c.fillText("Lev: \"I told you I'd be back.\"",105,570);
c.font = "Italic 18pt Courier New";
c.fillText("You eye the suitcase. All you need to do is grab it and go.",105,630);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=339;
}
break

case 339:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("Lev: \"So. What’ll it be, Daley boy? Dead or alive?\"",105,420);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=340;
}
break


case 340:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("Lev: \"So. What’ll it be, Daley boy? Dead or alive?\"",105,420);
c.fillText("\"For you? Dead.\"",105,480);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=342;
}
break

case 342:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("Lev: \"So. What’ll it be, Daley boy? Dead or alive?\"",105,420);
c.fillText("\"For you? Dead.\"",105,480);
c.fillText("Lev: \"Fine by me.\"",105,540);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=343;
}
break

case 343:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("Lev: \"So. What’ll it be, Daley boy? Dead or alive?\"",105,420);
c.fillText("\"For you? Dead.\"",105,480);
c.fillText("Lev: \"Fine by me.\"",105,540);
c.font = "Italic 18pt Courier New";
c.fillText("He flips out his knife and makes a run at you.",105,600);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=344;
}
break

case 344:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("Pinned against the wall, you dodge two distinct swipes of his knife,",105,420);
c.fillText("before kneeing his groin forcing him backwards.",105,450);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=345;
}
break

case 345:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("Pinned against the wall, you dodge two distinct swipes of his knife,",105,420);
c.fillText("before kneeing his groin forcing him backwards.",105,450);
c.fillText("Lev fumbles to firmly grasp his knife. With a window of safety you throw a",105,510);
c.fillText("punch disorienting him, making him drop his knife.",105,540);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=346;
}
break

case 346:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("Pinned against the wall, you dodge two distinct swipes of his knife,",105,420);
c.fillText("before kneeing his groin forcing him backwards.",105,450);
c.fillText("Lev fumbles to firmly grasp his knife. With a window of safety you throw a",105,510);
c.fillText("punch disorienting him, making him drop his knife.",105,540);
c.fillText("Lev is down, giving you time to reload your gun. In one more attempt to",105,600);
c.fillText("get the upperhand, Lev lunges for his knife.",105,630);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
	if(score==0)
		slide=347;
	if(score==1)
		slide=347;
	if(score==2)
		slide=352;
	if(score==3)
		slide=360;
	if(score==4)
			slide=357;
}
break

case 347:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("As he lunges, you fire. Landing a bullet in his back.",105,420);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=348;
}
break

case 348:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("As he lunges, you fire. Landing a bullet in his back.",105,420);
c.font = "Bold 18pt Courier New";
c.fillText("Lev: \"Clever dog. Yes. A clever one indeed.\"",105,480);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=349;
}
break

case 349:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("As he lunges, you fire. Landing a bullet in his back.",105,420);
c.font = "Bold 18pt Courier New";
c.fillText("Lev: \"Clever dog. Yes. A clever one indeed.\"",105,480);
c.font = "Italic 18pt Courier New";
c.fillText("You walk over to the suitcase. Shockingly, it's empty. Behind you a dying",105,540);
c.fillText("Lev starts to chuckle.",105,570);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=350;
}
break

case 350://bloodbath
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("As he lunges, you fire. Landing a bullet in his back.",105,420);
c.font = "Bold 18pt Courier New";
c.fillText("Lev: \"Clever dog. Yes. A clever one indeed.\"",105,480);
c.font = "Italic 18pt Courier New";
c.fillText("You walk over to the suitcase. Shockingly, it's empty. Behind you a dying",105,540);
c.fillText("Lev starts to chuckle.",105,570);
c.font = "Bold 18pt Courier New";
c.fillText("Lev: \"You've restarted a war, and you weren't even paid.\"",105,630);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=351;
}
break

case 351:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("His laugh reaches a fever pitch before you decide you've heard enough of",105,420);
c.fillText("it. You pull the trigger one last time, putting a bullet between his eyes.",105,450);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==3)
	fadeOUTtime=80;
if(optsel==1)
{
  	transitionOut(365);
}
break

case 352: //Money, War Started. Bad Ending
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("As he lunges, you fire. Landing a bullet in his back.",105,420);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=353;
}
break

case 353: //Money, War Started. Bad Ending
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("As he lunges, you fire. Landing a bullet in his back.",105,420);
c.font = "Bold 18pt Courier New";
c.fillText("Lev: \"Clever dog. Yes. A clever one indeed.\"",105,480);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=354;
}
break

case 354: //Money, War Started. Bad Ending
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("As he lunges, you fire. Landing a bullet in his back.",105,420);
c.font = "Bold 18pt Courier New";
c.fillText("Lev: \"Clever dog. Yes. A clever one indeed.\"",105,480);
c.font = "Italic 18pt Courier New";
c.fillText("You walk over to the suitcase. Upon opening it, you're relieved to see that",105,540);
c.fillText("it's full of money. Lev starts chuckling.",105,570);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=355;
}
break

case 355: //Money, War Started. Bad Ending
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("As he lunges, you fire. Landing a bullet in his back.",105,420);
c.font = "Bold 18pt Courier New";
c.fillText("Lev: \"Clever dog. Yes. A clever one indeed.\"",105,480);
c.font = "Italic 18pt Courier New";
c.fillText("You walk over to the suitcase. Upon opening it, you're relieved to see that",105,540);
c.fillText("it's full of money. Lev starts chuckling.",105,570);
c.font = "Bold 18pt Courier New";
c.fillText("Lev: \"At least you got paid for restarting a war.\"",105,630);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=351;
}
break

case 357: //No Money, No war.
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("As he lunges, you fire. Landing a bullet in his back.",105,420);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=358;
}
break

case 358: //No Money, No war.
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("As he lunges, you fire. Landing a bullet in his back.",105,420);
c.font = "Bold 18pt Courier New";
c.fillText("Lev: \"Clever dog. Yes. A clever one indeed.\"",105,480);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=359;
}
break

case 359: //No Money, No war.
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("As he lunges, you fire. Landing a bullet in his back.",105,420);
c.font = "Bold 18pt Courier New";
c.fillText("Lev: \"Clever dog. Yes. A clever one indeed.\"",105,480);
c.font = "Italic 18pt Courier New";
c.fillText("You walk over to the suitcase. Shockingly, it's empty. Behind you a dying",105,540);
c.fillText("Lev starts to chuckle.",105,570);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=360.1;
}
break

case 360.1: //No Money, No war.
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("As he lunges, you fire. Landing a bullet in his back.",105,420);
c.font = "Bold 18pt Courier New";
c.fillText("Lev: \"Clever dog. Yes. A clever one indeed.\"",105,480);
c.font = "Italic 18pt Courier New";
c.fillText("You walk over to the suitcase. Shockingly, it's empty. Behind you a dying",105,540);
c.fillText("Lev starts to chuckle.",105,570);
c.font = "Bold 18pt Courier New";
c.fillText("Lev: \"Some freelancer.\"",105,630);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=351;
}
break

case 360: //Money war doesnt start
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("As he lunges, you fire. Landing a bullet in his back.",105,420);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=361;
}
break

case 361: //Money war doesnt start
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("As he lunges, you fire. Landing a bullet in his back.",105,420);
c.font = "Bold 18pt Courier New";
c.fillText("Lev: \"Clever dog. Yes. A clever one indeed.\"",105,480);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=362;
}
break

case 362: //Money war doesnt start
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("As he lunges, you fire. Landing a bullet in his back.",105,420);
c.font = "Bold 18pt Courier New";
c.fillText("Lev: \"Clever dog. Yes. A clever one indeed.\"",105,480);
c.font = "Italic 18pt Courier New";
c.fillText("You walk over to the suitcase. Upon opening it, you're relieved to see that",105,540);
c.fillText("it's full of money. Lev starts chuckling.",105,570);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=363;
}
break

case 363: //Money war doesnt start
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("As he lunges, you fire. Landing a bullet in his back.",105,420);
c.font = "Bold 18pt Courier New";
c.fillText("Lev: \"Clever dog. Yes. A clever one indeed.\"",105,480);
c.font = "Italic 18pt Courier New";
c.fillText("You walk over to the suitcase. Upon opening it, you're relieved to see that",105,540);
c.fillText("it's full of money. Lev starts chuckling.",105,570);
c.font = "Bold 18pt Courier New";
c.fillText("Lev: \"Clever dog.\"",105,630);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=351;
}
break

case 365:
fadeINtime=80;
slide=365.1;
if(playsongs==1)
{
	song10.pause();
	song11.play();
}
break

case 365.1:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("You open the door to the bar. Jezebel yells.",105,420);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=366;
}
break

case 366:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("You open the door to the bar. Jezebel yells.",105,420);
c.font = "Bold 18pt Courier New";
c.fillText("Jezebel: \"We're closed!\"",105,480);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=367;
}
break

case 367:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("You open the door to the bar. Jezebel yells.",105,420);
c.font = "Bold 18pt Courier New";
c.fillText("Jezebel: \"We're closed!\"",105,480);
c.font = "Italic 18pt Courier New";
c.fillText("As you walk over to her, she notices you're covered in blood.",105,540);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=368;
}
break

case 368:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("You open the door to the bar. Jezebel yells.",105,420);
c.font = "Bold 18pt Courier New";
c.fillText("Jezebel: \"We're closed!\"",105,480);
c.font = "Italic 18pt Courier New";
c.fillText("As you walk over to her, she notices you're covered in blood.",105,540);
c.font = "Bold 18pt Courier New";
c.fillText("Jezebel: \"Jesus Dale! You look like-\"",105,600);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
	if(score==0)
		slide=380;
	if(score==1)
		slide=380;
	if(score==2)
		slide=369;
	if(score==3)
		slide=369;
	if(score==4)
			slide=380;
}
break

case 369:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("\"Shit! Yeah, I heard.\"",105,420);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=370;
}
break

case 370:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("\"Shit! Yeah, I heard.\"",105,420);
c.fillText("Jezebel: \"I suppose I can let this one slide.\"",105,480);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=371;
}
break

case 371:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("\"Shit! Yeah, I heard.\"",105,420);
c.fillText("Jezebel: \"I suppose I can let this one slide.\"",105,480);
c.font = "Italic 18pt Courier New";
c.fillText("You place the suitcase on the bar.",105,540);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=372;
}
break

case 372:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("\"Shit! Yeah, I heard.\"",105,420);
c.fillText("Jezebel: \"I suppose I can let this one slide.\"",105,480);
c.font = "Italic 18pt Courier New";
c.fillText("You place the suitcase on the bar.",105,540);
c.font = "Bold 18pt Courier New";
c.fillText("Dale: \"Here's the money for those damages.\"",105,600);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=373;
}
break

case 373:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("Jezebel: \"I think I underestimated you dale.\"",105,420);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=374;
}
break

case 374:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("Jezebel: \"I think I underestimated you dale.\"",105,420);
c.fillText("\"People keep doing that.\"",105,480);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=375;
}
break

case 375:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("Jezebel: \"I think I underestimated you dale.\"",105,420);
c.fillText("\"People keep doing that.\"",105,480);
c.font = "Italic 18pt Courier New";
c.fillText("From behind the bar, she produces two glasses and a bottle of wine.",105,540);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=376;
}
break

case 376:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("Jezebel: \"I think I underestimated you dale.\"",105,420);
c.fillText("\"People keep doing that.\"",105,480);
c.font = "Italic 18pt Courier New";
c.fillText("From behind the bar, she produces two glasses and a bottle of wine.",105,540);
c.font = "Bold 18pt Courier New";
c.fillText("Jezebel: \"This calls for a celebration.\"",105,600);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=377;
}
break

case 377:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("\"Thanks Jez.\"",105,420);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=378;
}
break

case 378:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("\"Thanks Jez.\"",105,420);
c.font = "Italic 18pt Courier New";
c.fillText("She looks you in your eyes.",105,480);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=379;
}
break

case 379:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("\"Thanks Jez.\"",105,420);
c.font = "Italic 18pt Courier New";
c.fillText("She looks you in your eyes.",105,480);
c.font = "Bold 18pt Courier New";
c.fillText("Jezebel: \"It's no problem.\"",105,540);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=1;
}
break

case 380:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("\"Shit! Yeah, I heard.\"",105,420);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=381;
}
break


case 381:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("\"Shit! Yeah, I heard.\"",105,420);
c.fillText("Jezebel: \"I suppose I can let this one slide.\"",105,480);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=382;
}
break

case 382:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("\"Shit! Yeah, I heard.\"",105,420);
c.fillText("Jezebel: \"I suppose I can let this one slide.\"",105,480);
c.font = "Italic 18pt Courier New";
c.fillText("You sit at the bar. She walks around the bar holding two glasses and",105,540);
c.fillText("whiskey.",105,570);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=383;
}
break

case 383:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("\"Shit! Yeah, I heard.\"",105,420);
c.fillText("Jezebel: \"I suppose I can let this one slide.\"",105,480);
c.font = "Italic 18pt Courier New";
c.fillText("You sit at the bar. She walks around the bar holding two glasses and",105,540);
c.fillText("whiskey.",105,570);
c.font = "Bold 18pt Courier New";
c.fillText("\"Thanks Jez. Now about that money I owe you.\"",105,630);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=384;
}
break

case 384:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("Jezebel giggles.",105,420);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=385;
}
break

case 385:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("Jezebel giggles.",105,420);
c.font = "Bold 18pt Courier New";
c.fillText("Jezebel: \"Shut up Dale.\"",105,480);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=386;
}
break

case 386:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("Jezebel giggles.",105,420);
c.font = "Bold 18pt Courier New";
c.fillText("Jezebel: \"Shut up Dale.\"",105,480);
c.font = "Italic 18pt Courier New";
c.fillText("You smile at her. But soon feel a sharp pain in your throat.",105,540);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=387;
}
break

case 387:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Italic 18pt Courier New";
c.fillText("Jezebel giggles.",105,420);
c.font = "Bold 18pt Courier New";
c.fillText("Jezebel: \"Shut up Dale.\"",105,480);
c.font = "Italic 18pt Courier New";
c.fillText("You smile at her. But soon feel a sharp pain in your throat.",105,540);
c.fillText("You look down. Blood drips out of your mouth onto your palm.",105,600);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=388.2;
}
break


case 388.2:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("Jezebel: \"I'm sorry I had to do this Dale. But I need to pay for those",105,420);
c.fillText("damages somehow.\"",105,450);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=388.3;
}
break

case 388.3:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("Jezebel: \"I'm sorry I had to do this Dale. But I need to pay for those",105,420);
c.fillText("damages somehow.\"",105,450);
c.font = "Italic 18pt Courier New";
c.fillText("You stumble out of your chair, landing at her feet. Vision fading.",105,510);
c.drawImage(image008, 105,30);
c.closePath();
transitionIn();
opt(0);
if(optsel==1)
{
  slide=388.4;
}
break

case 388.4:
c.fillStyle="white";
c.textAlign = "left";
c.font = "Bold 18pt Courier New";
c.fillText("Jezebel: \"I'm sorry I had to do this Dale. But I need to pay for those",105,420);
c.fillText("damages somehow.\"",105,450);
c.font = "Italic 18pt Courier New";
c.fillText("You stumble out of your chair, landing at her feet. Vision fading.",105,510);
c.font = "Bold 18pt Courier New";
c.fillText("Jezebel: \"You're worth more to me dead than alive.\"",105,570);
c.drawImage(image008, 105,30);//blood image here.
c.closePath();
transitionIn();
opt(0);
if(optsel==3)
    fadeOUTtime=80;
if(optsel==1)
{
      transitionOut(388.5);
}
break

case 388.5:
if(optsel==-1)
{
	fadeINtime=80;
	slide=1;
}
break
	  }
}


/**
transition functions
transitions to next function with a fade to black.
use this syntax:
fadeINtime=80; //done beforehand
transitionIn()
or
fadeOUTtime=80; //done beforehand
transitionOUT(NEXT SLIDE NUIMBER)
Keep in mind that fade out then fade in needs a slide between them.
**/


function transitionIn()
{
	if(fadeINtime>0)
	{
		fadeINtime--;
		c.beginPath();
		c.globalAlpha=((1/80)*fadeINtime);
		c.fillStyle="black";
		c.fillRect(0,0,canvas.width,canvas.height);
		c.closePath();
	}
}

function transitionOut(s)
{
	if(fadeOUTtime>0)
	{
		optsel=2;
		fadeOUTtime--;
		c.beginPath();
		c.globalAlpha=(((-1/80)*fadeOUTtime)+1);
		c.fillStyle="black";
		c.fillRect(0,0,canvas.width,canvas.height);
		c.closePath();
	}
	if(fadeOUTtime==0)
	{
		slide=s;
		optsel=-1;
	}
}

/**
opt function
Option Selection

opt(number of options);

returns opt1txt, opt2txt, opt3txt
**/
function opt(a)
{
	if(waitlock>0)
		waitlock--;
	if(waitlock==0&&fadeINtime==0&&fadeOUTtime==0)
		lock=0;
	else
		lock=1;
	if(optsel==-1)
		optsel=0;
	if(a==0)
	{
		if(lock==0)
		{
		c.beginPath();
		c.textAlign = "center";
		c.font = "Bold 22pt Courier New";
		c.fillStyle="white";
		c.drawImage(bat2, 512, 685);
		if(optsel>0)
			c.drawImage(bat, 512, 685);
		//c.fillText("[Insert Bat here]",midx,700);
		c.closePath();
		}
	}
	if(a==1)
		selectedopt=0;

	//console.log(a+" "+selectedopt+" "+optsel);

	if(optsel<0)
		console.log("debug moment!");
		//slide=slide-1;

	if(optsel>0)
		optsel = optsel - 1;

	opt1txt = spacetxt + opt1;
	if(selectedopt==0)
		opt1txt = arrowtxt + opt1;

	opt2txt = spacetxt + opt2;
	if(selectedopt==1)
		opt2txt = arrowtxt + opt2;

	opt3txt = spacetxt + opt3;
	if(selectedopt==2)
		opt3txt = arrowtxt + opt3;

	c.beginPath();
	c.textAlign = "left";
	c.font = "Bold 22pt Courier New";
	c.fillStyle="white";
	if(optsel>0&&selectedopt==0)
		c.fillStyle="purple";
	if(a>=1)
		c.fillText(opt1txt,200,550);
	c.fillStyle="white";
	if(optsel>0&&selectedopt==1)
		c.fillStyle="purple";
	if(a>=2)
		c.fillText(opt2txt,200,600);
	c.fillStyle="white";
	if(optsel>0&&selectedopt==2)
		c.fillStyle="purple";
	if(a>=3)
		c.fillText(opt3txt,200,650);
	c.closePath();
}

/**
mouseUp(mouse)
function that figures out what you're clicking on
**/
function mouseUp(mouse)																											// --- mouseup ---
{//start mouseup
	var mouseX = mouse.pageX-canvas.offsetLeft; //x location of mouse
	var mouseY = mouse.pageY-canvas.offsetTop; //y location of mouse

	if(start==0){
		if(mouseX > openbuttonx && mouseX < openbuttonx+460){
			if(mouseY > openbuttony && mouseY < openbuttony+100){
				start=1;
				console.log("Program Initiated!");
			}
		}
	}
}

/**
keystroke(key)
function that accepts keyboard input
**/
function keystroke(key)																					// --- keystroke ---
{ //begin KEYSTROKE


	switch(key.keyCode)
	{//start switch
		case 38:
		//console.log("UP!");
		if(selectedopt>0&&optsel==0&&lock==0)
			selectedopt=selectedopt-1;
		break
		case 40:
		//console.log("DOWN!");
		if(selectedopt<1&&optsel==0&&lock==0) //this value is hardcoded, if you want 3 options you've gotta switch out this 1 for a variable
			selectedopt=selectedopt+1;
		break
		case 32:
		//console.log("SPACE!");
		if(optsel==0&&lock==0)
		{
			optsel=4; //THESE VALUES ARE THE WAIT LENGTH AFTER YOU PRESS THE BUTTON //WAS 4 FOR PROGRAMMING
			console.log("spacebar pressed");
			//slide=slide-1; //debug
		}
		break
		case 13:
		//console.log("RETURN!");
		if(optsel==0&&lock==0)
			optsel=30; //VALUE WAS 30 FOR LEGIT GAME
		break
	}//endswitch

}

// Mouse move function
function mouseMove(mouse)
{
	 mouseX = mouse.pageX-canvas.offsetLeft;
	 mouseY = mouse.pageY-canvas.offsetTop;
 } // end mouseMove

// Mouse click function
function mouseDown(mouse)																											// --- mousedown ---
{//start mouseup
	var mouseX = mouse.pageX-canvas.offsetLeft; //x location of mouse
	var mouseY = mouse.pageY-canvas.offsetTop; //y location of mouse
}
