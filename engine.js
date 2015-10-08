var i=1;
var jogadorAtual = 0;
var jogada = 0;
var pares = 8;
var elementos = "";
var pecas = new Array();
var letras = new Array();
var jogadores = new Array();
var pontos = new Array(0,0);

/*
function imprime(){
    var charac=elementos.substr(1,1);
    alert(Math.round(Math.random()*3)+" - "+charac);
    i++;
}
*/

function encheTabuleiro()
{	
    elementos = "AABB";
    elementos += "CCDD";
    elementos += "EEFF";
    elementos += "GGHH";
}

function tabuleiro(){
    tabuleiro="<p id=\"jogadorAtual\"></p>";
    encheTabuleiro();
    for(linha=0;linha<pares/2;linha++){
        for(coluna=0;coluna<pares/2;coluna++){
            var posicao = Math.round(Math.random()*(elementos.length - 1));
            var charac=elementos.substr(posicao,1);
            tabuleiro +=
                '<a href="#" onclick="mostra(\''+linha+coluna+'\','+'\''+charac+'\');" id="'+linha+coluna+charac+'">'+
                    '<img id="'+linha+coluna+'" src="img/blank.png" name="'+charac+'">'+
                '</a>';
            if(elementos.length>0){
                elementos=elementos.substr(0,posicao) + elementos.substr(posicao+1);
            }
            //document.write(elementos);
        }
        tabuleiro += "<br>";
    }
    jogadores[0] = document.getElementById("jogador0").value;
    jogadores[1] = document.getElementById("jogador1").value;
    document.getElementById("tabuleiro").innerHTML=tabuleiro;
    atualizaPlacar();
    document.getElementById("botao").innerHTML = '<input type="button" onclick="reiniciar();" value="Reiniciar">';
    $("input[type=button]").button();
    //document.write(tabuleiro);
}

function mostra(id,charac)
{
    var img = $("<img>", {
        id: id
        ,src: "img/"+charac+".png",
        name: charac
    });
    $("#"+id+charac).html(img);
    pecas[jogada]=id;
    letras[jogada] = charac;
    jogada++;
    //alert('img/'+id+charac+'.png');
    if(jogada>1)
    {
        jogada=0;
        if (!comparaPecas())
        {
            jogadorAtual = (jogadorAtual>0) ? 0 : 1;
        }
        atualizaPlacar();
    }
}

function comparaPecas(){
    var img1 = $("<img>", {
        id: pecas[1]
        , src: "img/"+letras[1]+".png"
        , name: letras[1] 
    });
    $("#"+pecas[1]+letras[1]).html(img1);
    $("#"+pecas[1]+letras[1]).show();
    if((letras[0] == letras[1]) && (pecas[0] != pecas[1]))
    {
        tocaSom("woohoo.wav");
        alert("Uhu!");
        pontos[jogadorAtual]++;
        document.getElementById(pecas[0]+letras[0]).onclick = '';
        document.getElementById(pecas[1]+letras[1]).onclick = '';
        //document.getElementById(pecas[0]).disabled = true;
        //document.getElementById(pecas[1]).disabled = true;
        return true;
    }
    else
    {
        var img = new Array();
        img[0] = $("<img>", {
            id: pecas[0]
            , src: "img/blank.png"
            , name: letras[0]
        });
        img[1] = $("<img>", {
            id: pecas[1]
            , src: "img/blank.png"
            , name: letras[1]
        });
        tocaSom("doh.wav");
        alert("Daugh!");
        $("#"+pecas[0]+letras[0]).html(img[0]);
        $("#"+pecas[1]+letras[1]).html(img[1]);
        return false;
    }
}

function atualizaPlacar(){
    $("#jogadorAtual").html("Vez: <font class=\"rosa\">"+jogadores[jogadorAtual]+"</font>");
    $("#placar1").html(jogadores[0]
        +"<br><font class=\"rosa\"><span class=\"big\">"
        +pontos[0]+"</span> pontos</font>");
    $("#placar2").html(jogadores[1]
        +"<br><font class=\"rosa\"><span class=\"big\">"
        +pontos[1]+"</span> pontos</font>");
}

function reiniciar(){
    document.location.href = document.URL.replace("#", "");
}

function tocaSom(soundfile)
{
    var snd = "<embed src=\"snd/"+soundfile+"\" controller=\"false\" autoplay=\"true\" autostart=\"True\" type=\"audio/wav\">";
    $("#snd").html(snd);
    //$("#snd").hide();
    return true;
}

function sleep(milliSeconds) {
    var startTime = new Date().getTime(); // get the current time
    while (new Date().getTime() < startTime + milliSeconds); // hog cpu
}

$(document).ready(function(){
    $("input[type=button]").button();
    var letra = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H');
    for (var i=0; i<8; i++)
    {
        var img = '<img src="img/'+letra[i]+'.png">';
        $("#galeria").append(img);
    }
});

