/*Javascript

Casa Rural Severino

autor: Borja Herrero borherga@gmail.com
fecha de creación: 11/10/2010
última modificación: 20/10/2010
*/

function navegacion(){
	//navegaci&oacute;n menu
	var link = $("#menu ul li.activo").find("a").attr("rel");
		if(link != "") {
			$("#submenu .submenu-"+link).toggleClass('toggled');
			$("#submenu .submenu-"+link).slideToggle();
		}
	/*$("#menu ul li").click(function(event){
		//event.preventDefault();
		$(".activo").removeClass('activo');
		$(this).addClass('activo');
		//si hay alg&uacute;n menu mostr&aacute;ndose ocultarlo y quitarle la clase
		if($("#submenu ul").is(".toggled")) {
			$(".toggled").slideToggle();
			$(".toggled").removeClass("toggled");
		}
		//si no, mostramos el que corresponda	
		var link = $(this).find("a").attr("rel");
		if(link != "") {
			$("#submenu .submenu-"+link).toggleClass('toggled');
			$("#submenu .submenu-"+link).slideToggle();
		}
		
		if($(this).find("a").attr("href") != "#") cargarContenido(link);
	});*/
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
	$("#cuerpo").load(pagina/*+" #cuerpo"*/, function(){
		//$("#cuerpo #cuerpo").unwrap();
		//Si existe la imagen con texto, activamos efectos
		if($("#imagen .texto-imagen").length){
			$("#imagen .texto-imagen").show(); //mostramos el texto
			$("#imagen .texto-imagen").animate({ opacity: 0.5 }, 1 ); //le damos opacidad para que se vea

			$("#miniaturas #imgs li:first").addClass('active');  //aplicamos clase active al primer elemento
			$('ul#imgs li').not(".active").not(".slider li").css({opacity:".5"}); //quitamos opacidad al resto
			
			
			//Activamos el slideshow
			$(".slider").easySlider({
				controlsShow: false,
				auto: true, 
				continuous: true,
				speed: 1000
			});

			//Precarga de las imágenes del contenido
			/*var imagenes= new Array();
			$("#miniaturas #imgs li a").each(function(){
				imagenes.push($(this).attr("href"));
			})*/
		}
	});
	return false;
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
				$("#imagen .texto-imagen").html(imgTxt).animate({ opacity: 0.5,	marginRight: "0" }, 250 );
				$("#imagen .slider").replaceWith('<div class="slider">'+imgList+'</div>');
				
				$(".slider").easySlider({
					controlsShow: false,
					auto: true, 
					continuous: true,
					speed: 3000
				});
			});
		}
		
		$("#miniaturas ul li").removeClass('active'); //Quitamos clase 'active'
		$(this).addClass('active');  //Añadimos 'active' sólo al seleccionado
		$('ul#imgs li').not(".active").not(".slider li").css({opacity:".5"}); //Quitamos opacidad a los no seleccionados
		return false;	
	});
$("#miniaturas #imgs li").live('mouseenter', function(){ //Al pasar por encima...
		$(this).fadeTo(500,1); //Opacidad -> 1
	});
$("#miniaturas #imgs li").live('mouseleave', function() {
		$(this).not('.active.').fadeTo(500,.5);
	});