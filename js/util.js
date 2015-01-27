//var polygonArray = [];
$(document).ready(function() {

    /*$('.caption').capty({
                animation:  'fixed'
            });*/

    var formAjaxPptions = {
        success: fnt_showResponse
    };
    $(document).on('submit', 'form', function() {
        //if ($(this).validate()) {
            $(this).ajaxSubmit(formAjaxPptions);
        //}
        return false;
    });
    function fnt_showResponse(responseText, statusText, xhr, $form) {
        var response = responseText;
        response = JSON.parse(responseText);
        if (response.callback) {
            if (response.data) {
                window[response.callback](response.data);
            } else {
                window[response.callback](response);
            }
        }
        if (response.message) {
            alert(response.message);
            location.reload();
        };
    }

    $(".link").on("click",function (event) {
        event.preventDefault();
        //get the link location that was clicked
        var pageurl = $(this).attr('href');
        var rel = $(this).attr('rel');
        if (rel !== "" && rel !== undefined) {
            rel="&id="+rel;
        }else{
            rel = "";
        }
        //to get the ajax content and display in div with id 'content'
        window.location.href = "?page="+pageurl+rel;
        //$('#content').load(pageurl+rel);
        /*$.ajax({
            url:pageurl+rel,
            success: function(data){
                $('#content').html("");
                $('#content').html(data);                
                /*$('#trigger')[0].click(function() {
                    //alert("test 1");
                });
            }
        });*/
        //to change the browser URL to the given link location
        /*if(pageurl!=window.location){
            if (rel !== "" && rel !== undefined) {
                window.history.pushState({path:$(this).attr('href')},'','?page='+$(this).attr('href')+"&id="+$(this).attr('rel'));
            }else{
                window.history.pushState({path:$(this).attr('href')},'','?page='+$(this).attr('href'));
            }
        }*/
        //stop refreshing to the page given in
        return false;
    });

    $(".pjlink").on("click",function (event) {
        event.preventDefault();
        var pageurl = $(this).attr('href');
        //to get the ajax content and display in div with id 'content'
        $.ajax({
            url:pageurl,
            success: function(data){
                $('#projectinfo').html("");
                $('#projectinfo').html(data);
            }
        });
        //$('#projectinfo').load(pageurl);
        //window.location.href = pageurl;
        //stop refreshing to the page given in
        return false;
    });

    /*if (getUrlVars()["page"] !== undefined) {
        pageurl = getContent(getUrlVars()["page"]);
        $.ajax({
            url:pageurl+'?rel=link',
            success: function(data){
                $('#content').html("");
                $('#content').html(data);
                $(".tip").tooltip();
            }
        });
    };*/

    /*$(window).resize(function() {
    if(this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function() {
        $(this).trigger('resizeEnd');
    }, 10);
    });*/

$('.collapse').on('shown.bs.collapse', function(){
    $(this).parent().find(".arrowCollapse").attr("src","images/up.png");
}).on('hidden.bs.collapse', function(){
    $(this).parent().find(".arrowCollapse").attr("src","images/down.png");
});

});

function fnt_ajaxRequest(service, method, data, callback) {
    $.ajax({
        type: "post",
        url: "router.php?class="+service + "&method=" + method,
        dataType: "json",
        data: data,
        success: function(r) {
            if (callback) {
                callback(JSON.parse(r.data));
            }
            if (r.callback) {
                window[r.callback](JSON.parse(r.data));
            } else if (r.message) {
                bootbox.alert(r.message);
            }

        },
        failure: function(errMsg) {
            //alert("Failure");
        },
        error: function(x, t, m) {
            //alert("Error");
        }
    });
}

function fnt_getValuesGroup(el) {
    var value = $(el).val();
    if (value !== 0 && value !== "0") {
        fnt_ajaxRequest("iga", "loadGroupValues", {"selectDepartamento": $(".selectDepartamento").val()}, function(r) {
            var variable = $(".selectDepartamento").val();
            $(".selectGroupValues").html("<option value='0'>Seleccione Municipio</option>");
            $.each(r, function(index, valor) {
                var str = valor.alcaldia;
                var value = str;
                $(".selectGroupValues").append("<option value='" + value + "'>" + str + "</option>");
            });
            $(".selectGroupValues").show();
        });
    } else {
        $(".selectGroupValues").val(0);
        $(".selectGroupValues").hide();
    }
}

function fnt_getValuesGroupSanciones(el) {
    var value = $(el).val();
    if (value !== 0 && value !== "0") {
        fnt_ajaxRequest("sanciones", "loadGroupValues", {"selectDepartamento": $(".selectDepartamento").val()}, function(r) {
            var variable = $(".selectDepartamento").val();
            $(".selectGroupValues").html("<option value='0'>Seleccione Municipio</option>");
            $.each(r, function(index, valor) {
                var str = valor.municipio;
                var value = str;
                $(".selectGroupValues").append("<option value='" + value + "'>" + str + "</option>");
            });
            $(".selectGroupValues").show();
        });
    } else {
        $(".selectGroupValues").val(0);
        $(".selectGroupValues").hide();
    }
}

function fnt_getValuesGroupSancionesDet(el) {
    var value = $(el).val();
    if (value !== 0 && value !== "0" && value === "departamento") {
        fnt_ajaxRequest("sanciones", "loadGroupValuesDet", null, function(r) {
            var variable = $(".selectDepartamento").val();
            $(".selectDepartamento").html("<option value='0'>Seleccione Departamento</option>");
            $.each(r, function(index, valor) {
                var str = valor.departamento;
                var value = str;
                $(".selectDepartamento").append("<option value='" + value + "'>" + str + "</option>");
            });
            $(".selectDepartamento").show();
        });
    } else {
        $(".selectDepartamento").val(0);
        $(".selectDepartamento").val(0);
        $(".selectGroupValues").val(0);
        $(".selectGroupValues").hide();
    }
}

