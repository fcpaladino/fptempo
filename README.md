# FPTempo JQuery plugin

- API YahooApis 

## Como usar
#### Importar os arquivos

    <script src="js/jquery.js"></script>
    <script src="dist/js/fptempo.js"></script>
    <link rel="stylesheet" href="dist/css/fptempo.css">
    
#### Carregar o plugin

    <script>
        $('.fp-tempo').fpTempo();
    </script>
    
#### Configuração

Obs: O estado pode ser tanto o nome completo quando apenas a sigla. ex: Paraná ou PR.

###### Via Atributo

*<code>data-woeid=""</code> de acordo com o woeid da cidade, o woeid de cada cidade pode ser encontrado no site http://woeid.rosselliot.co.nz/*

ou

*<code>data-cidade=""</code> e <code>data-estado=""</code> inserindo o nome da cidade e o estado.*

###### Via codigo    

woeid: 

    <script>
        $('.fp-tempo').fpTempo({
            woeid:  '',
        });
    </script>
    
Cidade e Estado: 

    <script>
        $('.fp-tempo').fpTempo({
            cidade: '',
            estado: '',
        });
    </script>
    
    
    
    
#### No formato html

    <script>
        $('.fp-tempo').fpTempo({
            format: 'html',
        });
    </script>
    

    <div class="fp-tempo" data-cidade="Londrina" data-estado="PR">
        <h1 data-tempo="cidade"></h1>
        <div><span data-tempo="temperatura"></span> Graus</div>
        <div data-tempo="icone"></div>
        <div><span data-tempo="descricao"></span></div>
        <div>Temperatura Máxima: <span data-tempo="maxima"></span> Graus</div>
        <div>Temperatura Mínima: <span data-tempo="minima"></span> Graus</div>
        <div data-tempo="data-completa"></div>
        <div>Dia: <span data-tempo="dia"></span></div>
        <div data-tempo="dia-semana"></div>
        <div data-tempo="dia-mes"></div>
    
        <h2>Próximos dias da semana</h2>
        <ol>
            <li>
                <div><span data-tempo="temperatura-1"></span> Graus</div>
                <div data-tempo="icone-1"></div>
                <div><span data-tempo="descricao-1"></span></div>
                <div>Temperatura Máxima: <span data-tempo="maxima-1"></span> Graus</div>
                <div>Temperatura Mínima: <span data-tempo="minima-1"></span> Graus</div>
                <div data-tempo="data-completa-1"></div>
                <div>Dia: <span data-tempo="dia-1"></span></div>
                <div data-tempo="dia-semana-1"></div>
                <div data-tempo="dia-mes-1"></div>
            </li>
            <li>
                <div><span data-tempo="temperatura-2"></span> Graus</div>
                <div data-tempo="icone-2"></div>
                <div><span data-tempo="descricao-2"></span></div>
                <div>Temperatura Máxima: <span data-tempo="maxima-2"></span> Graus</div>
                <div>Temperatura Mínima: <span data-tempo="minima-2"></span> Graus</div>
                <div data-tempo="data-completa-2"></div>
                <div>Dia: <span data-tempo="dia-2"></span></div>
                <div data-tempo="dia-semana-2"></div>
                <div data-tempo="dia-mes-2"></div>
            </li>
            <li>
                <div><span data-tempo="temperatura-3"></span> Graus</div>
                <div data-tempo="icone-3"></div>
                <div><span data-tempo="descricao-3"></span></div>
                <div>Temperatura Máxima: <span data-tempo="maxima-3"></span> Graus</div>
                <div>Temperatura Mínima: <span data-tempo="minima-3"></span> Graus</div>
                <div data-tempo="data-completa-3"></div>
                <div>Dia: <span data-tempo="dia-3"></span></div>
                <div data-tempo="dia-semana-3"></div>
                <div data-tempo="dia-mes-3"></div>
            </li>
            <li>
                <div><span data-tempo="temperatura-4"></span> Graus</div>
                <div data-tempo="icone-4"></div>
                <div><span data-tempo="descricao-4"></span></div>
                <div>Temperatura Máxima: <span data-tempo="maxima-4"></span> Graus</div>
                <div>Temperatura Mínima: <span data-tempo="minima-4"></span> Graus</div>
                <div data-tempo="data-completa-4"></div>
                <div>Dia: <span data-tempo="dia-4"></span></div>
                <div data-tempo="dia-semana-4"></div>
                <div data-tempo="dia-mes-4"></div>
            </li>
        </ol>
    </div>

#### No formato callback

    <script>
        $('.fp-tempo').fpTempo({
            format: 'callback',
            calllback: function(target, data){
                // target = É o proprio objeto
                // data   = É o retorno dos dados, json
            }
        });
    </script>

