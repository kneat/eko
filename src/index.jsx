/*global React, io, $*/

var eventId = 0;

var LogList = React.createClass({
   render: function() {
      var createEvent = function(logEvent) {
         return <tr key={++eventId}
         className={'log-' + logEvent.level.toLowerCase()}>
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

var LatestButton = React.createClass({
   render: function(){
      return <button type="button" className="btn btn-primary">
      <span className="glyphicon glyphicon-chevron-down"></span>
      Latest
      </button>
   }
});


var App = React.createClass({
   getInitialState: function() {
      return {events: [], atBottom: true};
   },
   handleScroll: function(e){
      var $container = $(e.target);
      var $list = $(React.findDOMNode(this.refs.list));

      this.setState({
         atBottom: $container.scrollTop() + $container.height() > $list.height() - 5
      })
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
         <div id='log' onScroll={this.handleScroll}>
         <LogList ref='list' events={this.state.events} />
         { this.state.atBottom ? null : <LatestButton /> }
         </div>
         );
   }
});

React.render(<App />, document.getElementById('body'));

