# it7badgeLivePreview
Badges live preview plugin allows you to calculate how many badges you can print on page, depending on spacing, size, format and orientation of the page
# Installation
* npm install
* typings install

# Setup
*For correct work you have to provide all input parameters*
```
var options = {
    canvasOptions: {
      selector: '#addCanvas',
      width: 500,
      height: 500,
      borderSpace: 50,
      canvasBackground: '#e8e8e8',
      paperBackground: '#ffffff',
      badgeBackground: '#ffefd3',
      borders: {
        top: '#f463ef',
        left: '#f463ef',
        bottom: '#f463ef',
        right: '#f463ef',
        rulers: '#38cbea',
        marginBottomToPrint: 0,
        marginRightToPrint: 0
      },
      infoPanel: {
        texts: {
          maxColumnsNumber: 'Number of columns',
          maxRowsNumber: 'Number of rows',
          badgesQuantity: 'Quantity of badges'
        }
      }
    },
    width: 200,
    height: 200,
    columnsCount: 2,
    topMargin: 25,
    leftMargin: 25,
    paperOrientation: "P",
    paperFormat: "custom",
    contentPosition: "center",
    rightBadgeMargin: 50,
    bottomBadgeMargin: 50,
    formats: {
      A4: {
        L: {
          height: 210,
          width: 297
        },
        P: {
          height: 297,
          width: 210
        }
      }      
    }
  };
  
  it7badgeLivePreview(options);
```
# Run
* npm run tsc
* npm run webpack:watch
* open index.html from dist directory


![badge_demo](https://cloud.githubusercontent.com/assets/4949404/23385266/894f9388-fd57-11e6-89a1-8217cb4e570a.gif)
