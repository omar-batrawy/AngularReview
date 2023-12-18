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
import Attachments from '@arcgis/core/widgets/Attachments.js';
import BasemapLayerList from '@arcgis/core/widgets/BasemapLayerList.js';
import BuildingExplorer from '@arcgis/core/widgets/BuildingExplorer.js';
import Zoom from '@arcgis/core/widgets/Zoom.js';
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle.js';
import Bookmarks from '@arcgis/core/widgets/Bookmarks.js';
import Compass from '@arcgis/core/widgets/Compass.js';
import CoordinateConversion from '@arcgis/core/widgets/CoordinateConversion.js';
import Directions from '@arcgis/core/widgets/Directions.js';
import ElevationProfile from '@arcgis/core/widgets/ElevationProfile.js';
import Feature from '@arcgis/core/widgets/Feature.js';
import FeatureTable from '@arcgis/core/widgets/FeatureTable.js';
import Histogram from '@arcgis/core/widgets/Histogram.js';
import FeatureTemplates from '@arcgis/core/widgets/FeatureTemplates.js';
import Fullscreen from '@arcgis/core/widgets/Fullscreen.js';
import { expand } from 'rxjs';
import Locate from '@arcgis/core/widgets/Locate.js';
import RouteLayer from '@arcgis/core/layers/RouteLayer.js';
import NavigationToggle from '@arcgis/core/widgets/NavigationToggle.js';
import Popup from '@arcgis/core/widgets/Popup.js';
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
    const routeLayer = new RouteLayer();
    const view = new MapView({
      map: webmap,
      container: 'viewDiv',
      center: [-118.80543, 34.027],

      zoom: 13,
    });

    const searchWidget = new Search({
      view: view,
      allPlaceholder: 'search for a country',
    });

    searchWidget.on('search-complete', (event) => {
      this.searchvariable = event;
      console.log('search  : ', searchWidget);
      console.log(' event : ', event);
    });

    const featureLayer = new FeatureLayer({
      url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/World_Countries/FeatureServer/0',
    });

    const layerListExpand = new Expand({
      expandIcon: 'layers',
      view: view,
      content: new LayerList({
        view: view,
      }),
    });
    const lmeasureexpand = new Expand({
      expandIcon: 'measure',
      view: view,
      content: new Measurement({
        view: view,
        activeTool: 'distance',
      }),
    });
    const SearchExpand = new Expand({
      expandIcon: 'search',
      view: view,
      content: searchWidget,
    });
    const Legendexpand = new Expand({
      expandIcon: 'legend',
      view: view,
      content: new Legend({
        view: view,
      }),
    });
    const SketchExpand = new Expand({
      expandIcon: 'pencil-mark',
      view: view,
      content: new Sketch({
        layer: featureLayer,
        view: view,
      }),
    });
    const compasexpand = new Expand({
      expandIcon: 'compass',
      view: view,
      content: new Compass({
        view: view,
      }),
    });

    const basemapexpand = new Expand({
      expandIcon: 'basemap',
      view: view,
      content: new BasemapGallery({
        view: view,
      }),
    });
    const basemaolistexpand = new Expand({
      expandIcon: 'layer-basemap',
      view: view,
      content: new BasemapLayerList({
        view: view,
      }),
    });
    const basemaptoggleexpand = new Expand({
      expandIcon: 'toggle-off',
      view: view,
      content: new BasemapToggle({
        view: view,
        nextBasemap: 'satellite',
      }),
    });

    const BookmarksExpand = new Expand({
      expandIcon: 'bookmark',
      view: view,
      content: new Bookmarks({
        view: view,
        editingEnabled: true,
      }),
    });

    const CoordinateConversionExpand = new Expand({
      expandIcon: 'oriented-imagery-layer',
      view: view,
      content: new CoordinateConversion({
        view: view,
      }),
    });

    // const directionexpand = new Expand({
    //   expandIcon: 'bear-left',
    //   view: view,
    //   content: new Directions({
    //     view: view,
    //   }),
    // });
    const ElevationProfileExpand = new Expand({
      expandIcon: 'antenna-height',
      view: view,
      content: new ElevationProfile({
        view: view,
      }),
    });
    const Featureexpand = new Expand({
      expandIcon: 'feature',
      view: view,
      content: new Feature({
        view: view,
      }),
    });

    const zoomexpand = new Expand({
      expandIcon: 'zoom-in-fixed',
      view: view,
      content: new Zoom({
        view: view,
      }),
    });

    let layer = new MapImageLayer({
      url: 'https://services11.kaenergyutilities.com/server/rest/services/DoE/DOE_Plot_Vmap/MapServer',
    });
    const buildingexplorerexpand = new Expand({
      expandIcon: 'line-of-sight',
      view: view,
      content: new BuildingExplorer({
        layers: [layer],
      }),
    });
    const featureTable = new FeatureTable({
      view: view, // The view property must be set for the select/highlight to work
      layer: featureLayer,
      container: 'tableDiv',
    });
    const templates = new FeatureTemplates({
      container: 'templatesDiv',
      layers: [featureLayer],
    });
    const fullscreenexpand = new Expand({
      expandIcon: 'extent',
      view: view,
      content: new Fullscreen({
        view: view,
      }),
    });
    const locateexpand = new Expand({
      expandIcon: 'gps-off',
      view: view,
      content: new Locate({
        view: view,
      }),
    });

    view.ui.add(
      [
        layerListExpand,
        lmeasureexpand,
        SearchExpand,
        Legendexpand,
        SketchExpand,
        basemapexpand,
        basemaolistexpand,
        basemaptoggleexpand,
        BookmarksExpand,
        buildingexplorerexpand,
        compasexpand,
        CoordinateConversionExpand,
      ],
      'top-right'
    );
    view.ui.add(
      [
        // directionexpand,
        ElevationProfileExpand,
        zoomexpand,
        fullscreenexpand,
        locateexpand,
      ],
      'top-left'
    );
    view.map.add(layer);
    view.map.add(featureLayer);

    //second map

    let Secondview = new SceneView({
      container: 'viewDivtwo',
      map: new Map({
        basemap: 'topo-vector',
        layers: [routeLayer],
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
    const directionexpand = new Expand({
      expandIcon: 'bear-left',
      view: Secondview,
      content: new Directions({
        view: Secondview,
        layer: routeLayer,
      }),
    });
    const NavigationToggleexpand = new Expand({
      expandIcon: 'compass',
      view: Secondview,
      content: new NavigationToggle({
        view: Secondview,
      }),
    });

    Secondview.ui.add(
      [weatherExpand, daylightExpand, directionexpand, NavigationToggleexpand],
      'top-right'
    );

    //third map

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
  }
}
