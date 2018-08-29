export class Client {

  run() {
    this.storage = window.localStorage;

    this.showMap();
    this.initUser();
  }


  /**
   *   Shows the map
   */
  showMap() {
    var defaultMapOptions = {
      zoom: 6,
      disableDoubleClickZoom: true,
      streetViewControl: false,
      mapTypeControl: false,
      center: new google.maps.LatLng(46.227638, 2.213749),
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
      },
      panControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
      }
    };
    const map = new google.maps.Map(document.getElementById('map-canvas'), defaultMapOptions);
  }


  /**
   *  Loads the current user, or asks for its name
   */
  initUser() {
    if (this.user) {
      return;
    }

    let user;
    if (this.storage) {
      user = this.storage.getItem('user');
    }

    if (!user) {
      user = window.prompt('Nom du participant ?');
      if (this.storage) {
        this.storage.setItem('user', user);
      }
    }

    this.user = user;
  }
}
