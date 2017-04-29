const FrameFromData = require( "./FrameFromData" )

class FrameMiddleNew extends FrameFromData {

  constructor( id ) {
    const data = {
      elements: [
        {
          type: "PictureParticular",
          frame: {
            x: 0,
            y: 3,
            width: 16,
            height: 12
          },
          particles: {
            has: true,
            sizeMin: 1.1,
            sizeRange: 1,
            spaceXMin: 10,
            spaceXRange: 8,
            spaceYMin: 10,
            spaceYRange: 8,
            xMin: -3,
            xRange: 6,
            yMin: 2,
            yRange: 4
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
        // {
        //   type: "PictureParticular",
        //   frame: {
        //     x: 10,
        //     y: 12,
        //     width: 8,
        //     height: 4
        //   },
        //   particles: {
        //     has: false,
        //     sizeMin: 1.1,
        //     sizeRange: 1,
        //     spaceXMin: 15,
        //     spaceXRange: 8,
        //     spaceYMin: 15,
        //     spaceYRange: 8,
        //     xMin: 0,
        //     xRange: 0,
        //     yMin: 0,
        //     yRange: 0
        //   },
        //   z:80,
        //   isMovingWithSound: true,
        //   hasLineDisplacement: false
        // },
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
        {
          type: "VZVSMesh",
          frame: {
            x: -4,
            y: -4,
            width: 12,
            height: 12
          },
          z: -30
        },
        {
          type: "VZVSMesh",
          frame: {
            x: 12,
            y: 5,
            width: 10,
            height: 2
          },
          z: 0
        },
        {
          type: "Picture",
          frame: {
            x: -2,
            y: -2,
            width: 20,
            height: 20
          },
          z: -40,
          hasLineDisplacement: true,
          isMovingWithSound: false
        }
      ],
      signs: [
        // {
        //   type: "set",
        //   x: -2,
        //   y: 2,
        //   z: 60,
        //   xStep: 4,
        //   yStep: 3,
        //   sizes: {
        //     min: 4,
        //     max: 4,
        //     rnd: .1
        //   },
        //   cols: 4,
        //   lines: 1,
        //   rndVisible: .8
        // },
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
          z: 10,
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
          z: 60,
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

module.exports = FrameMiddleNew
