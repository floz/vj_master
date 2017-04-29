const FrameFromData = require( "./FrameFromData" )

class FrameSoloBigSquares extends FrameFromData {

  constructor( id ) {
    const data = {
      elements: [
        {
          type: "PictureParticular",
          frame: {
            x: -1,
            y: -3,
            width: 14,
            height: 22
          },
          particles: {
            has: true,
            sizeMin: 1.5,
            sizeRange: .25,
            spaceXMin: 10,
            spaceXRange: 6,
            spaceYMin: 10,
            spaceYRange: 6,
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
              x: 2,
              y: -3,
              z: -80
            }
          }
        },
        {
          type: "VZVSMesh",
          frame: {
            x: 15,
            y: 0,
            width: 4,
            height: 8
          },
          z: -50
        },
        {
          type: "VZVSMesh",
          frame: {
            x: 12,
            y: 4,
            width: 5,
            height: 10
          },
          z: -20
        },
        {
          type: "VZVSMesh",
          frame: {
            x: 13,
            y: 9,
            width: 8,
            height: 10
          },
          z: -10
        },
        {
          type: "Picture",
          frame: {
            x: -4,
            y: -3,
            width: 23,
            height: 6
          },
          z: 0,
          hasLineDisplacement: true,
          isMovingWithSound: false,
          canMove: {
            to: {
              x: -4,
              y: 3,
              z: 100
            }
          }
        }
      ],
      signs: [
        {
          type: "set",
          x: 6,
          y: -1,
          z: 100,
          xStep: 1,
          yStep: 1,
          sizes: {
            min: 1,
            max: 2,
            rnd: .1
          },
          cols: 10,
          lines: 20,
          rndVisible: .5
        },
        {
          type: "unique",
          x: -1,
          y: 7,
          z: 120,
          sizes: {
            min: 2,
            max: 3,
            rnd: .4
          }
        },
      ]
    }

    super( data, id )
  }

}

module.exports = FrameSoloBigSquares
