import React, { Component } from "react";
import "../api/methods";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      query: "candy",
      err: ""
    };
  }

  componentDidMount() {
    this.callApi("candy");
  }

  getURL(p) {
    return `https://farm${p.farm}.staticflickr.com/${p.server}/${p.id}_${
      p.secret
    }_s.jpg`;
  }

  renderPhotos() {
    return this.state.photos.map(p => (
      <img key={p.id} src={this.getURL(p)} alt={p.title} />
    ));
  }

  searchQuery(e) {
    e.preventDefault();
    var searchText = document.getElementById("search").value;
    if (searchText.length > 0) {
      this.callApi(searchText);
    }
  }

  callApi(query) {
    Meteor.call("getData", { query: query }, (err, data) => {
      if (err) {
        this.setState = {
          photos: [],
          err: err
        };
        return;
      }
      this.setState({
        photos: data.photos.photo
      });
    });
  }

  render() {
    return (
      <div className="container">
        {this.state.err ? <div>Error! {this.state.err}</div> : ""}
        <h1 className="text-center">Flickr</h1>
        <form onSubmit={this.searchQuery.bind(this)} className="search-field">
          <input
            id="search"
            className=""
            type="text"
            placeholder="Search..."
            aria-label="Search"
          />
        </form>

        <div className="photos">{this.renderPhotos()}</div>
      </div>
    );
  }
}