function fnt_showMap(data) {
    var myLatlng = new google.maps.LatLng(data.points[0].latitud, data.points[0].longitud);
    var infowindow = new google.maps.InfoWindow();
    var mapOptions = {
        zoom: 14, // The initial zoom level when your map loads (0-20)
        minZoom: 0, // Minimum zoom level allowed (0-20)
        maxZoom: 20, // Maximum soom level allowed (0-20)
        zoomControl: true, // Set to true if using zoomControlOptions below, or false to remove all zoom controls.
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.DEFAULT // Change to SMALL to force just the + and - buttons.
        },
        center: myLatlng, // Centre the Map to our coordinates variable
        mapTypeId: google.maps.MapTypeId.ROADMAP, // Set the type of Map

        // All of the below are set to true by default, so simply remove if set to true:
        panControl: false, // Set to false to disable
        mapTypeControl: true, // Disable Map/Satellite switch
        scaleControl: false, // Set to false to hide scale
        streetViewControl: false, // Set to disable to hide street view
        overviewMapControl: false, // Set to false to remove overview control
        rotateControl: false // Set to false to disable rotate control
    }
    $("#map_div").empty();
    var map = new google.maps.Map(document.getElementById('map_div'), mapOptions); // Render our map within the empty div
    var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode : null,
        drawingControl : true,
        drawingControlOptions : {
            position : google.maps.ControlPosition.TOP_CENTER,
            drawingModes : [google.maps.drawing.OverlayType.POLYGON,google.maps.drawing.OverlayType.RECTANGLE,google.maps.drawing.OverlayType.CIRCLE]
        },
        polygonOptions : {
            strokeColor : "#1E90FF",
            strokeOpacity : 0.8,
            strokeWeight : 2,
            fillColor : "#1E90FF",
            fillOpacity : 0.35,
            editable: true,
            clickable: true
        },
        circleOptions: {
            strokeColor : "#1E90FF",
            strokeOpacity : 0.8,
            fillColor: '#1E90FF',
            fillOpacity: 0.35,
            strokeWeight: 2,
            clickable: true,
            editable: true
        },
        rectangleOptions:{
            strokeColor : "#1E90FF",
            strokeOpacity : 0.8,
            fillColor: '#1E90FF',
            fillOpacity: 0.35,
            strokeWeight: 2,
            clickable: true,
            editable: true
        }
    });
    drawingManager.setMap(map);
    google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
        drawingManager.setDrawingMode(null);
        //polygonArray.push(polygon);
        var cont = 0;
        for (var i = 0; i < markers.length; i++) {
            var latlng = markers[i].getPosition();
            if (google.maps.geometry.poly.containsLocation(latlng,polygon)) {
                //console.log(latlng);
                cont+=1;
            };
        };
        bootbox.alert("Cantidad de suscriptores en el área seleccionada: "+cont);
        //alert(cont);
        /*var arr=[];
        polygon.getPath().forEach(function(latLng){arr.push(latLng.toString());})
        alert(arr.join(',\n'));*/
        /*drawingManager.setDrawingMode(null);
        polygonArray.push(polygon);
        generateUpdateRequest(polygon, null, 'I', 'http://fmeserver.com/fmerest/notifier/topics/pusher/publish?token='+ tokenUserID + '');*/
    });
    google.maps.event.addListener(drawingManager, 'circlecomplete', function(circle) {
        drawingManager.setDrawingMode(null);
        var cont = 0;
        for (var i = 0; i < markers.length; i++) {
            var latlng = markers[i].getPosition();
            if (circle.getBounds().contains(latlng)) {
                cont+=1;
            };
        };
        bootbox.alert("Cantidad de suscriptores en el área seleccionada: "+cont);
    });
    google.maps.event.addListener(drawingManager, 'rectanglecomplete', function(rectangle) {
        drawingManager.setDrawingMode(null);
        var cont = 0;
        for (var i = 0; i < markers.length; i++) {
            var latlng = markers[i].getPosition();
            if (rectangle.getBounds().contains(latlng)) {
                cont+=1;
            };
        };
        bootbox.alert("Cantidad de suscriptores en el área seleccionada: "+cont);
    });
    var markers = [];
    $.each(data.points, function(index, value) {
        var Infowindow = value.info;
        var latlon = new google.maps.LatLng(value.latitud, value.longitud);
        var marker = new google.maps.Marker({// Set the marker
            position: latlon, // Position marker to coordinates
            map: map, // assign the market to our map variable
            title: 'Clic para ver detalles', // Marker ALT Text
            info: Infowindow, //InfoWindow Message,
            icon: fnt_getColorMarker(value.status) // color icon marker
        });
        google.maps.event.addListener(marker, 'click', function() { // Add a Click Listener to our marker
            infowindow.setContent(this.info);//set the content
            infowindow.open(map, this);// Open our InfoWindow
            //fnt_getDepartment(this.title);
        });
        markers.push(marker);
        //console.log(value.lat + " - " + value.lon);
    });
    var markerCluster = new MarkerClusterer(map, markers);
    fnt_visualizarShowSeccion("visualizacionMap");
    $("#downloadLink").show();
}

function fnt_showMapDep(data) {
    var myLatlng = new google.maps.LatLng(data[0].latitud, data[0].longitud);
    var infowindow = new google.maps.InfoWindow();
    var mapOptions = {
        zoom: 8, // The initial zoom level when your map loads (0-20)
        minZoom: 0, // Minimum zoom level allowed (0-20)
        maxZoom: 15, // Maximum soom level allowed (0-20)
        zoomControl: true, // Set to true if using zoomControlOptions below, or false to remove all zoom controls.
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.DEFAULT // Change to SMALL to force just the + and - buttons.
        },
        center: myLatlng, // Centre the Map to our coordinates variable
        mapTypeId: google.maps.MapTypeId.ROADMAP, // Set the type of Map

        // All of the below are set to true by default, so simply remove if set to true:
        panControl: false, // Set to false to disable
        mapTypeControl: true, // Disable Map/Satellite switch
        scaleControl: false, // Set to false to hide scale
        streetViewControl: false, // Set to disable to hide street view
        overviewMapControl: false, // Set to false to remove overview control
        rotateControl: false // Set to false to disable rotate control
    }
    $("#map_div").empty();
    var map = new google.maps.Map(document.getElementById('map_div'), mapOptions); // Render our map within the empty div
    var markers = [];
    $.each(data, function(index, value) {
        var Infowindow = "<h3 style='text-align:center;'><strong>" + value.departamento + " - " + parseFloat(value.total_iga).toFixed(2) + " </strong></h3><hr><h5 style='text-align:center;'><a href='/iga?departamento="+value.departamento+"&anno="+value.ano+"' id='"+value.departamento+"'>Ver IGA Municipios "+value.departamento+"</a></h5><hr><fieldset><legend>ORGANIZACIÓN DE LA INFORMACIÓN: "+parseFloat(value.organizacion_info).toFixed(2)+"</legend><ul><li><strong>Control Interno: </strong>" + parseFloat(value.control_interno).toFixed(2) + "</li><li><strong>Gestión documental: </strong>" + parseFloat(value.gestion_documental).toFixed(2) + "</li></ul></fieldset><br/><fieldset><legend><strong>EXPOSICIÓN DE LA ORGANIZACIÓN: "+parseFloat(value.exposicion_informacion).toFixed(2)+"</strong></legend><ul><li><strong>Visibilidad de la contratación: </strong>" + parseFloat(value.visibilidad_contratacion).toFixed(2) + "</li><li><strong>Competencias básicas territoriales: </strong>" + parseFloat(value.competencias_basicas_territoriales).toFixed(2) + "</li><li><strong>Sistemas de gestión administrativa: </strong>" + parseFloat(value.sistema_gestion_admtiva).toFixed(2) + "</li></ul></fieldset><br/><fieldset><legend><strong>DIÁLOGO DE LA INFORMACIÓN "+parseFloat(value.dialogo_informacion).toFixed(2)+"</strong></legend><ul><li><strong>Gobierno en línea: </strong>" + parseFloat(value.gobierno_en_linea).toFixed() + "</li><li><strong>Rendición de cuentas: </strong>" + parseFloat(value.rendicion_cuentas).toFixed(2) + "</li><li><strong>Atención al ciudadano: </strong>" + parseFloat(value.atencion_ciudadana).toFixed(2) + "</li></ul></fieldset>";
        var latlon = new google.maps.LatLng(value.latitud, value.longitud);
        var marker = new google.maps.Marker({// Set the marker
            position: latlon, // Position marker to coordinates
            map: map, // assign the market to our map variable
            title: 'Click para ver detalles - ' + value.departamento, // Marker ALT Text
            info: Infowindow, //InfoWindow Message,
            icon: fnt_getColorMarker(value.color) // color icon marker
        });
        /*google.maps.event.addListener(marker, 'click', function() { // Add a Click Listener to our marker
            infowindow.setContent(this.info);//set the content
            infowindow.open(map, this);// Open our InfoWindow
            fnt_getDepartment(this.title);
        });*/
        //markers.push(marker);
        //console.log(value.lat + " - " + value.lon);
        google.maps.event.addListener(marker, 'click', function() {
            //map.setZoom(8);
            //map.setCenter(marker.getPosition());
            infowindow.setContent(this.info);//set the content
            infowindow.open(map, this);// Open our InfoWindow
            //fnt_getDepartment(this.title);
        });
    });
    //var markerCluster = new MarkerClusterer(map, markers);
    fnt_visualizarShowSeccion("visualizacionMap");
    //$("#downloadLink").show();
}

