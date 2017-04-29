const FrameFromData = require( "./FrameFromData" )

class FrameDoubleBis extends FrameFromData {

  constructor( id ) {
    const data = {
      elements: [
        {
          type: "PictureParticular",
          frame: {
            x: 4,
            y: 0,
            width: 16,
            height: 10
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
              x: -1,
              y: 0,
              z: 0
            }
          }
        },
        {
          type: "PictureParticular",
          frame: {
            x: -2,
            y: 9,
            width: 14,
            height: 4
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
          z: 20,
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
              x: 9,
              y: 9,
              z: 20
            }
          }
        },
        {
          type: "VZVSMesh",
          frame: {
            x: -3,
            y: 0,
            width: 20,
            height: 20
          },
          z: -20
        },
        {
          type: "Picture",
          frame: {
            x: -3,
            y: -3,
            width: 11,
            height: 4
          },
          z: 0,
          hasLineDisplacement: true,
          isMovingWithSound: false,
          canMove: {
            to: {
              x: -3,
              y: 13,
              z: 0
            }
          }
        },
        {
          type: "Picture",
          frame: {
            x: 2,
            y: 14,
            width: 16,
            height: 6
          },
          z: 0,
          hasLineDisplacement: true,
          isMovingWithSound: false,
          canMove: {
            to: {
              x: 2,
              y: -2,
              z: 0
            }
          }
        }
      ],
      signs: [
        {
          type: "set",
          x: -1,
          y: 0,
          z: 120,
          xStep: 0,
          yStep: 3,
          sizes: {
            min: 1,
            max: 2,
            rnd: .1
          },
          cols: 1,
          lines: 8,
          rndVisible: .9
        },
        {
          type: "set",
          x: 4,
          y: 4,
          z: 100,
          xStep: 3,
          yStep: 3,
          sizes: {
            min: 1,
            max: 3,
            rnd: .1
          },
          cols: 4,
          lines: 3,
          rndVisible: .7
        }
      ]
    }

    super( data, id )
  }

}

module.exports = FrameDoubleBis
