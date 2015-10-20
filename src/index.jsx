/*global React, io, $*/

var eventId = 0;

var MessageDetails = React.createClass({
   render: function() {
      return <div className="container" id='details'>
      <pre>{this.props.message.message}</pre>
      <span>{this.props.message.logger}</span>
      </div>;
   }
});


var LogEntry = React.createClass({
   handleClick: function(){
      this.props.select(this.props.event);
   },
   render: function() {
      return <tr key={this.props.key}
      className={'log-' + this.props.event.level.toLowerCase()}>
      <td>
      <span className="glyphicon"></span>
      </td>
      <td onClick={this.handleClick}>{this.props.event.message}</td>
      <td>{this.props.event.logger}</td>
      </tr>;
   }
});

var LogList = React.createClass({
   render: function() {
      var createEvent = (function(select){ return function(logEvent) {
         return <LogEntry
         key={++eventId}
         event={logEvent}
         select={select} />;
      };
   })(this.props.select);

   return <table className="table table-condensed">
   <tbody>{this.props.events.map(createEvent)}</tbody>
   </table>;
}
});

var LatestButton = React.createClass({
   handleClick: function(){
      this.props.go();
   },
   render: function(){
      return <button type="button" className="btn btn-primary" onClick={this.handleClick}>
      <span className="glyphicon glyphicon-chevron-down"></span>
      Latest
      </button>
   }
});


var App = React.createClass({
   getInitialState: function() {
      return {events: [], atBottom: true, selected: null};
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

      var wasAtBottom = this.state.atBottom;

      this.setState({events: nextEvents});

      console.log('wasAtBottom')
      this.gotoLatest();
   },
   gotoLatest: function(){
      var $container = $(React.findDOMNode(this));
      var $list = $(React.findDOMNode(this.refs.list));

      $container.stop();
      $container.animate({ 
         scrollTop: $list.height() - $container.height()}, 
         { duration: 1100, queue: false }
         );
   },
   clear: function(){
      this.setState({events: [], selected: null});
   },
   select: function(message){
      this.setState({selected: message});
   },
   componentDidMount: function(){
      var socket = io();
      socket.on('event', this.newEvent);

      $('#clear').click(this.clear);
   },
   render: function() {
      return (
         <div id='log' onScroll={this.handleScroll}>
         <LogList ref='list' events={this.state.events} select={this.select} />
         { this.state.atBottom ? null : <LatestButton go={this.gotoLatest} /> }
         { this.state.selected != null ? <MessageDetails message={this.state.selected} /> : null }
         </div>
         );
   }
});

React.render(<App />, document.getElementById('body'));

