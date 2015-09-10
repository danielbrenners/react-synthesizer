var React = require('react');

var AudioContext = window.AudioContext || window.webkitAudioContext;
var ctx = new AudioContext();

var osc1 = ctx.createOscillator();
var gain1 = ctx.createGain();
var bqf1 = ctx.createBiquadFilter();
bqf1.type = 'lowpass';
bqf1.frequency.value = 500;
bqf1.gain.value = 10000;

osc1.connect(bqf1);
bqf1.connect(gain1);
gain1.connect(ctx.destination);
gain1.gain.value = 0;
osc1.start(0);



var osc2 = ctx.createOscillator();
var gain2 = ctx.createGain();
osc2.connect(gain2);
gain2.connect(ctx.destination);
gain2.gain.value = 0;
osc2.start(0)


var Oscillators = React.createClass({  

  getInitialState: function() {
    return {
    	osc1: false,
    	osc1Pitch: 40,
    	osc1Type: 'sine',
    	
    	osc2: false,
    	osc2Pitch: 80,
    }
  },

  handleClick1: function(e) {
    this.setState({osc1: !this.state.osc1});
  },
  handleChange1: function(e) {
    this.setState({osc1Pitch: Number(e.target.value) + this.getInitialState().osc1Pitch });
  },
  handleRadioChang1: function(e) {
    if (document.getElementById('sine').checked){
      this.setState({osc1Type: 'sine'});
    } else if (document.getElementById('triangle').checked) {
      this.setState({osc1Type: 'triangle'});
    } else {
      this.setState({osc1Type: 'square'});
    }
  },



  handleClick2: function(e) {
    this.setState({osc2: !this.state.osc2});
  },
  handleChange2: function(e) {
    this.setState({osc2Pitch: Number(e.target.value) + this.getInitialState().osc2Pitch });
  },




  render: function () {
  	gain1.gain.value = this.state.osc1 ? 1 : 0;
  	osc1.frequency.value = this.state.osc1Pitch;
  	osc1.type = this.state.osc1Type;





  	gain2.gain.value = this.state.osc2 ? 1 : 0;
	osc2.frequency.value = this.state.osc2Pitch;

    return (
    	<div>
	    	<button onClick = {this.handleClick1}>Osc1 On/Off</button>
	       	<input type="range" onChange = {this.handleChange1}/>
			<input type="radio" onChange = {this.handleRadioChang1} name="shape" id="sine" />Sine
			<input type="radio" onChange = {this.handleRadioChang1} name="shape" id="triangle" />Triangle
			<input type="radio" onChange = {this.handleRadioChang1} name="shape" id="square" />Square


	       	<br /><br />
	       	<button onClick = {this.handleClick2}>Osc2 On/Off</button>
	       	<input type="range" onChange = {this.handleChange2}/>
        </div>
      );
  }
});

module.exports = Oscillators;








