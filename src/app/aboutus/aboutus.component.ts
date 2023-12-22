import { Component } from '@angular/core';
import Map from '@arcgis/core/Map';
import Expand from '@arcgis/core/widgets/Expand.js';
import SceneView from '@arcgis/core/views/SceneView.js';
import Weather from '@arcgis/core/widgets/Weather.js';
import Daylight from '@arcgis/core/widgets/Daylight.js';
import NavigationToggle from '@arcgis/core/widgets/NavigationToggle.js';
import { ApiService } from '../api.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

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
  bsConfig?: Partial<BsDatepickerConfig>;
  Secondview: any;
  humidity?: number;
  pressure?: number;
  temp?: number;
  wind_deg?: number;
  wind_speed?: number;
  visibility?: number;
  clouds?: number;
  sunrise?: number;
  sunset?: number;

  constructor(private apiService: ApiService) {
    this.bsConfig = {
      dateInputFormat: 'YYYY-MM-DD',
      containerClass: 'theme-default',
    };
  }

  convertToUnixEpoch(date: any): number {
    return Math.floor(date.getTime() / 1000);
  }

  onDateChange(event: any): void {
    this.selectedDate = event;
    const unixTimestamp = this.convertToUnixEpoch(this.selectedDate);
    console.log('Unix Timestamp:', unixTimestamp);
    this.updateWeather();
  }

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
    Thunderstorm: 'foggy',
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

    const daylightExpand = new Expand({
      view: this.Secondview,
      content: new Daylight({
        view: this.Secondview,
      }),
      group: 'top-right',
    });

    const NavigationToggleexpand = new Expand({
      expandIcon: 'compass',
      view: this.Secondview,
      content: new NavigationToggle({
        view: this.Secondview,
      }),
    });

    this.Secondview.ui.add(
      [weatherExpand, daylightExpand, NavigationToggleexpand],
      'top-right'
    );
  }
}
