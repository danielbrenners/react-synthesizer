var React = require('react');

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();

// Set up the first oscillator
var source1 = audioCtx.createOscillator();
var gainNode1 = audioCtx.createGain();
var distortion1 = audioCtx.createWaveShaper();
var biquadFilter1 = audioCtx.createBiquadFilter();
var convolver1 = audioCtx.createConvolver();

// Connect the audio components
// source --> distortion --> biquad filter - 
// -> convolver --> gain --> desination
source1.connect(biquadFilter1);
biquadFilter1.connect(gainNode1);
gainNode1.connect(audioCtx.destination);

biquadFilter1.gain.value = 0;
gainNode1.gain.value = 1;

biquadFilter1.type = 'lowpass';
biquadFilter1.frequency.value = 500;
biquadFilter1.gain.value = 25;



// Set up the second oscillator
var source2 = audioCtx.createOscillator();
var gainNode2 = audioCtx.createGain();

source2.connect(gainNode2);
gainNode2.connect(audioCtx.destination);
gainNode2.gain.value = 0;

source1.start(0);
source2.start(0);


var Oscillators = React.createClass({  

  getInitialState: function() {
    return {
    	source1: false,
    	source1Pitch: 40,
    	source1Type: 'sine',
      source1BQFFreq: 100,
    	
    	source2: false,
    	source2Pitch: 80,
    }
  },

  handleClick1: function(e) {
    this.setState({source1: !this.state.source1});
  },
  handleChange1: function(e) {
    this.setState({source1Pitch: Number(e.target.value) + this.getInitialState().source1Pitch });
  },
  handleRadioChang1: function(e) {
    if (document.getElementById('sine').checked){
      this.setState({source1Type: 'sine'});
    } else if (document.getElementById('triangle').checked) {
      this.setState({source1Type: 'triangle'});
    } else {
      this.setState({source1Type: 'square'});
    }
  },

  handleBQFFreq1: function(e) {
    this.setState({ source1BQFFreq: (Number(e.target.value) + this.getInitialState().source1BQFFreq)*10-1000 }); 
  },



  handleClick2: function(e) {
    this.setState({source2: !this.state.source2});
  },
  handleChange2: function(e) {
    this.setState({source2Pitch: Number(e.target.value) + this.getInitialState().source2Pitch });
  },




  render: function () {
  	gainNode1.gain.value = this.state.source1 ? 1 : 0;
  	source1.frequency.value = this.state.source1Pitch;
  	source1.type = this.state.source1Type;
    biquadFilter1.frequency.value= this.state.source1BQFFreq;

  	gainNode2.gain.value = this.state.source2 ? 1 : 0;
	  source2.frequency.value = this.state.source2Pitch;

    return (
    	<div>
	    	
        <button onClick = {this.handleClick1}>source1 On/Off</button> <br />
  	    Pitch <input type="range" onChange = {this.handleChange1}/> <br />
  			<input type="radio" onChange = {this.handleRadioChang1} name="shape" id="sine" />Sine
  			<input type="radio" onChange = {this.handleRadioChang1} name="shape" id="triangle" />Triangle
  			<input type="radio" onChange = {this.handleRadioChang1} name="shape" id="square" />Square <br/>
        Cutoff Freq<input type="range" onChange = {this.handleBQFFreq1} /> <br />

       	<br /><br /><br /><br /><br />
       	<button onClick = {this.handleClick2}>source2 On/Off</button>
       	<input type="range" onChange = {this.handleChange2}/>
      
      </div>
      );
  }
});

module.exports = Oscillators;








