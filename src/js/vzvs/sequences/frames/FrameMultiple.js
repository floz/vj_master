const FrameFromData = require( "./FrameFromData" )

class FrameMultiple extends FrameFromData {

  constructor( id ) {
    const data = {
      elements: [
        {
          type: "PictureParticular",
          frame: {
            x: 4,
            y: -3,
            width: 10,
            height: 20
          },
          particles: {
            has: true,
            sizeMin: 1.5,
            sizeRange: 1,
            spaceXMin: 20,
            spaceXRange: 8,
            spaceYMin: 20,
            spaceYRange: 8,
            xMin: 0,
            xRange: 0,
            yMin: 0,
            yRange: 0
          },
          z: 0,
          isMovingWithSound: true,
          hasLineDisplacement: false,
          controllers: [
            {
              type: "slider",
              color: "blue"
            },
            {
              type: "dial",
              color: "purple"
            },
            {
              type: "button",
              color: "blue"
            }
          ]
        },
        {
          type: "PictureParticular",
          frame: {
            x: 12,
            y: 6,
            width: 10,
            height: 10
          },
          particles: {
            has: true,
            sizeMin: 1.5,
            sizeRange: 1,
            spaceXMin: 20,
            spaceXRange: 8,
            spaceYMin: 20,
            spaceYRange: 8,
            xMin: 0,
            xRange: 0,
            yMin: 0,
            yRange: 0
          },
          z: 50,
          isMovingWithSound: true,
          hasLineDisplacement: false,
          controllers: [
            {
              type: "slider",
              color: "green"
            },
            {
              type: "dial",
              color: "cyan"
            },
            {
              type: "button",
              color: "green"
            }
          ],
          canMove: {
            to: {
              x: -4,
              y: 5,
              z: 50
            }
          }
        },
        {
          type: "Picture",
          frame: {
            x: -4,
            y: 0,
            width: 8,
            height: 10
          },
          z: -10,
          hasLineDisplacement: true,
          isMovingWithSound: false,
          canMove: {
            to: {
              x: -4,
              y: 4,
              z: -10
            }
          }
        },
        {
          type: "Picture",
          frame: {
            x: 10,
            y: 0,
            width: 6,
            height: 20
          },
          z: -10,
          hasLineDisplacement: true,
          isMovingWithSound: false,
          canMove: {
            to: {
              x: 10,
              y: -2,
              z: -10
            }
          }
        },
        {
          type: "VZVSMesh",
          frame: {
            x: -2,
            y: -2,
            width: 8,
            height: 8
          },
          z: 120,
          canMove: {
            to: {
              x: 12,
              y: -1,
              z: 120
            }
          }
        },
        {
          type: "VZVSMesh",
          frame: {
            x: 2,
            y: 0,
            width: 4,
            height: 20
          },
          z: -40
        },
      ],
      signs: [
        {
          type: "set",
          x: 2,
          y: 2,
          z: 140,
          xStep: 4,
          yStep: 4,
          sizes: {
            min: 1,
            max: 1,
            rnd: .1
          },
          cols: 4,
          lines: 4,
          rndVisible: .65
        }
      ]
    }

    super( data, id )
  }

}

module.exports = FrameMultiple