function fnt_showMapFiltered(data) {
    var d = data.datos.data;
    if (d.length > 0) {
        var myLatlng = new google.maps.LatLng(data.datos.data[0].latitud, data.datos.data[0].longitud);
        var infowindow = new google.maps.InfoWindow();
        var mapOptions = {
            zoom: 8, // The initial zoom level when your map loads (0-20)
            minZoom: 0, // Minimum zoom level allowed (0-20)
            maxZoom: 15, // Maximum soom level allowed (0-20)
            zoomControl: true, // Set to true if using zoomControlOptions below, or false to remove all zoom controls.
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.DEFAULT // Change to SMALL to force just the + and - buttons.
            },
            center: myLatlng, // Centre the Map to our coordinates variable
            mapTypeId: google.maps.MapTypeId.ROADMAP, // Set the type of Map

            // All of the below are set to true by default, so simply remove if set to true:
            panControl: false, // Set to false to disable
            mapTypeControl: true, // Disable Map/Satellite switch
            scaleControl: false, // Set to false to hide scale
            streetViewControl: false, // Set to disable to hide street view
            overviewMapControl: false, // Set to false to remove overview control
            rotateControl: false // Set to false to disable rotate control
        }
        $("#map_div").empty();
        var map = new google.maps.Map(document.getElementById('map_div'), mapOptions); // Render our map within the empty div
        var markers = [];
        $.each(data.datos.data, function(index, value) {
            //var Infowindow = "<h3 style='text-align:center;'><strong>" + value.alcaldia + " - " + parseFloat(value.total_iga).toFixed(2) + " </strong></h3><hr><h5><strong>* ORGANIZACIÓN DE LA INFORMACIÓN</strong></h5><ul><li><strong>Control Interno: </strong>" + parseFloat(value.control_interno).toFixed(2) + "</li><li><strong>Gestión documental: </strong>" + parseFloat(value.gestion_documental).toFixed(2) + "</li><li><strong>Organización de la información: </strong>" + parseFloat(value.organizacion_info).toFixed(2) + "</li></ul><br/><h5><strong>* EXPOSICIÓN DE LA ORGANIZACIÓN</strong></h5><ul><li><strong>Visibilidad de la contratación: </strong>" + parseFloat(value.visibilidad_contratacion).toFixed(2) + "</li><li><strong>Competencias básicas territoriales: </strong>" + parseFloat(value.competencias_basicas_territoriales).toFixed(2) + "</li><li><strong>Sistemas de gestión administrativa: </strong>" + parseFloat(value.sistema_gestion_admtiva).toFixed(2) + "</li><li><strong>Exposición de la información: </strong>" + parseFloat(value.exposicion_informacion).toFixed(2) + "</li></ul><br/><h5><strong>* DIÁLOGO DE LA INFORMACIÓN</strong></h5><ul><li><strong>Gobierno en línea: </strong>" + parseFloat(value.gobierno_en_linea).toFixed(2) + "</li><li><strong>Rendición de cuentas: </strong>" + parseFloat(value.rendicion_cuentas).toFixed(2) + "</li><li><strong>Atención al ciudadano: </strong>" + parseFloat(value.atencion_ciudadana).toFixed(2) + "</li><li><strong>Diálogo de la información: </strong>" + parseFloat(value.dialogo_informacion).toFixed(2) + "</li></ul>";
            var Infowindow = "<h3 style='text-align:center;'><strong>" + value.departamento + " - " + parseFloat(value.total_iga).toFixed(2) + " </strong></h3><hr><h5 style='text-align:center;'><a href='/iga?departamento="+value.departamento+"&anno="+value.ano+"' id='"+value.departamento+"'>Ver IGA Municipios "+value.departamento+"</a></h5><hr><fieldset><legend>ORGANIZACIÓN DE LA INFORMACIÓN: "+parseFloat(value.organizacion_info).toFixed(2)+"</legend><ul><li><strong>Control Interno: </strong>" + parseFloat(value.control_interno).toFixed(2) + "</li><li><strong>Gestión documental: </strong>" + parseFloat(value.gestion_documental).toFixed(2) + "</li></ul></fieldset><br/><fieldset><legend><strong>EXPOSICIÓN DE LA ORGANIZACIÓN: "+parseFloat(value.exposicion_informacion).toFixed(2)+"</strong></legend><ul><li><strong>Visibilidad de la contratación: </strong>" + parseFloat(value.visibilidad_contratacion).toFixed(2) + "</li><li><strong>Competencias básicas territoriales: </strong>" + parseFloat(value.competencias_basicas_territoriales).toFixed(2) + "</li><li><strong>Sistemas de gestión administrativa: </strong>" + parseFloat(value.sistema_gestion_admtiva).toFixed(2) + "</li></ul></fieldset><br/><fieldset><legend><strong>DIÁLOGO DE LA INFORMACIÓN "+parseFloat(value.dialogo_informacion).toFixed(2)+"</strong></legend><ul><li><strong>Gobierno en línea: </strong>" + parseFloat(value.gobierno_en_linea).toFixed() + "</li><li><strong>Rendición de cuentas: </strong>" + parseFloat(value.rendicion_cuentas).toFixed(2) + "</li><li><strong>Atención al ciudadano: </strong>" + parseFloat(value.atencion_ciudadana).toFixed(2) + "</li></ul></fieldset>";
            var latlon = new google.maps.LatLng(value.latitud, value.longitud);
            var marker = new google.maps.Marker({// Set the marker
                position: latlon, // Position marker to coordinates
                map: map, // assign the market to our map variable
                title: 'Click to show details', // Marker ALT Text
                info: Infowindow, //InfoWindow Message
                icon: fnt_getColorMarker(value.color) // color icon marker
            });
            google.maps.event.addListener(marker, 'click', function() { // Add a Click Listener to our marker
                infowindow.setContent(this.info);//set the content
                infowindow.open(map, this);// Open our InfoWindow
            });
            markers.push(marker);
            //console.log(value.lat + " - " + value.lon);
        });
        var markerCluster = new MarkerClusterer(map, markers);
        fnt_visualizarShowSeccion("visualizacionMap");
    }else{
        alert("No se encontraron datos para los filtros seleccionados");
    }
}

