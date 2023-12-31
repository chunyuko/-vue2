import Mock from 'mockjs'

Mock.setup({
  timeout: '100 - 1000',
})

// 获取设备点位树
Mock.mock('/api/dalirobotcms/ajax/taskList.php', 'post', function () {
  return {
    code: 200,
    msg: 'OK',
    data: [
      [
        {
          TreeLevel: 0,
          level: 1,
          id: '1',
          label: '默认区域',
          fId: '-1',
        },
        {
          TreeLevel: 1,
          level: 1,
          id: '3527E9E4-4F12-89F8-02A3-EDDE936FAD87',
          label: '1234455',
          fId: '1',
        },
        {
          TreeLevel: 1,
          level: 1,
          id: '4C66467A-76ED-26D8-DD38-548CE3C53CE4',
          label: '1111111',
          fId: '1',
        },
        {
          TreeLevel: 3,
          level: 1,
          id: '544947B7-9903-9A4C-A645-30A616B4C522',
          label: '333',
          fId: '9AEFBE6A-F364-8A98-0E4F-0A4E466E1B3E',
        },
        {
          TreeLevel: 2,
          level: 1,
          id: '9AEFBE6A-F364-8A98-0E4F-0A4E466E1B3E',
          label: '222',
          fId: 'A29A5DEA-C2CB-D0D1-363A-36DCB2CE1C86',
        },
        {
          TreeLevel: 1,
          level: 1,
          id: 'A29A5DEA-C2CB-D0D1-363A-36DCB2CE1C86',
          label: '区域1001',
          fId: '1',
        },
        {
          TreeLevel: 1,
          level: 1,
          id: 'A2F26888-55A1-CFB8-6C0F-F792BF8262BF',
          label: 'cccdd',
          fId: '1',
        },
      ],
      [
        {
          CarType: 2,
          OperateUser: 2,
          User: '5,7,6',
          LoginState: 1,
          level: 2,
          id: 3,
          label: '123',
          fId: ['3527E9E4-4F12-89F8-02A3-EDDE936FAD87', 'A2F26888-55A1-CFB8-6C0F-F792BF8262BF'],
          SerialNum: '1122334455',
        },
      ],
      [
        {
          CameraIDOnRobot: 1,
          CameraType: 1,
          IFRCameraType: 0,
          IPCOffline: 0,
          IFROffline: 0,
          Admin: 2,
          User: '5,6,7',
          level: 3,
          id: 23,
          label: '400V球机1222',
          fId: 3,
        },
        {
          CameraIDOnRobot: 2,
          CameraType: 1,
          IFRCameraType: 0,
          IPCOffline: 0,
          IFROffline: 0,
          Admin: 2,
          User: '',
          level: 3,
          id: 24,
          label: '400V球机2',
          fId: 3,
        },
        {
          CameraIDOnRobot: 3,
          CameraType: 1,
          IFRCameraType: 0,
          IPCOffline: 0,
          IFROffline: 0,
          Admin: 2,
          User: '',
          level: 3,
          id: 25,
          label: '400V球机3',
          fId: 3,
        },
        {
          CameraIDOnRobot: 4,
          CameraType: 1,
          IFRCameraType: 0,
          IPCOffline: 0,
          IFROffline: 0,
          Admin: 2,
          User: '',
          level: 3,
          id: 26,
          label: '400V球机4',
          fId: 3,
        },
        {
          CameraIDOnRobot: 5,
          CameraType: 1,
          IFRCameraType: 0,
          IPCOffline: 0,
          IFROffline: 0,
          Admin: 2,
          User: '1,2,7',
          level: 3,
          id: 27,
          label: '变电站',
          fId: 3,
        },
        {
          CameraIDOnRobot: 6,
          CameraType: 1,
          IFRCameraType: 0,
          IPCOffline: 0,
          IFROffline: 0,
          Admin: 2,
          User: '',
          level: 3,
          id: 28,
          label: '控制室球机',
          fId: 3,
        },
        {
          CameraIDOnRobot: 7,
          CameraType: 1,
          IFRCameraType: 0,
          IPCOffline: 0,
          IFROffline: 0,
          Admin: 2,
          User: '',
          level: 3,
          id: 29,
          label: 'EPS球机',
          fId: 3,
        },
        {
          CameraIDOnRobot: 8,
          CameraType: 0,
          IFRCameraType: 1,
          IPCOffline: 0,
          IFROffline: 0,
          Admin: 2,
          User: '',
          level: 3,
          id: 30,
          label: '固定式摄像机1',
          fId: 3,
        },
        {
          CameraIDOnRobot: 9,
          CameraType: 0,
          IFRCameraType: 1,
          IPCOffline: 0,
          IFROffline: 0,
          Admin: 2,
          User: '',
          level: 3,
          id: 31,
          label: '固定式摄像机2',
          fId: 3,
        },
        {
          CameraIDOnRobot: 10,
          CameraType: 0,
          IFRCameraType: 1,
          IPCOffline: 0,
          IFROffline: 0,
          Admin: 2,
          User: '6,7',
          level: 3,
          id: 32,
          label: '固定式摄像机3测试修改1',
          fId: 3,
        },
        {
          CameraIDOnRobot: 11,
          CameraType: 0,
          IFRCameraType: 1,
          IPCOffline: 0,
          IFROffline: 0,
          Admin: 2,
          User: '',
          level: 3,
          id: 33,
          label: '固定式摄像机4',
          fId: 3,
        },
      ],
    ],
  }
})
// 获取所有变电站信息
Mock.mock(`/api/dalirobotcms/ajax/updatestationinfo.php`, 'post', function () {
  return [
    {
      Station_ID: '111',
      Station_Name: '变电站1',
    },
    {
      Station_ID: '222',
      Station_Name: '变电站22',
    },
    {
      Station_ID: '333',
      Station_Name: '变电站3',
    },
  ]
})
// 获取巡视告警
Mock.mock(`/api/dalirobotcms/ajax/queryinspectionresult.php`, 'post', function () {
  return {
    code: 200,
    msg: 'OK',
    data: [
      {
        ID: 1,
        station: '变电站1',
        warnTime: '2022/11/3',
        pointName: '点位1',
        insResult: '异常',
        warnContent: '无',
        warnLevel: '一级',
        confirmStatus: '未确认',
      },
      {
        ID: 2,
        station: '变电站2',
        warnTime: '2022/11/3',
        pointName: '点位2',
        insResult: '异常',
        warnContent: '无',
        warnLevel: '一级',
        confirmStatus: '未确认',
      },
      {
        ID: 3,
        station: '变电站3',
        warnTime: '2022/11/3',
        pointName: '点位3',
        insResult: '异常',
        warnContent: '无',
        warnLevel: '一级',
        confirmStatus: '未确认',
      },
    ],
  }
})
