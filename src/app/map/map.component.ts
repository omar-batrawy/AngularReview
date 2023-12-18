import { Component, OnInit } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Legend from '@arcgis/core/widgets/Legend';
import Query from '@arcgis/core/rest/support/Query.js';
import UniqueValueRenderer from '@arcgis/core/renderers/UniqueValueRenderer.js';

import ButtonMenu from '@arcgis/core/widgets/FeatureTable/Grid/support/ButtonMenu';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  uniqueValues: string[] = [];

  async ngOnInit(): Promise<void> {
    let map = new Map({
      basemap: 'topo-vector',
    });

    const view = new MapView({
      container: 'viewDiv',
      map: map,
      scale: 50000000,
      center: [-101.17, 21.78],
    });

    const layer = new FeatureLayer({
      url: 'https://services11.kaenergyutilities.com/server/rest/services/DoE/DOE_Plot_Vmap/MapServer/0',
    });

    map.add(layer);

    view.ui.add(
      new Legend({
        view: view,
      }),
      'bottom-left'
    );
    async function queryAndCreateRenderer() {
      let query = layer.createQuery();
      query.where = '1=1';
      query.outFields = ['PRIMARYUSEENGDESC'];
      query.returnDistinctValues = true;

      let uniqueValues: string[] = [];

      await layer.queryFeatures(query).then((response) => {
        console.log(response.features);
        let features = response.features;

        features.forEach((feature) => {
          let value = feature.attributes.PRIMARYUSEENGDESC;
          if (uniqueValues.indexOf(value) === -1) {
            uniqueValues.push(value);
          }
        });

        console.log('unique values', uniqueValues);
      });

      while (uniqueValues.length <= 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      let objectren: any = {
        type: 'unique-value',
        field: 'PRIMARYUSEENGDESC',
        uniqueValueInfos: uniqueValues.map((value) => ({
          value: value,
          symbol: {
            type: 'simple-fill',
            color: getRandomColor(),
            outline: {
              color: [255, 255, 255],
              width: 1,
            },
          },
        })),
      };

      console.log('objectren', objectren);

      layer.renderer = objectren;
    }

    queryAndCreateRenderer();
    const onclick: any = document.getElementById('btn');
    onclick.addEventListener('click', () => {
      queryAndCreateRenderer();
      console.log('clicked');
    });

    let color: any;
    color = getRandomColor();
    console.log('testing the getrandomeColor function : ', color);

    function getRandomColor() {
      return [
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        255,
      ];
    }
  }
}
