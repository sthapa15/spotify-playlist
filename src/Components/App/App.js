import "./App.css";
import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import Playlist from "../Playlist/Playlist";
import SearchResults from "../SearchResults/SearchResults";
// import { Playlist } from "./Playlist";
// import { SearchResults } from "./SearchResults";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [
        {
          name: "Mr. Brightside",
          artist: "The Killers",
          album: "Dunno",
          id: 1,
        },
        { name: "Hey Jude", artist: "The Beatles", album: "Dunno2", id: 2 },
        { name: "Sk8er Boi", artist: "Avril Lavigne", album: "Dunno3", id: 3 },
      ],
      playlistName: "Fav Songs",
      playlistTracks: [
        {
          name: "Yellow Submarine",
          artist: "The Beatles",
          album: "Yellow Submarine",
          id: "id1",
        },
        {
          name: "Hey Ya",
          artist: "Outkast",
          album: "something",
          id: "id2",
        },
        {
          name: "Rude Boy",
          artist: "Rihanna",
          album: "gold",
          id: "id3",
        },
      ],
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }

    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);

    this.setState({ playlistTracks: tracks });
  }

  render() {
    return (
      <div>
        <h1>
          Musical <span className="highlight">Zen</span>
        </h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistTracks={this.state.playlistTracks}
              playlistName={this.state.playlistName}
              onRemove={this.removeTrack}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
