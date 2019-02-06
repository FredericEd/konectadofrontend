import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const Marker = () => <img alt="marker" className="marker" src={require("../../img/marker.png")} />;
 
class ReactMap extends Component {
  state = {
        center: {
            lat: -2.15,
            lng: -79.98,
        },
        markerLat: -2.15,
        markerLon: -79.98,
        zoom: 13,
  }
  componentWillMount() {
    if (this.props.latitude != 0) {
      this.setState({
          center: {
              lat: this.props.latitude,
              lng: this.props.longitude,
          },
          markerLat: this.props.latitude,
          markerLon: this.props.longitude,
      });
    } else {
      navigator.geolocation.getCurrentPosition(position => {
          this.setState({
              center: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
              },
              markerLat: position.coords.latitude,
              markerLon: position.coords.longitude,
          });
      });
    }
  }

  handleClick = event => {
      this.setState({markerLat: event.lat, markerLon: event.lng});
      this.props.handleMarker(event.lat, event.lng);
  }
 
  render() {
    return (
      <div style={{ height: '80vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBuny-5pjWt9fXlLeA2Fx5jk9n2QhuuNNM" }}
          center={this.state.center}
          defaultZoom={this.state.zoom}
          onClick={this.handleClick} >
          <Marker
            lat={this.state.markerLat}
            lng={this.state.markerLon} />
        </GoogleMapReact>
      </div>
    );
  }
}
export default ReactMap;