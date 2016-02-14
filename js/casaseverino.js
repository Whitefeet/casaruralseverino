/*Javascript

Casa Rural Severino

autor: Borja Herrero <borherga@gmail.com>
fecha de creación: 11/10/2010
última modificación: 26/10/2010
*/

function navegacion(){
	//navegaci&oacute;n menu
	var link = $("#menu ul li.activo").find("a").attr("rel");
		if(link != "") {
			$("#submenu .submenu-"+link).toggleClass('toggled');
			$("#submenu .submenu-"+link).delay(1000).slideToggle("normal");
		}

	//navegaci&oacute;n submenu
	$("#submenu ul li").click(function(event) {
		event.preventDefault();
		$("#submenu ul li.activo").removeClass('activo');
		$(this).addClass('activo');
		
		var link = $(this).find("a").attr("rel");
		cargarContenido(link);
	});
}

function cargarContenido(link) {
	var pagina = link+".html";
	$("#cuerpo").load(pagina, function(){
		activarContenido();
		activarEnlaces();
	});
	return false;
}

function activarContenido(){
//Si existe la imagen con texto, activamos efectos
		if($("#imagen .texto-imagen").length){
			$("#imagen .texto-imagen").show(); //mostramos el texto
			$("#imagen .texto-imagen").animate({ opacity: 0.7 }, 1 ); //le damos opacidad para que se vea

			$("#miniaturas #imgs li:first").addClass('active');  //aplicamos clase active al primer elemento
			$('ul#imgs li').not(".active").not(".slider li").css({opacity:".5"}); //quitamos opacidad al resto
			
			//Activamos el slideshow
			$("#imagen .slider").addClass('activos');
			activarSlider();
		}
}

function activarEnlaces(){
      $("a.target_blank").attr("target", "_blank");
}
function activarSlider(){
	// sólo activamos si hay más de una imagen
	if($(".slider.activos ul li").length > 1) {
		$(".slider.activos").easySlider({
			auto: true, 
			continuous: false,
			controlsShow: false,
			prevId: 		'prevBtn',
			prevText: 		'Anterior',
			nextId: 		'nextBtn',	
			nextText: 		'Siguiente',
			controlsShow:		true,
			controlsBefore:	'<div id="controls">',
			controlsAfter:		'</div>',
			speed: 3000
		});
	}
}



//Función para cargar la imagen principal y los textos desde las miniaturas del lateral
$("#miniaturas #imgs li").live('click', function(event){
		event.preventDefault();
		//var imgAlt = $(this).find('img').attr("alt"); //Cogemos el Alt de la imagen
		var imgList = $(this).find('.slider').html(); //lista de imagenes
		var imgTxt = $(this).find('.texto-mini').html(); 	//Texto que aparecerá sobre la imagen
		var imgTxtWidth = 100; // Ancho del texto
		
		if ($(this).is(".active")) {  //Si ya está activo...
			return false; // Que no deje clicar
		} else {
			//Animamos el bloque de texto				
			$("#imagen .texto-imagen").animate({ opacity: 0, marginRight: -imgTxtWidth }, 250 , function() {
				$("#imagen .texto-imagen").html(imgTxt).animate({ opacity: 0.7,	marginRight: "0" }, 250 );
				$("#imagen .slider").replaceWith('<div class="slider">'+imgList+'</div>');
				
				$("#controls").remove();
				$("#imagen .slider").addClass("activos");
				activarSlider();
			});
		}
		
		$("#miniaturas ul li").removeClass('active'); //Quitamos clase 'active'
		$(this).addClass('active');  //Añadimos 'active' sólo al seleccionado
		$('ul#imgs li').not(".active").not(".slider li").css({opacity:".5"}); //Quitamos opacidad a los no seleccionados
		return false;	
	});
$("#miniaturas #imgs li").live('mouseenter', function(){ //Al pasar por encima...
		$(this).stop().fadeTo(500,1); //Opacidad -> 1
	});
$("#miniaturas #imgs li").live('mouseleave', function() {
		$(this).stop().not('.active.').fadeTo(500,.5);
	});
	
/*************************************************************************************************/
/*********** GALERIA **********/
function activarGaleria(){
	$("#galeria li").css({opacity:.5});

	$("#galeria li").live('mouseenter', function(){ //Al pasar por encima...
			$(this).stop().fadeTo(500,1); //Opacidad -> 1
	});
	$("#galeria li").live('mouseleave', function(){ //Al pasar por encima...
			$(this).stop().fadeTo(500,.5); //Opacidad -> 1
	});
		
	var widthGal = $("#imagenPpal").width()+6; //6 es el margin
	var leftact =  $("#galeria").position().left;
	var numimg = $("#galeria li").length;
	var maxwidth = $("#galeria li").width()*numimg+numimg*6;
	
	$("#galeria").width(maxwidth);

	$("#controlsGalerianext").live('click', function(event){
		event.preventDefault();
		if(-leftact < maxwidth) {
			leftact -= widthGal; //actualizamos leftact
			$("#galeria").animate({ left: leftact }, 250 );
			if(leftact >= 0) $("#controlsGaleriaprev").css('display', 'none');
			else if(-(leftact-widthGal) >= maxwidth) $("#controlsGalerianext").css('display', 'none'); //si estamos en el final ocultamos <next></next>
			$("#controlsGaleriaprev").css('display', 'inline');
		}
	});
	$("#controlsGaleriaprev").live('click', function(event){
		event.preventDefault();
		if(leftact < 0) {
			leftact += widthGal; //actualizamos leftact
			$("#galeria").animate({ left: leftact }, 250 );
			if(leftact >= 0) $("#controlsGaleriaprev").css('display', 'none'); //si estamos en el inicio ocultamos anterior
			if(maxwidth>leftact) $("#controlsGalerianext").css('display', 'inline');
		}
	});
}
