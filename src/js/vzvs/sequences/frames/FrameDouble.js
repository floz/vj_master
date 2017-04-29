const FrameFromData = require( "./FrameFromData" )

class FrameDouble extends FrameFromData {

  constructor( id ) {
    const data = {
      elements: [
        {
          type: "PictureParticular",
          frame: {
            x: 3,
            y: 0,
            width: 20,
            height: 14
          },
          particles: {
            has: true,
            sizeMin: 1.25,
            sizeRange: 1.85,
            spaceXMin: 16,
            spaceXRange: 8,
            spaceYMin: 16,
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
          ],
          canMove: {
            to: {
              x: 1,
              y: 2,
              z: 50
            }
          }
        },
        {
          type: "PictureParticular",
          frame: {
            x: -1,
            y: 4,
            width: 3,
            height: 16
          },
          particles: {
            has: true,
            sizeMin: 1.25,
            sizeRange: 1.5,
            spaceXMin: 12,
            spaceXRange: 4,
            spaceYMin: 12,
            spaceYRange: 4,
            xMin: 2,
            xRange: -4,
            yMin: -5,
            yRange: 10
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
              x: 6,
              y: 1,
              z: 60
            }
          }
        },
        {
          type: "VZVSMesh",
          frame: {
            x: -3,
            y: -2,
            width: 20,
            height: 20
          },
          z: -1,
          canMove: {
            to: {
              x: -3,
              y: -12,
              z: -10
            }
          }
        },
        {
          type: "Picture",
          frame: {
            x: -3,
            y: -3,
            width: 11,
            height: 4
          },
          hasLineDisplacement: true,
          isMovingWithSound: false,
          canMove: {
            to: {
              x: -3,
              y: 6,
              z: 0
            }
          }
        }
      ],
      signs: [
        {
          type: "set",
          x: 5,
          y: 5,
          z: 120,
          xStep: 3,
          yStep: 3,
          sizes: {
            min: 1,
            max: 2,
            rnd: .1
          },
          cols: 1,
          lines: 4,
          rndVisible: .9
        },
        {
          type: "set",
          x: 9,
          y: 5,
          z: 120,
          xStep: 3,
          yStep: 3,
          sizes: {
            min: 1,
            max: 2,
            rnd: .1
          },
          cols: 3,
          lines: 4,
          rndVisible: .9
        },
        {
          type: "unique",
          x: -1,
          y: 0,
          z: 80,
          sizes: {
            min: 2,
            max: 4,
            rnd: .4
          }
        }
      ]
    }

    super( data, id )
  }

}

module.exports = FrameDouble