//Chuva de estrelas do mouse.
var colour="#FF1493";
var sparkles=50;
var x=ox=400;
var y=oy=300;
var swide=800;
var shigh=600;
var sleft=sdown=0;
var tiny=new Array();
var star=new Array();
var starv=new Array();
var starx=new Array();
var stary=new Array();
var tinyx=new Array();
var tinyy=new Array();
var tinyv=new Array();
document.onmousemove=mouse;
window.onresize=set_width;
window.onload=function() { if (document.getElementById) {
	var i, rats, rlef, rdow;
	for (var i=0; i<sparkles; i++) {
		var rats=createDiv(3, 3);
		rats.style.visibility="hidden";
		document.body.appendChild(tiny[i]=rats);
		starv[i]=0;
		tinyv[i]=0;
		var rats=createDiv(5, 5);
		rats.style.backgroundColor="transparent";
		rats.style.visibility="hidden";
		var rlef=createDiv(1, 5);
		var rdow=createDiv(5, 1);
		rats.appendChild(rlef);
		rats.appendChild(rdow);
		rlef.style.top="2px";
		rlef.style.left="0px";
		rdow.style.top="0px";
		rdow.style.left="2px";
		document.body.appendChild(star[i]=rats);
	}
	set_width();
	sparkle();
}}
function sparkle() {
	var c;
	if (x!=ox || y!=oy) {
		ox=x;
		oy=y;
		for (c=0; c<sparkles; c++) if (!starv[c]) {
			star[c].style.left=(starx[c]=x)+"px";
			star[c].style.top=(stary[c]=y)+"px";
			star[c].style.clip="rect(0px, 5px, 5px, 0px)";
			star[c].style.visibility="visible";
			starv[c]=50;
			break;
		}
	}
	for (c=0; c<sparkles; c++) {
		if (starv[c]) update_star(c);
		if (tinyv[c]) update_tiny(c);
	}
	setTimeout("sparkle()", 40);
}
function update_star(i) {
	if (--starv[i]==25) star[i].style.clip="rect(1px, 4px, 4px, 1px)";
	if (starv[i]) {
		stary[i]+=1+Math.random()*3;
		if (stary[i]<shigh+sdown) {
			star[i].style.top=stary[i]+"px";
			starx[i]+=(i%5-2)/5;
			star[i].style.left=starx[i]+"px";
		} else {
			star[i].style.visibility="hidden";
			starv[i]=0;
			return;
		}
	} else {
		tinyv[i]=50;
		tiny[i].style.top=(tinyy[i]=stary[i])+"px";
		tiny[i].style.left=(tinyx[i]=starx[i])+"px";
		tiny[i].style.width="2px";
		tiny[i].style.height="2px";
		star[i].style.visibility="hidden";
		tiny[i].style.visibility="visible"
	}
}
function update_tiny(i) {
	if (--tinyv[i]==25) {
		tiny[i].style.width="1px";
		tiny[i].style.height="1px";
	}
	if (tinyv[i]) {
		tinyy[i]+=1+Math.random()*3;
		if (tinyy[i]<shigh+sdown) {
			tiny[i].style.top=tinyy[i]+"px";
			tinyx[i]+=(i%5-2)/5;
			tiny[i].style.left=tinyx[i]+"px";
		} else {
			tiny[i].style.visibility="hidden";
			tinyv[i]=0;
			return;
		}
	}
	else tiny[i].style.visibility="hidden";
}
function mouse(e) {
	set_scroll();
	y=(e)?e.pageY:event.y+sdown;
	x=(e)?e.pageX:event.x+sleft;
}
function set_scroll() {
	if (typeof(self.pageYOffset)=="number") {
		sdown=self.pageYOffset;
		sleft=self.pageXOffset;
	}
	else if (document.body.scrollTop || document.body.scrollLeft) {
		sdown=document.body.scrollTop;
		sleft=document.body.scrollLeft;
	}
	else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
		sleft=document.documentElement.scrollLeft;
		sdown=document.documentElement.scrollTop;
	}
	else {
		sdown=0;
		sleft=0;
	}
}
function set_width() {
	if (typeof(self.innerWidth)=="number") {
		swide=self.innerWidth;
		shigh=self.innerHeight;
	}
	else if (document.documentElement && document.documentElement.clientWidth) {
		swide=document.documentElement.clientWidth;
		shigh=document.documentElement.clientHeight;
	}
	else if (document.body.clientWidth) {
		swide=document.body.clientWidth;
		shigh=document.body.clientHeight;
	}
}
function createDiv(height, width) {
	var div=document.createElement("div");
	div.style.position="absolute";
	div.style.height=height+"px";
	div.style.width=width+"px";
	div.style.overflow="hidden";
	div.style.backgroundColor=colour;
	return (div);
}
