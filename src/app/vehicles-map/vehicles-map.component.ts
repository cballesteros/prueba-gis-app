import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Leaflet from 'leaflet';
import { Vehicle } from '../vehicle';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-vehicles-map',
  templateUrl: './vehicles-map.component.html',
  styleUrls: ['./vehicles-map.component.scss'],
})
export class VehiclesMapComponent implements OnInit, OnDestroy {

  map: Leaflet.Map;
  caliLatitude = 3.43722;
  caliLongitude = -76.5225;
  vehicles: Vehicle[] = [];

  greenIcon = Leaflet.icon({
    iconUrl: 'assets/icon/car.png',

    iconSize:     [25, 25], // size of the icon
    iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
  });

  constructor(private vehicleService:VehicleService) { }
  
  ngOnInit() { }

  ionViewDidEnter() { this.leafletMap(); }

  leafletMap() {    
    this.map = Leaflet.map('mapId').setView([this.caliLatitude, this.caliLongitude], 12);

    Leaflet.tileLayer.wms("http://idesc.cali.gov.co:8081/geoserver/wms", {
      layers: 'idesc:mc_barrios'
    }).addTo(this.map);

    this.addVehicles();
  }

  addVehicles() {
    this.vehicleService.getVehicles().subscribe(vehicles => {
      this.vehicles = vehicles;
      vehicles.forEach(vehicle => {
        Leaflet
          .marker([+vehicle.latitude, +vehicle.longitude], {icon: this.greenIcon})
          .addTo(this.map)
          .bindPopup(`<b>${vehicle.license}</b><br>${vehicle.brand}<br>${vehicle.owner}`);
        
        Leaflet.circle([+vehicle.latitude, +vehicle.longitude], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 500
        }).addTo(this.map);
      });
      
    });
  }

  refresh() {
    if (this.map !== undefined) {
      this.map.remove();
      this.leafletMap();
    }
  }

  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    this.map.remove();
  }

}
