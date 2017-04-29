const FrameFromData = require( "./FrameFromData" )

class FrameTripleNew extends FrameFromData {

  constructor( id ) {
    const data = {
      elements: [
        {
          type: "PictureParticular",
          frame: {
            x: 4,
            y: 6,
            width: 10,
            height: 12
          },
          particles: {
            has: true,
            sizeMin: 1.25,
            sizeRange: 1,
            spaceXMin: 12,
            spaceXRange: 10,
            spaceYMin: 12,
            spaceYRange: 10,
            xMin: 0,
            xRange: 0,
            yMin: 0,
            yRange: 0,
            z: 80
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
              x: 4,
              y: -3,
              z: 0
            }
          }
        },
        {
          type: "PictureParticular",
          frame: {
            x: -2,
            y: 0,
            width: 20,
            height: 8
          },
          particles: {
            has: true,
            sizeMin: 1.25,
            sizeRange: 1,
            spaceXMin: 12,
            spaceXRange: 10,
            spaceYMin: 12,
            spaceYRange: 10,
            xMin: 0,
            xRange: 0,
            yMin: 0,
            yRange: 0,
            z: 120
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
              x: -2,
              y: 7,
              z: 10
            }
          }
        },
        {
          type: "VZVSMesh",
          frame: {
            x: 2,
            y: 5,
            width: 12,
            height: 3
          },
          z: -40,
          canMove: {
            to: {
              x: -2,
              y: 3,
              z: -40
            }
          }
        },
        {
          type: "Picture",
          frame: {
            x: 2,
            y: -2,
            width: 4,
            height: 20
          },
          z: -20,
          hasLineDisplacement: true,
          isMovingWithSound: true,
          canMove: {
            to: {
              x: 13,
              y: -2,
              z: -80
            }
          }
        },
        {
          type: "VZVSMesh",
          frame: {
            x: 12,
            y: 3,
            width: 5,
            height: 9
          },
          z: 120,
          canMove: {
            to: {
              x: -2,
              y: 8,
              z: 120
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
          x: -1,
          y: -1,
          z: 120,
          xStep: 3,
          yStep: 3,
          sizes: {
            min: 1,
            max: 2,
            rnd: .1
          },
          cols: 4,
          lines: 4,
          rndVisible: .5
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
        //   x: 12,
        //   y: 13,
        //   z: 80,
        //   sizes: {
        //     min: 6,
        //     max: 6,
        //     rnd: 1
        //   }
        // },
        // {
        //   type: "unique",
        //   x: 6,
        //   y: 1,
        //   z: 80,
        //   sizes: {
        //     min: 4,
        //     max: 4,
        //     rnd: 1
        //   }
        // },
      ]
    }

    super( data, id )
  }

}

module.exports = FrameTripleNew
