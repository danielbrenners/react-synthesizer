var React = require('react');
var Oscillator = require('./Oscillator')

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();


var Synth = React.createClass({

  render: function () {
    return (
    	<div>
	    	<Oscillator audioCtx={audioCtx} channel="A"/>
	    	<br />
	    	<Oscillator audioCtx={audioCtx} channel="B"/>

        </div>
      );
  }
});



module.exports = Synth;
