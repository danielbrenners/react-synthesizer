var React = require('react');
var Oscillators = require('./Oscillators')




var Synth = React.createClass({

  render: function () {
    return (
    	<div>
    	<Oscillators />
        </div>
      );
  }
});



module.exports = Synth;
