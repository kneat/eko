/*global React, io, $*/

var MessageDetails = React.createClass({
   handleClick: function(){
      this.props.deselect();
   },
   render: function() {
      return <dialog open onClick={this.handleClick}>
      <header>
      {this.props.message.logger}
      </header>
      <pre>{this.props.message.message}</pre>
      </dialog>;
   }
});


var LogEntry = React.createClass({
   handleClick: function(){
      this.props.select(this.props.event);
   },
   render: function() {
      return <tr
            key={this.props.key}
            aria-selected={this.props.selected}
            className={'log-' + this.props.event.level.toLowerCase() + ' ' + this.props.selected}>
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
      var createEvent = (function(select, selectedIndex){ return function(logEvent, index) {
         return <LogEntry
         key={index}
         event={logEvent}
         selected={selectedIndex == index}
         select={function(){select(index);}} />;
      };
   })(this.props.select, this.props.selectedIndex);

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
      return {
         events: [],
         atBottom: true,
         selectedIndex: null
      };
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
      this.setState({events: [], selectedIndex: null});
   },
   select: function(messageIndex){
      this.setState({selectedIndex: messageIndex});
   },
   deselect: function(){
      this.setState({selectedIndex: null});
   },
   componentDidMount: function(){
      var socket = io();
      socket.on('event', this.newEvent);

      $('#clear').click(this.clear);
   },
   render: function() {
      return (
         <div id='log' onScroll={this.handleScroll}>
         <LogList ref='list'
            events={this.state.events}
            select={this.select}
            selectedIndex={this.state.selectedIndex}/>
         { this.state.atBottom ? null : <LatestButton go={this.gotoLatest} /> }
         { this.state.selectedIndex != null ?
            <MessageDetails
            deselect={this.deselect}
            message={this.state.events[this.state.selectedIndex]}/>
            : null }
            </div>
            );
   }
});

React.render(<App />, document.getElementById('body'));

