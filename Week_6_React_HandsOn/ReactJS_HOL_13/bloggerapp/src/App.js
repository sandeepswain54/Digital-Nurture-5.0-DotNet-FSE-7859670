import React, { Component } from 'react';
import BookDetails from './BookDetails';
import BlogDetails from './BlogDetails';
import CourseDetails from './CourseDetails';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: 'book', showExtra: true };
  }

  renderContent() {
    let content;
    if (this.state.selected === 'book') {
      content = <BookDetails />;
    } else if (this.state.selected === 'blog') {
      content = <BlogDetails />;
    } else {
      content = <CourseDetails />;
    }
    return content;
  }

  renderSwitch(type) {
    switch (type) {
      case 'book':
        return <BookDetails />;
      case 'blog':
        return <BlogDetails />;
      case 'course':
        return <CourseDetails />;
      default:
        return null;
    }
  }

  render() {
    return (
      <div>
        <h2>Blogger App</h2>
        <button onClick={() => this.setState({ selected: 'book' })}>Book</button>
        <button onClick={() => this.setState({ selected: 'blog' })}>Blog</button>
        <button onClick={() => this.setState({ selected: 'course' })}>Course</button>

        {this.renderContent()}

        <hr />

        {this.state.selected === 'book' ? <BookDetails /> : <p>Not a book</p>}

        <hr />

        {this.state.showExtra && <CourseDetails />}

        <hr />

        {this.renderSwitch(this.state.selected)}
      </div>
    );
  }
}

export default App;
