import { Component, OnInit } from '@angular/core';
import WebScene from '@arcgis/core/WebScene';
import ElevationProfile from '@arcgis/core/widgets/ElevationProfile';
import SceneView from '@arcgis/core/views/SceneView';
import Expand from '@arcgis/core/widgets/Expand';

@Component({
  selector: 'app-elevationmap',
  templateUrl: './elevationmap.component.html',
  styleUrls: ['./elevationmap.component.css'],
})
export class ElevationmapComponent {
  async ngOnInit(): Promise<void> {
    const webscene = new WebScene({
      portalItem: {
        id: '9a542f6755274436985617a462ffdf44',
      },
    });

    const view = new SceneView({
      container: 'viewDiv',
      map: webscene,
      camera: {
        position: {
          x: -8238359,
          y: 4967229,
          z: 686,
        },
        heading: 353,
        tilt: 66,
      },
    });
    const elevationProfile = new ElevationProfile({
      view: view,

      profiles: [
        {
          type: 'ground',
        },
        {
          type: 'view',
        },
      ],

      visibleElements: {
        selectButton: false,
      },
    });

    const elevationExpand = new Expand({
      expandIconClass: 'esri-icon-chart',
      expandTooltip: 'Elevation Profile',
      view: view,
      content: elevationProfile,
    });
    view.ui.add(elevationExpand, 'top-right');
  }
}
