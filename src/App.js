import React, { Component } from 'react';
import './App.css';
import './bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }
   
  topicSearch = (evt) => {
    // Prepare <div> for results
    var div = document.getElementById('result');
    div.innerHTML = "";

    this.setState({
      inputValue: evt.target.value
    });

    if(!evt.target.value.trim()) return;

    // Server URL to fetch topics
    fetch("http://localhost:3000/v1/poc/"+evt.target.value)
      .then(res => res.json())
      .then(
        (topic) => {
          if(!topic.topics.length){ 
            div.innerHTML = "Sorry no topics found";
          }
          // Build results
          topic.topics.forEach(topic => {
            var newNode = document.createElement('div');      
            newNode.innerHTML = topic.name;
            div.appendChild(newNode);
          });
        },
        (error) => {
          console.log(error);
        }
      )
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-title">Topic Search</h1>
        <p className="App-intro">
          Start typing in the <b>Input box</b> to search for topic.
        </p>
        <div>
          <input className="form-control search" id="mysearch" type="text" name="search" value={this.state.inputValue} onChange={this.topicSearch}/> <br/>
          <div className="form-control result" id="result"></div>
      </div>
      </div>
    );
  }
}

export default App;
