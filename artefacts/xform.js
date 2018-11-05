module.exports = `<h:html xmlns=\"http://www.w3.org/2002/xforms\" xmlns:ev=\"http://www.w3.org/2001/xml-events\" xmlns:h=\"http://www.w3.org/1999/xhtml\" xmlns:jr=\"http://openrosa.org/javarosa\" xmlns:odk=\"http://www.opendatakit.org/xforms\" xmlns:orx=\"http://openrosa.org/xforms\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">
  <h:head>
    <h:title>Birds</h:title>
    <model>
      <itext>
        <translation default=\"true()\" lang=\"default\">
          <text id=\"/None/observation/bird:label\">
            <value>What bird did you see?</value>
            <value form=\"audio\">jr://audio/question.wav</value>
          </text>
          <text id=\"/None/observation/bird/eagle:label\">
            <value>Eagle</value>
            <value form=\"image\">jr://images/eagle.png</value>
          </text>
          <text id=\"/None/observation/bird/kingfisher:label\">
            <value>Kingfisher</value>
            <value form=\"image\">jr://images/kingfisher.png</value>
          </text>
          <text id=\"/None/observation/bird/pigeon:label\">
            <value>Pigeon</value>
            <value form=\"image\">jr://images/pigeon.png</value>
          </text>
          <text id=\"/None/observation/bird/nuthatch:label\">
            <value>Nuthatch</value>
            <value form=\"image\">jr://images/nuthatch.png</value>
          </text>
          <text id=\"/None/observation/bird/robin:label\">
            <value>Robin</value>
            <value form=\"image\">jr://images/european-robin.png</value>
          </text>
          <text id=\"/None/observation/bird/tit:label\">
            <value>Tit</value>
            <value form=\"image\">jr://images/tit.png</value>
          </text>
          <text id=\"/None/observation/bird/sparrow:label\">
            <value>Sparrow</value>
            <value form=\"image\">jr://images/sparrow.png</value>
          </text>
          <text id=\"/None/observation/bird/starling:label\">
            <value>Starling</value>
            <value form=\"image\">jr://images/starling.png</value>
          </text>
          <text id=\"/None/observation/bird/hawfinch:label\">
            <value>Hawfinch</value>
            <value form=\"image\">jr://images/hawfinch.png</value>
          </text>
          <text id=\"/None/observation/bird/bluethroat:label\">
            <value>Bluethroat</value>
            <value form=\"image\">jr://images/bluethroat.png</value>
          </text>
          <text id=\"/None/observation/bird/wren:label\">
            <value>Wren</value>
            <value form=\"image\">jr://images/wren.png</value>
          </text>
          <text id=\"/None/observation/bird/knot:label\">
            <value>Knot</value>
            <value form=\"image\">jr://images/knot.png</value>
          </text>
          <text id=\"/None/observation/bird/jay:label\">
            <value>Jay</value>
            <value form=\"image\">jr://images/jay.png</value>
          </text>
          <text id=\"/None/observation/bird/woodpecker:label\">
            <value>Woodpecker</value>
            <value form=\"image\">jr://images/woodpecker.png</value>
          </text>
          <text id=\"/None/observation/bird/blackbird:label\">
            <value>Blackbird</value>
            <value form=\"image\">jr://images/blackbird.png</value>
          </text>
          <text id=\"/None/observation/bird/crow:label\">
            <value>Crow</value>
            <value form=\"image\">jr://images/carrioncrow.png</value>
          </text>
          <text id=\"/None/observation/bird/gull:label\">
            <value>Gull</value>
            <value form=\"image\">jr://images/gull.png</value>
          </text>
          <text id=\"/None/observation/bird/yellowgull:label\">
            <value>Yellowgull</value>
            <value form=\"image\">jr://images/yellowgull.png</value>
          </text>
          <text id=\"/None/observation/bird/shag:label\">
            <value>Shag</value>
            <value form=\"image\">jr://images/shag.png</value>
          </text>
          <text id=\"/None/observation/bird/pelican:label\">
            <value>Pelican</value>
            <value form=\"image\">jr://images/pelican.png</value>
          </text>
          <text id=\"/None/observation/bird/heron:label\">
            <value>Heron</value>
            <value form=\"image\">jr://images/heron.png</value>
          </text>
          <text id=\"/None/observation/bird/egret:label\">
            <value>Egret</value>
            <value form=\"image\">jr://images/egret.png</value>
          </text>
          <text id=\"/None/observation/bird/goose:label\">
            <value>Goose</value>
            <value form=\"image\">jr://images/goose.png</value>
          </text>
        </translation>
      </itext>
      <instance>
        <None id=\"Birds\" version=\"20181026\">
          <start/>
          <end/>
          <today/>
          <imei/>
          <demographic>
            <name/>
            <nationality/>
          </demographic>
          <weather>
            <temp/>
            <humidity/>
            <wind/>
          </weather>
          <observation jr:template=\"\">
            <picture/>
            <bird/>
            <location/>
            <notes/>
          </observation>
          <meta>
            <instanceID/>
          </meta>
        </None>
      </instance>
      <bind jr:preload=\"timestamp\" jr:preloadParams=\"start\" nodeset=\"/None/start\" type=\"dateTime\"/>
      <bind jr:preload=\"timestamp\" jr:preloadParams=\"end\" nodeset=\"/None/end\" type=\"dateTime\"/>
      <bind jr:preload=\"date\" jr:preloadParams=\"today\" nodeset=\"/None/today\" type=\"date\"/>
      <bind jr:preload=\"property\" jr:preloadParams=\"deviceid\" nodeset=\"/None/imei\" type=\"string\"/>
      <bind nodeset=\"/None/demographic/name\" type=\"string\"/>
      <bind nodeset=\"/None/demographic/nationality\" type=\"string\"/>
      <bind nodeset=\"/None/weather/temp\" type=\"string\"/>
      <bind nodeset=\"/None/weather/humidity\" type=\"select1\"/>
      <bind nodeset=\"/None/weather/wind\" type=\"select1\"/>
      <bind nodeset=\"/None/observation/picture\" type=\"binary\"/>
      <bind nodeset=\"/None/observation/bird\" type=\"select1\"/>
      <bind nodeset=\"/None/observation/location\" type=\"geopoint\"/>
      <bind nodeset=\"/None/observation/notes\" type=\"string\"/>
      <bind calculate=\"concat('uuid:', uuid())\" nodeset=\"/None/meta/instanceID\" readonly=\"true()\" type=\"string\"/>
    </model>
  </h:head>
  <h:body>
    <group appearance=\"field-list\" ref=\"/None/demographic\">
      <label>Demographic information</label>
      <input ref=\"/None/demographic/name\">
        <label>Please enter your name:</label>
      </input>
      <input ref=\"/None/demographic/nationality\">
        <label>Please enter your country:</label>
      </input>
    </group>
    <group appearance=\"field-list\" ref=\"/None/weather\">
      <label>Weather information</label>
      <input ref=\"/None/weather/temp\">
        <label>Temperature:</label>
      </input>
      <select1 ref=\"/None/weather/humidity\">
        <label>Humidity:</label>
        <item>
          <label>Dry or low</label>
          <value>low</value>
        </item>
        <item>
          <label>Normal or medium</label>
          <value>med</value>
        </item>
        <item>
          <label>Wet or high</label>
          <value>high</value>
        </item>
      </select1>
      <select1 ref=\"/None/weather/wind\">
        <label>Wind conditions:</label>
        <item>
          <label>Little or no wind</label>
          <value>low</value>
        </item>
        <item>
          <label>Breezy or light wind</label>
          <value>med</value>
        </item>
        <item>
          <label>Strong or very windy</label>
          <value>high</value>
        </item>
      </select1>
    </group>
    <group ref=\"/None/observation\">
      <label></label>
      <repeat nodeset=\"/None/observation\">
        <upload mediatype=\"image/*\" ref=\"/None/observation/picture\">
          <label>If possible, please take a picture of your observation</label>
        </upload>
        <select1 ref=\"/None/observation/bird\">
          <label ref=\"jr:itext('/None/observation/bird:label')\"/>
          <hint>Some birds have included images or audio.</hint>
          <item>
            <label ref=\"jr:itext('/None/observation/bird/eagle:label')\"/>
            <value>eagle</value>
          </item>
          <item>
            <label ref=\"jr:itext('/None/observation/bird/kingfisher:label')\"/>
            <value>kingfisher</value>
          </item>
          <item>
            <label ref=\"jr:itext('/None/observation/bird/pigeon:label')\"/>
            <value>pigeon</value>
          </item>
          <item>
            <label ref=\"jr:itext('/None/observation/bird/nuthatch:label')\"/>
            <value>nuthatch</value>
          </item>
          <item>
            <label ref=\"jr:itext('/None/observation/bird/robin:label')\"/>
            <value>robin</value>
          </item>
          <item>
            <label ref=\"jr:itext('/None/observation/bird/tit:label')\"/>
            <value>tit</value>
          </item>
          <item>
            <label ref=\"jr:itext('/None/observation/bird/sparrow:label')\"/>
            <value>sparrow</value>
          </item>
          <item>
            <label ref=\"jr:itext('/None/observation/bird/starling:label')\"/>
            <value>starling</value>
          </item>
          <item>
            <label ref=\"jr:itext('/None/observation/bird/hawfinch:label')\"/>
            <value>hawfinch</value>
          </item>
          <item>
            <label ref=\"jr:itext('/None/observation/bird/bluethroat:label')\"/>
            <value>bluethroat</value>
          </item>
          <item>
            <label ref=\"jr:itext('/None/observation/bird/wren:label')\"/>
            <value>wren</value>
          </item>
          <item>
            <label ref=\"jr:itext('/None/observation/bird/knot:label')\"/>
            <value>knot</value>
          </item>
          <item>
            <label ref=\"jr:itext('/None/observation/bird/jay:label')\"/>
            <value>jay</value>
          </item>
          <item>
            <label ref=\"jr:itext('/None/observation/bird/woodpecker:label')\"/>
            <value>woodpecker</value>
          </item>
          <item>
            <label ref=\"jr:itext('/None/observation/bird/blackbird:label')\"/>
            <value>blackbird</value>
          </item>
          <item>
            <label ref=\"jr:itext('/None/observation/bird/crow:label')\"/>
            <value>crow</value>
          </item>
          <item>
            <label ref=\"jr:itext('/None/observation/bird/gull:label')\"/>
            <value>gull</value>
          </item>
          <item>
            <label ref=\"jr:itext('/None/observation/bird/yellowgull:label')\"/>
            <value>yellowgull</value>
          </item>
          <item>
            <label ref=\"jr:itext('/None/observation/bird/shag:label')\"/>
            <value>shag</value>
          </item>
          <item>
            <label ref=\"jr:itext('/None/observation/bird/pelican:label')\"/>
            <value>pelican</value>
          </item>
          <item>
            <label ref=\"jr:itext('/None/observation/bird/heron:label')\"/>
            <value>heron</value>
          </item>
          <item>
            <label ref=\"jr:itext('/None/observation/bird/egret:label')\"/>
            <value>egret</value>
          </item>
          <item>
            <label ref=\"jr:itext('/None/observation/bird/goose:label')\"/>
            <value>goose</value>
          </item>
          <item>
            <label>Other Bird</label>
            <value>otherbird</value>
          </item>
        </select1>
        <input ref=\"/None/observation/location\">
          <label>Please record your location</label>
        </input>
        <input ref=\"/None/observation/notes\">
          <label>Please enter any notes about your observation</label>
          <hint>This is optional, of course</hint>
        </input>
      </repeat>
    </group>
  </h:body>
</h:html>
`
