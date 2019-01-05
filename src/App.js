import React, { Component, Fragment } from 'react';
import {sampleText} from './resources/sampleText';
import marked from 'marked';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: sampleText
    }
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
    const text = event.target.value;
    this.setState({text});
  }

  renderText(text) {
    return text = marked(text, {sanitize: true});
  }

  componentDidMount() {
    const text = localStorage.getItem('markdownText');
    if (text){
      this.setState({text});
    }else {
      this.setState({text: sampleText});
    }
  }

  componentDidUpdate(){
    const {text} = this.state
    localStorage.setItem('markdownText', text);
  }

  render() {
    return (
      <Fragment>
        <div className="container">
          <div className="row">

            <div className="col-sm-6">
                <textarea 
                  className="form-control" 
                  rows="35" value={this.state.text} 
                  onChange={this.handleChange}
                />
            </div>

            <div className="col-sm-6">
                <div>
                  <div dangerouslySetInnerHTML={{ __html: this.renderText(this.state.text)}} />
                </div>
            </div>

          </div>
        </div>

      </Fragment >


    );
  }
}

export default App;
