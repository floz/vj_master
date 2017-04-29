const FrameFromData = require( "./FrameFromData" )

class FrameLeftNew extends FrameFromData {

  constructor( id ) {
    const data = {
      elements: [
        {
          type: "PictureParticular",
          frame: {
            x: -3,
            y: 1,
            width: 18,
            height: 14
          },
          particles: {
            has: true,
            sizeMin: 1.1,
            sizeRange: 1,
            spaceXMin: 15,
            spaceXRange: 8,
            spaceYMin: 15,
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
              x: 5,
              y: 1,
              z: 0
            }
          }
        },
        {
          type: "PictureParticular",
          frame: {
            x: 10,
            y: 12,
            width: 8,
            height: 4
          },
          particles: {
            has: false,
            sizeMin: 1.1,
            sizeRange: 1,
            spaceXMin: 15,
            spaceXRange: 8,
            spaceYMin: 15,
            spaceYRange: 8,
            xMin: 0,
            xRange: 0,
            yMin: 0,
            yRange: 0
          },
          z:80,
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
              x: -2,
              y: 12,
              z: 80
            }
          }
        },
        // {
        //   type: "PictureParticular",
        //   frame: {
        //     x: -1,
        //     y: 4,
        //     width: 3,
        //     height: 16
        //   },
        //   particles: {
        //     has: true,
        //     sizeMin: 1.25,
        //     sizeRange: 1.5,
        //     spaceXMin: 12,
        //     spaceXRange: 4,
        //     spaceYMin: 12,
        //     spaceYRange: 4,
        //     xMin: 2,
        //     xRange: -4,
        //     yMin: -5,
        //     yRange: 10
        //   },
        //   z: 10,
        //   isMovingWithSound: true,
        //   hasLineDisplacement: false
        // },
        {
          type: "VZVSMesh",
          frame: {
            x: 2,
            y: 3,
            width: 18,
            height: 4
          },
          z: 110,
          canMove: {
            to: {
              x: 2,
              y: 8,
              z: 110
            }
          }
        },
        {
          type: "VZVSMesh",
          frame: {
            x: 4,
            y: -2,
            width: 16,
            height: 20
          },
          z: -40,
          canMove: {
            to: {
              x: 0,
              y: 1,
              z: -40
            }
          }
        },
        // {
        //   type: "Picture",
        //   frame: {
        //     x: -3,
        //     y: -3,
        //     width: 11,
        //     height: 4
        //   },
        //   hasLineDisplacement: true,
        //   isMovingWithSound: false
        // }
      ],
      signs: [
        {
          type: "set",
          x: -2,
          y: 2,
          z: 140,
          xStep: 4,
          yStep: 3,
          sizes: {
            min: 4,
            max: 4,
            rnd: .1
          },
          cols: 4,
          lines: 1,
          rndVisible: .8
        },
        // {
        //   type: "set",
        //   x: 9,
        //   y: 5,
        //   z: 60,
        //   xStep: 3,
        //   yStep: 3,
        //   sizes: {
        //     min: 1,
        //     max: 2,
        //     rnd: .1
        //   },
        //   cols: 3,
        //   lines: 4,
        //   rndVisible: .9
        // },
        // {
        //   type: "unique",
        //   x: -1,
        //   y: 0,
        //   z: 20,
        //   sizes: {
        //     min: 2,
        //     max: 4,
        //     rnd: .4
        //   }
        // }
      ]
    }

    super( data, id )
  }

}

module.exports = FrameLeftNew
