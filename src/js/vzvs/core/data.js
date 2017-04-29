const data = {
  grid: {
    cols: 16,
    lines: 16,
    shapes: {
      baseFrequency: .1,
      chanceFrequency: .25,
      coefPlacementX: 6,
      coefPlacementY: 6,
      coefSize: 1
    },
    blocs: {
      baseFrequency: .25,
      chanceFrequency: .25,
    }
  },

  start: {
    z: -475
  },

  geos: {
    vertices: 3
  },

  camera: {
    distance: 1000
  },

  shapes: [
    { id: "circle", filename: "sign_circle.png" },
    { id: "circletriangletop", filename: "sign_circletriangletop.png" },
    { id: "circlehalfright", filename: "sign_halfcircleright.png" },
    { id: "circlesmalltop", filename: "sign_smallcircletop.png" },
    { id: "circle34", filename: "sign_34circle.png" },
    { id: "dot", filename: "sign_dot.png" },
    { id: "cross", filename: "sign_cross.png" },
    { id: "empty", filename: "sign_empty.png" },
    { id: "powerkindaright", filename: "sign_powerkindaright.png" },
    { id: "powerkindadown", filename: "sign_powerkindadown.png" },
    { id: "powerdown", filename: "sign_powerdown.png" },
    { id: "approve", filename: "sign_approve.png" },
    { id: "arrowbot", filename: "sign_arrowbot.png" },
    { id: "arrowright", filename: "sign_arrowright.png" },
    { id: "baton", filename: "sign_baton.png" },
    { id: "doubletraits", filename: "sign_doubletraits.png" },
    { id: "doubletraitsb", filename: "sign_doubletraitsb.png" },
    { id: "faux", filename: "sign_faux.png" },
    { id: "zigzag", filename: "sign_zigzag.png" },
    { id: "tilde", filename: "sign_tilde.png" },
  ],

  frames: 6,

  sequences: [
    {
      id: "timwu_01",
      assets: {
        imgs: [
          "15506991983_b1d3858503_k",
          "15598919124_27d3490f8b_k",
          "15863712540_dc799cfb94_k"
        ],
      },
      colorsBlocs: [ 0x383838,0x404040,0x494949,0x525252,0x5B5B5B ],
      colorsShapes: [ 0x636363,0x6B6B6B,0x747474,0x7B7B7B,0x8B8B8B,0x9E9E9E,0xADADAD,0xBCBCBC,0xCCCCCC,0xDFDFDF,0xF8F8F8 ],
      colorsBg: [ 0x0D0D0D,0x1F1F1F,0x303030 ]
    },
    {
      id: "timwu_02",
      assets: {
        imgs: [
          "15863665180_ff04c143c7_k",
          "15863665610_1acfa83b05_k"
        ],
      },
      colorsBlocs: [ 0x2F4448,0x7B472F,0x485B5C,0x657070,0x8C8A87,0xADA5A0,0xD29B75 ],
      colorsShapes: [ 0x636363,0x6B6B6B,0x747474,0x7B7B7B,0x8B8B8B,0x9E9E9E,0xADADAD,0xBCBCBC,0xCCCCCC,0xDFDFDF,0xF8F8F8 ],
      colorsBg: [ 0x060606,0x0D1617,0x1C2D30,0x4E2C1A,0x3E3D30 ]
    },
    {
      id: "timwu_03",
      assets: {
        imgs: [
          "15428714734_0e5d914142_k",
          "15863715680_0bd043bbf2_k"
        ],
      },
      colorsBlocs: [ 0x4F6B5A,0x876A39, 0x74846D,0xA3837B,0x839685,0xB1935C,0xA3AB9C ],
      colorsShapes: [ 0xADBBC2,0xB3C1BA,0xD5BEC2,0xD6C9C4,0xE3D9DC,0xD5DCEB,0xDBE8F0,0xEAE8DF,0xEFEFFF,0xECF7FA,0xF7F7F9 ],
      colorsBg: [ 0x21261B ]
    },
    {
      id: "timwu_04",
      assets: {
        imgs: [
          "15429015964_9d6d44606b_k",
          "15431649563_b6b0a3fcca_k",
          "15864016550_bbf5255cc7_k"
        ],
      },
      colorsBlocs: [ 0x4B6273,0x905752,0x9F7A7F,0x758CA1,0xB38A84,0xA19FAB,0x9EB6CD,0xC9BEC7 ],
      colorsShapes: [ 0xD2C7CA,0xC4CEEA,0xC5D0DD,0xC9D7E7,0xD5DFEE,0xE6DFE4,0xDAE8F3,0xE8E8F8,0xE5EFF8,0xEFEFF8,0xECF7F9,0xF7FAFE ],
      colorsBg: [ 0x1E131C,0x252832 ]
    },
    {
      id: "timwu_05",
      assets: {
        imgs: [
          "timwu04",
          "timwu04_add0",
          "timwu04_add1"
        ],
      },
      colorsBlocs: [ 0x6A8074,0x539395,0x83978D,0xDD7900,0x6BA2A7,0xAB9B7F,0x89A7A0 ],
      colorsShapes: [ 0xE6A723,0xA8BBB6,0xCABDBD,0xBDC6BB,0xA7CBCE,0xC1CFCB,0xC1CFD9,0xCCDEE9,0xD8DFDB,0xECDDC3,0xDDE8E3,0xE9E8D8 ],
      colorsBg: [ 0x004146,0x2D7677 ]
    },
    {
      id: "timwu_06",
      assets: {
        imgs: [
          "timwu02",
          "15429018844_a702f574c3_k",
          "15431652973_d1759d82d3_k",
          "16049040751_c7564e1422_k"
        ],
      },
      colorsBlocs: [ ,0x1B4456,0x444141,0x345151,0x665151,0x386659,0x486773,0x626B5C,0x5F7475,0x61768D,0x8A7373,0x65867A,0x857F8B ],
      colorsShapes: [ 0x7A8B99,0x859287,0x959FAC,0xABB3C4,0xC0B6B4,0xAFC1BE,0xC2BDCF,0xBAC5D8,0xDBE8F3,0xEBEBF7 ],
      colorsBg: [ 0x0A0C11,0x041E27,0x082E3D,0x16413B ]
    },
    {
      id: "timwu_07",
      assets: {
        imgs: [
          "balloon",
          "balloon_add0",
          "balloon_add1",
        ],
      },
      colorsBlocs: [ 0x71898F,0x91AAB2,0xA2BDCC,0xC7B9B4,0xB2CAD9,0xD0C7C5,0xBCCFDD,0xC4CEDB,0xBFD2DF,0xD7CFCE ],
      colorsShapes: [ 0xC3D4E0,0xC4D5E1,0xD3D8E4,0xCCDAE6,0xCDDBE7,0xD2DCE8,0xDEDEE4,0xDAE0EB,0xDEE4EF,0xE3E9F4 ],
      colorsBg: [ 0x362D2E ]
    },
    {
      id: "timwu_08",
      assets: {
        imgs: [
          "timwu03",
          "timwu03_add0"
        ],
      },
      colorsBlocs: [ 0x555E5E,0x5A747D,0x887262,0x7B817B,0x718D9A,0xA58F7B,0x93A5AC,0xC9B19D,0xDBC8BD ],
      colorsShapes: [ 0xCAD2D9,0xD2DDEA,0xE8DCD9,0xD4E8F2,0xF1E8E5,0xFAEFF8,0xECF7F7,0xF7F7FA,0xFBFBFD ],
      colorsBg: [ 0x060E16,0x131E21,0x233235,0x3F332E,0x2C464E ]
    },
    {
      id: "timwu_09",
      assets: {
        imgs: [
          "timwu05",
          "15864943639_e9da42587a_k",
          "timwu05_add0",
        ],
      },
      colorsBlocs: [ 0x24444C,0x4F4239,0x41666F,0x78645B,0x6B6D71,0x4F7882,0x708285,0x6A949D,0xA78D80,0xA7A59F,0x88B9C1 ],
      colorsShapes: [ 0xC5B8AF,0xA7C5C4,0xCDCAC2,0xACD1D6,0xCDD8D7,0xD4DFE3,0xD7E8EB,0xE2EFF3 ],
      colorsBg: [ 0x030504,0x1C1C11,0x08211F,0x1B2A29,0x1A363A,0x223F3D ]
    },
    {
      id: "timwu_10",
      assets: {
        imgs: [
          "16261039541_07c2a86f57_k",
          "16076993767_6e60f8e88e_k",
        ],
      },
      colorsBlocs: [ 0x553D3A,0x144A50,0x595034,0x396262,0x497878,0x977058,0x698759,0x6E908C,0xAB926D,0xA4A79A,0xD9ACA7,0xE1C0C2,0xD2CAB8 ],
      colorsShapes: [ 0xCDD2D8,0xE6D2D7,0xD6DEEA,0xE8DFE5,0xDAE8F1,0xE8E8F4,0xE5EEDA,0xEAEFF8,0xFAEFFB,0xECF7FB,0xF8F8FE ],
      colorsBg: [ 0x00050F,0x022E33,0x362923,0x154221 ]
    },
    {
      id: "timwu_11",
      assets: {
        imgs: [
          "16051055015_9d2c8641c1_k",
          "16051054695_850d7892fc_k",
          "15863712540_dc799cfb94_k",
        ],
      },
      colorsBlocs: [ 0x383838,0x404040,0x494949,0x525252,0x5B5B5B ],
      colorsShapes: [ 0x636363,0x6B6B6B,0x747474,0x7B7B7B,0x8B8B8B,0x9E9E9E,0xADADAD,0xBCBCBC,0xCCCCCC,0xDFDFDF,0xF8F8F8 ],
      colorsBg: [ 0x0D0D0D,0x1F1F1F,0x303030 ]
    },
    {
      id: "timwu_12",
      assets: {
        imgs: [
          "16050987515_f792bd51b0_k",
        ],
      },
      colorsBlocs: [ 0x493636,0x303D49,0x304555,0x634035,0x3F5062,0x515D70,0x656877,0x7D737E,0x977F82 ],
      colorsShapes: [ 0xB0A7B6,0xD3ABA8,0xDDBBBC,0xE0C6C8,0xE4D1D5 ],
      colorsBg: [ 0x0A0504,0x3A211A,0x232830 ]
    },
    {
      id: "timwu_13",
      assets: {
        imgs: [
          "16025224146_ca2961cbe4_k",
          "16050307482_3e38574507_k",
          "16050308012_90f105705d_k",
          "16050992895_7f17be53b9_k",
        ],
      },
      colorsBlocs: [ 0x41696D,0x7E6758,0x66847A,0x81807C,0x6F9198,0x9D8C7E,0x92A8AF,0xA7BAC6,0xC1B6AD,0xCABFC3 ],
      colorsShapes: [ 0xB7C5C3,0xB4C9D5,0xD0C9C3,0xD1DEEF,0xF3E8F3,0xE5EFF8,0xEFEFF8,0xEFEFFF,0xECF7FD ],
      colorsBg: [ 0x00050E,0x07242B ]
    },
    {
      id: "timwu_14",
      assets: {
        imgs: [
          "15864956909_614272af32_k",
          "16025226886_4b6c8df568_k",
          "16025227296_cd6b4cc557_k",
        ],
      },
      colorsBlocs: [ 0x376059,0x976541,0x00866D,0x488D6B,0xC59667,0x00B89E,0xB9CBB8 ],
      colorsShapes: [ 0x4AEFDC,0xFFCEAE,0xD5DDD0,0xD3DDEF,0x9CEFE0,0xF5DEDF,0xFFDEC5,0xCDEFDC,0xD1EFEE,0xF7EFDD,0xFDFCF9 ],
      colorsBg: [ 0x101217,0x10171A,0x19302D ]
    },
    {
      id: "timwu_16",
      assets: {
        imgs: [
          "15865225227_028c720fdb_k",
          "16050294102_eb89d8cf31_k",
          "16050942335_5b21e9d229_k",
        ],
      },
      colorsBlocs: [ 0x4D3C3A,0x294553,0x4C4C4D,0x5D4D2A,0x3F5667,0x6D5B3D,0x6B5C67,0x496778 ],
      colorsShapes: [ 0x989276,0xA7A7A1,0xA7B6CC,0xBAB4B6,0xBABFBB,0xC4BECB,0xB9C7D1,0xC6CACF,0xCBCEDB,0xCCD7DF,0xD1D9EB ],
      colorsBg: [ 0x1C1E20,0x28221F,0x253135,0x3D311F ]
    },
    {
      id: "timwu_17",
      assets: {
        imgs: [
          "16050304852_1458501561_k"
        ],
      },
      colorsBlocs: [ 0x1D323F,0x42332C,0x294556,0x514136,0x5C4C43,0x74879D ],
      colorsShapes: [ 0x90857D,0x908D94,0xB0B7CA,0xBBC4D7,0xC4D0E4 ],
      colorsBg: [ 0x0F1116,0x0F161F,0x111B21,0x2B2421 ]
    },
    {
      id: "timwu_18",
      assets: {
        imgs: [
          "16055584331_4da91787ed_k",
          "15431332053_f6ce7a40f0_k",
        ],
      },
      colorsBlocs: [ 0x3B4B56,0x435463,0x575450,0x575D67,0x606E7E,0x67788A,0x737F90,0x7C8CA0 ],
      colorsShapes: [ 0x8F8D8A,0x929EAF,0xA5B1BC,0xB9BBBF,0xD4DCE3,0xDFE8EE,0xEFF4F7 ],
      colorsBg: [ 0x040402,0x181F1B,0x243134,0x2E3B41 ]
    },
    {
      id: "timwu_19",
      assets: {
        imgs: [
          "15431654943_f49ceb2ce7_k"
        ],
      },
      colorsBlocs: [ 0x36444C,0x4F423B,0x525A61,0x6C757F,0x897364,0x838996,0x998C83,0x9B9FAC,0xB2B7C7 ],
      colorsShapes: [ 0xC7B6AC,0xBEC6D6,0xD7C8BF,0xDADDED,0xE9E8F3,0xEBEFF8,0xECF7F9,0xFCFBFE ],
      colorsBg: [ 0x06070A,0x10191F,0x242D34 ]
    },
    {
      id: "timwu_20",
      assets: {
        imgs: [
          "15863852488_fea635be9f_k",
          "15863853778_37ab7dc2b7_k",
          "15864949869_d5ac44f746_k"
        ],
      },
      colorsBlocs: [ 0x423C43,0x37404A,0x463F3A,0x484343,0x585661,0x6C5652,0x645D64,0x70605D,0x6E6772,0x777384,0x97706A,0x8B7C8A ],
      colorsShapes: [ 0x9BA7BA,0xBBACB6,0xABB3C8,0xCABBC8,0xD5CEDC ],
      colorsBg: [ 0x080A0C,0x1C1E1E,0x313132,0x3E3430 ]
    },
    {
      id: "timwu_22",
      assets: {
        imgs: [
          "15865232077_8d0dc343de_k",
          "16049040641_8f7a45c649_k"
        ],
      },
      colorsBlocs: [ 0x42727E,0x777478,0x4B858B,0x7C7F8B,0x678A98,0x819181,0x7495A0,0x819AAA,0xA19B9B ],
      colorsShapes: [ 0xB2C7C1,0xC4C2D0,0xB4CAD7,0xC6D2C4,0xC5D4DE,0xCFDDE9,0xD6E3DA,0xDFDFEC,0xDAE8F0,0xE4EDF1,0xEBEFF8,0xFAEFFD,0xECF7F7,0xF7F7FD ],
      colorsBg: [ 0x20313C ]
    },
    {
      id: "timwu_24",
      assets: {
        imgs: [
          "15865603017_d929725735_k",
        ],
      },
      colorsBlocs: [ 0x3C3942,0x324035,0x27474F,0x414B3D,0x526153,0x55767C,0x70755C,0x71806F,0x897F81,0x718F99,0x93917D,0x95A7AF,0xB9B3B5,0xA8BBC8 ],
      colorsShapes: [ 0xBEBECB,0xAEC7C6,0xB6C7D3,0xC7C7D6,0xC3CFDA,0xCFCFE0,0xCCD7DF,0xD7D8DE,0xD0DAE9,0xDFDFEE,0xD8E8F2,0xE8F1FB ],
      colorsBg: [ 0x161C20,0x1B2728,0x273433,0x383630 ]
    },
    {
      id: "timwu_25",
      assets: {
        imgs: [
          "15865221977_3d67468dc7_k",
        ],
      },
      colorsBlocs: [ 0x4E5B5A,0x677273,0x727E81,0x8D7C8F,0x7D888D,0x889399,0x95A3AB ],
      colorsShapes: [ 0xA3AFB9,0xC4CBDF,0xC1DAE3,0xCFDCE6,0xCBDDED,0xE1DDED,0xE0E9FB ],
      colorsBg: [ 0x252729 ]
    },
    {
      id: "timwu_26",
      assets: {
        imgs: [
          "16051300755_c4ec5cc92b_k",
          "16051300995_a5d63d8c60_k",
        ],
      },
      colorsBlocs: [ 0x3A342F,0x453224,0x4B3E35,0x4B4341,0x574331,0x615650,0x695747,0x6B5E53, 0x93766B,0x9B8277 ],
      colorsShapes: [ 0xAA9592,0xB4A5A8,0xC5B4BC,0xC8BAC7,0xCDC0CB ],
      colorsBg: [ 0x0E0E11,0x1A1A1B,0x231C19 ]
    },
    // {
    //   id: "timwu02",
    //   assets: {
    //     image: "timwu02.jpg",
    //     mask: "timwu02.jpg",
    //     adds: []
    //   },
    //   colorsBlocs: [ 0x2A3C35,0x23475B,0x8997BA,0xCDB3B8,0xB5C4E9,0xD9D6ED,0xE6DEF2,0xE7E9F9],
    //   colorsShapes: [ 0x3964eb,0x5f8e64,0x8997BA,0xd68c34],
    //   colorsBg: [ 0x06070C, 0x0A1A1E ]
    // },
    // {
    //   id: "timwu03",
    //   assets: {
    //     image: "timwu03.jpg",
    //     mask: "timwu03.jpg",
    //     adds: [ "timwu03_add0.jpg"]
    //   },
    //   colorsBlocs: [ 0xEEDFE8,0x4C4440,0xDBC8BD,0x887262,0xC9B19D,0xA58F7B,0xFBF7EF,0x060E16,0x2C464E,0x131E21,0x233235,0x5A747D,0x718D9A,0x93A5AC,0xA8B9C4,0xB7C8D2,0xD4E8F2],
    //   colorsShapes: [ 0xEEDFE8,0x4C4440,0xDBC8BD,0x887262,0xC9B19D,0xA58F7B,0xFBF7EF,0x060E16,0x2C464E,0x131E21,0x233235,0x5A747D,0x718D9A,0x93A5AC,0xA8B9C4,0xB7C8D2,0xD4E8F2],
    //   colorsBg: [ 0x303a3b, 0x659bc9, 0x614e40, 0xf2f3f8 ]
    // },
    // {
    //   id: "timwu04",
    //   assets: {
    //     image: "timwu04.jpg",
    //     mask: "timwu04.jpg",
    //     adds: [ "timwu04_add0.jpg", "timwu04_add1.jpg" ]
    //   },
    //   colorsBlocs: [ 0xCABDBD,0xDD7900,0xAB9B7F,0xD5BB8D,0xE6A723,0xE5D19E,0xB3AF97,0x004146,0x2D7677,0x539395,0x6BA2A7,0x85B2B3,0x92BFC3,0x89A7A0,0x6A8074],
    //   colorsShapes: [ 0xCABDBD,0xDD7900,0xAB9B7F,0xD5BB8D,0xE6A723,0xE5D19E,0xB3AF97,0x004146,0x2D7677,0x539395,0x6BA2A7,0x85B2B3,0x92BFC3,0x89A7A0,0x6A8074],
    //   colorsBg: [ 0x2c5b61, 0x9a6e36, 0x13343b, 0xd2e0e9 ]
    // },
    // {
    //   id: "timwu05",
    //   assets: {
    //     image: "timwu05.jpg",
    //     mask: "timwu05.jpg",
    //     adds: [ "timwu05_add0.jpg" ]
    //   },
    //   colorsBlocs: [ 0x6A534E,0x93756B,0x43322B,0x78645B,0xCDCAC2,0x05130A,0x08211F,0x223F3D,0x030504,0x1A363A,0x1B2A29,0x24444C,0x325660,0x41666F,0x4F7882,0x6A949D,0x88B9C1,0xA7C5C4,0x708285],
    //   colorsShapes: [ 0x6A534E,0x93756B,0x43322B,0x78645B,0xCDCAC2,0x05130A,0x08211F,0x223F3D,0x030504,0x1A363A,0x1B2A29,0x24444C,0x325660,0x41666F,0x4F7882,0x6A949D,0x88B9C1,0xA7C5C4,0x708285, 0xc63b44, 0xc63b44],
    //   colorsBg: [ 0xd2d0b7, 0x0b0d0c, 0x44606c, 0x73746c ]
    // }
  ]
}

module.exports = data