function fnt_showMapFilteredDep(data) {
    var d = data.datos.data;
    if (d.length > 0) {
        var myLatlng = new google.maps.LatLng(data.datos.data[0].latitud, data.datos.data[0].longitud);
        var infowindow = new google.maps.InfoWindow();
        var mapOptions = {
            zoom: 8, // The initial zoom level when your map loads (0-20)
            minZoom: 0, // Minimum zoom level allowed (0-20)
            maxZoom: 15, // Maximum soom level allowed (0-20)
            zoomControl: true, // Set to true if using zoomControlOptions below, or false to remove all zoom controls.
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.DEFAULT // Change to SMALL to force just the + and - buttons.
            },
            center: myLatlng, // Centre the Map to our coordinates variable
            mapTypeId: google.maps.MapTypeId.ROADMAP, // Set the type of Map

            // All of the below are set to true by default, so simply remove if set to true:
            panControl: false, // Set to false to disable
            mapTypeControl: true, // Disable Map/Satellite switch
            scaleControl: false, // Set to false to hide scale
            streetViewControl: false, // Set to disable to hide street view
            overviewMapControl: false, // Set to false to remove overview control
            rotateControl: false // Set to false to disable rotate control
        }
        $("#map_div").empty();
        var map = new google.maps.Map(document.getElementById('map_div'), mapOptions); // Render our map within the empty div
        var markers = [];
        $.each(data.datos.data, function(index, value) {
            //var Infowindow = "<h3 style='text-align:center;'><strong>" + value.departamento + " - " + parseFloat(value.total_iga).toFixed(2) + " </strong></h3><hr><h5 style='text-align:center;'><a href='#' onclick='fnt_getDepartment(this)' id='"+value.departamento+"'>Ver IGA Municipios "+value.departamento+"</a></h5><hr><fieldset><legend>ORGANIZACIÓN DE LA INFORMACIÓN: "+parseFloat(value.organizacion_info).toFixed(2)+"</legend><ul><li><strong>Control Interno: </strong>" + parseFloat(value.control_interno).toFixed(2) + "</li><li><strong>Gestión documental: </strong>" + parseFloat(value.gestion_documental).toFixed(2) + "</li></ul></fieldset><br/><fieldset><legend><strong>EXPOSICIÓN DE LA ORGANIZACIÓN: "+parseFloat(value.exposicion_informacion).toFixed(2)+"</strong></legend><ul><li><strong>Visibilidad de la contratación: </strong>" + parseFloat(value.visibilidad_contratacion).toFixed(2) + "</li><li><strong>Competencias básicas territoriales: </strong>" + parseFloat(value.competencias_basicas_territoriales).toFixed(2) + "</li><li><strong>Sistemas de gestión administrativa: </strong>" + parseFloat(value.sistema_gestion_admtiva).toFixed(2) + "</li></ul></fieldset><br/><fieldset><legend><strong>DIÁLOGO DE LA INFORMACIÓN "+parseFloat(value.dialogo_informacion).toFixed(2)+"</strong></legend><ul><li><strong>Gobierno en línea: </strong>" + parseFloat(value.gobierno_en_linea).toFixed() + "</li><li><strong>Rendición de cuentas: </strong>" + parseFloat(value.rendicion_cuentas).toFixed(2) + "</li><li><strong>Atención al ciudadano: </strong>" + parseFloat(value.atencion_ciudadana).toFixed(2) + "</li></ul></fieldset>";
            var Infowindow = "<h3 style='text-align:center;'><strong>" + value.departamento + " - " + parseFloat(value.total_iga).toFixed(2) + " </strong></h3><hr><h5 style='text-align:center;'><a href='/iga?departamento="+value.departamento+"&anno="+value.ano+"' id='"+value.departamento+"'>Ver IGA Municipios "+value.departamento+"</a></h5><hr><fieldset><legend>ORGANIZACIÓN DE LA INFORMACIÓN: "+parseFloat(value.organizacion_info).toFixed(2)+"</legend><ul><li><strong>Control Interno: </strong>" + parseFloat(value.control_interno).toFixed(2) + "</li><li><strong>Gestión documental: </strong>" + parseFloat(value.gestion_documental).toFixed(2) + "</li></ul></fieldset><br/><fieldset><legend><strong>EXPOSICIÓN DE LA ORGANIZACIÓN: "+parseFloat(value.exposicion_informacion).toFixed(2)+"</strong></legend><ul><li><strong>Visibilidad de la contratación: </strong>" + parseFloat(value.visibilidad_contratacion).toFixed(2) + "</li><li><strong>Competencias básicas territoriales: </strong>" + parseFloat(value.competencias_basicas_territoriales).toFixed(2) + "</li><li><strong>Sistemas de gestión administrativa: </strong>" + parseFloat(value.sistema_gestion_admtiva).toFixed(2) + "</li></ul></fieldset><br/><fieldset><legend><strong>DIÁLOGO DE LA INFORMACIÓN "+parseFloat(value.dialogo_informacion).toFixed(2)+"</strong></legend><ul><li><strong>Gobierno en línea: </strong>" + parseFloat(value.gobierno_en_linea).toFixed() + "</li><li><strong>Rendición de cuentas: </strong>" + parseFloat(value.rendicion_cuentas).toFixed(2) + "</li><li><strong>Atención al ciudadano: </strong>" + parseFloat(value.atencion_ciudadana).toFixed(2) + "</li></ul></fieldset>";
            var latlon = new google.maps.LatLng(value.latitud, value.longitud);
            var marker = new google.maps.Marker({// Set the marker
                position: latlon, // Position marker to coordinates
                map: map, // assign the market to our map variable
                title: 'Click para ver detalles de '+value.departamento, // Marker ALT Text
                info: Infowindow, //InfoWindow Message
                icon: fnt_getColorMarker(value.color) // color icon marker
            });
            /*google.maps.event.addListener(marker, 'click', function() { // Add a Click Listener to our marker
                infowindow.setContent(this.info);//set the content
                infowindow.open(map, this);// Open our InfoWindow
            });*/
            google.maps.event.addListener(marker, 'click', function() {
                //map.setZoom(8);
                //map.setCenter(marker.getPosition());
                infowindow.setContent(this.info);//set the content
                infowindow.open(map, this);// Open our InfoWindow
                //fnt_getDepartment(this.title);
            });
            //markers.push(marker);
            //console.log(value.lat + " - " + value.lon);
        });
        var markerCluster = new MarkerClusterer(map, markers);
        fnt_visualizarShowSeccion("visualizacionMap");
    }else{
        alert("No se encontraron datos para los filtros seleccionados");
    }
}

