 require([
      "esri/WebScene",
      "esri/views/SceneView",
      "esri/Camera",
      "esri/widgets/Home",
      "esri/widgets/Legend",
      "dojo/domReady!"
    ], function(WebScene, SceneView, Camera, Home, Legend) {

    
      /*var map = new Map({
        basemap: "streets",
        ground: "world-elevation"
      });*/
      var scene = new WebScene({
        portalItem:{
         id:"bd8eb1d7ae6f4022a11869e7f53e97e3" 
        }
      });
      
      var camera = new Camera({
        position: [
          -122.36644828979942, // lon
         47.60817854022211, // lat
          8000000// elevation in meters
        ],
        tilt:0,
        heading: 0
      }) 

      var view = new SceneView({
        container: "viewDiv",
        map: scene,
        viewingMode:"global",
        camera: camera,
        environment: {
            lighting: {
              date: new Date(),
              directShadowsEnabled: true,
              // don't update the view time when user pans.
              // The clock widget drives the time
              cameraTrackingEnabled: false
            }
        },
    });
    
   var homeBtn = new Home({
        view: view
      }); //Add the home button to the top left corner of the view
    view.ui.add(homeBtn, "top-left");
    
    [CA, PHI].forEach(function(button) {
      button.style.display = 'flex';
      view.ui.add(button, 'top-right');
    });
    
    CA.addEventListener('click', function() {
      // reuse the default camera position already established in the homeBtn
      view.goTo({
        position: {
          x: -117.35636413864395,
          y: 34.27870163261468,
          z: 5000000
        },
        tilt: 0,
        heading: 0
      });
    }); 
   
     PHI.addEventListener('click', function() {
      // reuse the default camera position already established in the homeBtn
      view.goTo({
        position: {
          x: 121.82925269485186,
          y: 20.873554500507602,
          z: 5000000
        },
        tilt: 0,
        heading: 0
      });
    });

  view.when(function() {
     
    var featureLayer = scene.layers.getItemAt(0);

          var legend = new Legend({
            view: view,
            layerInfos: [{
              layer: featureLayer,
              title: "Earthquakes"
            }]
          });

          // Add widget to the bottom right corner of the view
          view.ui.add(legend, "bottom-right");
        });

    });
