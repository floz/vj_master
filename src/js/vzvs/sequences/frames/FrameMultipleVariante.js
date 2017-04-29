const FrameFromData = require( "./FrameFromData" )

class FrameMultipleVariante extends FrameFromData {

  constructor( id ) {
    const data = {
      elements: [
        {
          type: "PictureParticular",
          frame: {
            x: -2,
            y: -3,
            width: 20,
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
              x: -2,
              y: 10,
              z: 0
            }
          }
        },
        {
          type: "PictureParticular",
          frame: {
            x: 8,
            y: 4,
            width: 9,
            height: 14
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
          z: 90,
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
              x: 8,
              y: -3,
              z: 90
            }
          }
        },
        {
          type: "Picture",
          frame: {
            x: 12,
            y: 1,
            width: 8,
            height: 4
          },
          z: 150,
          hasLineDisplacement: true,
          isMovingWithSound: false,
        },
        {
          type: "Picture",
          frame: {
            x: -2,
            y: 6,
            width: 12,
            height: 18
          },
          z: -10,
          hasLineDisplacement: true,
          isMovingWithSound: false,
        },
        {
          type: "VZVSMesh",
          frame: {
            x: 10,
            y: -1,
            width: 14,
            height: 15
          },
          z: 60,
          canMove: {
            to: {
              x: 4,
              y: -1,
              z: 20
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
        {
          type: "VZVSMesh",
          frame: {
            x: -2,
            y: 12,
            width: 8,
            height: 4
          },
          z: 90,
          canMove: {
            to: {
              x: -2,
              y: 0,
              z: 90
            }
          }
        }
      ],
      signs: [
        {
          type: "set",
          x: 2,
          y: 4,
          z: 140,
          xStep: 4,
          yStep: 4,
          sizes: {
            min: 2,
            max: 2,
            rnd: .1
          },
          cols: 4,
          lines: 1,
          rndVisible: .5
        },
        {
          type: "set",
          x: 2,
          y: 12,
          z: 140,
          xStep: 4,
          yStep: 4,
          sizes: {
            min: 2,
            max: 2,
            rnd: .1
          },
          cols: 4,
          lines: 1,
          rndVisible: .5
        }
      ]
    }

    super( data, id )
  }

}

module.exports = FrameMultipleVariante
