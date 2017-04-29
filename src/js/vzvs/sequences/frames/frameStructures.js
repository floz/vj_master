module.exports = {
  "test": {
    elements: [
      {
        type: "PictureParticular",
        frame: {
          x: 8,
          y: 0,
          width: 10,
          height: 10
        },
        particles: {
          has: true,
          sizeMin: 1.25,
          sizeRange: 2,
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
        ]
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
          sizeRange: 2,
          spaceXMin: 20,
          spaceXRange: 8,
          spaceYMin: 20,
          spaceYRange: 8,
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
        ]
      },
      {
        type: "VZVSMesh",
        frame: {
          x: -3,
          y: 0,
          width: 20,
          height: 20
        },
        z: -1
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
        isMovingWithSound: false
      }
    ],
    signs: [
      {
        type: "set",
        x: 5,
        y: 5,
        z: 60,
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
        z: 60,
        xStep: 3,
        yStep: 3,
        sizes: {
          min: 1,
          max: 2,
          rnd: .1
        },
        cols: 3,
        lines: 4,
        rndVisible: .9,
        hasEmpty: false
      },
      {
        type: "unique",
        x: -1,
        y: 0,
        z: 20,
        sizes: {
          min: 2,
          max: 4,
          rnd: .4
        },
        rndVisible: .5,
        hasEmpty: false
      }
    ]
  }
}
