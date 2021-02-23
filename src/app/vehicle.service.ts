import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from './vehicle';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  //private vehiclesUrl:string = "http://localhost:3000/vehicles";
  private vehiclesUrl:string = "https://shielded-coast-71212.herokuapp.com/vehicles";

  constructor(private http: HttpClient) { }

  /** GET vehicles from the server */
  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.vehiclesUrl);
  }
}
