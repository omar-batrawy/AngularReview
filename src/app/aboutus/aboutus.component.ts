import { Component } from '@angular/core';
import Map from '@arcgis/core/Map';
import Expand from '@arcgis/core/widgets/Expand.js';
import SceneView from '@arcgis/core/views/SceneView.js';
import Weather from '@arcgis/core/widgets/Weather.js';
import Daylight from '@arcgis/core/widgets/Daylight.js';
import NavigationToggle from '@arcgis/core/widgets/NavigationToggle.js';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css'],
})
export class AboutusComponent {
  parameter?: number;
  searchvariable?: any;
  weather?: any;
  selectedDate?: Date;
  Secondview: any;
  humidity?: number;
  pressure?: number;
  temp?: number;
  wind_speed?: number;
  img?: string;

  constructor(private apiService: ApiService) {}

  convertToUnixEpoch(date: any): number {
    return Math.floor(date.getTime() / 1000);
  }
  onDateChange(event: any): void {
    const dateString: string = (event.target as HTMLInputElement).value!;
    const selectedDate = new Date(dateString);
    if (!isNaN(selectedDate.getTime())) {
      this.selectedDate = selectedDate;
      const unixTimestamp = this.convertToUnixEpoch(this.selectedDate);
      console.log('Unix Timestamp:', unixTimestamp);
      this.updateWeather();
    } else {
      console.error('Invalid date:', dateString);
    }
  }
  // /https://openweathermap.org/img/wn/icon/@2x.png
  async updateWeather() {
    this.weather = await this.apiService.getWeather(
      33.8938,
      35.5018,
      this.convertToUnixEpoch(this.selectedDate)
    );
    console.log('weather', this.weather);
    this.humidity = this.weather?.humidity;
    this.pressure = this.weather?.pressure;
    this.temp = this.weather?.temp;
    this.wind_speed = this.weather?.wind_speed;
    this.img = this.weather?.weather[0]?.icon;

    if (this.Secondview) {
      const mappedType = this.weatherMapping[this.weather?.weather[0]?.main];
      console.log('test', this.weather?.weather[0]?.main);
      if (mappedType) {
        this.Secondview.environment.weather = {
          type: mappedType,
          cloudCover: 0.4,
        };
      } else {
      }
    }
  }

  weatherMapping: any = {
    Clouds: 'cloudy',
    Rain: 'rainy',
    Clear: 'sunny',
    Thunderstorm: 'rainy',
    Snow: 'snowy',
    Fog: 'foggy',
  };

  async ngOnInit() {
    this.Secondview = new SceneView({
      container: 'viewDivtwo',
      map: new Map({
        basemap: 'topo-vector',
      }),
      zoom: 15,
      center: [54.3773, 24.4539],
      qualityProfile: 'high',
    });

    const weatherExpand = new Expand({
      view: this.Secondview,
      content: new Weather({
        view: this.Secondview,
      }),
      group: 'top-right',
      expanded: true,
    });

    this.Secondview.ui.add([weatherExpand], 'top-right');
  }
}
