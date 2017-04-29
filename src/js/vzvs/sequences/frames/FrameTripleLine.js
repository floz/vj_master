const FrameFromData = require( "./FrameFromData" )

class FrameTripleLine extends FrameFromData {

  constructor( id ) {
    const data = {
      elements: [
        {
          type: "PictureParticular",
          frame: {
            x: -1,
            y: -3,
            width: 20,
            height: 7
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
            yRange: 0,
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
          z: 0,
          isMovingWithSound: true,
          hasLineDisplacement: false,
          canMove: {
            to: {
              x: -3,
              y: -3,
              z: 0
            }
          }
        },
        {
          type: "PictureParticular",
          frame: {
            x: -3,
            y: 4,
            width: 20,
            height: 7
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
          z: 10,
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
              x: 2,
              y: 4,
              z: 10
            }
          }
        },
        {
          type: "PictureParticular",
          frame: {
            x: 2,
            y: 11,
            width: 20,
            height: 7
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
          canMove: {
            to: {
              x: -3,
              y: 11,
              z: 0
            }
          }
        },
        {
          type: "VZVSMesh",
          frame: {
            x: 0,
            y: 0,
            width: 18,
            height: 20
          },
          z: -10
        },
        {
          type: "VZVSMesh",
          frame: {
            x: 10,
            y: 9,
            width: 10,
            height: 3
          },
          z: 100,
          canMove: {
            to: {
              x: -2,
              y: 9,
              z: 100
            }
          }
        },
      ],
      signs: [
        {
          type: "set",
          x: 0,
          y: 0,
          z: 140,
          xStep: 4,
          yStep: 4,
          sizes: {
            min: 2,
            max: 2,
            rnd: .1
          },
          cols: 2,
          lines: 2,
          rndVisible: .6
        },
        {
          type: "set",
          x: 10,
          y: 10,
          z: 140,
          xStep: 4,
          yStep: 4,
          sizes: {
            min: 2,
            max: 2,
            rnd: .1
          },
          cols: 2,
          lines: 2,
          rndVisible: .6
        },
        {
          type: "unique",
          x: 1,
          y: 11,
          z: 120,
          sizes: {
            min: 4,
            max: 4,
            rnd: .4
          }
        },
        {
          type: "unique",
          x: 12,
          y: 0,
          z: 120,
          sizes: {
            min: 4,
            max: 4,
            rnd: .4
          }
        }
      ]
    }

    super( data, id )
  }

}

module.exports = FrameTripleLine
