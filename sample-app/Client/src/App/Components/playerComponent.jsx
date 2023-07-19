import React from "react";
import { Component } from "react";

import SetVolume from "../ControlAPIs/setVolume";
import GetPlayerVolume from "../ControlAPIs/getPlayerVolume";
import PlayerVolumeSubscribe from "../UserDetails/playerVolumeSubscribe";
import {debounce} from "lodash"

class PlayerComponent extends Component {
  constructor(props) {
    super(props);
    this.volumeSlider = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.props.setState({
      getStartVolumeFlag: true,
      volumeVal: this.props.state.volumeVal,
      inGroup: this.props.inGroup
    });
  }

  handleChange() {
    this.props.setState({
      getStartVolumeFlag: this.props.state.getStartVolumeFlag,
      volumeVal: this.props.state.volumeVal,
      inGroup: !this.props.state.inGroup
    });
  }

  render() {
    return (
      <div>
        <div>
          {this.props.state.getStartVolumeFlag && (
            <GetPlayerVolume
              state={this.props.state}
              deviceId={this.props.playerId}
              museClientConfig={this.props.museClientConfig}
            />
          )}
        </div>
        <div className="playerVolumeSubscribe">
          {this.props.state.inGroup && (
            <PlayerVolumeSubscribe
              museClientConfig={this.props.museClientConfig}
              playerID={this.props.playerId}
            />
          )}
        </div>
        <div className="checkbox">
          <label>
            <input
              type="checkbox"
              checked={this.props.state.inGroup}
              onChange={this.handleChange}
            />
            <span>{this.props.playerName}</span>
          </label>
        </div>
        {this.props.state.inGroup && (
          <div className="player_slider_container">
            <i className="fa fa-volume-down"></i>
            <input
              type="range"
              min="0"
              max="100"
              value={this.props.state.volumeVal}
              step="1"
              ref={this.volumeSlider}
              className="volumeSlider"
              onChange={this.onSetVolume}
            />
            <i className="fa fa-volume-up"></i>
          </div>
        )}
        <br />
      </div>
    );
  }

  debouncedSetVolume = debounce(volume => SetVolume(volume, this.props.playerId, "PLAYER", this.props.museClientConfig), 300);

  onSetVolume = () => {
    const volume = this.volumeSlider.current.value;
    this.props.setState({
      getStartVolumeFlag: this.props.state.getStartVolumeFlag,
      volumeVal: volume,
      inGroup: this.props.state.inGroup
    });
    this.debouncedSetVolume(volume);
  }
}

export default PlayerComponent;
