import { Component } from '@angular/core';
import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import AreaMeasurement2D from '@arcgis/core/widgets/AreaMeasurement2D';
import Measurement from '@arcgis/core/widgets/Measurement.js';
import LayerList from '@arcgis/core/widgets/LayerList.js';
import Legend from '@arcgis/core/widgets/Legend.js';
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery.js';
import Search from '@arcgis/core/widgets/Search.js';
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils.js';
import Expand from '@arcgis/core/widgets/Expand.js';
import Sketch from '@arcgis/core/widgets/Sketch.js';
import Graphic from '@arcgis/core/Graphic.js';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer.js';
import SceneView from '@arcgis/core/views/SceneView.js';
import Weather from '@arcgis/core/widgets/Weather.js';
import Daylight from '@arcgis/core/widgets/Daylight.js';
import Editor from '@arcgis/core/widgets/Editor.js';
import MapImageLayer from '@arcgis/core/layers/MapImageLayer.js';
import ElevationLayer from '@arcgis/core/layers/ElevationLayer.js';
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css'],
})
export class AboutusComponent {
  parameter?: number;
  searchvariable?: any;

  ngOnInit() {
    //first map

    const webmap = new WebMap({
      portalItem: {
        id: 'f2e9b762544945f390ca4ac3671cfa72',
      },
    });
    const view = new MapView({
      map: webmap,
      container: 'viewDiv',
      center: [-118.80543, 34.027],
      zoom: 13,
    });

    const featureLayer = new FeatureLayer({
      url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/World_Countries/FeatureServer/0',
    });
    view.map.add(featureLayer);

    //
    const measurement = new Measurement({
      view: view,
      activeTool: 'distance',
    });
    // view.ui.add(measurement, 'top-right');

    let layerList = new LayerList({
      view: view,
    });
    // Adds widget below other elements in the top left corner of the view
    // view.ui.add(layerList, {
    //   position: 'bottom-left',
    // });

    // let legend = new Legend({
    //   view: view,
    // });

    // view.ui.add(legend, 'bottom-right');
    // let basemapGallery = new BasemapGallery({
    //   view: view,
    // });
    // // Add widget to the top right corner of the view
    // view.ui.add(basemapGallery, {
    //   position: 'top-right',
    // });
    const searchWidget = new Search({
      view: view,
      allPlaceholder: 'search for a country',

      // sources: [{}],
    });
    // searchWidget.on('select-result', function (event) {
    //   view.goTo({
    //     target: event.result.feature.geometry,
    //     zoom: 5,
    //   });
    // });
    searchWidget.on('search-complete', (event) => {
      this.searchvariable = event;

      console.log('search  : ', searchWidget);
      console.log(' event : ', event);
    });

    // Adds the search widget below other elements in
    // // the top left corner of the view
    // view.ui.add(searchWidget, {
    //   position: 'top-left',
    //   index: 2,
    // });

    const layerListExpand = new Expand({
      expandIcon: 'layers', // see https://developers.arcgis.com/calcite-design-system/icons/
      // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
      view: view,
      content: layerList,
    });
    const lmeasureexpand = new Expand({
      expandIcon: 'measure', // see https://developers.arcgis.com/calcite-design-system/icons/
      // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
      view: view,
      content: measurement,
    });
    const SearchExpand = new Expand({
      expandIcon: 'search', // see https://developers.arcgis.com/calcite-design-system/icons/
      // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
      view: view,
      content: searchWidget,
    });

    view.ui.add(layerListExpand, 'bottom-left');
    view.ui.add(lmeasureexpand, 'top-right');
    view.ui.add(SearchExpand, 'top-left');
    let sketch = new Sketch({
      layer: featureLayer,
      view: view,
    });
    const SketchExpand = new Expand({
      expandIcon: 'pencil-mark', // see https://developers.arcgis.com/calcite-design-system/icons/
      // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
      view: view,
      content: sketch,
    });
    view.ui.add(SketchExpand, 'bottom-right');

    let Secondview = new SceneView({
      container: 'viewDivtwo',
      map: new Map({
        basemap: 'satellite',
        ground: 'world-elevation',
      }),
      environment: {
        weather: {
          type: 'cloudy', // autocasts as new CloudyWeather({ cloudCover: 0.3 })
          cloudCover: 0.3,
        },
      },
    });

    const weatherExpand = new Expand({
      view: Secondview,
      content: new Weather({
        view: Secondview,
      }),
      group: 'top-right',
      expanded: true,
    });

    const daylightExpand = new Expand({
      view: Secondview,
      content: new Daylight({
        view: Secondview,
      }),
      group: 'top-right',
    });
    Secondview.ui.add([weatherExpand, daylightExpand], 'top-right');

    /***********************************
     * Add functionality to change between flooding and no flooding
     ***********************************/
    // Wait for the view to be loaded, in order to being able to retrieve the layer
    //   view.when(() => {
    //     // Find the layer for the
    //     let floodLevel = scene.allLayers.find(function (layer) {
    //       return layer.title === "Flood Level";
    //     });

    //     const selection = document.getElementById("selection");

    //     selection.addEventListener("calciteSegmentedControlChange", () => {
    //       switch (selection.selectedItem.value) {
    //         case "flooding":
    //           // Change the weather to rainy to match the flooding scenario
    //           view.environment.weather = {
    //             type: "rainy", // autocasts as new RainyWeather({ cloudCover: 0.7, precipitation: 0.3 })
    //             cloudCover: 0.7,
    //             precipitation: 0.3
    //           };
    //           // Turn on the water layer showing the flooding
    //           floodLevel.visible = true;
    //           break;

    //         case "noFlooding":
    //           // Change the weather back to cloudy
    //           view.environment.weather = {
    //             type: "cloudy", // autocasts as new CloudyWeather({ cloudCover: 0.3 })
    //             cloudCover: 0.3
    //           };

    //           // Turn off the water layer showing the flooding
    //           floodLevel.visible = false;
    //           break;
    //       }
    //     })
    //   })
    // });

    sketch.on('create', function (event) {
      // check if the create event's state has changed to complete indicating
      // the graphic create operation is completed.
      if (event.state) {
        // remove the graphic from the layer. Sketch adds
        // the completed graphic to the layer by default.
        // graphicsLayer.remove(event.graphic);
        console.log('State of the event : ', event.state);

        // // use the graphic.geometry to query features that intersect it
        // selectFeatures(event.graphic.geometry);
      }
    });

    const webmaptwo = new WebMap({
      portalItem: {
        id: '4793230052ed498ebf1c7bed9966bd35',
      },
    });

    const viewthree = new MapView({
      container: 'viewDivThree',
      map: webmaptwo,
    });

    viewthree.when(() => {
      const editor = new Editor({
        view: viewthree,
      });

      // Add the widget to the view
      viewthree.ui.add(editor, 'top-right');
    });

    let layer = new MapImageLayer({
      url: 'https://services11.kaenergyutilities.com/server/rest/services/DoE/DOE_Plot_Vmap/MapServer',
    });
    view.map.add(layer); // adds the layer to the map
  }
}