function fnt_visualizarShowSeccion(seccion) {
    $("." + seccion).show();
}

function fnt_getColorMarker(pinColor) {
    var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
            new google.maps.Size(21, 34),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 34));
    return  pinImage;
}

function fnt_loadDefaultData(){
    fnt_ajaxRequest("iga", "loadDepartamentos", null, function(r) {
        $(".selectDepartamento").html("<option value='0'>Departamento</option>");
        $.each(r, function(index, valor) {
            var str = valor.departamento;
            var value = str.toLowerCase();
            $(".selectDepartamento").append("<option value='" + value + "'>" + str + "</option>");
        });
        if(getUrlVars()["departamento"] === undefined || getUrlVars()["departamento"] === "" || getUrlVars()["departamento"] === "undefined") {
            fnt_ajaxRequest("iga", "loadPoints", null, function(r) {
                fnt_showMap(r);
            });
        } else {
            fnt_ajaxRequest("iga", "loadPointsFilteredQ", {"departamento":getUrlVars()["departamento"],"anno":getUrlVars()["anno"]}, function(r) {
                fnt_showMap(r);
                $(".selectDepartamento").before("<a href='/igaDepartamento?token="+$.md5(new Date().getDate()+"")+"'><img src='images/boton-atras.png' class='img-responsive' alt='atras' width='90px' style='float: left'/></a>");
                $(".selectDepartamento").val(getUrlVars()["departamento"].toLowerCase()).change();
                $("#anno").val(getUrlVars()["anno"]).change();
            });
        }
        fnt_ajaxRequest("iga", "loadAnnos", null, function(r) {
            $(".selectAnno").html("<option value=''>Año</option>");
            $.each(r, function(index, valor) {
                var str = valor.ano;
                //var value = str.toLowerCase();
                $(".selectAnno").append("<option value='" + str + "'>" + str + "</option>");
            });
        });
    });
}

function fnt_loadDefaultDataDep(){
    fnt_ajaxRequest("iga", "loadDepartamentos", null, function(r) {
        $(".selectDepartamento").html("<option value='0'>Departamento</option>");
        $.each(r, function(index, valor) {
            var str = valor.departamento;
            var value = str.toLowerCase();
            $(".selectDepartamento").append("<option value='" + value + "'>" + str + "</option>");
        });
    });
    fnt_ajaxRequest("iga", "loadAnnosDep", null, function(r) {
        $(".selectAnno").html("<option value=''>Año</option>");
        $.each(r, function(index, valor) {
            var str = valor.ano;
            //var value = str.toLowerCase();
            $(".selectAnno").append("<option value='" + str + "'>" + str + "</option>");
        });
    });
    fnt_ajaxRequest("iga", "loadPointsDep", null, function(r) {
        fnt_showMapDep(r);
    });
}

/*$(function () { 
    $('#submit').click(function(e) {
        e.preventDefault();
        $("#form").submit(); 
    }); 
    $("#form").validate();
});*/

function fnt_showMapSanciones(data) {
    var myLatlng = new google.maps.LatLng(data[0].latitud, data[0].longitud);
    var infowindow = new google.maps.InfoWindow();
    var mapOptions = {
        zoom: 8, // The initial zoom level when your map loads (0-20)
        minZoom: 0, // Minimum zoom level allowed (0-20)
        maxZoom: 15, // Maximum soom level allowed (0-20)
        zoomControl: true, // Set to true if using zoomControlOptions below, or false to remove all zoom controls.
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.DEFAULT // Change to SMALL to force just the + and - buttons.
        },
        center: myLatlng, // Centre the Map to our coordinates variable
        mapTypeId: google.maps.MapTypeId.ROADMAP, // Set the type of Map

        // All of the below are set to true by default, so simply remove if set to true:
        panControl: false, // Set to false to disable
        mapTypeControl: true, // Disable Map/Satellite switch
        scaleControl: false, // Set to false to hide scale
        streetViewControl: false, // Set to disable to hide street view
        overviewMapControl: false, // Set to false to remove overview control
        rotateControl: false // Set to false to disable rotate control
    }
    $("#map_div").empty();
    var map = new google.maps.Map(document.getElementById('map_div'), mapOptions); // Render our map within the empty div
    var markers = [];
    $.each(data, function(index, value) {
        var Infowindow = "<h3><strong>"+ value.departamento +":</strong></h3><hr><ul><li>"+ value.penales +" Sanciones Penales</li><li>"+value.disciplinarias+" Sanciones disciplinarias</li></ul>";
        Infowindow += "<ul>";
        /*for (d in value) {
            Infowindow += "<li><strong>"+d+": </strong>" + value[d] + "</li>";
        }*/
        var d = new Date();
        var year = d.getFullYear();
        if ($("#anno").val() !== "") {
            year = $("#anno").val();
        };
        Infowindow += "<li><a href='#' onclick=\"fnt_getSanciones('"+value.departamento+"',"+year+")\">Ver detalle</a></li>";
        Infowindow += "</ul>";
        //var Infowindow = "<h3 style='text-align:center;'><strong>" + value.departamento + " - " + value.municipio + " </strong></h3><hr><h5><strong>* DATOS DE LA SANCIÓN</strong></h5><ul><li><strong>Control Interno: </strong>" + value.control_interno + "</li><li><strong>Gestión documental: </strong>" + value.gestion_documental + "</li><li><strong>Organización de la información: </strong>" + value.organizacion_info + "</li></ul><br/><h5><strong>* EXPOSICIÓN DE LA ORGANIZACIÓN</strong></h5><ul><li><strong>Visibilidad de la contratación: </strong>" + value.visibilidad_contratacion + "</li><li><strong>Competencias básicas territoriales: </strong>" + value.competencias_basicas_territoriales + "</li><li><strong>Sistemas de gestión administrativa: </strong>" + value.sistema_gestion_admtiva + "</li><li><strong>Exposición de la información: </strong>" + value.exposicion_informacion + "</li></ul><br/><h5><strong>* DIÁLOGO DE LA INFORMACIÓN</strong></h5><ul><li><strong>Gobierno en línea: </strong>" + value.gobierno_en_linea + "</li><li><strong>Rendición de cuentas: </strong>" + value.rendicion_cuentas + "</li><li><strong>Atención al ciudadano: </strong>" + value.atencion_ciudadana + "</li><li><strong>Diálogo de la información: </strong>" + value.dialogo_informacion + "</li></ul>";
        var latlon = new google.maps.LatLng(value.latitud, value.longitud);
        var marker = new google.maps.Marker({// Set the marker
            position: latlon, // Position marker to coordinates
            map: map, // assign the market to our map variable
            title: value.departamento, // Marker ALT Text
            info: Infowindow //InfoWindow Message,
        });
        /*google.maps.event.addListener(marker, 'click', function() { // Add a Click Listener to our marker
            infowindow.setContent(this.info);//set the content
            infowindow.open(map, this);// Open our InfoWindow
        });*/
        //markers.push(marker);
        //console.log(value.lat + " - " + value.lon);
        google.maps.event.addListener(marker, 'click', function() {
            //map.setZoom(8);
            //map.setCenter(marker.getPosition());
            infowindow.setContent(this.info);//set the content
            infowindow.open(map, this);// Open our InfoWindow
            //fnt_getDepartment(this.title);
        });
    });
    //var markerCluster = new MarkerClusterer(map, markers,{zoomOnClick:false});
    /*google.maps.event.addListener(markerCluster, "click", function (c) {
          //log("click: ");
          //log("&mdash;Center of cluster: " + c.getCenter());
          //log("&mdash;Number of managed markers in cluster: " + c.getSize());
          var m = c.getMarkers();
          var p = [];
          var clause_dep = "";
          var dep = "";
          for (var i = 0; i < m.length; i++ ){
            //p.push(m[i].getPosition());
            p.push(m[i].getPosition());
            if (clause_dep !== "") {
                if (dep !== m[i].title) {
                    clause_dep += " OR departamento = '" + m[i].title+"'";
                    dep = m[i].title;
                };
            } else{
                clause_dep += " (departamento = '" + m[i].title+"'";
                dep = m[i].title;
            }
          }
          var d = new Date();
          var year = d.getFullYear();
          if ($("#anno").val() !== "") {
            year = $("#anno").val();
          };
          clause_dep+=") AND anno = "+ year;
          fnt_getSanciones(clause_dep);
        });*/
        //fnt_getSanciones(departamento,);
    fnt_visualizarShowSeccion("visualizacionMap");
}

