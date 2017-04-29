const FrameFromData = require( "./FrameFromData" )

class FrameTripleNew extends FrameFromData {

  constructor( id ) {
    const data = {
      elements: [
        {
          type: "PictureParticular",
          frame: {
            x: 0,
            y: 0,
            width: 8,
            height: 16
          },
          particles: {
            has: true,
            sizeMin: 1,
            sizeRange: .5,
            spaceXMin: 10,
            spaceXRange: 10,
            spaceYMin: 10,
            spaceYRange: 10,
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
              x: 6,
              y: 0,
              z: 100
            }
          }
        },
        {
          type: "PictureParticular",
          frame: {
            x: 9,
            y: 0,
            width: 8,
            height: 8
          },
          particles: {
            has: true,
            sizeMin: 2,
            sizeRange: 1,
            spaceXMin: 16,
            spaceXRange: 10,
            spaceYMin: 16,
            spaceYRange: 10,
            xMin: 0,
            xRange: 0,
            yMin: 0,
            yRange: 0
          },
          z:80,
          isMovingWithSound: true,
          hasLineDisplacement: true,
          canMove: {
            to: {
              x: 0,
              y: 9,
              z: -80
            }
          }
        },
        {
          type: "PictureParticular",
          frame: {
            x: 9,
            y: 9,
            width: 8,
            height: 7
          },
          particles: {
            has: true,
            sizeMin: 1,
            sizeRange: .7,
            spaceXMin: 15,
            spaceXRange: 8,
            spaceYMin: 15,
            spaceYRange: 8,
            xMin: -2,
            xRange: 0,
            yMin: 0,
            yRange: 0
          },
          z: 80,
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
              x: 0,
              y: 0,
              z: -80
            }
          }
        },
        // // {
        // //   type: "PictureParticular",
        // //   frame: {
        // //     x: -1,
        // //     y: 4,
        // //     width: 3,
        // //     height: 16
        // //   },
        // //   particles: {
        // //     has: true,
        // //     sizeMin: 1.25,
        // //     sizeRange: 1.5,
        // //     spaceXMin: 12,
        // //     spaceXRange: 4,
        // //     spaceYMin: 12,
        // //     spaceYRange: 4,
        // //     xMin: 2,
        // //     xRange: -4,
        // //     yMin: -5,
        // //     yRange: 10
        // //   },
        // //   z: 10,
        // //   isMovingWithSound: true,
        // //   hasLineDisplacement: false
        // // },
        // {
        //   type: "VZVSMesh",
        //   frame: {
        //     x: -2,
        //     y: -2,
        //     width: 8,
        //     height: 8
        //   },
        //   z: -30
        // },
        {
          type: "VZVSMesh",
          frame: {
            x: 10,
            y: -2,
            width: 2,
            height: 20
          },
          z: 20,
          canMove: {
            to: {
              x: 8,
              y: -2,
              z: 20
            }
          }
        },
        // {
        //   type: "Picture",
        //   frame: {
        //     x: 0,
        //     y: 0,
        //     width: 16,
        //     height: 16
        //   },
        //   z: -40,
        //   hasLineDisplacement: true,
        //   isMovingWithSound: false
        // }
      ],
      signs: [
        {
          type: "set",
          x: 0,
          y: 0,
          z: 60,
          xStep: 3,
          yStep: 3,
          sizes: {
            min: 1,
            max: 2,
            rnd: .1
          },
          cols: 2,
          lines: 6,
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
        {
          type: "unique",
          x: 12,
          y: 13,
          z: 80,
          sizes: {
            min: 6,
            max: 6,
            rnd: 1
          }
        },
        {
          type: "unique",
          x: 6,
          y: 1,
          z: 80,
          sizes: {
            min: 4,
            max: 4,
            rnd: 1
          }
        },
      ]
    }

    super( data, id )
  }

}

module.exports = FrameTripleNew
