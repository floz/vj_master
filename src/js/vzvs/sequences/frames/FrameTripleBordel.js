const FrameFromData = require( "./FrameFromData" )

class FrameTripleBordel extends FrameFromData {

  constructor( id ) {
    const data = {
      elements: [
        {
          type: "PictureParticular",
          frame: {
            x: -1,
            y: -3,
            width: 7,
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
          z: 20,
          isMovingWithSound: true,
          hasLineDisplacement: false,
          canMove: {
            to: {
              x: -2,
              y: 0,
              z: 20
            }
          }
        },
        {
          type: "PictureParticular",
          frame: {
            x: 6,
            y: 1,
            width: 4,
            height: 18
          },
          particles: {
            has: true,
            sizeMin: 1,
            sizeRange: 1,
            spaceXMin: 10,
            spaceXRange: 6,
            spaceYMin: 10,
            spaceYRange: 6,
            xMin: 0,
            xRange: 1,
            yMin: 0,
            yRange: 1
          },
          z: 40,
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
              y: -2,
              z: 40
            }
          }
        },
        {
          type: "PictureParticular",
          frame: {
            x: 11,
            y: -3,
            width: 8,
            height: 12
          },
          particles: {
            has: false,
            sizeMin: 1,
            sizeRange: 2,
            spaceXMin: 10,
            spaceXRange: 6,
            spaceYMin: 10,
            spaceYRange: 6,
            xMin: 0,
            xRange: 1,
            yMin: 0,
            yRange: 1
          },
          z: 0,
          isMovingWithSound: false,
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
              x: 10,
              y: 2,
              z: 0
            }
          }
        },
        {
          type: "Picture",
          frame: {
            x: -4,
            y: 6,
            width: 18,
            height: 10
          },
          z: -10,
          hasLineDisplacement: true,
          isMovingWithSound: false,
          canMove: {
            to: {
              x: 2,
              y: 8,
              z: -10
            }
          }
        }
      ],
      signs: [
        {
          type: "set",
          x: -1,
          y: -1,
          z: 120,
          xStep: 4,
          yStep: 5,
          sizes: {
            min: 1,
            max: 1,
            rnd: .1
          },
          cols: 5,
          lines: 5,
          rndVisible: .6
        }
      ]
    }

    super( data, id )
  }

}

module.exports = FrameTripleBordel
