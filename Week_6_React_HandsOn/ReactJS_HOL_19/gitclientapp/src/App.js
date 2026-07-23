import React, { Component } from 'react';
import GitClient from './GitClient';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { repos: [] };
    this.gitClient = new GitClient();
  }

  componentDidMount() {
    this.gitClient.getRepositories('techiesyed')
      .then(repos => {
        this.setState({ repos });
      })
      .catch(error => {
        console.log('Error fetching repos:', error);
      });
  }

  render() {
    return (
      <div>
        <h2>Repositories for techiesyed</h2>
        <ul>
          {this.state.repos.map((repo, index) => (
            <li key={index}>{repo}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