function fnt_showMapFilteredSanciones(data) {
    var d = data.datos.data;
    if (d.length > 0) {
        var myLatlng = new google.maps.LatLng(data.datos.data[0].latitud, data.datos.data[0].longitud);
        var infowindow = new google.maps.InfoWindow();
        var mapOptions = {
            zoom: 8, // The initial zoom level when your map loads (0-20)
            minZoom: 0, // Minimum zoom level allowed (0-20)
            maxZoom: 15, // Maximum soom level allowed (0-20)
            zoomControl: true, // Set to true if using zoomControlOptions below, or false to remove all zoom controls.
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.DEFAULT // Change to SMALL to force just the + and - buttons.
            },
            center: myLatlng, // Centre the Map to our coordinates variable
            mapTypeId: google.maps.MapTypeId.ROADMAP, // Set the type of Map
            // All of the below are set to true by default, so simply remove if set to true:
            panControl: false, // Set to false to disable
            mapTypeControl: true, // Disable Map/Satellite switch
            scaleControl: false, // Set to false to hide scale
            streetViewControl: false, // Set to disable to hide street view
            overviewMapControl: false, // Set to false to remove overview control
            rotateControl: false // Set to false to disable rotate control
        }
        $("#map_div").empty();
        var map = new google.maps.Map(document.getElementById('map_div'), mapOptions); // Render our map within the empty div
        var markers = [];
        $.each(data.datos.data, function(index, value) {
            //var Infowindow = "<h3 style='text-align:center;'><strong>" + value.alcaldia + " - " + value.total_iga + " </strong></h3><hr><h5><strong>* ORGANIZACIÓN DE LA INFORMACIÓN</strong></h5><ul><li><strong>Control Interno: </strong>" + value.control_interno + "</li><li><strong>Gestión documental: </strong>" + value.gestion_documental + "</li><li><strong>Organización de la información: </strong>" + value.organizacion_info + "</li></ul><br/><h5><strong>* EXPOSICIÓN DE LA ORGANIZACIÓN</strong></h5><ul><li><strong>Visibilidad de la contratación: </strong>" + value.visibilidad_contratacion + "</li><li><strong>Competencias básicas territoriales: </strong>" + value.competencias_basicas_territoriales + "</li><li><strong>Sistemas de gestión administrativa: </strong>" + value.sistema_gestion_admtiva + "</li><li><strong>Exposición de la información: </strong>" + value.exposicion_informacion + "</li></ul><br/><h5><strong>* DIÁLOGO DE LA INFORMACIÓN</strong></h5><ul><li><strong>Gobierno en línea: </strong>" + value.gobierno_en_linea + "</li><li><strong>Rendición de cuentas: </strong>" + value.rendicion_cuentas + "</li><li><strong>Atención al ciudadano: </strong>" + value.atencion_ciudadana + "</li><li><strong>Diálogo de la información: </strong>" + value.dialogo_informacion + "</li></ul>";
            var Infowindow = "<h3><strong>"+ value.departamento +":</strong></h3><hr><ul><li>"+ value.penales +" Sanciones Penales</li><li>"+value.disciplinarias+" Sanciones disciplinarias</li></ul>";
            Infowindow += "<ul>";
            /*for (d in value) {
                Infowindow += "<li><strong>"+d+": </strong>" + value[d] + "</li>";
            }*/
            var d = new Date();
            var year = d.getFullYear();
            if ($("#anno").val() !== "") {
                year = $("#anno").val();
            };
            Infowindow += "<li><a href='#' onclick=\"fnt_getSanciones('"+value.departamento+"',"+year+")\">Ver detalle</a></li>";
            Infowindow += "</ul>";
            var latlon = new google.maps.LatLng(value.latitud, value.longitud);
            var marker = new google.maps.Marker({// Set the marker
                position: latlon, // Position marker to coordinates
                map: map, // assign the market to our map variable
                title: value.departamento, // Marker ALT Text
                info: Infowindow //InfoWindow Message
            });
            google.maps.event.addListener(marker, 'click', function() {
                //map.setZoom(8);
                //map.setCenter(marker.getPosition());
                infowindow.setContent(this.info);//set the content
                infowindow.open(map, this);// Open our InfoWindow
                //fnt_getDepartment(this.title);
            });
            /*google.maps.event.addListener(marker, 'click', function() { // Add a Click Listener to our marker
                infowindow.setContent(this.info);//set the content
                infowindow.open(map, this);// Open our InfoWindow
            });*/
            //markers.push(marker);
            //console.log(value.lat + " - " + value.lon);
        });
        /*var markerCluster = new MarkerClusterer(map, markers,{zoomOnClick:false});
        google.maps.event.addListener(markerCluster, "click", function (c) {
          //log("click: ");
          //log("&mdash;Center of cluster: " + c.getCenter());
          //log("&mdash;Number of managed markers in cluster: " + c.getSize());
          var m = c.getMarkers();
          var p = [];
          var clause_dep = "";
          var dep = "";
          for (var i = 0; i < m.length; i++ ){
            //p.push(m[i].getPosition());
            p.push(m[i].getPosition());
            if (clause_dep !== "") {
                if (dep !== m[i].title) {
                    clause_dep += " OR departamento = '" + m[i].title+"'";
                    dep = m[i].title;
                };
            } else{
                clause_dep += " (departamento = '" + m[i].title+"'";
                dep = m[i].title;
            }
          }
          var d = new Date();
          var year = d.getFullYear();
          if ($("#anno").val() !== "") {
            year = $("#anno").val();
          };
          clause_dep+=") AND anno = "+ year;
          //fnt_getSanciones(clause_dep);
          //fnt_getSanciones(departamento,year);
        });*/
        //fnt_visualizarShowSeccion("visualizacionMap");
        fnt_visualizarShowSeccion("visualizacionMap");
    }else{
        alert("No se encontraron datos para los filtros seleccionados");
    }
}

