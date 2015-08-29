var LogList = React.createClass({
  render: function() {
    var createEvent = function(logEvent, index) {
      return <li key={index}>{logEvent.message}</li>;
    };
    return <ul>{this.props.events.map(createEvent)}</ul>;
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {events: []};
  },
  newEvent: function(logEvent){
    var nextEvents = this.state.events.concat(logEvent);
    this.setState({events: nextEvents});
  },
  componentDidMount: function(){
    var socket = io();
    socket.on('event', this.newEvent);
  },
  render: function() {
    return (
      <LogList events={this.state.events} />
    );
  }
});

React.render(<App />, document.getElementById('log'));

