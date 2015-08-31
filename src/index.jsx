/*global React, io, $*/

var LogList = React.createClass({
   render: function() {
      var createEvent = function(logEvent) {
         return <tr className={'log-' + logEvent.level.toLowerCase()}>
         <td>
         <span className="glyphicon"></span>
         </td>
         <td>{logEvent.message}</td>
         <td>{logEvent.logger}</td>
         </tr>;
      };
      return <table className="table table-condensed">
      <tbody>{this.props.events.map(createEvent)}</tbody>
      </table>;
   }
});

var App = React.createClass({
   getInitialState: function() {
      return {events: []};
   },
   newEvent: function(logEvent){
      var nextEvents = this.state.events
      .slice(-10000)
      .concat(logEvent);
      this.setState({events: nextEvents});
   },
   clear: function(){
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

