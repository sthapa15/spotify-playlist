import React from "react";
import Track from "../Track/Track";
import "./TrackList.css";

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map((track) => {
          return (
            <Track
              track={track}
              key={track.id}
              onAdd={this.props.onAdd}
              onRemove={this.props.onRemove}
              isRemoval={this.props.isRemoval}
              imgUrl={track.art[0].url}
              imgWidth={track.art[0].width}
              imgHeight={track.art[0].height}
            />
          );
        })}
      </div>
    );
  }
}

export default TrackList;
