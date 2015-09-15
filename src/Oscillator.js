var React = require('react');


var Oscillator = React.createClass({  
  componentWillMount: function() {

    // Connect the audio components
    // Source --> Filter --> Gain
    this.state.source.connect(this.state.lowpass);
    this.state.lowpass.connect(this.state.gainnode);
    this.state.gainnode.connect(this.props.audioCtx.destination);

    // Set filter
    this.state.lowpass.type = 'lowpass';

    // Silence source before it starts
    this.state.gainnode.gain.value = 0;

    // Start source output
    this.state.source.start(0);
  },

  getInitialState: function() {
    return { 
      source: this.props.audioCtx.createOscillator(),
      lowpass: this.props.audioCtx.createBiquadFilter(),
      gainnode: this.props.audioCtx.createGain(),

      sourceVolume: 0,
      sourcePreviousVolume: 0.5,
    	sourcePitch: 120,
    	sourceWaveType: 'sine',
      lowpassCutoff: 500
    }
  },

  changesourceOn: function(e) {
    if (this.state.sourceVolume === 0){
      this.setState({sourceVolume: this.state.sourcePreviousVolume});
    } else {
      this.setState({sourcePreviousVolume: this.state.sourceVolume});
      this.setState({sourceVolume: 0});
    }
  },

  changesourceVolume: function(e){
    this.setState({sourceVolume: Number(e.target.value)});
  },

  changesourcePitch: function(e) {
    this.setState({sourcePitch: Number(e.target.value)});
  },

  changeSourceWaveType: function(e) {
    this.setState({sourceWaveType: e.target.id});
  },

  changelowpassCutoff: function(e) {
    this.setState({ lowpassCutoff: Number(e.target.value) }); 
  },

  render: function () {
    this.state.gainnode.gain.value = this.state.sourceVolume;
  	this.state.source.frequency.value = this.state.sourcePitch;
  	this.state.source.type = this.state.sourceWaveType;
    this.state.lowpass.frequency.value= this.state.lowpassCutoff;

    return (
    	<div>
      
        <button onClick = {this.changesourceOn}>{this.props.channel} on/off</button>
        <br />
        <input type="radio" onChange = {this.changeSourceWaveType} name={this.props.channel} id="sine" defaultChecked="true"/>Sine
        <input type="radio" onChange = {this.changeSourceWaveType} name={this.props.channel} id="triangle" />Triangle
        <input type="radio" onChange = {this.changeSourceWaveType} name={this.props.channel} id="square" />Square 
        <br/>
        Volume <input type="range"  min="0" max="1" step=".01" onChange = {this.changesourceVolume} />
        <br />
  	    Pitch <input type="range"  min="0" max="1000" defaultValue="120" onChange = {this.changesourcePitch} />
        <br />
        Filter Frequency <input type="range"  min="0" max="1000" onChange = {this.changelowpassCutoff}  />
        <br />
      </div>
      );
  }
});

module.exports = Oscillator;



