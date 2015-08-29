var LogList = React.createClass({
  render: function() {
    var rowClass = function(level){
      switch(level){
        case 'fatal': return 'text-danger';
        case 'error': return 'text-danger';
        case 'warn': return 'text-warning';
        case 'warn': return 'text-warning';
        case 'info': return '';
        case 'debug': return 'text-muted';
        case 'trace': return 'text-muted';
      }
    };
    var createEvent = function(logEvent, index) {
      return <tr className={rowClass(logEvent.level)}>
      <td>
        <span className="glyphicon glyphicon-info-sign"></span>
      </td>
      <td>{logEvent.message}</td>
      <td>{logEvent.logger}</td>
      </tr>;
    };
    return <table className="table">
    <tbody>{this.props.events.map(createEvent)}</tbody>
    </table>;
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
  clear: function(logEvent){
    this.setState({events: []});
  },
  componentDidMount: function(){
    var socket = io();
    socket.on('event', this.newEvent);

    $('#clear').click(this.clear);
  },
  render: function() {
    return (
      <LogList events={this.state.events} />
      );
  }
});

React.render(<App />, document.getElementById('log'));