##### Retorno:

    {
        info:{
            cidade:"Cambara"
            estado:"PR"
            lat:"-23.03648"
            long:"-50.069141"
        },
        hoje: {
            data: "26 Agosto"
            data_completa: "Sexta-feira, 26 Agosto"
            descricao: "ensolarado"
            dia:"26"
            dia_mes: "26 Agosto"
            dia_semana:"Sexta-Feira"
            icone:"<i class="wi wi-day-sunny"></i>"
            maxima:"28"
            mes:"Agosto"
            minima:"16"
            temperatura:"23"
        },
        proximos_dias: [
            0: {
                data: "27 Agosto"
                data_completa: "Sábado, 27 Agosto"
                descricao: "ensolarado"
                dia:"26"
                dia_mes: "27 Agosto"
                dia_semana:"Sábado"
                icone:"<i class="wi wi-day-sunny"></i>"
                maxima:"28"
                mes:"Agosto"
                minima:"16"
                temperatura:"23"
            },
            1: {
                data: "28 Agosto"
                data_completa: "Domingo, 28 Agosto"
                descricao: "ensolarado"
                dia:"26"
                dia_mes: "28 Agosto"
                dia_semana:"Domingo"
                icone:"<i class="wi wi-day-sunny"></i>"
                maxima:"28"
                mes:"Agosto"
                minima:"16"
                temperatura:"23"
            },
            2: {
                data: "29 Agosto"
                data_completa: "Segunda-feira, 29 Agosto"
                descricao: "ensolarado"
                dia:"26"
                dia_mes: "29 Agosto"
                dia_semana:"Segunda-feira"
                icone:"<i class="wi wi-day-sunny"></i>"
                maxima:"28"
                mes:"Agosto"
                minima:"16"
                temperatura:"23"
            },
            3: {
                data: "30 Agosto"
                data_completa: "Terça-feira, 30 Agosto"
                descricao: "ensolarado"
                dia:"26"
                dia_mes: "Agosto"
                dia_semana:"Terça-feira"
                icone:"<i class="wi wi-day-sunny"></i>"
                maxima:"28"
                mes:"Agosto"
                minima:"16"
                temperatura:"23"
            }
        ]
    }

#### Lista de parametros disponíveis

Obs: Os parametros só funciona no formato html.

<code>data-tempo="temperatura"</code> -> Temperatura

<code>data-tempo="maxima"</code> -> Temperatura máxima

<code>data-tempo="minima"</code> -> Tempera minima

<code>data-tempo="dia"</code> -> Número do dia do mes, exemplo 21

<code>data-tempo="icone"</code> -> Icone do tempo atual

<code>data-tempo="descricao"</code> -> Exibe um texto informando o estado do tempo, por exemplo: ensolarado, nublado, etc

<code>data-tempo="dia-mes"</code> -> Exibe o número do dia seguido do nome do mês, por exemplo: 21 Janeiro

<code>data-tempo="dia-semana"</code> -> Exibe o nome do dia da semana. por exemplo Sexta-Feira

<code>data-tempo="cidade"</code> -> Exibe o nome da cidade atual

#### Previsão dos próximos dias

Para prever os próximos dias, basta acrescentar um indice ao valor do atributo desejado,
por exemplo:

<code>data-tempo="temperatura-1"</code> -> Temperatura de amanha

<code>data-tempo="temperatura-2"</code> -> Temperatura daqui há 2 dias

<code>data-tempo="temperatura-3"</code> -> Temperatura daqui há 3 dias

<code>data-tempo="temperatura-4"</code> -> Temperatura daqui há 4 dias

OBS:*O indice limite para previsão dos próximos dias é 4, sendo assim, so é possivel prever os próximos 4 dias.*
 
 
 
 
### Options

<code>woeid</code> 

**Tipo:** `String`

**Default:** `null`

`_______________________________________`

<code>cidade</code>

**Tipo:** `String`

**Default:** `null`

`_______________________________________`

<code>estado</code>

**Tipo:** `String`

**Default:** `null`

`_______________________________________`

<code>timeout</code> 

**Tipo:** `integer`

**Default:** `false`

Atualizar a cada x segundos.

`_______________________________________`

<code>unidade</code> 
   
**Tipo:** `String`

**Default:** `'c'`

- c = Celsius 
- f = Fahrenheit

`_______________________________________`
   
<code>format</code>
   
**Tipo:** `String`

**Default:** `'html'`

- html 
- callback

`_______________________________________`

<code>callback</code>
   
**Tipo:** function

**Default:** `null`

`_______________________________________`

<code>cache</code>
   
**Tipo:** boolean

**Default:** `true`

Para utilizar o cache, o timeout tem que estar como `false`.

`_______________________________________`

<code>timeCache</code>
   
**Tipo:** number

**Default:** `10` 

O tempo é contato em minutos. A cada 10 minuto o cache é atualizado.

`_______________________________________`

<code>cookie_pfx</code>
   
**Tipo:** String

**Default:** `'fptempo_cache_'` 

O prefixo do nome do cookie.

`_______________________________________`





#### Dependências

Weather Icons https://erikflowers.github.io/weather-icons/

Cookie JQuery http://plugins.jquery.com/cookie/

#### Licença

FP Tempo para jQuery é distribuído gratuitamente sob os termos de um estilo MIT [licença](LICENSE.md) .

Nota de direitos autorais e aviso de permissão devem ser incluídos em todas as cópias ou partes substanciais do Software.
