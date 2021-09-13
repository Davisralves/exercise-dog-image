import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      dogImage: '',
      status: 'fail',
      imagesArray: [],
    };
    this.getData = this.getData.bind(this);
    this.renderDogElement = this.renderDogElement.bind(this);
  }

  async componentDidMount() {
    await this.getData();
    const { dogImage } = this.state;
    const race = dogImage.split('/')[4];
    // eslint-disable-next-line no-alert
    alert(`A raça é ${race}`);
  }

  async getData() {
    this.setState({ status: 'Loading' });
    const json = await fetch('https://dog.ceo/api/breeds/image/random');
    const { message, status } = await json.json();
    this.setState((prevstate) => ({
      dogImage: message,
      status,
      imagesArray: [...prevstate.imagesArray, message],
    }));
  }

  renderDogElement() {
    const { imagesArray } = this.state;
    return (
      imagesArray.map((image, index) => {
        if (index !== imagesArray.length - 1) {
          return <img src={ image } alt="dog" key={ index } className="dogImage" />;
        }
      })
    );
  }

  render() {
    const { status, dogImage } = this.state;
    const dogElement = <img src={ dogImage } alt="dog" className="dogImage" />;
    const loadingElement = <span>Loading...</span>;
    return (
      <main>
        { this.renderDogElement() }
        { status === 'success' ? dogElement : loadingElement }
        <button onClick={ this.getData } type="button">Atualizar</button>
      </main>
    );
  }
}

export default App;