function fnt_SancionesloadDefaultData(){
    fnt_ajaxRequest("sanciones", "loadDepartamentos", null, function(r) {
        $(".selectDepartamento").html("<option value='0'>Departamento</option>");
        $.each(r, function(index, valor) {
            var str = valor.departamento;
            var value = str.toLowerCase();
            $(".selectDepartamento").append("<option value='" + value + "'>" + str + "</option>");
        });
    });
    fnt_ajaxRequest("sanciones", "loadTipoSancion", null, function(r) {
        $(".selectTipoSancion").html("<option value=''>Tipo</option>");
        $.each(r, function(index, valor) {
            var str = valor.tipo_sancion;
            var value = str.toLowerCase();
            $(".selectTipoSancion").append("<option value='" + value + "'>" + str + "</option>");
        });
    });
    fnt_ajaxRequest("sanciones", "loadAnnos", null, function(r) {
        $(".selectAnno").html("<option value=''>Año</option>");
        $.each(r, function(index, valor) {
            var str = valor.anno;
            //var value = str.toLowerCase();
            $(".selectAnno").append("<option value='" + str + "'>" + str + "</option>");
        });
    });
    fnt_ajaxRequest("sanciones", "loadPoints", null, function(r) {
        fnt_showMapSanciones(r);
    });
}

function fnt_SancionesChartsloadDefaultData(){
    fnt_ajaxRequest("sanciones", "loadFields", null, function(r) {
        $(".selectCriterio").html("<option value='0'>Criterio</option>");
        $.each(r, function(index, valor) {
            var str = valor.criterio;
            var value = str.toLowerCase();
            str = str.replace("_", " ");
            $(".selectCriterio").append("<option value='" + value + "'>" + str.toUpperCase() + "</option>");
        });
        fnt_ajaxRequest("sanciones", "loadTipoSancion", null, function(r) {
        $(".selectTipoSancion").html("<option value=''>Tipo</option>");
            $.each(r, function(index, valor) {
                var str = valor.tipo_sancion;
                var value = str.toLowerCase();
                $(".selectTipoSancion").append("<option value='" + value + "'>" + str + "</option>");
            });
        });
    });
    fnt_ajaxRequest("sanciones", "loadAnnos", null, function(r) {
        $(".selectAnno").html("<option value=''>Año</option>");
        $.each(r, function(index, valor) {
            var str = valor.anno;
            //var value = str.toLowerCase();
            $(".selectAnno").append("<option value='" + str + "'>" + str + "</option>");
        });
    });
}

function fnt_getSanciones(departamento,anno){
    var clause_dep = "departamento = '"+departamento+"' AND anno = "+anno;
    fnt_ajaxRequest("sanciones", "loadDataCluster",  {"clause": clause_dep} , function(r) {
        fnt_showTableDetail(r,function(){
            $("#sanciones").dataTable({
                "sDom": '<"H"lfr>t<"F"ip>',
                "aLengthMenu": [[100, 500, 1000, -1], [100, 500, 1000, "All"]],
                "oLanguage": {
                    "sLengthMenu": "Mostrando _MENU_ registros por p\xe1gina",
                    "sZeroRecords": "Nada Encontrado - Lo sentimos",
                    "sInfo": "Mostrando _START_ hasta _END_ de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando 0 hasta 0 de 0 registros",
                    "sSearch": "Buscar",
                    "sInfoFiltered": "(filtrado desde _MAX_ registros totales)"
                },
                "bDestroy": true
            });
            $("html, body").animate({ scrollTop: $(document).height() }, "slow");
            $(".dataTables_paginate ul").addClass("list-inline");
        });
    });
}

function fnt_showTableDetail(data, callback){
    var table_content_head = "<thead><tr>";
    var table_content_body = "<tbody>";
    var i = 0;
    $.each(data, function(index, value) {
        table_content_body+="<tr>";
        for (d in value) {
            if (i === 0) {
                table_content_head += "<th>" + d + "</th>";
            };
            table_content_body += "<td>" +value[d] + "</td>";
        }
        table_content_body+="</tr>";
        i++;
    });
    table_content_body+="</tbody>"
    table_content_head+="</tr></thead>";
    $("#sanciones").empty();
    $("#sanciones").append(table_content_head+table_content_body);
    callback();
}

function fnt_showSancionCharts(data){
    var criterio = $("#selectCriterio").val();
    var anno = $("#selectAnno").val();
    $("#message").empty();
    $("#message").append("<h1>Cantidad de Sanciones por "+ criterio.replace("_"," ") +" en el año "+ anno.replace("_"," ") +"</h1>");
    $("#visualizacionLine").empty();
    new Morris.Line({
      element: 'visualizacionLine',
      data: fnt_getCleanData(data),
      parseTime: false,
      xkey: 'mes',
      ykeys: fnt_getYkeys(data),
      labels: fnt_getYkeys(data)
    });
    new Morris.Donut({
      element: 'visualizacionPie',
      data: fnt_getCleanDataPie(data)
    });

    var f = fnt_getCleanDataPie(data);
    var total = 0;
    for (var i = 0; i < f.length; i++) {
        total+=f[i].value;
    };
    var one = $("#visualizacionPie text tspan")[0];
    $(one).html("Total");
    var two = $("#visualizacionPie text tspan")[1];
    $(two).html(total);
    fnt_paintTableDetail();
}

function fnt_getCleanData(data){
    var months = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"];
    var finaldata = [];
    for (var i = 0; i < months.length; i++) {
        var fobject = {};
        fobject["mes"] = months[i];
        $.each(data, function(index, value){
            if (value.mes === months[i]) {
                fobject[value[$(".selectCriterio").val()]] = value.cantidad;
            };
        });
        finaldata.push(fobject);
    };
    return finaldata;
}

