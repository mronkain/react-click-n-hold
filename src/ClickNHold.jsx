import React, {Component} from 'react';

export default class ClickNHold extends Component {

    constructor(props) {
        super(props);
        this.state = {
            holding: false,
            start: 0,
            ended: 'begin',
        }

        this.start = this.start.bind(this);
        this.end = this.end.bind(this);
        this.timeout = this.timeout.bind(this);
    }

    /*Start callback*/
    start(e){
        let ended = this.state.ended;
        let start = Date.now()
        this.setState({start: start, holding: true, ended: false});
        if (ended) {
            setTimeout(function(){this.timeout(start)}.bind(this),
               this.props.time*1000+1);
        }
        if (this.props.onStart) {
            this.props.onStart(e);
        }
    }

    /*End callback*/
    end(e) {
        let endTime = Date.now(); //End time
        let minDiff = this.props.time * 1000; // In seconds
        let startTime = this.state.start; // Start time
        let diff = endTime - startTime; // Time difference
        let isEnough = diff >= minDiff; // It has been held for enough time
        this.setState({holding: false, ended: true});
        
        if (this.props.onEnd){
          this.props.onEnd(e);
        }
     }

    /*Timeout callback*/
    timeout(start){
        if (!this.state.ended && start === this.state.start){
            if(this.props.onClickNHold){
                this.props.onClickNHold(start);
                this.setState({ holding: false});
                return;
            }
        }
    }

    render() {
        let classList = this.props.className ? (this.props.className +' '):' ';
        classList += this.state.holding ? 'cnh_holding ':'';
        classList += this.state.ended ? 'cnh_ended ':'';
         return (
            <div style={this.props.style} 
                 className={classList}
                 onMouseDown={this.start}
                 onTouchStart={this.start}
                 onMouseUp={this.end}
                 onTouchCancel={this.end}
                 onTouchEnd={this.end}>
                    {this.props.children}
            </div>);
    }

}