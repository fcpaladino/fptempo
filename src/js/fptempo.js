/*
 * FPTempo 1.0
 *
 * Licensed under the Apache License 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * https://github.com/filipepaladino/fpTempo
 *
 * Author: Filipe Paladino [http://www.filipepaladino.com.br]
 */


/*
 *********************************************
 *   Adiciona alguns metodos na classe Date
 *********************************************
 */
Date.prototype.addHoras = function(horas){
    this.setHours(this.getHours() + horas)
};
Date.prototype.addMinutos = function(minutos){
    this.setMinutes(this.getMinutes() + minutos)
};
Date.prototype.addSegundos = function(segundos){
    this.setSeconds(this.getSeconds() + segundos)
};
Date.prototype.addDias = function(dias){
    this.setDate(this.getDate() + dias)
};
Date.prototype.addMeses = function(meses){
    this.setMonth(this.getMonth() + meses)
};
Date.prototype.addAnos = function(anos){
    this.setYear(this.getFullYear() + anos)
};



(function($) {

    $.fn.fpTempo = function(options) {

        var fnFpTempo = this;

        // Configurações padrões
        var settings = $.extend({
            cookie_pfx: 'fptempo_cache_',
            woeid     : null,         // consulta http://woeid.rosselliot.co.nz/
            cidade    : null,         // Cidade
            estado    : null,         // Estado
            timeout   : false,        // segundos
            unidade   : 'c',          // 'c' ou 'f'
            format    : 'html',       // html, callback
            cache     : true,         // Cache, salva os dados na sessão do navegador
            timeCache : 10,           // Minutos para atualizar o cache
            callback  : null

        },  options );



        function elements() {
            fnFpTempo.each(function () {

                var el      = $(this),
                    woeid, cidade, estado;


                if(el.attr('data-woeid')){
                    woeid = el.attr('data-woeid');
                }

                if(el.attr('data-cidade')){
                    cidade = el.attr('data-cidade');
                }

                if(el.attr('data-estado')){
                    estado = el.attr('data-estado');
                }

                if(settings.woeid){
                    woeid = settings.woeid;
                }

                if(settings.cidade){
                    cidade = settings.cidade;
                }

                if(settings.estado){
                    estado = settings.estado;
                }

                var dados = forecast(woeid, cidade, estado, el);

                if(settings.format == 'callback' && dados){
                    if( typeof settings.callback === "function"){
                        settings.callback(el, dados);
                    }
                }

                if(settings.format == "html" && dados){
                    elementHtml(el, dados);
                }

                if(!dados){
                    console.log("Não foi possivel localizar.");
                }

            });
        }

        function getUrl(woeid, cidade, estado){

            var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20';

            if(!undefined(woeid)) {
                url += '%3D%20%22' + woeid + '%22%20and%20u%3D%22';

            }else if(!undefined(cidade) && !undefined(estado)){
                url += 'in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+cidade+'%2C%20'+estado+'%22)%20and%20u%3D%22';
            }

            url += settings.unidade + '%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';

            return url;
        }

        function forecast(woeid, cidade, estado){
            if(!woeid && !cidade && !estado){
                return null;
            }
            return forecastCache(woeid, cidade, estado);
        }

        function forecastCache(woeid, cidade, estado) {

            var retorno = null,
                dados   = null;

            if(settings.cache && !settings.timeout){

                dados = getCache(cidade);

                if(!dados){
                    dados = forecastAjax(woeid, cidade, estado);
                    setCache(dados);
                }

                retorno = dados;

            } else {
                retorno = forecastAjax(woeid, cidade, estado);
            }

            return retorno;
        }

        function forecastAjax(woeid, cidade, estado){
            var lista = [];

            $.ajax({
                type: "GET",
                dataType: "json",
                cache: false,
                url: getUrl(woeid, cidade, estado),
                async: false,
                success: function(data){

                    lista = forecastData(data);
                }
            });
            return lista;
        }

        function elementHtml(elemento, dados){

            elemento.find('*').each(function () {
                var dataTempo = $(this).attr('data-tempo');

                if (dataTempo === "cidade") {
                    $(this).html(dados.info.cidade);
                }

                if (dataTempo === "estado") {
                    $(this).html(dados.info.estado);
                }

                if (dataTempo === "temperatura") {
                    $(this).html(dados.hoje.temperatura);
                }
                if (dataTempo === "maxima") {
                    $(this).html(dados.hoje.maxima);
                }
                if (dataTempo === "minima") {
                    $(this).html(dados.hoje.minima);
                }
                if (dataTempo === "descricao") {
                    $(this).html(dados.hoje.descricao);
                }
                if (dataTempo === "icone") {
                    $(this).html(dados.hoje.icone);
                }
                if (dataTempo === "dia-semana") {
                    $(this).html(dados.hoje.dia_semana);
                }
                if (dataTempo === "dia-mes") {
                    $(this).html(dados.hoje.dia_mes);
                }
                if (dataTempo === "dia") {
                    $(this).html(dados.hoje.dia);
                }

                for(var i = 0; i <= 4; i++){

                    if (dataTempo === "temperatura-" + (i+1)) {
                        $(this).html(dados.proximos_dias[i].minima);
                    }
                    if (dataTempo === "maxima-" + (i+1)) {
                        $(this).html(dados.proximos_dias[i].maxima);
                    }
                    if (dataTempo === "minima-" + (i+1)) {
                        $(this).html(dados.proximos_dias[i].minima);
                    }
                    if (dataTempo === "descricao-" + (i+1)) {
                        $(this).html(dados.proximos_dias[i].descricao);
                    }
                    if (dataTempo === "icone-" + (i+1)) {
                        $(this).html(dados.proximos_dias[i].icone);
                    }
                    if (dataTempo === "dia-semana-" + (i+1)) {
                        $(this).html(dados.proximos_dias[i].dia_semana);
                    }
                    if (dataTempo === "dia-mes-" + (i+1)) {
                        $(this).html(dados.proximos_dias[i].dia_mes);
                    }
                    if (dataTempo === "dia-" + (i+1)) {
                        $(this).html(dados.proximos_dias[i].dia);
                    }

                }

            });
        }



        function setCache(dados){

            if( !$.cookie ){
                console.log("Não foi possivel encontrar jQuery Cookie Plugin");
                return null;
            }

            if(!dados){
                return null;
            }

            var date = new Date();
                date.addMinutos(1);

            $.cookie(settings.cookie_pfx + slug(dados.info.cidade), JSON.stringify(dados, null, '\t'), { expires: date });
        }

        function getCache(cidade) {
            if( !$.cookie ){
                console.log("Não foi possivel encontrar jQuery Cookie Plugin");
                return null;
            }

            var cache = $.cookie(settings.cookie_pfx + slug(cidade));
            return strJson(cache);
        }



        function strJson(jsonString){
            try {
                var o = JSON.parse(jsonString);
                if (o && typeof o === "object" && o !== null) return o;
            }
            catch (e) { }
            return null;
        }

        function undefined(val){
            if(typeof(val)  === "undefined"){
                return true;
            }

            return false;
        }

        function ucFirst(texto) {
            return texto.substr(0,1).toUpperCase() + texto.substr(1);
        }

        function strLower(texto) {
            return texto.toLowerCase();
        }

        function retira_acento(palavra) {
            com_acento = 'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ';
            sem_acento = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC';
            nova='';
            for(i=0;i<palavra.length;i++) {
                if (com_acento.search(palavra.substr(i,1))>=0) {
                    nova+=sem_acento.substr(com_acento.search(palavra.substr(i,1)),1);
                }
                else {
                    nova+=palavra.substr(i,1);
                }
            }
            return nova;
        };

        function substr(texto, inicio, tamanho){
            return texto.substr(inicio, tamanho);
        }

        function slug( slugcontent ) {

            // Converte para Letras Minúsculas (Importante: desde a etapa seguinte caracteres especiais são definidas em letras minúsculas apenas)
            slugcontent = slugcontent.toLowerCase();

            // Converte Caracteres Especiais
            var accents = {a: /(\u00e1|\u00e0|\u00e2|\u00e3|\u00e4)/g, e: /(\u00e9|\u00e8|\u00ea|\u00ea)/g, i: /(\u00ed|\u00ec|\u00ee|\u00ef)/g, o: /(\u00f3|\u00f2|\u00f4|\u00f5|\u00f6)/g, u: /(\u00fa|\u00f9|\u00fb|\u00fc)/g, n: /\u00f1/g, c: /\u00e7/g}
            for( var i in accents ) slugcontent = slugcontent.replace(accents[i], i);

            var slugcontent_hyphens = slugcontent.replace(/\s/g, '_');

            var finishedslug = slugcontent_hyphens.replace(/[^a-zA-Z0-9\-]/g, '');
            finishedslug = finishedslug.toLowerCase();
            finishedslug = finishedslug.replace(/-+/g, '-'); // Remove multiplos ‘-’
            //finishedslug = finishedslug.replace(/(^-)|(-$)/g, ''); // Remover caráter primeiro e último da seqüência, se é ‘-’

            return finishedslug;

        }



        function traduzirMes(data) {
            var retorno = {
                nome:   "",
                sigla:  "",
                num:     0
            };
            var sMes = data.split(' '),
                sMes = sMes[1];


            if($.isNumeric(sMes)){
                sMes = parseInt(sMes);
            } else{
                sMes = retira_acento(substr(strLower(sMes), 0, 3));
            }

            switch (sMes){
                case "jan":
                case 1:
                    retorno.nome    = "Janeiro";
                    retorno.num     = 1;
                    retorno.sigla   = "Jan";
                    break;

                case "feb":
                case "fev":
                case 2:
                    retorno.nome    = "Fevereiro";
                    retorno.num     = 2;
                    retorno.sigla   = "Fev";
                    break;

                case "mar":
                case 3:
                    retorno.nome    = "Março";
                    retorno.num     = 3;
                    retorno.sigla   = "Mar";
                    break;

                case "apr":
                case "abr":
                case 4:
                    retorno.nome    = "Abril";
                    retorno.num     = 4;
                    retorno.sigla   = "Abr";
                    break;

                case "may":
                case "mai":
                case 5:
                    retorno.nome    = "Maio";
                    retorno.num     = 5;
                    retorno.sigla   = "Mai";
                    break;

                case "jun":
                case 6:
                    retorno.nome    = "Junho";
                    retorno.num     = 6;
                    retorno.sigla   = "Jun";
                    break;

                case "jul":
                case 7:
                    retorno.nome    = "Julho";
                    retorno.num     = 7;
                    retorno.sigla   = "Jul";
                    break;

                case "aug":
                case "ago":
                case 8:
                    retorno.nome    = "Agosto";
                    retorno.num     = 8;
                    retorno.sigla   = "Ago";
                    break;

                case "sep":
                case "set":
                case 9:
                    retorno.nome    = "Setembro";
                    retorno.num     = 9;
                    retorno.sigla   = "Set";
                    break;

                case "oct":
                case "out":
                case 10:
                    retorno.nome    = "Outubro";
                    retorno.num     = 10;
                    retorno.sigla   = "Out";
                    break;

                case "nov":
                case 11:
                    retorno.nome    = "Novembro";
                    retorno.num     = 11;
                    retorno.sigla   = "Nov";
                    break;

                case "dec":
                case "dez":
                case 12:
                    retorno.nome    = "Dezembro";
                    retorno.num     = 12;
                    retorno.sigla   = "Dez";
                    break;
            }
            return retorno;
        }

        function traduzirDiaSemana(semana){

            var retorno = {
                    nome:       "",
                    semana:     0,
                    prefixo:    ""
                };

            if($.isNumeric(semana)){
                semana = parseInt(semana);

            } else{
                semana = retira_acento(substr(strLower(semana), 0, 3));
            }

            switch (semana){
                case "sun":
                case "dom":
                case 0:
                    retorno.nome    = "domingo";
                    retorno.semana  = 0;
                    break;

                case "mon":
                case "seg":
                case 1:
                    retorno.nome    = "segunda";
                    retorno.semana  = 1;
                    retorno.prefixo = "feira";
                    break;

                case "tue":
                case "ter":
                case 2:
                    retorno.nome    = "terça";
                    retorno.semana  = 2;
                    retorno.prefixo = "feira";
                    break;

                case "wed":
                case "qua":
                case 3:
                    retorno.nome    = "quarta";
                    retorno.semana  = 3;
                    retorno.prefixo = "feira";
                    break;

                case "thu":
                case "qui":
                case 4:
                    retorno.nome    = "quinta";
                    retorno.semana  = 4;
                    retorno.prefixo = "feira";
                    break;

                case "fri":
                case "sex":
                case 5:
                    retorno.nome    = "sexta";
                    retorno.semana  = 5;
                    retorno.prefixo = "feira";
                    break;

                case "sat":
                case "sab":
                case 6:
                    retorno.nome    = "sábado";
                    retorno.semana  = 6;
                    break;
            }

            return retorno;
        };

        function getCondicao(code) {
            var result = "";
            switch (code) {
                case "0":
                    result = 'tufão';
                    break;
                case "1":
                    result = 'tempestade tropical';
                    break;
                case "2":
                    result = 'furacão';
                    break;
                case "3":
                    result = 'tempestades fortes';
                    break;
                case "4":
                    result = 'trovoadas';
                    break;
                case "5":
                    result = 'neve e chuva';
                    break;
                case "6" || "35":
                    result = 'chuva e granizo';
                    break;
                case "7":
                    result = 'granizo e neve';
                    break;
                case "8":
                    result = 'chuvisco congelado';
                    break;
                case "9":
                    result = 'chuvisco';
                    break;
                case "10":
                    result = 'chuva congelada';
                    break;
                case "12":
                case "11":
                    result = 'pancadas de chuva';
                    break;
                case "13":
                    result = 'flocos de neve';
                    break;
                case "15":
                case "14":
                    result = 'pancadas de neve';
                    break;
                case "16":
                    result = 'neve';
                    break;
                case "17":
                    result = 'granizo';
                    break;
                case "18":
                    result = 'chuva com neve';
                    break;
                case "19":
                    result = 'poeira';
                    break;
                case "20":
                    result = 'nebuloso';
                    break;
                case "21":
                    result = 'névoa';
                    break;
                case "22":
                    result = 'enfumaçado';
                    break;
                case "23":
                    result = 'tempestuoso';
                    break;
                case "24":
                    result = 'ventoso';
                    break;
                case "25":
                    result = 'frio';
                    break;
                case "26":
                    result = 'nublado';
                    break;
                case "27":
                    result = 'noite nublada';
                    break;
                case "28":
                    result = 'dia nublado';
                    break;
                case "29":
                    result = 'noite parcial nublado';
                    break;
                case "30":
                    result = 'dia parcial nublado';
                    break;
                case "31":
                    result = 'noite clara';
                    break;
                case "32":
                    result = 'ensolarado';
                    break;
                case "33":
                    result = 'noite razoável';
                    break;
                case "34":
                    result = 'dia razoável';
                    break;
                case "36":
                    result = 'quente';
                    break;
                case "37":
                    result = 'trovoadas isoladas';
                    break;
                case "39":
                case "38":
                    result = 'Trovoadas dispersas';
                    break;
                case "40":
                    result = 'chuvas esparsas';
                    break;
                case "43":
                case "41":
                    result = 'neve pesada';
                    break;
                case "42":
                    result = 'insistência de neve';
                    break;
                case "44":
                    result = 'parcial nublado';
                    break;
                case "45":
                    result = 'chuvas fortes';
                    break;
                case "46":
                    result = 'pancadas de neve';
                    break;
                case "47":
                    result = 'chuvas fortes isolada';
                    break;
                case "3200":
                    result = 'Não disponível';
                    break;
            }
            return result;
        }

        function getIcone(code) {
            var icones = [];
            icones[0] = 'wi wi-tornado';
            icones[1] = 'wi wi-storm-showers';
            icones[2] = 'wi wi-hurricane';
            icones[3] = 'wi wi-thunderstorm';
            icones[4] = 'wi wi-thunderstorm';
            icones[5] = 'wi wi-rain-mix';
            icones[6] = 'wi wi-sleet';
            icones[7] = 'wi wi-sleet';
            icones[8] = 'wi wi-raindrops';
            icones[9] = 'wi wi-raindrops';
            icones[10] = 'wi wi-rain';
            icones[11] = 'wi wi-showers';
            icones[12] = 'wi wi-showers';
            icones[13] = 'wi wi-snow';
            icones[14] = 'wi wi-snow';
            icones[15] = 'wi wi-snow';
            icones[16] = 'wi wi-snow';
            icones[17] = 'wi wi-hail';
            icones[18] = 'wi wi-sleet';
            icones[19] = 'wi wi-dust';
            icones[20] = 'wi wi-fog';
            icones[21] = 'wi wi-cloudy-windy';
            icones[22] = 'wi wi-smoke';
            icones[23] = 'wi wi-strong-wind';
            icones[24] = 'wi wi-windy';
            icones[25] = 'wi wi-snowflake-cold';
            icones[26] = 'wi wi-cloudy';
            icones[27] = 'wi wi-night-cloudy';
            icones[28] = 'wi wi-day-cloudy';
            icones[29] = 'wi wi-night-partly-cloudy';
            icones[30] = 'wi wi-day-sunny-overcast';
            icones[31] = 'wi wi-night-clear';
            icones[32] = 'wi wi-day-sunny';
            icones[33] = 'wi wi wi-night-clear';
            icones[34] = 'wi wi-day-sunny';
            icones[35] = 'wi wi-hail';
            icones[36] = 'wi wi-hot';
            icones[37] = 'wi wi-day-thunderstorm';
            icones[38] = 'wi wi-thunderstorm';
            icones[39] = 'wi wi-thunderstorm';
            icones[40] = 'wi wi-showers';
            icones[41] = 'wi wi-snow';
            icones[42] = 'wi wi-snow';
            icones[43] = 'wi wi-cloudy';
            icones[44] = 'wi wi-cloudy';
            icones[45] = 'wi wi-thunderstorm';
            icones[46] = 'wi wi-snow';
            icones[47] = 'wi wi-day-sleet-storm';
            icones[3200] = 'wi wi-na';
            return '<i class="' + icones[code] + '"></i>'
        }

        function forecastData(data){

            if(data.length == 0 || !data.query.results){
                return null;
            }


            var retorno      = { info: {}, hoje: {}, proximos_dias: [] },
                channel      = data.query.results.channel,
                current      = channel.item.condition,
                lista        = channel.item.forecast;

            retorno.info = {
                lat:        channel.item.lat,
                long:       channel.item.long,
                cidade:     channel.location.city,
                estado:     channel.location.region
            };

            retorno.hoje.temperatura = current.temp;

            for (var position in lista) {

                if(position == 5){
                    break;
                }

                var item = lista[position];

                var nDate   = item.date.split(' '),
                    nDia    = nDate[0];

                var tdiaSemana = traduzirDiaSemana(item.day),
                    tMes       = traduzirMes(item.date);

                var registro = {
                    data:           nDia +" "+ tMes.nome,
                    data_completa:  ucFirst(tdiaSemana.nome) +"-"+ tdiaSemana.prefixo + ", " + nDia + " " + tMes.nome,
                    mes:            tMes.nome,
                    dia:            nDia,
                    dia_mes:        nDia + " " + tMes.nome,
                    dia_semana:     ucFirst(tdiaSemana.nome) + ( tdiaSemana.prefixo ? "-"+ ucFirst(tdiaSemana.prefixo) : ""),
                    maxima:         item.high,
                    minima:         item.low,
                    descricao:      getCondicao(item.code),
                    icone:          getIcone(item.code)
                };

                if(position == 0){
                    retorno.hoje = $.extend( retorno.hoje, registro);
                } else {
                    retorno.proximos_dias.push(registro);
                }

            }

            return retorno;
        }



        function init() {
            elements();
            if(settings.timeout !== false){
                setTimeout(init, settings.timeout * 1000);
            }
        }

        init();
    };


})(jQuery);