function fnt_paintTableDetail(){
    $("#visualizacionTable").empty();
    fnt_ajaxRequest("sanciones", "loadTableDetail", {"anno": $(".selectAnno").val()}, function(data) {
        var table="<table class='table table-striped table-bordered' id='sanciones'>";
        var table_content_head = "<thead><tr>";
        var table_content_body = "<tbody>";
        var i = 0;
        $.each(data, function(index, value) {
            if (i>0) {
                table_content_body+="<tr>";
            };
            for (d in value) {
                if (i === 0) {
                    table_content_head += "<th>" + d + "</th>";
                };
                table_content_body += "<td>" +value[d] + "</td>";
            }
            if (i>0) {
                table_content_body+="</tr>";
            }
            i++;
        });
        table_content_body+="</tbody>"
        table_content_head+="</tr></thead>";
        table+=table_content_head+table_content_body+"</table>";
        $("#visualizacionTable").html(table);
        $("#sanciones").dataTable({
            "sDom": '<"H"lfr>t<"F"ip>',
            "aLengthMenu": [[100, 500, 1000, -1], [100, 500, 1000, "All"]],
            "oLanguage": {
                "sLengthMenu": "Mostrando _MENU_ registros por p\xe1gina",
                "sZeroRecords": "Nada Encontrado - Lo sentimos",
                "sInfo": "Mostrando _START_ hasta _END_ de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando 0 hasta 0 de 0 registros",
                "sSearch": "Buscar",
                "sInfoFiltered": "(filtrado desde _MAX_ registros totales)"
            },
            "bDestroy": true
        });
        $(".dataTables_paginate ul").addClass("list-inline");
    });
}

function fnt_getCleanDataPie(data){
    var finaldata = [];
    var keys = fnt_getYkeys(data);
    for (var i = 0; i < keys.length; i++) {
        var fobject = {};
        var cantidad = 0;
        fobject.label = keys[i];
        $.each(data, function(index, value){
            if (value[$(".selectCriterio").val()] === keys[i]) {
                cantidad += value.cantidad;
                fobject.value = cantidad;
            };
        });
        finaldata.push(fobject);
    };
    return finaldata;
}

function fnt_getYkeys(data){
    var ykeys = [];
    $.each(data, function(index, value){
        if (!fnt_in_array(value[$(".selectCriterio").val()],ykeys)) {
            ykeys.push(value[$(".selectCriterio").val()]);
        };
    });
    return ykeys;
}

function fnt_in_array(needle, haystack, argStrict) {
  var key = '',
    strict = !! argStrict;
  if (strict) {
    for (key in haystack) {
      if (haystack[key] === needle) {
        return true;
      }
    }
  } else {
    for (key in haystack) {
      if (haystack[key] == needle) {
        return true;
      }
    }
  }

  return false;
}

function fnt_getDepartment(el){
    //alert(el.id);
    /*var municipio = title.split(" - ")[1].trim();
    fnt_ajaxRequest("iga", "loadByDepartamento", {"municipio": municipio, "anno": $(".selectAnno").val()}, function(r) {
        
    });*/
}

// Read a page's GET URL variables and return them as an associative array.
function getUrlVars()
{
    var params = {}, d = function (s) { return s ? decodeURIComponent(s.replace(/\+/, " ")) : null; }
    if(window.location.search) $.each(window.location.search.substring(1).split('&'), function(i, v) {
        var pair = v.split('=');
        params[d(pair[0])] = d(pair[1]);
    });
    return params;
}

function getContent (link) {
    if (link.indexOf("form_") >= 0){
        return "layouts/forms/"+link+".html";
    } else if (link.indexOf("grid_") >= 0) {
        return "layouts/grids/"+link+".html";
    } else if (link.indexOf("report_") >= 0) {
        return "layouts/reports/"+link+".html";
    } else if (link.indexOf("map_") >= 0) {
        return "layouts/maps/"+link+".html";
    } else if (link.indexOf("dashboard_") >= 0) {
        return "layouts/dashboards/"+link+".html";
    } else {
        return "404.php";
    }
}

function loadFilters(el){
    //event.preventDefault();
    //console.log($(el));
    if ($(el).hasClass("in")) {
        $(el).removeClass("in");
        $(el).addClass("out");
        $("#filters").removeClass("animated zoomInUp");
        $("#filters").addClass("animated zoomOutDown");
        $('#filters').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $("#filters").hide();
        });
        /*$("#filters").fadeOut("slow", function() {
            // Animation complete
        });*/
    } else{
        $(el).removeClass("out");
        $(el).addClass("in");
        $("#filters").show();
        $("#filters").removeClass("animated zoomOutDown");
        $("#filters").addClass("animated zoomInUp");
        //$("#filters").fadeIn();
    }
}

function loadFiltersBalance (data) {
    var months = data.mesFilter;
    var years = data.anoFilter;
    $.each(months, function (key,value) {
        $("#mes").append("<option value='"+value.mes+"'>"+value.mes+"</option>");
    });
    $.each(years, function (key,value) {
        $("#ano").append("<option value='"+value.ano+"'>"+value.ano+"</option>");
    });
}

function updateBalanceDashboard(data) {
    var obj = JSON.parse(data);
    for(key in obj) {
        //console.log(key+" - "+obj[key]);
        $("#"+key).html(obj[key]);
        //var value = myJSONobject[key];
    }

    /*$.each(data,function (key,value) {
        for(d in value) {
            console.log(d+" - "+value[d]);
            //var value = myJSONobject[key];
        }
        //console.log(key+" - "+value);
    });*/
}

function paintMap(lat, lon, div) {
    var infowindow = new google.maps.InfoWindow();
    var mapOptions = {
        zoom: 14,
        scrollwheel: false,
        center: new google.maps.LatLng(lat, lon) // New York
    };
    var mapElement = document.getElementById(div);
    var map = new google.maps.Map(mapElement, mapOptions);
    var iconBase = 'http://localhost/tresases/images/';
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lon),
      map: map,
      icon: iconBase + 'marker.png'
    });
}

function paintMapAll (lat,lon, div) {
    var infowindow = new google.maps.InfoWindow();
    var mapOptions = {
        zoom: 11,
        scrollwheel: false,
        center: new google.maps.LatLng(lat, lon) // New York
    };
    var infoWindow = "<ul class='list-unstyled'><li><b>Sucursal test</b></li><li><img src='images/favicon.png'/></li><li>Barrio</li></li>Dirección</ul>";
    var mapElement = document.getElementById(div);
    var map = new google.maps.Map(mapElement, mapOptions);
    var iconBase = 'http://localhost/tresases/images/';
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lon),
      map: map,
      title: "Click para ver detalle de la sucursal",
      info: infoWindow,
      icon: iconBase + 'marker.png'
    });
    google.maps.event.addListener(marker, 'click', function() { // Add a Click Listener to our marker
            infowindow.setContent(this.info);//set the content
            infowindow.open(map, this);// Open our InfoWindow
            //fnt_getDepartment(this.title);
    });
}